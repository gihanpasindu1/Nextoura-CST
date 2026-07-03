import os

path = 'c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py'
with open(path, 'a') as f:
    f.write('''
# ----------------- Onboarding -----------------
import json

@app.get("/api/companies/me", response_model=schemas.Company)
def get_my_company(user_id: uuid.UUID, db: Session = Depends(get_db)):
    db_company = db.query(models.Company).filter(models.Company.auth_user_id == user_id).first()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")
    return {
        "id": db_company.id,
        "company_name": db_company.company_name,
        "email": db_company.email,
        "auth_user_id": db_company.auth_user_id,
        "ceo_name": db_company.ceo_name,
        "phone_numbers": json.loads(db_company.phone_numbers) if db_company.phone_numbers else [],
        "created_at": db_company.created_at
    }

@app.post("/api/companies/onboard", response_model=schemas.Company)
def onboard_company(company: schemas.CompanyCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Company).filter(models.Company.auth_user_id == company.auth_user_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Company already exists for this user")
        
    phone_numbers_str = json.dumps(company.phone_numbers) if company.phone_numbers else "[]"
    db_company = models.Company(
        company_name=company.company_name,
        email=company.email,
        auth_user_id=company.auth_user_id,
        ceo_name=company.ceo_name,
        phone_numbers=phone_numbers_str
    )
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    
    return {
        "id": db_company.id,
        "company_name": db_company.company_name,
        "email": db_company.email,
        "auth_user_id": db_company.auth_user_id,
        "ceo_name": db_company.ceo_name,
        "phone_numbers": json.loads(db_company.phone_numbers) if db_company.phone_numbers else [],
        "created_at": db_company.created_at
    }
''')
