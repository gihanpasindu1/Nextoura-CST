with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Make email mandatory in submit()
text = text.replace(
    'if (!form.name || !form.phone) {\n      toast.error("Name and phone required");',
    'if (!form.name || !form.phone || !form.email) {\n      toast.error("Name, phone, and email required");'
)

# Change Label in Add form
text = text.replace(
    '<Label htmlFor="drv-email">Email (Optional)</Label>',
    '<Label htmlFor="drv-email">Email</Label>'
)

# Change Label in Edit form
text = text.replace(
    '<Label htmlFor="edit-drv-email">Email (Optional)</Label>',
    '<Label htmlFor="edit-drv-email">Email</Label>'
)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Made email mandatory.")
