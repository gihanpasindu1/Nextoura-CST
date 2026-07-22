import psycopg2

url = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
conn = psycopg2.connect(url)
cur = conn.cursor()

# Check actual destination statuses
cur.execute("""
    SELECT d.id, d.itinerary_id, d.location_name, d.driver_status, d.activities,
           ti.day_number, ti.location_name as stop_location, ti.driver_status as stop_status,
           ft.name as tourist_name
    FROM itinerary_destinations d
    JOIN tour_itineraries ti ON d.itinerary_id = ti.id
    JOIN foreign_tourists ft ON ti.tourist_id = ft.id
    ORDER BY ft.name, ti.day_number, d.created_at
    LIMIT 50;
""")
print("=== Destinations with statuses ===")
for row in cur.fetchall():
    print(f"Tourist: {row[8]}, Day {row[5]}, Stop: {row[6]} ({row[7]})")
    print(f"  Dest: {row[2]} | Status: {row[3]} | Activities: {(row[4] or '')[:50]}")
    print(f"  Dest ID: {row[0]} | Itinerary ID: {row[1]}")
    print()
