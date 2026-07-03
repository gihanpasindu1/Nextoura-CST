import re

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'r', encoding='utf-8') as f:
    text = f.read()

# Tourists
text = re.sub(r'def read_tourists\(skip: int = 0, limit: int = 100, db: Session = Depends\(get_db\)\):.*?return tourists', 
              r'''def read_tourists(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tourists = db.query(models.ForeignTourist).filter(models.ForeignTourist.company_id == company_id).offset(skip).limit(limit).all()
    return tourists''', text, flags=re.DOTALL)

text = text.replace('driver_id=tourist.driver_id', 'driver_id=tourist.driver_id,\n        company_id=tourist.company_id')

# Agents
text = re.sub(r'def read_agents\(skip: int = 0, limit: int = 100, db: Session = Depends\(get_db\)\):.*?return.*?all\(\)',
              r'''def read_agents(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.ForeignTourAgent).filter(models.ForeignTourAgent.company_id == company_id).offset(skip).limit(limit).all()''', text, flags=re.DOTALL)

# Drivers
text = re.sub(r'def read_drivers\(skip: int = 0, limit: int = 100, db: Session = Depends\(get_db\)\):.*?return drivers',
              r'''def read_drivers(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    drivers = db.query(models.Driver).filter(models.Driver.company_id == company_id).offset(skip).limit(limit).all()
    return drivers''', text, flags=re.DOTALL)

# Notifications
text = re.sub(r'def read_notifications\(skip: int = 0, limit: int = 100, db: Session = Depends\(get_db\)\):.*?return.*?all\(\)',
              r'''def read_notifications(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.UrgentAlert).filter(models.UrgentAlert.company_id == company_id).order_by(models.UrgentAlert.created_at.desc()).offset(skip).limit(limit).all()''', text, flags=re.DOTALL)

# Hotels
text = re.sub(r'def read_hotels\(skip: int = 0, limit: int = 100, db: Session = Depends\(get_db\)\):.*?return hotels',
              r'''def read_hotels(company_id: uuid.UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    hotels = db.query(models.Hotel).filter(models.Hotel.company_id == company_id).offset(skip).limit(limit).all()
    return hotels''', text, flags=re.DOTALL)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'w', encoding='utf-8') as f:
    f.write(text)

print('Patched main.py endpoints')
