import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend.db import models

load_dotenv()
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

print("--- COMPANIES ---")
for c in db.query(models.Company).all():
    print(f"Company ID: {c.id} | Name: {c.company_name} | Email: {c.email}")

print("\n--- DRIVERS ---")
for d in db.query(models.Driver).all():
    print(f"ID: {d.id} | Name: {d.name} | Company ID: {d.company_id}")

print("\n--- TOURISTS ---")
for t in db.query(models.ForeignTourist).all():
    print(f"ID: {t.id} | Name: {t.name} | Driver ID: {t.driver_id} | Company ID: {t.company_id} | Status: {t.status} | is_lead: {t.is_lead}")
