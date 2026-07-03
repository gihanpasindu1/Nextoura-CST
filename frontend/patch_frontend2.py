import re

path = 'c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Fix Agent POST payload
old_agent_body = 'body: JSON.stringify({ agent_name: form.name, email: form.email, company_id: null })'
new_agent_body = 'body: JSON.stringify({ agent_name: form.name, email: form.email, company_id: companyId })'
text = text.replace(old_agent_body, new_agent_body)

# Fix Tourist POST payload
old_tourist_payload = '''                status: newTourist.status || 'Upcoming',
                is_lead: newTourist.isLead || false,'''
new_tourist_payload = '''                status: newTourist.status || 'Upcoming',
                is_lead: newTourist.isLead || false,
                company_id: companyId,'''
text = text.replace(old_tourist_payload, new_tourist_payload)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed frontend payloads')
