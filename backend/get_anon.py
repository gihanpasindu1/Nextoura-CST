import os
from dotenv import load_dotenv
load_dotenv('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/.env')
from supabase import create_client

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
client = create_client(url, key)

# Fetch the anon key from Supabase project settings via management API
# Actually we can't get it this way. Let's just print what we have.
print(f"URL: {url}")
print(f"Project ref: snqmtozcyimcdkwyxeia")
print("Note: Get the anon key from Supabase Dashboard -> Project Settings -> API -> anon public key")
