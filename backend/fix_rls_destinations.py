import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from sqlalchemy import create_engine, text

engine = create_engine(os.getenv("DATABASE_URL"))

policies = [
    'DROP POLICY IF EXISTS "Guides can update own destinations" ON itinerary_destinations',
    """
    CREATE POLICY "Guides can update own destinations"
    ON itinerary_destinations FOR UPDATE TO authenticated
    USING (itinerary_id IN (
      SELECT id FROM tour_itineraries
      WHERE tourist_id IN (
        SELECT id FROM foreign_tourists
        WHERE driver_id = (SELECT id FROM drivers WHERE email = (auth.jwt() ->> 'email') LIMIT 1)
      )
    ));
    """
]

with engine.connect() as conn:
    for i, stmt in enumerate(policies):
        try:
            conn.execute(text(stmt))
            conn.commit()
            print(f"[{i+1}] OK: {stmt[:60]}")
        except Exception as e:
            conn.rollback()
            print(f"[{i+1}] ERROR: {e}")

print("RLS update policy for itinerary_destinations added.")
