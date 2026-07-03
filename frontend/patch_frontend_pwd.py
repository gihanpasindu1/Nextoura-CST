import re

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add password to form state
text = text.replace(
    'const [form, setForm] = useState({ name: "", phone: "", email: "" });',
    'const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });\n  const [showCreds, setShowCreds] = useState<{email: string, password: string} | null>(null);'
)

text = text.replace(
    'setForm({ name: driver.name || "", phone: driver.phone || "", email: driver.email || "" });',
    'setForm({ name: driver.name || "", phone: driver.phone || "", email: driver.email || "", password: "" });'
)

# Update submit logic
new_submit = """
  function submit() {
    if (!form.name || !form.phone || !form.email) {
      toast.error("Name, phone, and email required");
      return;
    }
    const pwd = form.password;
    onAddDriver(form);
    
    if (pwd) {
      setShowCreds({ email: form.email, password: pwd });
    } else {
      toast.success("Driver profile created");
    }
    
    setForm({ name: "", phone: "", email: "", password: "" });
    setOpen(false);
  }
"""

text = re.sub(r'  function submit\(\) \{[\s\S]*?toast\.success\("Driver profile created"\);\n  \}', new_submit.strip('\n'), text)

# Add Password Input in Add Dialog
add_pwd_field = """
              <div>
                <Label htmlFor="drv-email">Email</Label>
                <Input
                  id="drv-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="driver@example.com"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="drv-pw">Password</Label>
                  <Button type="button" variant="link" className="h-auto p-0 text-xs" onClick={() => {
                    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
                    let newPw = "";
                    for (let i = 0; i < 10; i++) newPw += chars.charAt(Math.floor(Math.random() * chars.length));
                    setForm({ ...form, password: newPw });
                  }}>Generate Random</Button>
                </div>
                <Input
                  id="drv-pw"
                  type="text"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Optional: Auto-assigns if empty"
                />
              </div>
"""

text = text.replace(
    '              <div>\n                <Label htmlFor="drv-email">Email</Label>\n                <Input\n                  id="drv-email"\n                  type="email"\n                  value={form.email}\n                  onChange={(e) => setForm({ ...form, email: e.target.value })}\n                  placeholder="driver@example.com"\n                />\n              </div>',
    add_pwd_field
)

# Add Credentials Dialog
creds_dialog = """
      {/* Credentials Dialog */}
      <Dialog open={!!showCreds} onOpenChange={(val) => !val && setShowCreds(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Driver Account Created!</DialogTitle>
            <DialogDescription>
              The guide has been securely added to Supabase. Please share these login details with them:
            </DialogDescription>
          </DialogHeader>
          {showCreds && (
            <div className="space-y-4 pt-2">
              <div className="rounded-md bg-muted p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Email:</span>
                  <span className="text-sm font-semibold">{showCreds.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Password:</span>
                  <span className="text-sm font-semibold">{showCreds.password}</span>
                </div>
              </div>
              <Button className="w-full gap-2" onClick={() => {
                navigator.clipboard.writeText(`Email: ${showCreds.email}\\nPassword: ${showCreds.password}`);
                toast.success("Copied to clipboard!");
              }}>
                <Copy className="h-4 w-4" /> Copy Credentials
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
"""

# Insert right before ScrollArea
text = text.replace('      <ScrollArea className="flex-1">', creds_dialog + '\n      <ScrollArea className="flex-1">')

# Update onAddDriver to pass password in Console
# We need to find the onAddDriver call in the parent component and make sure it sends password.
# In index.tsx, around line 683 (Console component):
text = text.replace(
    'body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, company_id: companyId })',
    'body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, password: form.password, company_id: companyId })'
)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Frontend updated for password logic.")
