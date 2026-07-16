from db.database import SessionLocal
from db.models import Driver, Company
from db.schemas import DriverCreate
from utils.email import send_driver_credentials_email

db = SessionLocal()
driver_model = db.query(Driver).order_by(Driver.created_at.desc()).first()

if driver_model:
    print(f"Testing for Driver: {driver_model.name} - {driver_model.email}")
    company = db.query(Company).filter(Company.id == driver_model.company_id).first()
    
    # recreate DriverCreate schema since password isn't in DB
    driver_schema = DriverCreate(
        name=driver_model.name,
        phone=driver_model.phone,
        email=driver_model.email,
        password="test_password_for_debug",
        company_id=driver_model.company_id
    )
    
    try:
        result = send_driver_credentials_email(driver_schema, company)
        print("Success:", result)
    except Exception as e:
        print("Error:", e)
else:
    print("No drivers found")
