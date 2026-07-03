import os
from sqlalchemy import create_engine, text

DATABASE_URL = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
engine = create_engine(DATABASE_URL)

with engine.begin() as conn:
    conn.execute(text("ALTER TABLE companies ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE;"))
    conn.execute(text("ALTER TABLE companies ADD COLUMN IF NOT EXISTS email VARCHAR;"))
    conn.execute(text("ALTER TABLE companies ADD COLUMN IF NOT EXISTS ceo_name VARCHAR;"))
    conn.execute(text("ALTER TABLE companies ADD COLUMN IF NOT EXISTS phone_numbers VARCHAR;"))

print('Migration successful!')
