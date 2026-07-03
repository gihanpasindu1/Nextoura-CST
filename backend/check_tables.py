import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from sqlalchemy import create_engine, text

engine = create_engine(os.getenv("DATABASE_URL"))

tables = ['foreign_tourists', 'itinerary_destinations', 'tour_itineraries']

with engine.connect() as conn:
    for table in tables:
        result = conn.execute(text(f"""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = '{table}'
            ORDER BY ordinal_position;
        """))
        rows = result.fetchall()
        print(f"\n{table}:")
        for r in rows:
            print(f"  {r[0]} ({r[1]})")
