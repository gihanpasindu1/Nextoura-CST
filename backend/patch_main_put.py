import re

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'r', encoding='utf-8') as f:
    text = f.read()

new_endpoint = """
@app.put("/api/tourists/{tourist_id}", response_model=schemas.Tourist)
def update_tourist(tourist_id: uuid.UUID, tourist: schemas.TouristCreate, db: Session = Depends(get_db)):
    db_tourist = db.query(models.ForeignTourist).filter(models.ForeignTourist.id == tourist_id).first()
    if not db_tourist:
        raise HTTPException(status_code=404, detail="Tourist not found")

    db_tourist.name = tourist.name
    db_tourist.passport_number = tourist.passport_number
    db_tourist.email = tourist.email
    db_tourist.pax_count = tourist.pax_count
    db_tourist.country = tourist.country
    db_tourist.country_code = tourist.country_code
    db_tourist.arrival_date = tourist.arrival_date
    db_tourist.departure_date = tourist.departure_date
    db_tourist.duration = tourist.duration
    db_tourist.status = tourist.status
    db_tourist.is_lead = tourist.is_lead
    db_tourist.agent_id = tourist.agent_id
    db_tourist.driver_id = tourist.driver_id
    db_tourist.company_id = tourist.company_id

    db.commit()
    db.refresh(db_tourist)
    return db_tourist

@app.delete("/api/tourists/{tourist_id}")
"""

text = re.sub(r'@app\.delete\("/api/tourists/\{tourist_id\}"\)', new_endpoint.strip(), text)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'w', encoding='utf-8') as f:
    f.write(text)

print('Added PUT /api/tourists/{tourist_id}')
