import os
import resend
from dotenv import load_dotenv

load_dotenv()
resend.api_key = os.environ.get("RESEND_API_KEY")

params = {
    "from": "System Test <bookings@contact.nextoura.bond>",
    "to": ["gihanpasinduofficial@gmail.com"],
    "subject": "Hello from CST",
    "text": "This is a simple plain text message to test if the domain is completely blocked by Gmail or just the HTML content."
}

try:
    email = resend.Emails.send(params)
    print("Sent! ID:", email['id'])
except Exception as e:
    print("Error:", e)
