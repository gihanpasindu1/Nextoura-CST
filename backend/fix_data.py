import os
from sqlalchemy import create_engine, text

DATABASE_URL = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
engine = create_engine(DATABASE_URL)

with engine.begin() as conn:
    # Get the first company
    result = conn.execute(text("SELECT id FROM companies LIMIT 1;")).fetchone()
    if result:
        company_id = result[0]
        conn.execute(text("ALTER TABLE urgent_alerts ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id);"))
        conn.execute(text(f"UPDATE foreign_tour_agents SET company_id = '{company_id}' WHERE company_id IS NULL;"))
        conn.execute(text(f"UPDATE foreign_tourists SET company_id = '{company_id}' WHERE company_id IS NULL;"))
        conn.execute(text(f"UPDATE drivers SET company_id = '{company_id}' WHERE company_id IS NULL;"))
        conn.execute(text(f"UPDATE hotels SET company_id = '{company_id}' WHERE company_id IS NULL;"))
        conn.execute(text(f"UPDATE notifications SET company_id = '{company_id}' WHERE company_id IS NULL;"))
        conn.execute(text(f"UPDATE urgent_alerts SET company_id = '{company_id}' WHERE company_id IS NULL;"))
        print(f'Assigned existing orphaned records to company: {company_id}')
    else:
        print('No companies found to assign orphaned records to.')
