from db.database import SessionLocal
from db.models import TourItinerary

db = SessionLocal()
itinerary = db.query(TourItinerary).filter(TourItinerary.hotel_id != None).first()
if itinerary:
    print(f"VALID_ID: {itinerary.id}")
else:
    print("No itineraries with hotels found. You need to create a Tour with a hotel first.")
