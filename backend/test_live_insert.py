import os
from dotenv import load_dotenv
load_dotenv()

from db.database import SessionLocal
from db import models, schemas

db = SessionLocal()
try:
    import uuid as uuid_mod
    data = {
        "name": "LiveTest Driver",
        "phone": "0771234567",
        "email": "livetest@example.com",
        "password": "TestPass123",
        "company_id": None
    }
    driver_schema = schemas.DriverCreate(**data)
    db_driver = models.Driver(**driver_schema.dict())
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    print("SUCCESS - inserted:", db_driver.id, db_driver.name, db_driver.email, db_driver.password)
except Exception as e:
    import traceback
    traceback.print_exc()
    db.rollback()
finally:
    db.close()
