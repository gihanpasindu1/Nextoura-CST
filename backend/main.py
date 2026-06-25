from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from db import models, schemas
from db.database import engine, get_db

# We don't need to create tables if they already exist in Supabase, 
# but this is safe as it skips existing ones.
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Tour Management System API")

from fastapi.middleware.cors import CORSMiddleware

# Enable CORS so our React frontend can talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Tour Management System Backend API!"}

@app.get("/api/tourists", response_model=List[schemas.Tourist])
def read_tourists(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tourists = db.query(models.ForeignTourist).offset(skip).limit(limit).all()
    return tourists

@app.post("/api/tourists", response_model=schemas.Tourist)
def create_tourist(tourist: schemas.TouristCreate, db: Session = Depends(get_db)):
    # Create the main tourist
    db_tourist = models.ForeignTourist(
        name=tourist.name,
        passport_number=tourist.passport_number,
        email=tourist.email,
        pax_count=tourist.pax_count,
        country=tourist.country,
        country_code=tourist.country_code,
        arrival_date=tourist.arrival_date,
        duration=tourist.duration,
        agent_id=tourist.agent_id,
        driver_id=tourist.driver_id
    )
    db.add(db_tourist)
    db.commit()
    db.refresh(db_tourist)
    
    # Add group members
    for member in tourist.group_members:
        db_member = models.TouristGroupMember(**member.dict(), main_tourist_id=db_tourist.id)
        db.add(db_member)
        
    # Add itinerary
    for day in tourist.itineraries:
        db_itinerary = models.TourItinerary(**day.dict(), tourist_id=db_tourist.id)
        db.add(db_itinerary)
        
    db.commit()
    db.refresh(db_tourist)
    return db_tourist
