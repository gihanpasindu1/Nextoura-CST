with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
'''        except Exception as e:
    db_driver = models.Driver(**driver.dict())''',
'''        except Exception as e:
            print("Auth user creation failed (might already exist):", e)
            
    db_driver = models.Driver(**driver.dict())'''
)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed main.py.")
