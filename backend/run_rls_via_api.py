import os, urllib.request, json
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')

from supabase import create_client
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
client = create_client(url, key)

# Use Supabase's rpc to execute raw SQL with full Supabase extensions
# The pg_rls_policies need to be executed via the Supabase management API
# which supports auth.jwt() as a function

# Let's try using the REST API's /rpc endpoint or the pg connection with supabase schema
import urllib.request

sql_statements = [
    'DROP POLICY IF EXISTS "Guides can read own tours" ON tour_itineraries;',
    'DROP POLICY IF EXISTS "Guides can update own tours" ON tour_itineraries;',
    '''CREATE POLICY "Guides can read own tours"
ON tour_itineraries FOR SELECT TO authenticated
USING (driver_id = (SELECT id FROM drivers WHERE email = (auth.jwt() ->> \'email\') LIMIT 1));''',
    '''CREATE POLICY "Guides can update own tours"
ON tour_itineraries FOR UPDATE TO authenticated
USING (driver_id = (SELECT id FROM drivers WHERE email = (auth.jwt() ->> \'email\') LIMIT 1));''',
]

full_sql = '\n'.join(sql_statements)

# Use Supabase's pg connection but with the management API
mgmt_url = f"{url}/rest/v1/rpc/exec_sql"

# Actually use psql direct via management API
headers = {
    'apikey': key,
    'Authorization': f'Bearer {key}',
    'Content-Type': 'application/json',
}

# Try using the pg_query via the Supabase REST API
data = json.dumps({'query': full_sql}).encode()
req = urllib.request.Request(mgmt_url, data=data, headers=headers)
try:
    res = urllib.request.urlopen(req)
    print('Success:', res.read().decode())
except urllib.error.HTTPError as e:
    print('HTTP Error:', e.code, e.read().decode()[:500])
    print()
    print("The RLS policies with auth.jwt() must be run in Supabase SQL Editor.")
    print("Here are the exact SQL commands to paste:")
    print()
    for s in sql_statements:
        print(s)
        print()
