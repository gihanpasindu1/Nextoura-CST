import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from sqlalchemy import create_engine, text

engine = create_engine(os.getenv("DATABASE_URL"))

with engine.connect() as conn:
    res = conn.execute(text("""
        SELECT relname, relrowsecurity 
        FROM pg_class 
        WHERE relname IN ('tour_itineraries', 'itinerary_destinations')
    """)).fetchall()
    
    print("Table RLS Status:")
    for row in res:
        print(f"Table: {row[0]}, RLS Enabled: {row[1]}")
    
    # Check policies on itinerary_destinations
    policies = conn.execute(text("""
        SELECT polname, polcmd 
        FROM pg_policy 
        WHERE polrelid = 'itinerary_destinations'::regclass
    """)).fetchall()
    
    print("\nPolicies on itinerary_destinations:")
    if not policies:
        print("No policies found.")
    for pol in policies:
        print(f"Policy: {pol[0]}, Command: {pol[1]}")
