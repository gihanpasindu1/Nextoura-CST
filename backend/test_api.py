from db import models, schemas
from db.database import SessionLocal

db = SessionLocal()
try:
    data = schemas.DriverCreate(name="Test2", phone="1234", email="test2@example.com", password="pass")
    db_driver = models.Driver(**data.dict())
    db.add(db_driver)
    db.commit()
    print("Success")
except Exception as e:
    import traceback
    traceback.print_exc()
finally:
    db.close()
