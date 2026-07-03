import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from sqlalchemy import create_engine, text

engine = create_engine(os.getenv("DATABASE_URL"))

with engine.connect() as conn:
    # Check if table exists and what columns it has
    result = conn.execute(text("""
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'tour_itineraries'
        ORDER BY ordinal_position;
    """))
    rows = result.fetchall()
    if rows:
        print("tour_itineraries columns:")
        for r in rows:
            print(f"  {r[0]} ({r[1]})")
    else:
        print("Table 'tour_itineraries' does NOT exist!")
