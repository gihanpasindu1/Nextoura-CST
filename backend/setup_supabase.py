import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from sqlalchemy import create_engine, text

engine = create_engine(os.getenv("DATABASE_URL"))

statements = [
    # 1. Create tour_itineraries table
    """
    CREATE TABLE IF NOT EXISTS tour_itineraries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ DEFAULT now(),
      driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
      day_number INTEGER NOT NULL DEFAULT 1,
      location_name TEXT NOT NULL,
      driver_status TEXT NOT NULL DEFAULT 'Pending',
      activity_details TEXT
    )
    """,

    # 2. Create urgent_alerts table
    """
    CREATE TABLE IF NOT EXISTS urgent_alerts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ DEFAULT now(),
      alert_title TEXT NOT NULL,
      alert_message TEXT NOT NULL,
      sender_name TEXT NOT NULL
    )
    """,

    # 3. Enable RLS
    "ALTER TABLE tour_itineraries ENABLE ROW LEVEL SECURITY",
    "ALTER TABLE urgent_alerts ENABLE ROW LEVEL SECURITY",

    # 4. Drop policies if they exist (safe re-run)
    "DROP POLICY IF EXISTS \"Guides can read own tours\" ON tour_itineraries",
    "DROP POLICY IF EXISTS \"Guides can update own tours\" ON tour_itineraries",
    "DROP POLICY IF EXISTS \"Authenticated users can insert alerts\" ON urgent_alerts",
    "DROP POLICY IF EXISTS \"Guides can read own driver record\" ON drivers",

    # 5. RLS Policies
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
    """
    CREATE POLICY "Authenticated users can insert alerts"
    ON urgent_alerts FOR INSERT TO authenticated
    WITH CHECK (true)
    """,
    """
    CREATE POLICY "Guides can read own driver record"
    ON drivers FOR SELECT TO authenticated
    USING (email = auth.jwt() ->> 'email')
    """,
]

with engine.connect() as conn:
    for i, stmt in enumerate(statements):
        try:
            conn.execute(text(stmt))
            conn.commit()
            print(f"[{i+1}/{len(statements)}] OK")
        except Exception as e:
            conn.rollback()
            print(f"[{i+1}/{len(statements)}] ERROR: {e}")

print("\nAll done!")
