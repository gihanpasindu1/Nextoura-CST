import psycopg2

url = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
conn = psycopg2.connect(url)
cur = conn.cursor()

cur.execute("SELECT id, name FROM foreign_tourists WHERE name='Bimsara';")
res = cur.fetchone()
if res:
    print(res)
    cur.execute("SELECT id, driver_status, location_name FROM tour_itineraries WHERE tourist_id=%s;", (res[0],))
    print("Itineraries:", cur.fetchall())
