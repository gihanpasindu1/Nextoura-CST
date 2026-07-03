import uuid

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'r', encoding='utf-8') as f:
    text = f.read()

driver_endpoints = """
# ==================== DRIVERS ====================
@app.get("/api/drivers", response_model=List[schemas.Driver])
def read_drivers(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Driver).filter(models.Driver.company_id == company_id).offset(skip).limit(limit).all()

@app.post("/api/drivers", response_model=schemas.Driver)
def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):
    db_driver = models.Driver(**driver.dict())
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver

@app.put("/api/drivers/{driver_id}", response_model=schemas.Driver)
def update_driver(driver_id: uuid.UUID, driver: schemas.DriverCreate, db: Session = Depends(get_db)):
    db_driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    db_driver.name = driver.name
    db_driver.phone = driver.phone
    db_driver.company_id = driver.company_id
    db.commit()
    db.refresh(db_driver)
    return db_driver

@app.delete("/api/drivers/{driver_id}")
def delete_driver(driver_id: uuid.UUID, db: Session = Depends(get_db)):
    db_driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    db.delete(db_driver)
    db.commit()
    return {"message": "Driver deleted successfully"}
"""

if '# ==================== AGENTS ====================' in text:
    text = text.replace('# ==================== AGENTS ====================', driver_endpoints + '\n# ==================== AGENTS ====================')
    with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Driver endpoints added.')
else:
    print('Anchor not found.')
