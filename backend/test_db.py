import psycopg2

url = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
conn = psycopg2.connect(url)
cur = conn.cursor()

cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name='tour_itineraries';")
print([r[0] for r in cur.fetchall()])
