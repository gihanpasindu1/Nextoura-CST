import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from sqlalchemy import create_engine, text

engine = create_engine(os.getenv("DATABASE_URL"))

# These policies need to run after the table is fully committed
policies = [
    """
    DROP POLICY IF EXISTS "Guides can read own tours" ON tour_itineraries
    """,
    """
    DROP POLICY IF EXISTS "Guides can update own tours" ON tour_itineraries
    """,
    """
    CREATE POLICY "Guides can read own tours"
    ON tour_itineraries FOR SELECT TO authenticated
    USING (driver_id = (SELECT id FROM drivers WHERE email = auth.jwt() ->> 'email' LIMIT 1))
    """,
    """
    CREATE POLICY "Guides can update own tours"
    ON tour_itineraries FOR UPDATE TO authenticated
    USING (driver_id = (SELECT id FROM drivers WHERE email = auth.jwt() ->> 'email' LIMIT 1))
    """,
]

with engine.connect() as conn:
    for i, stmt in enumerate(policies):
        try:
            conn.execute(text(stmt.strip()))
            conn.commit()
            print(f"[{i+1}/{len(policies)}] OK: {stmt.strip()[:60]}")
        except Exception as e:
            conn.rollback()
            print(f"[{i+1}/{len(policies)}] ERROR: {e}")

print("\nRLS policies done!")
