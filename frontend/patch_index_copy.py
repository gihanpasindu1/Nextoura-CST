with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Remove showCreds state
text = text.replace(
    '  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });\n  const [showCreds, setShowCreds] = useState<{email: string, password: string} | null>(null);',
    '  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });'
)

# Update submit logic
old_submit = """
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

new_submit = """
  function submit() {
    if (!form.name || !form.phone || !form.email) {
      toast.error("Name, phone, and email required");
      return;
    }
    onAddDriver(form);
    toast.success("Driver profile created");
    setForm({ name: "", phone: "", email: "", password: "" });
    setOpen(false);
  }
"""

text = text.replace(old_submit.strip('\n'), new_submit.strip('\n'))

# Add Copy button to driver card
copy_btn = """
                {/* Hover Actions */}
                <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  {d.password && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10" onClick={() => {
                      navigator.clipboard.writeText(`Email: ${d.email}\\nPassword: ${d.password}`);
                      toast.success("Credentials copied!");
                    }} title="Copy Credentials">
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}"""

text = text.replace(
    '                {/* Hover Actions */}\n                <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">',
    copy_btn.lstrip('\n')
)

import re

# Remove the Credentials Dialog
text = re.sub(r'      \{/\* Credentials Dialog \*/\}.*?      </Dialog>\n\n', '', text, flags=re.DOTALL)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated index.tsx")
