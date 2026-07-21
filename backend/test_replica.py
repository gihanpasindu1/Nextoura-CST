import psycopg2

url = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
conn = psycopg2.connect(url)
cur = conn.cursor()

# Check replica identity for tables
cur.execute("""
    SELECT c.relname, c.relreplident 
    FROM pg_class c
    WHERE c.relname IN ('tour_itineraries', 'itinerary_destinations', 'foreign_tourists')
""")
print("=== Replica Identity ===")
for row in cur.fetchall():
    ident_map = {'d': 'DEFAULT (primary key)', 'n': 'NOTHING', 'f': 'FULL', 'i': 'INDEX'}
    print(f"{row[0]}: {ident_map.get(row[1], row[1])}")

# Check if the publication includes these tables
cur.execute("""
    SELECT pubname, schemaname, tablename 
    FROM pg_publication_tables 
    WHERE tablename IN ('tour_itineraries', 'itinerary_destinations', 'foreign_tourists')
""")
print("\n=== Publication tables ===")
for row in cur.fetchall():
    print(f"Publication: {row[0]}, Table: {row[1]}.{row[2]}")
