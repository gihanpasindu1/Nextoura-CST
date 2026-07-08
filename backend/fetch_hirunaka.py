import requests
import json

r = requests.get("http://localhost:8000/api/tourists")
tourists = r.json()

hirunaka = next((t for t in tourists if t.get("name") == "hirunaka"), None)
if hirunaka:
    print(json.dumps(hirunaka, indent=2))
else:
    print("hirunaka not found")
