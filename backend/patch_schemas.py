import re
with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/db/schemas.py', 'r', encoding='utf-8') as f:
    text = f.read()

replacement = """# ----------------- Tourists -----------------
class TouristBase(BaseModel):
    name: str
    passport_number: str
    email: str
    pax_count: int
    country: str
    country_code: str
    arrival_date: date
    departure_date: Optional[date] = None
    duration: str
    status: Optional[str] = "Active"
    is_lead: Optional[bool] = False
    agent_id: Optional[uuid.UUID] = None
    driver_id: Optional[uuid.UUID] = None
    company_id: Optional[uuid.UUID] = None

class TouristCreate(TouristBase):"""

text = re.sub(r'class TouristCreate\(TouristBase\):', replacement, text)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/db/schemas.py', 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed schemas.py')
