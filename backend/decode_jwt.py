import base64, json

# The service role key from the backend
service_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucW10b3pjeWltY2Rrd3l4ZWlhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjI2OTMzNSwiZXhwIjoyMDk3ODQ1MzM1fQ.4kBWTs05JCnHKxbLAfDq9ND4IC8oEsSKq4MgYwMU4pU"

# Decode the payload
parts = service_key.split('.')
padding = 4 - len(parts[1]) % 4
payload = json.loads(base64.b64decode(parts[1] + '=' * padding))
print("Service role payload:", payload)
print()
print("The anon key has the same header/iat/exp but with role='anon'")
print("You MUST get your anon key from Supabase Dashboard -> Settings -> API -> 'anon public' key")
print()
print("Your project ref:", payload.get('ref'))
print("iat:", payload.get('iat'))
print("exp:", payload.get('exp'))
