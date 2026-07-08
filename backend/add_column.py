import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from sqlalchemy import create_engine, text

engine = create_engine(os.getenv('DATABASE_URL'))
with engine.connect() as conn:
    try:
        conn.execute(text("ALTER TABLE tour_itineraries ADD COLUMN hotel_driver_status VARCHAR DEFAULT 'Pending'"))
        print("Column added.")
    except Exception as e:
        print(e)
    conn.execute(text("NOTIFY pgrst, 'reload schema'"))
    conn.commit()
    print("Schema reloaded.")
