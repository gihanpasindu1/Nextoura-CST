from db.database import SessionLocal
from db import models

db = SessionLocal()
try:
    drivers = db.query(models.Driver).all()
    print(f"Total drivers in DB: {len(drivers)}")
    for d in drivers:
        print(f"  ID: {d.id} | Name: {d.name} | Phone: {d.phone} | Email: {d.email} | Password: {d.password} | company_id: {d.company_id}")
except Exception as e:
    import traceback
    traceback.print_exc()
finally:
    db.close()
