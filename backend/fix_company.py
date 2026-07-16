from db.database import SessionLocal
from db.models import Company

db = SessionLocal()
companies = db.query(Company).all()
for company in companies:
    print(f"Old name: {company.company_name}, Old email: {company.email}")
    if "test" in company.company_name.lower() or "test" in company.email.lower():
        company.company_name = "Ceylon Signature Travels"
        company.email = "hello@ceylonsignature.com"
        
db.commit()
print("Updated all test companies to look realistic!")
