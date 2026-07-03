with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'r', encoding='utf-8') as f:
    text = f.read()

new_endpoints = """
@app.get("/api/drivers/verify")
def verify_driver(email: str, db: Session = Depends(get_db)):
    db_driver = db.query(models.Driver).filter(models.Driver.email == email).first()
    if db_driver:
        return {
            "is_authorized": True,
            "driver_id": str(db_driver.id),
            "company_id": str(db_driver.company_id),
            "name": db_driver.name
        }
    return {"is_authorized": False}

@app.get("/api/drivers/{driver_id}/tours", response_model=List[schemas.Tourist])
def get_driver_tours(driver_id: uuid.UUID, db: Session = Depends(get_db)):
    tours = db.query(models.ForeignTourist).filter(models.ForeignTourist.driver_id == driver_id).all()
    return tours
"""

if 'def delete_driver(driver_id: uuid.UUID, db: Session = Depends(get_db)):\n    db_driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()\n    if not db_driver:\n        raise HTTPException(status_code=404, detail="Driver not found")\n    db.delete(db_driver)\n    db.commit()\n    return {"message": "Driver deleted successfully"}' in text:
    text = text.replace(
        'def delete_driver(driver_id: uuid.UUID, db: Session = Depends(get_db)):\n    db_driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()\n    if not db_driver:\n        raise HTTPException(status_code=404, detail="Driver not found")\n    db.delete(db_driver)\n    db.commit()\n    return {"message": "Driver deleted successfully"}',
        'def delete_driver(driver_id: uuid.UUID, db: Session = Depends(get_db)):\n    db_driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()\n    if not db_driver:\n        raise HTTPException(status_code=404, detail="Driver not found")\n    db.delete(db_driver)\n    db.commit()\n    return {"message": "Driver deleted successfully"}\n' + new_endpoints
    )
    with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Mobile integration endpoints added.")
else:
    print("Anchor not found!")
