import psycopg2

url = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
conn = psycopg2.connect(url)
cur = conn.cursor()
cur.execute("SELECT polname FROM pg_policy WHERE polrelid = 'tour_itineraries'::regclass;")
print([r[0] for r in cur.fetchall()])
