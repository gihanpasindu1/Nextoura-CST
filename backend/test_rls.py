import psycopg2

url = 'postgresql://postgres.snqmtozcyimcdkwyxeia:Ceylonsignature%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
conn = psycopg2.connect(url)
cur = conn.cursor()

# Check ALL RLS policies on itinerary_destinations
cur.execute("""
    SELECT polname, polcmd, pg_get_expr(polqual, polrelid) as using_expr, pg_get_expr(polwithcheck, polrelid) as check_expr
    FROM pg_policy 
    WHERE polrelid = 'itinerary_destinations'::regclass;
""")
print("=== itinerary_destinations policies ===")
for row in cur.fetchall():
    print(f"\nPolicy: {row[0]}")
    print(f"Command: {row[1]}")
    print(f"USING: {row[2]}")
    print(f"WITH CHECK: {row[3]}")

# Check ALL RLS policies on tour_itineraries
cur.execute("""
    SELECT polname, polcmd, pg_get_expr(polqual, polrelid) as using_expr, pg_get_expr(polwithcheck, polrelid) as check_expr
    FROM pg_policy 
    WHERE polrelid = 'tour_itineraries'::regclass;
""")
print("\n=== tour_itineraries policies ===")
for row in cur.fetchall():
    print(f"\nPolicy: {row[0]}")
    print(f"Command: {row[1]}")
    print(f"USING: {row[2]}")
    print(f"WITH CHECK: {row[3]}")

# Check if RLS is enabled
cur.execute("""
    SELECT relname, relrowsecurity, relforcerowsecurity 
    FROM pg_class 
    WHERE relname IN ('tour_itineraries', 'itinerary_destinations');
""")
print("\n=== RLS enabled? ===")
for row in cur.fetchall():
    print(f"{row[0]}: rls={row[1]}, force={row[2]}")

# Check table structure of itinerary_destinations
cur.execute("""
    SELECT column_name, data_type, column_default
    FROM information_schema.columns 
    WHERE table_name = 'itinerary_destinations'
    ORDER BY ordinal_position;
""")
print("\n=== itinerary_destinations columns ===")
for row in cur.fetchall():
    print(row)
