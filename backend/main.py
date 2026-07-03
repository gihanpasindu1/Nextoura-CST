from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from db import models, schemas
from db.supabase_client import supabase_admin
from db.database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

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
    tourists = db.query(models.ForeignTourist).filter(models.ForeignTourist.company_id == company_id).offset(skip).limit(limit).all()
    return tourists

@app.post("/api/tourists", response_model=schemas.Tourist)
def create_tourist(tourist: schemas.TouristCreate, db: Session = Depends(get_db)):
    db_tourist = models.ForeignTourist(
        name=tourist.name,
        passport_number=tourist.passport_number,
        email=tourist.email,
        pax_count=tourist.pax_count,
        country=tourist.country,
        country_code=tourist.country_code,
        arrival_date=tourist.arrival_date,
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
            day_data = day.dict(exclude={"destinations"})
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
    db.refresh(db_tourist)
    return db_tourist

@app.put("/api/tourists/{tourist_id}", response_model=schemas.Tourist)
def update_tourist(tourist_id: uuid.UUID, tourist: schemas.TouristCreate, db: Session = Depends(get_db)):
    db_tourist = db.query(models.ForeignTourist).filter(models.ForeignTourist.id == tourist_id).first()
    if not db_tourist:
        raise HTTPException(status_code=404, detail="Tourist not found")

    db_tourist.name = tourist.name
    db_tourist.passport_number = tourist.passport_number
    db_tourist.email = tourist.email
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

    db.commit()
    db.refresh(db_tourist)
    return db_tourist

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
def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):

    if supabase_admin and driver.email:
        try:
            # Check if user already exists
            existing_users = supabase_admin.auth.admin.list_users()
            # Note: list_users is paginated in real apps, but for this small app it works or we just try-except
            # Or better, just try creating and catch the error if it exists.
            

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
            print("Auth user creation failed (might already exist):", e)
            
    db_driver = models.Driver(**driver.dict())

    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
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
    tours = db.query(models.ForeignTourist).filter(models.ForeignTourist.driver_id == driver_id).all()
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

@app.delete("/api/agents/{agent_id}")
def delete_agent(agent_id: uuid.UUID, db: Session = Depends(get_db)):
    db_agent = db.query(models.ForeignTourAgent).filter(models.ForeignTourAgent.id == agent_id).first()
    if not db_agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    db.delete(db_agent)
    db.commit()
    return {"message": "Agent deleted successfully"}


# ==================== DRIVERS ====================
@app.get("/api/drivers", response_model=List[schemas.Driver])
def read_drivers(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    drivers = db.query(models.Driver).filter(models.Driver.company_id == company_id).offset(skip).limit(limit).all()
    return drivers

@app.post("/api/drivers", response_model=schemas.Driver)
def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):

    if supabase_admin and driver.email:
        try:
            # Check if user already exists
            existing_users = supabase_admin.auth.admin.list_users()
            # Note: list_users is paginated in real apps, but for this small app it works or we just try-except
            # Or better, just try creating and catch the error if it exists.
            

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
            print("Auth user creation failed (might already exist):", e)
            
    db_driver = models.Driver(**driver.dict(exclude={"password"}))

    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver

@app.delete("/api/drivers/{driver_id}")
def delete_driver(driver_id: uuid.UUID, db: Session = Depends(get_db)):
    db_driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Driver not found")
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
    tours = db.query(models.ForeignTourist).filter(models.ForeignTourist.driver_id == driver_id).all()
    return tours



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
def read_hotels(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Hotel).offset(skip).limit(limit).all()

@app.post("/api/hotels", response_model=schemas.Hotel)
def create_hotel(hotel: schemas.HotelCreate, db: Session = Depends(get_db)):
    db_hotel = models.Hotel(**hotel.dict())
    db.add(db_hotel)
    db.commit()
    db.refresh(db_hotel)
    return db_hotel

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
        "created_at": db_company.created_at
    }

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
        phone_numbers=phone_numbers_str
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
        "created_at": db_company.created_at
    }
