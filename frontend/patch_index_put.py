import re

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Modify fetch to use PUT if editing
old_fetch = """              await fetch('http://localhost:8000/api/tourists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });"""

new_fetch = """              const url = editingTourist 
                ? `http://localhost:8000/api/tourists/${editingTourist.id}`
                : 'http://localhost:8000/api/tourists';
              const method = editingTourist ? 'PUT' : 'POST';
              await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });"""

text = text.replace(old_fetch, new_fetch)

# 2. Add Edit Profile button to TouristDetail
old_button = """              {t.isLead && (
                <Button variant="default" size="sm" onClick={onConfirmTour} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                  Confirm Tour
                </Button>
              )}
              <Button variant="outline" size="sm" className="gap-2">"""

new_button = """              {t.isLead && (
                <Button variant="default" size="sm" onClick={onConfirmTour} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                  Confirm Tour
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onEditClient} className="gap-2 border-primary text-primary hover:bg-primary/10">
                <Settings2 className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="gap-2">"""

text = text.replace(old_button, new_button)


# 3. Add onEditClient to TouristDetail props
old_props_1 = """function TouristDetail({ 
  t, 
  onBack, 
  notifications, 
  onResolveAlert, 
  onConfirmTour 
}: {"""
new_props_1 = """function TouristDetail({ 
  t, 
  onBack, 
  notifications, 
  onResolveAlert, 
  onConfirmTour,
  onEditClient
}: {"""
text = text.replace(old_props_1, new_props_1)

old_props_2 = """  onResolveAlert: (id: string) => void;
  onConfirmTour: () => void;
}) {"""
new_props_2 = """  onResolveAlert: (id: string) => void;
  onConfirmTour: () => void;
  onEditClient?: () => void;
}) {"""
text = text.replace(old_props_2, new_props_2)


# 4. Pass onEditClient to TouristDetail from ToursWorkspace
old_call = """            onResolveAlert={onResolveAlert}
            onConfirmTour={() => onConfirmTour(selected)}
          />"""
new_call = """            onResolveAlert={onResolveAlert}
            onConfirmTour={() => onConfirmTour(selected)}
            onEditClient={() => onConfirmTour(selected)}
          />"""
text = text.replace(old_call, new_call)


with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print('Patched index.tsx for edit functionality')
