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

print("--- DRIVERS ---")
for d in db.query(models.Driver).all():
    print(f"ID: {d.id} | Name: {d.name} | Phone: {d.phone}")

print("\n--- TOURISTS ---")
for t in db.query(models.ForeignTourist).all():
    print(f"ID: {t.id} | Name: {t.name} | Driver ID: {t.driver_id} | Status: {t.status} | is_lead: {t.is_lead}")
