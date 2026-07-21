import psycopg2

url = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
conn = psycopg2.connect(url)
cur = conn.cursor()

cur.execute("SELECT name, driver_id, created_at FROM foreign_tourists ORDER BY created_at DESC LIMIT 5;")
print(cur.fetchall())
