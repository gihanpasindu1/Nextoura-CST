with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

driver_render_code = """
          ) : nav === "drivers" ? (
            <DriverManagement drivers={drivers} onAddDriver={async (form) => {
              try {
                const res = await fetch("http://localhost:8000/api/drivers", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: form.name, phone: form.phone, company_id: companyId })
                });
                if (res.ok) {
                  const newDriver = await res.json();
                  setDrivers((prev: any[]) => [...prev, newDriver]);
                }
              } catch (e) {
                console.error(e);
              }
            }}
            onUpdateDriver={async (driverId: string, form) => {
              try {
                const res = await fetch(`http://localhost:8000/api/drivers/${driverId}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: form.name, phone: form.phone, company_id: companyId })
                });
                if (res.ok) {
                  const updated = await res.json();
                  setDrivers((prev: any[]) => prev.map((d: any) => d.id === updated.id ? updated : d));
                }
              } catch (e) {
                console.error(e);
              }
            }}
            onDeleteDriver={async (driverId: string) => {
              try {
                const res = await fetch(`http://localhost:8000/api/drivers/${driverId}`, { method: "DELETE" });
                if (res.ok) {
                  setDrivers((prev: any[]) => prev.filter((d: any) => d.id !== driverId));
                }
              } catch (e) {
                console.error(e);
              }
            }}
            />
"""

if '            />\n          ) : nav === "dashboard" || nav === "reports" || nav === "settings" ? (' in text:
    text = text.replace(
        '            />\n          ) : nav === "dashboard" || nav === "reports" || nav === "settings" ? (',
        '            />' + driver_render_code + '          ) : nav === "dashboard" || nav === "reports" || nav === "settings" ? ('
    )
    with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    print("DriverManagement wired up successfully.")
else:
    print("Anchor not found!")
