import os
import resend
from dotenv import load_dotenv
load_dotenv()
api_key = os.environ.get('RESEND_API_KEY', '').strip('"''')
resend.api_key = api_key
params = {'from': 'System Test <bookings@contact.nextoura.bond>', 'to': ['gihanpasinduofficial@gmail.com'], 'subject': 'Simple Test Email', 'text': 'Hello, this is just a plain text test to see if content filters block it.'}
try:
    email = resend.Emails.send(params)
    print('Success:', email)
except Exception as e:
    print('Error:', e)
