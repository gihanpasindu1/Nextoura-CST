from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from db import models, schemas
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
def read_tourists(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tourists = db.query(models.ForeignTourist).offset(skip).limit(limit).all()
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
        driver_id=tourist.driver_id
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

@app.delete("/api/tourists/{tourist_id}")
def delete_tourist(tourist_id: uuid.UUID, db: Session = Depends(get_db)):
    db_tourist = db.query(models.ForeignTourist).filter(models.ForeignTourist.id == tourist_id).first()
    if not db_tourist:
        raise HTTPException(status_code=404, detail="Tourist not found")
    
    db.delete(db_tourist)
    db.commit()
    return {"message": "Tourist deleted successfully"}


# ==================== AGENTS ====================
@app.get("/api/agents", response_model=List[schemas.Agent])
def read_agents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.ForeignTourAgent).offset(skip).limit(limit).all()

@app.post("/api/agents", response_model=schemas.Agent)
def create_agent(agent: schemas.AgentCreate, db: Session = Depends(get_db)):
    db_agent = models.ForeignTourAgent(**agent.dict())
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
def read_drivers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Driver).offset(skip).limit(limit).all()

@app.post("/api/drivers", response_model=schemas.Driver)
def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):
    db_driver = models.Driver(**driver.dict())
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


# ==================== NOTIFICATIONS ====================
@app.get("/api/notifications", response_model=List[schemas.Notification])
def read_notifications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.UrgentAlert).order_by(models.UrgentAlert.created_at.desc()).offset(skip).limit(limit).all()

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
