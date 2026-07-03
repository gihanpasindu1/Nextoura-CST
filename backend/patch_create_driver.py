with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'r', encoding='utf-8') as f:
    text = f.read()

import_statement = "from db.supabase_client import supabase_admin\n"

if 'from db import models, schemas\n' in text:
    text = text.replace(
        'from db import models, schemas\n',
        'from db import models, schemas\n' + import_statement
    )

create_driver_logic = """
    if supabase_admin and driver.email:
        try:
            # Check if user already exists
            existing_users = supabase_admin.auth.admin.list_users()
            # Note: list_users is paginated in real apps, but for this small app it works or we just try-except
            # Or better, just try creating and catch the error if it exists.
            
            supabase_admin.auth.admin.create_user({
                "email": driver.email,
                "email_confirm": True,
                "app_metadata": {"role": "guide"},
                "user_metadata": {"name": driver.name}
            })
        except Exception as e:
            print("Auth user creation failed (might already exist):", e)
            
    db_driver = models.Driver(**driver.dict())
"""

if 'def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):\n    db_driver = models.Driver(**driver.dict())' in text:
    text = text.replace(
        'def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):\n    db_driver = models.Driver(**driver.dict())',
        'def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):\n' + create_driver_logic
    )

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'w', encoding='utf-8') as f:
    f.write(text)

print("Added Supabase auth user creation logic.")
