import os
from sqlalchemy import create_engine, text

DATABASE_URL = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
engine = create_engine(DATABASE_URL)

with engine.begin() as conn:
    conn.execute(text("ALTER TABLE foreign_tourists ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id);"))
    conn.execute(text("ALTER TABLE hotels ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id);"))
    conn.execute(text("ALTER TABLE notifications ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id);"))

print('Migration successful!')
