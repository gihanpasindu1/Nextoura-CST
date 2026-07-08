import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from sqlalchemy import create_engine, text

engine = create_engine(os.getenv('DATABASE_URL'))
with engine.connect() as conn:
    result = conn.execute(text("""
        SELECT ti.day_number, ti.stop_order, ti.location_name, ti.is_hotel_stay, ti.driver_status, h.hotel_name
        FROM tour_itineraries ti
        JOIN foreign_tourists ft ON ti.tourist_id = ft.id
        LEFT JOIN hotels h ON ti.hotel_id = h.id
        WHERE ft.name = 'hirunaka'
        ORDER BY ti.day_number, ti.stop_order
    """))
    
    for row in result:
        print(dict(row._mapping))
