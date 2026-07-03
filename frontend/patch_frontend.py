import re

path = 'c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Add companyId state
if 'const [companyId, setCompanyId] = useState<string | null>(null);' not in text:
    text = text.replace('const [session, setSession] = useState<any>(null);', 
                        'const [session, setSession] = useState<any>(null);\n  const [companyId, setCompanyId] = useState<string | null>(null);')

# Update checkOnboarding
old_check = '''        if (res.status === 404) {
          router.navigate({ to: "/onboarding" });
        } else if (!res.ok) {
          console.error("Failed to fetch company profile");
        }'''
new_check = '''        if (res.status === 404) {
          router.navigate({ to: "/onboarding" });
        } else if (res.ok) {
          const data = await res.json();
          setCompanyId(data.id);
          loadData(data.id);
        } else {
          console.error("Failed to fetch company profile");
        }'''
text = text.replace(old_check, new_check)

# Update loadData signature and URLs
old_loadData = '''  const loadData = async () => {
    try {
      const [touristsRes, agentsRes, driversRes, notifsRes] = await Promise.all([
        fetch("http://localhost:8000/api/tourists"),
        fetch("http://localhost:8000/api/agents"),
        fetch("http://localhost:8000/api/drivers"),
        fetch("http://localhost:8000/api/notifications")
      ]);'''
new_loadData = '''  const loadData = async (compId: string) => {
    if (!compId) return;
    try {
      const [touristsRes, agentsRes, driversRes, notifsRes] = await Promise.all([
        fetch(`http://localhost:8000/api/tourists?company_id=${compId}`),
        fetch(`http://localhost:8000/api/agents?company_id=${compId}`),
        fetch(`http://localhost:8000/api/drivers?company_id=${compId}`),
        fetch(`http://localhost:8000/api/notifications?company_id=${compId}`)
      ]);'''
text = text.replace(old_loadData, new_loadData)

# Remove useEffect for loadData if it exists
text = re.sub(r'  useEffect\(\(\) => \{\n    loadData\(\);\n  \}, \[\]\);', '', text)
text = text.replace('loadData();', 'if (companyId) loadData(companyId);')

# Add company_id to POST bodies
# Agents
text = re.sub(r'body: JSON\.stringify\(\{([\s\S]*?)agent_name:\s*newAgent\.name,\s*email:\s*newAgent\.email,\s*region:\s*newAgent\.region,?\s*\}\)',
              r'body: JSON.stringify({\1agent_name: newAgent.name,\n          email: newAgent.email,\n          region: newAgent.region,\n          company_id: companyId\n        })', text)

# Drivers
text = re.sub(r'body: JSON\.stringify\(newDriver\)',
              r'body: JSON.stringify({ ...newDriver, company_id: companyId })', text)

# Tourists
text = re.sub(r'body: JSON\.stringify\(formData\)',
              r'body: JSON.stringify({ ...formData, company_id: companyId })', text)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Frontend patched!')
