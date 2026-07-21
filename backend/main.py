from fastapi import FastAPI, Depends, HTTPException, Request, BackgroundTasks, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
import uuid
import asyncio
import os
import sentry_sdk

sentry_dsn = os.getenv("SENTRY_DSN")
if sentry_dsn:
    sentry_sdk.init(
        dsn=sentry_dsn,
        traces_sample_rate=1.0,
        profiles_sample_rate=1.0,
    )

from db import models, schemas
from db.supabase_client import supabase_admin
from db.database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware
from utils.email import send_hotel_booking_email, send_driver_credentials_email
from utils.ai_processor import parse_raw_itinerary
from utils.image_search import search_images
from utils.pdf_generator import generate_itinerary

# Alembic migrations are now used instead of create_all
# models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Tour Management System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend API is online."}

# ==================== TOURISTS ====================
@app.get("/api/tourists", response_model=List[schemas.Tourist])
def read_tourists(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    from sqlalchemy.orm import selectinload
    tourists = db.query(models.ForeignTourist)\
        .filter(models.ForeignTourist.company_id == company_id)\
        .options(
            selectinload(models.ForeignTourist.group_members),
            selectinload(models.ForeignTourist.itineraries).selectinload(models.TourItinerary.destinations),
            selectinload(models.ForeignTourist.itineraries).selectinload(models.TourItinerary.hotel)
        )\
        .offset(skip).limit(limit).all()
    return tourists

@app.post("/api/tourists", response_model=schemas.Tourist)
def create_tourist(tourist: schemas.TouristCreate, db: Session = Depends(get_db)):
    db_tourist = models.ForeignTourist(
        name=tourist.name,
        passport_number=tourist.passport_number,
        email=tourist.email,
        phone=tourist.phone,
        pax_count=tourist.pax_count,
        country=tourist.country,
        country_code=tourist.country_code,
        arrival_date=tourist.arrival_date,
        departure_date=tourist.departure_date,
        duration=tourist.duration,
        status=tourist.status,
        is_lead=tourist.is_lead,
        agent_id=tourist.agent_id,
        driver_id=tourist.driver_id,
        company_id=tourist.company_id
    )
    db.add(db_tourist)
    db.commit()
    db.refresh(db_tourist)
    
    # Add group members
    if tourist.group_members:
        for member in tourist.group_members:
            db_member = models.TouristGroupMember(**member.dict(), main_tourist_id=db_tourist.id)
            db.add(db_member)
            
    # Add itinerary and destinations
    if tourist.itineraries:
        for day in tourist.itineraries:
            hotel_id = None
            if day.hotel_name:
                db_hotel = db.query(models.Hotel).filter(models.Hotel.hotel_name == day.hotel_name, models.Hotel.company_id == tourist.company_id).first()
                if not db_hotel:
                    db_hotel = models.Hotel(hotel_name=day.hotel_name, hotel_email=day.hotel_email or "N/A", phone_number="N/A", company_id=tourist.company_id)
                    db.add(db_hotel)
                    db.commit()
                    db.refresh(db_hotel)
                hotel_id = db_hotel.id

            day_data = day.dict(exclude={"destinations", "hotel_name", "hotel_email"})
            day_data["hotel_id"] = hotel_id
            db_itinerary = models.TourItinerary(**day_data, tourist_id=db_tourist.id)
            db.add(db_itinerary)
            db.commit() # Commit to get the itinerary ID
            db.refresh(db_itinerary)
            
            # Add destinations for this day
            if day.destinations:
                for dest in day.destinations:
                    db_dest = models.ItineraryDestination(**dest.dict(), itinerary_id=db_itinerary.id)
                    db.add(db_dest)
                    
    db.commit()
    
    # Reload with relationships
    from sqlalchemy.orm import selectinload
    reloaded_tourist = db.query(models.ForeignTourist)\
        .filter(models.ForeignTourist.id == db_tourist.id)\
        .options(
            selectinload(models.ForeignTourist.group_members),
            selectinload(models.ForeignTourist.itineraries).selectinload(models.TourItinerary.destinations),
            selectinload(models.ForeignTourist.itineraries).selectinload(models.TourItinerary.hotel)
        ).first()
        
    return reloaded_tourist

@app.put("/api/tourists/{tourist_id}", response_model=schemas.Tourist)
def update_tourist(tourist_id: uuid.UUID, tourist: schemas.TouristCreate, db: Session = Depends(get_db)):
    db_tourist = db.query(models.ForeignTourist).filter(models.ForeignTourist.id == tourist_id).first()
    if not db_tourist:
        raise HTTPException(status_code=404, detail="Tourist not found")

    db_tourist.name = tourist.name
    db_tourist.passport_number = tourist.passport_number
    db_tourist.email = tourist.email
    db_tourist.phone = tourist.phone
    db_tourist.pax_count = tourist.pax_count
    db_tourist.country = tourist.country
    db_tourist.country_code = tourist.country_code
    db_tourist.arrival_date = tourist.arrival_date
    db_tourist.departure_date = tourist.departure_date
    db_tourist.duration = tourist.duration
    db_tourist.status = tourist.status
    db_tourist.is_lead = tourist.is_lead
    db_tourist.agent_id = tourist.agent_id
    db_tourist.driver_id = tourist.driver_id
    db_tourist.company_id = tourist.company_id

    # Update group members (delete old, insert new)
    db.query(models.TouristGroupMember).filter(models.TouristGroupMember.main_tourist_id == db_tourist.id).delete()
    if tourist.group_members:
        for member in tourist.group_members:
            db_member = models.TouristGroupMember(**member.dict(), main_tourist_id=db_tourist.id)
            db.add(db_member)

    # Update itineraries (delete old, insert new)
    db.query(models.TourItinerary).filter(models.TourItinerary.tourist_id == db_tourist.id).delete()
    if tourist.itineraries:
        for day in tourist.itineraries:
            hotel_id = None
            if day.hotel_name:
                db_hotel = db.query(models.Hotel).filter(models.Hotel.hotel_name == day.hotel_name, models.Hotel.company_id == tourist.company_id).first()
                if not db_hotel:
                    db_hotel = models.Hotel(hotel_name=day.hotel_name, hotel_email=day.hotel_email or "N/A", phone_number="N/A", company_id=tourist.company_id)
                    db.add(db_hotel)
                    db.commit()
                    db.refresh(db_hotel)
                hotel_id = db_hotel.id

            day_data = day.dict(exclude={"destinations", "hotel_name", "hotel_email"})
            day_data["hotel_id"] = hotel_id
            db_itinerary = models.TourItinerary(**day_data, tourist_id=db_tourist.id)
            db.add(db_itinerary)
            db.commit()
            db.refresh(db_itinerary)
            
            if day.destinations:
                for dest in day.destinations:
                    db_dest = models.ItineraryDestination(**dest.dict(), itinerary_id=db_itinerary.id)
                    db.add(db_dest)

    db.commit()
    db.refresh(db_tourist)
    return db_tourist

class StatusUpdate(BaseModel):
    status: str

@app.patch("/api/tourists/{tourist_id}/status")
def update_tourist_status(tourist_id: uuid.UUID, update_data: StatusUpdate, db: Session = Depends(get_db)):
    db_tourist = db.query(models.ForeignTourist).filter(models.ForeignTourist.id == tourist_id).first()
    if not db_tourist:
        raise HTTPException(status_code=404, detail="Tourist not found")
    
    db_tourist.status = update_data.status
    db.commit()
    db.refresh(db_tourist)
    return {"message": "Status updated successfully", "status": db_tourist.status}

@app.delete("/api/tourists/{tourist_id}")
def delete_tourist(tourist_id: uuid.UUID, db: Session = Depends(get_db)):
    db_tourist = db.query(models.ForeignTourist).filter(models.ForeignTourist.id == tourist_id).first()
    if not db_tourist:
        raise HTTPException(status_code=404, detail="Tourist not found")
    
    db.delete(db_tourist)
    db.commit()
    return {"message": "Tourist deleted successfully"}



# ==================== DRIVERS ====================
@app.get("/api/drivers", response_model=List[schemas.Driver])
def read_drivers(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Driver).filter(models.Driver.company_id == company_id).offset(skip).limit(limit).all()

@app.post("/api/drivers", response_model=schemas.Driver)
def create_driver(driver: schemas.DriverCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):

    if supabase_admin and driver.email:
        try:
            # Note: list_users might not be supported in all SDK versions, we'll just try creating and catch the error if it exists.
            

            auth_payload = {
                "email": driver.email,
                "email_confirm": True,
                "app_metadata": {"role": "guide"},
                "user_metadata": {"name": driver.name}
            }
            if driver.password:
                auth_payload["password"] = driver.password

            supabase_admin.auth.admin.create_user(auth_payload)

        except Exception as e:
            error_msg = str(e)
            print("Auth user creation failed:", error_msg)
            # If the error is not that the user already exists, we should raise an exception
            # so we don't end up with a driver in the DB that can't log in.
            if "already exists" not in error_msg.lower() and "user_already_exists" not in error_msg.lower():
                raise HTTPException(status_code=400, detail=f"Failed to create driver auth account: {error_msg}")
    db_driver = models.Driver(**driver.model_dump(exclude={"password"}))

    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    
    # Send email to the driver
    if driver.email and driver.password and driver.company_id:
        company = db.query(models.Company).filter(models.Company.id == driver.company_id).first()
        if company:
            background_tasks.add_task(send_driver_credentials_email, driver, company)
            
    return db_driver

@app.put("/api/drivers/{driver_id}", response_model=schemas.Driver)
def update_driver(driver_id: uuid.UUID, driver: schemas.DriverCreate, db: Session = Depends(get_db)):
    db_driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    db_driver.name = driver.name
    db_driver.phone = driver.phone
    db_driver.email = driver.email
    db_driver.company_id = driver.company_id
    db.commit()
    db.refresh(db_driver)
    return db_driver

@app.delete("/api/drivers/{driver_id}")
def delete_driver(driver_id: uuid.UUID, db: Session = Depends(get_db)):
    db_driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Driver not found")

    # Also delete from Supabase Auth so the guide can no longer log in
    if supabase_admin and db_driver.email:
        try:
            all_users = supabase_admin.auth.admin.list_users()
            auth_user = next((u for u in all_users if u.email == db_driver.email), None)
            if auth_user:
                supabase_admin.auth.admin.delete_user(str(auth_user.id))
                print(f"Deleted auth user: {db_driver.email}")
        except Exception as e:
            print(f"Warning: could not delete auth user ({db_driver.email}): {e}")

    db.delete(db_driver)
    db.commit()
    return {"message": "Driver deleted successfully"}

@app.get("/api/drivers/verify")
def verify_driver(email: str, db: Session = Depends(get_db)):
    db_driver = db.query(models.Driver).filter(models.Driver.email == email).first()
    if db_driver:
        return {
            "is_authorized": True,
            "driver_id": str(db_driver.id),
            "company_id": str(db_driver.company_id),
            "name": db_driver.name
        }
    return {"is_authorized": False}

@app.get("/api/drivers/{driver_id}/tours", response_model=List[schemas.Tourist])
def get_driver_tours(driver_id: uuid.UUID, db: Session = Depends(get_db)):
    from sqlalchemy.orm import selectinload
    tours = db.query(models.ForeignTourist)\
        .filter(models.ForeignTourist.driver_id == driver_id)\
        .options(
            selectinload(models.ForeignTourist.group_members),
            selectinload(models.ForeignTourist.itineraries).selectinload(models.TourItinerary.destinations),
            selectinload(models.ForeignTourist.itineraries).selectinload(models.TourItinerary.hotel)
        )\
        .all()
    return tours


# ==================== AGENTS ====================
@app.get("/api/agents", response_model=List[schemas.Agent])
def read_agents(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.ForeignTourAgent).filter(models.ForeignTourAgent.company_id == company_id).offset(skip).limit(limit).all()

@app.post("/api/agents", response_model=schemas.Agent)
def create_agent(agent: schemas.AgentCreate, db: Session = Depends(get_db)):
    db_agent = models.ForeignTourAgent(
        agent_name=agent.agent_name,
        email=agent.email,
        region=agent.region,
        company_id=agent.company_id
    )
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent

@app.put("/api/agents/{agent_id}", response_model=schemas.Agent)
def update_agent(agent_id: uuid.UUID, agent: schemas.AgentCreate, db: Session = Depends(get_db)):
    db_agent = db.query(models.ForeignTourAgent).filter(models.ForeignTourAgent.id == agent_id).first()
    if not db_agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    db_agent.agent_name = agent.agent_name
    db_agent.email = agent.email
    db_agent.region = agent.region
    db_agent.company_id = agent.company_id
    db.commit()
    db.refresh(db_agent)
    return db_agent

@app.delete("/api/agents/{agent_id}")
def delete_agent(agent_id: uuid.UUID, db: Session = Depends(get_db)):
    db_agent = db.query(models.ForeignTourAgent).filter(models.ForeignTourAgent.id == agent_id).first()
    if not db_agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    db.delete(db_agent)
    db.commit()
    return {"message": "Agent deleted successfully"}






# ==================== NOTIFICATIONS ====================
@app.get("/api/notifications", response_model=List[schemas.Notification])
def read_notifications(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.UrgentAlert).filter(models.UrgentAlert.company_id == company_id).order_by(models.UrgentAlert.created_at.desc()).offset(skip).limit(limit).all()

@app.post("/api/notifications", response_model=schemas.Notification)
def create_notification(notif: schemas.NotificationCreate, db: Session = Depends(get_db)):
    db_notif = models.UrgentAlert(**notif.dict())
    db.add(db_notif)
    db.commit()
    db.refresh(db_notif)
    return db_notif

@app.patch("/api/notifications/{notif_id}/resolve", response_model=schemas.Notification)
def resolve_notification(notif_id: uuid.UUID, db: Session = Depends(get_db)):
    db_notif = db.query(models.UrgentAlert).filter(models.UrgentAlert.id == notif_id).first()
    if not db_notif:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    db_notif.is_resolved = True
    db.commit()
    db.refresh(db_notif)
    return db_notif

# ----------------- Hotels -----------------

@app.get("/api/hotels", response_model=List[schemas.Hotel])
def read_hotels(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Hotel).filter(models.Hotel.company_id == company_id).offset(skip).limit(limit).all()

@app.post("/api/hotels", response_model=schemas.Hotel)
def create_hotel(hotel: schemas.HotelCreate, db: Session = Depends(get_db)):
    db_hotel = models.Hotel(**hotel.dict())
    db.add(db_hotel)
    db.commit()
    db.refresh(db_hotel)
    return db_hotel

@app.post("/api/itineraries/{itinerary_id}/send-hotel-booking")
def send_hotel_email(itinerary_id: uuid.UUID, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    itinerary = db.query(models.TourItinerary).filter(models.TourItinerary.id == itinerary_id).first()
    if not itinerary:
        raise HTTPException(status_code=404, detail="Itinerary not found")
        
    if not itinerary.hotel_id:
        raise HTTPException(status_code=400, detail="This itinerary does not have a hotel attached.")
        
    hotel = db.query(models.Hotel).filter(models.Hotel.id == itinerary.hotel_id).first()
    tourist = db.query(models.ForeignTourist).filter(models.ForeignTourist.id == itinerary.tourist_id).first()
    company = db.query(models.Company).filter(models.Company.id == tourist.company_id).first()
    
    if not hotel or not tourist or not company:
        raise HTTPException(status_code=500, detail="Missing linked records")
        
    try:
        background_tasks.add_task(send_hotel_booking_email, hotel=hotel, company=company, itinerary=itinerary, tourist=tourist)
        itinerary.booking_email_sent = True
        db.commit()
        return {"message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------------- Onboarding -----------------
import json

@app.get("/api/companies/me", response_model=schemas.Company)
def get_my_company(user_id: uuid.UUID, db: Session = Depends(get_db)):
    db_company = db.query(models.Company).filter(models.Company.auth_user_id == user_id).first()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")
    return {
        "id": db_company.id,
        "company_name": db_company.company_name,
        "email": db_company.email,
        "auth_user_id": db_company.auth_user_id,
        "ceo_name": db_company.ceo_name,
        "phone_numbers": json.loads(db_company.phone_numbers) if db_company.phone_numbers else [],
        "logo_url": db_company.logo_url,
        "created_at": db_company.created_at
    }
@app.get("/api/companies/by-email")
def get_company_by_email(email: str, db: Session = Depends(get_db)):
    company = db.query(models.Company).filter(models.Company.email == email).first()
    if company:
        return {"company_name": company.company_name, "logo_url": company.logo_url}
    return {"company_name": None, "logo_url": None}

@app.post("/api/companies/onboard", response_model=schemas.Company)
def onboard_company(company: schemas.CompanyCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Company).filter(models.Company.auth_user_id == company.auth_user_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Company already exists for this user")
        
    phone_numbers_str = json.dumps(company.phone_numbers) if company.phone_numbers else "[]"
    db_company = models.Company(
        company_name=company.company_name,
        email=company.email,
        auth_user_id=company.auth_user_id,
        ceo_name=company.ceo_name,
        phone_numbers=phone_numbers_str,
        logo_url=company.logo_url
    )
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    
    return {
        "id": db_company.id,
        "company_name": db_company.company_name,
        "email": db_company.email,
        "auth_user_id": db_company.auth_user_id,
        "ceo_name": db_company.ceo_name,
        "phone_numbers": json.loads(db_company.phone_numbers) if db_company.phone_numbers else [],
        "logo_url": db_company.logo_url,
        "created_at": db_company.created_at
    }

@app.put("/api/companies/{company_id}", response_model=schemas.Company)
def update_company(company_id: uuid.UUID, company_update: schemas.CompanyUpdate, db: Session = Depends(get_db)):
    db_company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")
        
    update_data = company_update.dict(exclude_unset=True)
    
    if "phone_numbers" in update_data:
        update_data["phone_numbers"] = json.dumps(update_data["phone_numbers"]) if update_data["phone_numbers"] else "[]"
        
    for key, value in update_data.items():
        setattr(db_company, key, value)
        
    db.commit()
    db.refresh(db_company)
    
    return {
        "id": db_company.id,
        "company_name": db_company.company_name,
        "email": db_company.email,
        "auth_user_id": db_company.auth_user_id,
        "ceo_name": db_company.ceo_name,
        "phone_numbers": json.loads(db_company.phone_numbers) if db_company.phone_numbers else [],
        "logo_url": db_company.logo_url,
        "created_at": db_company.created_at
    }


# ==================== AI ITINERARY GENERATOR ====================

class RawItineraryRequest(BaseModel):
    raw_text: str

from typing import Dict, Any

class JsonItineraryRequest(BaseModel):
    parsed_data: Dict[str, Any]

@app.post("/api/itinerary/generate-pdf-from-json")
async def generate_pdf_from_json(payload: JsonItineraryRequest):
    """Fast Pipeline: Structured JSON → Pexels images → PDF generation."""
    try:
        parsed_data = payload.parsed_data
        
        # 2. Resolve image search keywords in parallel for speed
        async def resolve_day_images(day):
            keywords = day.get("image_keywords", [])
            hotel_kw = day.get("hotel_image_keyword", "luxury Sri Lanka resort infinity pool")

            # Search all attraction keywords in parallel
            tasks = [asyncio.to_thread(search_images, kw) for kw in keywords]
            results = await asyncio.gather(*tasks)
            
            # Flatten: take first URL per keyword for variety
            urls = []
            for res_urls in results:
                if res_urls:
                    urls.append(res_urls[0])

            # Search hotel image (last slot on every page)
            hotel_urls = await asyncio.to_thread(search_images, hotel_kw)
            if hotel_urls:
                urls.append(hotel_urls[0])
            else:
                fallback = await asyncio.to_thread(search_images, "luxury Sri Lanka resort infinity pool")
                if fallback:
                    urls.append(fallback[0])

            day["image_urls"] = urls

        # Run all days concurrently
        day_tasks = [resolve_day_images(day) for day in parsed_data.get("days", [])]
        await asyncio.gather(*day_tasks)
        
        # 3. Generate the PDF
        output_path = await generate_itinerary(parsed_data)
        
        filename_out = os.path.basename(output_path)
        return FileResponse(output_path, media_type="application/pdf", filename=filename_out)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/itinerary/generate-text")
async def generate_text_from_raw(payload: RawItineraryRequest):
    """Pipeline: Raw text → Gemini parse (returns JSON)."""
    try:
        parsed_data = parse_raw_itinerary(payload.raw_text)
        return parsed_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/itinerary/extract-from-pdf")
async def extract_from_pdf(file: UploadFile = File(...)):
    """Upload a PDF → extract text with PyMuPDF → Gemini parse → return structured JSON."""
    try:
        import fitz  # PyMuPDF
        
        # Validate file type
        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are accepted.")
        
        # Read PDF bytes
        pdf_bytes = await file.read()
        if len(pdf_bytes) > 20 * 1024 * 1024:  # 20MB limit
            raise HTTPException(status_code=400, detail="File too large. Maximum 20MB.")
        
        # Extract text from all pages using PyMuPDF
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        raw_text = ""
        for page in doc:
            raw_text += page.get_text() + "\n"
        doc.close()
        
        if not raw_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract any text from this PDF.")
        
        # Send extracted text to Gemini for structured parsing
        parsed_data = parse_raw_itinerary(raw_text)
        return parsed_data
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/itinerary/generate-pdf")
async def generate_pdf_from_raw(payload: RawItineraryRequest):
    """Full Pipeline: Raw text → Gemini parse → Pexels images → PDF generation."""
    try:
        # 1. Parse raw text into structured format using Gemini
        parsed_data = parse_raw_itinerary(payload.raw_text)
        
        # 2. Resolve image search keywords in parallel for speed
        async def resolve_day_images(day):
            keywords = day.get("image_keywords", [])
            hotel_kw = day.get("hotel_image_keyword", "luxury Sri Lanka resort infinity pool")

            # Search all attraction keywords in parallel
            tasks = [asyncio.to_thread(search_images, kw) for kw in keywords]
            results = await asyncio.gather(*tasks)
            
            # Flatten: take first URL per keyword for variety
            urls = []
            for res_urls in results:
                if res_urls:
                    urls.append(res_urls[0])

            # Search hotel image (last slot on every page)
            hotel_urls = await asyncio.to_thread(search_images, hotel_kw)
            if hotel_urls:
                urls.append(hotel_urls[0])
            else:
                fallback = await asyncio.to_thread(search_images, "luxury Sri Lanka resort infinity pool")
                if fallback:
                    urls.append(fallback[0])

            day["image_urls"] = urls

        # Run all days concurrently
        day_tasks = [resolve_day_images(day) for day in parsed_data.get("days", [])]
        await asyncio.gather(*day_tasks)
        
        # 3. Generate the PDF
        output_path = await generate_itinerary(parsed_data)
        
        filename_out = os.path.basename(output_path)
        return FileResponse(output_path, media_type="application/pdf", filename=filename_out)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
