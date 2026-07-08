import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from sqlalchemy import create_engine, text

engine = create_engine(os.getenv('DATABASE_URL'))
with engine.connect() as conn:
    result = conn.execute(text("""
        SELECT ti.day_number, id.location_name, id.driver_status
        FROM tour_itineraries ti
        JOIN foreign_tourists ft ON ti.tourist_id = ft.id
        JOIN itinerary_destinations id ON id.itinerary_id = ti.id
        WHERE ft.name = 'hirunaka'
        ORDER BY ti.day_number
    """))
    
    for row in result:
        print(dict(row._mapping))
