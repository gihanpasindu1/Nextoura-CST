import os

path = 'c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py'
with open(path, 'a') as f:
    f.write('''
# ----------------- Hotels -----------------

@app.get("/api/hotels", response_model=List[schemas.Hotel])
def read_hotels(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Hotel).offset(skip).limit(limit).all()

@app.post("/api/hotels", response_model=schemas.Hotel)
def create_hotel(hotel: schemas.HotelCreate, db: Session = Depends(get_db)):
    db_hotel = models.Hotel(**hotel.dict())
    db.add(db_hotel)
    db.commit()
    db.refresh(db_hotel)
    return db_hotel
''')
