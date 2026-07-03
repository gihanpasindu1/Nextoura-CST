import os
from sqlalchemy import create_engine, text

DATABASE_URL = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
engine = create_engine(DATABASE_URL)

tables = [
    'companies',
    'foreign_tour_agents',
    'drivers',
    'hotels',
    'foreign_tourists',
    'tourist_group_members',
    'tour_itineraries',
    'itinerary_destinations',
    'urgent_alerts',
    'notifications'
]

with engine.begin() as conn:
    conn.execute(text(f"TRUNCATE TABLE {', '.join(tables)} CASCADE;"))

print('All tables have been successfully truncated.')
