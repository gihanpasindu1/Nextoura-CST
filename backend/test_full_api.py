import urllib.request, json, traceback

# Use a brand new email so supabase auth won't complain about duplicates
data = json.dumps({
    "name": "New Test Driver",
    "phone": "0779999999",
    "email": f"newtest_xyz789@example.com",
    "password": "TestPass123",
    "company_id": None
}).encode("utf-8")

req = urllib.request.Request(
    "http://localhost:8000/api/drivers",
    data=data,
    headers={"Content-Type": "application/json"}
)
try:
    res = urllib.request.urlopen(req)
    body = res.read().decode("utf-8")
    print("SUCCESS:", body)
except urllib.error.HTTPError as e:
    body = e.read().decode("utf-8")
    print(f"HTTP {e.code} Error:\n{body}")
except Exception as e:
    traceback.print_exc()
