with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Update form state
text = text.replace(
    'const [form, setForm] = useState({ name: "", phone: "" });',
    'const [form, setForm] = useState({ name: "", phone: "", email: "" });'
)

# Update openEdit
text = text.replace(
    'setForm({ name: driver.name || "", phone: driver.phone || "" });',
    'setForm({ name: driver.name || "", phone: driver.phone || "", email: driver.email || "" });'
)

# Update form reset on submit
text = text.replace(
    'setForm({ name: "", phone: "" });',
    'setForm({ name: "", phone: "", email: "" });'
)

# Add Email field to Add Dialog
if 'placeholder="+94 77 123 4567"\n                />\n              </div>\n            </div>' in text:
    text = text.replace(
        'placeholder="+94 77 123 4567"\n                />\n              </div>\n            </div>',
        'placeholder="+94 77 123 4567"\n                />\n              </div>\n              <div>\n                <Label htmlFor="drv-email">Email (Optional)</Label>\n                <Input\n                  id="drv-email"\n                  type="email"\n                  value={form.email}\n                  onChange={(e) => setForm({ ...form, email: e.target.value })}\n                  placeholder="driver@example.com"\n                />\n              </div>\n            </div>'
    )

# Add Email field to Edit Dialog
if 'onChange={(e) => setForm({ ...form, phone: e.target.value })}\n              />\n            </div>\n          </div>' in text:
    text = text.replace(
        'onChange={(e) => setForm({ ...form, phone: e.target.value })}\n              />\n            </div>\n          </div>',
        'onChange={(e) => setForm({ ...form, phone: e.target.value })}\n              />\n            </div>\n            <div>\n              <Label htmlFor="edit-drv-email">Email (Optional)</Label>\n              <Input\n                id="edit-drv-email"\n                type="email"\n                value={form.email}\n                onChange={(e) => setForm({ ...form, email: e.target.value })}\n              />\n            </div>\n          </div>'
    )

# Show email on driver card
if '<div className="truncate text-xs text-muted-foreground">{d.phone}</div>' in text:
    text = text.replace(
        '<div className="truncate text-xs text-muted-foreground">{d.phone}</div>',
        '<div className="truncate text-xs text-muted-foreground">{d.phone}</div>\n                    {d.email && <div className="truncate text-xs text-muted-foreground">{d.email}</div>}'
    )

# Update API calls to include email
text = text.replace(
    'body: JSON.stringify({ name: form.name, phone: form.phone, company_id: companyId })',
    'body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, company_id: companyId })'
)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Email field added to DriverManagement component.")
