import base64, json, hmac, hashlib

# We know the payload — just need to sign it with the project's JWT secret
# But we don't have the JWT secret. Instead, let's try to construct the anon key
# by changing role from service_role to anon and using the SAME signature approach.

# Actually — Supabase uses the same JWT secret for both keys.
# The anon key payload is identical except role="anon"
# Since we don't have the secret, we can try to fetch the anon key via the REST API

# Try to get project keys via management API
# We can't do this without a personal access token. 

# Best approach: check if we can find anon key in the frontend .env
import os
with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/.env', 'r') as f:
    content = f.read()
    print("Frontend .env content:")
    print(content)
