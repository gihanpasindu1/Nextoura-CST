import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
url = os.getenv("DATABASE_URL")

engine = create_engine(url)

try:
    with engine.connect() as conn:
        conn.execute(text("ALTER TABLE drivers ADD COLUMN password VARCHAR;"))
        conn.commit()
    print("Column 'password' added successfully.")
except Exception as e:
    print(f"Failed to add column (it might already exist): {e}")
