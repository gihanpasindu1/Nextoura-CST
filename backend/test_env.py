import os
from dotenv import load_dotenv, dotenv_values

print("RAW ENV:", os.environ.get("RESEND_API_KEY"))
load_dotenv(override=True)
print("AFTER LOAD_DOTENV:", os.environ.get("RESEND_API_KEY"))
print("DOTENV_VALUES:", dotenv_values(".env").get("RESEND_API_KEY"))
