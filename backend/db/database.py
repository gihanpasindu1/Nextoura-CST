import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

load_dotenv(override=True)

# We use the DATABASE_URL from .env
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Supabase Postgres connection requires some specific args for SQLAlchemy in some environments,
# but default usually works fine for standard psycopg2. 
engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True, pool_recycle=300)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
