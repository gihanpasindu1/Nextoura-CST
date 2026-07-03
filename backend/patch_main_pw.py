with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'r', encoding='utf-8') as f:
    text = f.read()

new_logic = """
            auth_payload = {
                "email": driver.email,
                "email_confirm": True,
                "app_metadata": {"role": "guide"},
                "user_metadata": {"name": driver.name}
            }
            if driver.password:
                auth_payload["password"] = driver.password

            supabase_admin.auth.admin.create_user(auth_payload)
"""

text = text.replace(
    '            supabase_admin.auth.admin.create_user({\n                "email": driver.email,\n                "email_confirm": True,\n                "app_metadata": {"role": "guide"},\n                "user_metadata": {"name": driver.name}\n            })',
    new_logic
)

text = text.replace(
    'db_driver = models.Driver(**driver.dict())',
    'db_driver = models.Driver(**driver.dict(exclude={"password"}))'
)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'w', encoding='utf-8') as f:
    f.write(text)

print("Backend patched for password support.")
