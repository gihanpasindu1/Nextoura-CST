import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from sqlalchemy import create_engine, text

engine = create_engine(os.getenv("DATABASE_URL"))

# The correct RLS policies using the actual table structure:
# - foreign_tourists has driver_id (link to drivers table)
# - tour_itineraries has tourist_id (link to foreign_tourists)
# So the guide sees tourists assigned to them + those tourists' itineraries

policies = [
    # Enable RLS on foreign_tourists if not already
    "ALTER TABLE foreign_tourists ENABLE ROW LEVEL SECURITY",

    # Drop old wrong policies
    'DROP POLICY IF EXISTS "Guides can read own tours" ON tour_itineraries',
    'DROP POLICY IF EXISTS "Guides can update own tours" ON tour_itineraries',
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

print("\nPrep done. Now paste these in Supabase SQL Editor:")
print("""
-- Allow guides to see tourists assigned to them
CREATE POLICY "Guides can read assigned tourists"
ON foreign_tourists FOR SELECT TO authenticated
USING (driver_id = (SELECT id FROM drivers WHERE email = (auth.jwt() ->> 'email') LIMIT 1));

-- Allow guides to read itineraries for their assigned tourists
CREATE POLICY "Guides can read own itineraries"  
ON tour_itineraries FOR SELECT TO authenticated
USING (tourist_id IN (
  SELECT id FROM foreign_tourists 
  WHERE driver_id = (SELECT id FROM drivers WHERE email = (auth.jwt() ->> 'email') LIMIT 1)
));

-- Allow guides to update itinerary status
CREATE POLICY "Guides can update itinerary status"
ON tour_itineraries FOR UPDATE TO authenticated
USING (tourist_id IN (
  SELECT id FROM foreign_tourists 
  WHERE driver_id = (SELECT id FROM drivers WHERE email = (auth.jwt() ->> 'email') LIMIT 1)
));
""")
