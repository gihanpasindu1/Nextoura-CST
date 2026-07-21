import psycopg2

url = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
conn = psycopg2.connect(url)
conn.autocommit = True
cur = conn.cursor()

try:
    # Add itinerary_destinations to supabase_realtime publication
    cur.execute("ALTER PUBLICATION supabase_realtime ADD TABLE itinerary_destinations;")
    print("Added itinerary_destinations to supabase_realtime publication.")
except Exception as e:
    print(f"Error: {e}")

# Verify
cur.execute("""
    SELECT pubname, schemaname, tablename 
    FROM pg_publication_tables 
    WHERE tablename IN ('tour_itineraries', 'itinerary_destinations', 'foreign_tourists')
""")
print("\n=== Publication tables ===")
for row in cur.fetchall():
    print(f"Publication: {row[0]}, Table: {row[1]}.{row[2]}")
