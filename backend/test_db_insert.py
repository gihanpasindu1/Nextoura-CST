from db.database import SessionLocal
from db import models
from db import schemas
import uuid

db = SessionLocal()
try:
    d = models.Driver(name="Test", phone="12", email="12", password="12", company_id=None)
    db.add(d)
    db.commit()
    print("Success")
except Exception as e:
    print("Error:", e)
finally:
    db.close()
