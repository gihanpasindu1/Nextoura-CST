import urllib.request
import json

comp_id = "f2ee8387-0405-496e-9729-ec8dfce3d7d0"

# Fetch drivers
with urllib.request.urlopen(f"http://localhost:8000/api/drivers?company_id={comp_id}") as r:
    drivers = json.loads(r.read().decode())

# Fetch tourists
with urllib.request.urlopen(f"http://localhost:8000/api/tourists?company_id={comp_id}") as r:
    tourists = json.loads(r.read().decode())

print("=== DRIVERS FROM API ===")
for d in drivers:
    print(f"ID: {d['id']} | Name: {d['name']}")

print("\n=== TOURISTS FROM API ===")
for t in tourists:
    print(f"ID: {t['id']} | Name: {t['name']} | Driver ID: {t.get('driver_id')} | Status: {t['status']} | is_lead: {t['is_lead']}")
