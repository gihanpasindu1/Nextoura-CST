import psycopg2

url = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
conn = psycopg2.connect(url)
cur = conn.cursor()

# Check ALL itinerary data for recent tourist to see where statuses fail
cur.execute("""
    SELECT ft.name, ti.day_number, ti.location_name as stop_name, ti.driver_status as stop_status,
           d.location_name as dest_name, d.driver_status as dest_status, d.id as dest_id, ti.id as stop_id
    FROM foreign_tourists ft
    JOIN tour_itineraries ti ON ti.tourist_id = ft.id
    LEFT JOIN itinerary_destinations d ON d.itinerary_id = ti.id
    WHERE ft.name = 'Bimsara'
    ORDER BY ti.day_number, d.created_at;
""")
print("=== Bimsara's full itinerary ===")
current_day = None
for row in cur.fetchall():
    day = row[1]
    if day != current_day:
        current_day = day
        print(f"\n--- Day {day}: {row[2]} (Stop Status: {row[3]}, Stop ID: {row[7]}) ---")
    print(f"  Dest: {row[4]} | Status: {row[5]} | ID: {row[6]}")
