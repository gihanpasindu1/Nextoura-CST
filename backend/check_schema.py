import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from sqlalchemy import create_engine, text

engine = create_engine(os.getenv("DATABASE_URL"))

with engine.connect() as conn:
    # Check tourists table columns
    result = conn.execute(text("""
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'tourists'
        ORDER BY ordinal_position;
    """))
    rows = result.fetchall()
    print("tourists columns:")
    for r in rows:
        print(f"  {r[0]} ({r[1]})")

    print()

    # Check all tables in the public schema
    result2 = conn.execute(text("""
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' ORDER BY table_name;
    """))
    print("All tables:")
    for r in result2.fetchall():
        print(f"  {r[0]}")
