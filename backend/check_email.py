from db.database import SessionLocal
from db.models import TourItinerary, Hotel

db = SessionLocal()
itinerary_id = "71667408-c2f2-490e-9893-03fa2667dd4a"
itinerary = db.query(TourItinerary).filter(TourItinerary.id == itinerary_id).first()

if itinerary and itinerary.hotel_id:
    hotel = db.query(Hotel).filter(Hotel.id == itinerary.hotel_id).first()
    if hotel:
        print(f"Hotel Name: {hotel.hotel_name}")
        print(f"Hotel Email: {hotel.hotel_email}")
