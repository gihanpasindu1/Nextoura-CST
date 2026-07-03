import os
from dotenv import load_dotenv
load_dotenv()

from supabase import create_client
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

print(f"URL: {url}")
print(f"Key set: {'yes' if key else 'NO - MISSING!'}")

if url and key:
    supabase = create_client(url, key)
    try:
        users = supabase.auth.admin.list_users()
        print(f"\nTotal Auth users: {len(users)}")
        for u in users:
            print(f"  {u.email} | created: {u.created_at}")
    except Exception as e:
        import traceback
        traceback.print_exc()
