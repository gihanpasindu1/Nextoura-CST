import re

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add drivers to NavKey
text = text.replace(
    'type NavKey = "dashboard" | "tours" | "leads" | "agents" | "reports" | "settings";',
    'type NavKey = "dashboard" | "tours" | "leads" | "agents" | "drivers" | "reports" | "settings";'
)

# Add to NAV
if '{ key: "agents", label: "Agent Management", icon: Briefcase },' in text:
    text = text.replace(
        '{ key: "agents", label: "Agent Management", icon: Briefcase },',
        '{ key: "agents", label: "Agent Management", icon: Briefcase },\n  { key: "drivers", label: "Drivers & Guides", icon: Users },'
    )

# Add to labelMap
if 'agents: "Agent Management",' in text:
    text = text.replace(
        'agents: "Agent Management",',
        'agents: "Agent Management",\n    drivers: "Drivers & Guides",'
    )

# Add DriverManagement component
driver_management_code = """
/* ---------- Driver Management ---------- */

function DriverManagement({
  drivers,
  onAddDriver,
  onUpdateDriver,
  onDeleteDriver
}: {
  drivers: any[];
  onAddDriver: (d: any) => void;
  onUpdateDriver: (id: string, d: any) => void;
  onDeleteDriver: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  function submit() {
    if (!form.name || !form.phone) {
      toast.error("Name and phone required");
      return;
    }
    onAddDriver(form);
    setForm({ name: "", phone: "" });
    setOpen(false);
    toast.success("Driver profile created");
  }

  function submitEdit() {
    if (!form.name || !form.phone) {
      toast.error("Name and phone required");
      return;
    }
    if (selectedDriver) {
      onUpdateDriver(selectedDriver.id, form);
      setEditOpen(false);
      setSelectedDriver(null);
      toast.success("Driver profile updated");
    }
  }

  function confirmDelete() {
    if (selectedDriver) {
      onDeleteDriver(selectedDriver.id);
      setDeleteOpen(false);
      setSelectedDriver(null);
      toast.success("Driver deleted");
    }
  }

  function openEdit(driver: any) {
    setSelectedDriver(driver);
    setForm({ name: driver.name || "", phone: driver.phone || "" });
    setEditOpen(true);
  }

  function openDelete(driver: any) {
    setSelectedDriver(driver);
    setDeleteOpen(true);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-6 py-3">
        <div className="text-sm text-muted-foreground">
          {drivers.length} drivers & guides
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <UserPlus className="h-4 w-4" />
              Add driver / guide
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new driver</DialogTitle>
              <DialogDescription>Create a profile for a driver or guide.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label htmlFor="drv-name">Full name</Label>
                <Input
                  id="drv-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Kamal Perera"
                />
              </div>
              <div>
                <Label htmlFor="drv-phone">Phone Number</Label>
                <Input
                  id="drv-phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+94 77 123 4567"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={submit}>Create profile</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="flex-1">
        <div className="grid gap-3 p-6 sm:grid-cols-2 xl:grid-cols-3">
          {drivers.map((d: any) => {
            const initials = (d.name || "?")
              .split(" ")
              .map((p: any) => p[0])
              .slice(0, 2)
              .join("");
            return (
              <div key={d.id} className="group relative rounded-lg border border-border bg-card p-5 overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
                
                {/* Hover Actions */}
                <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10" onClick={() => openEdit(d)}>
                    <Settings2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => openDelete(d)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold pr-16">{d.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{d.phone}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Driver</DialogTitle>
            <DialogDescription>Update driver details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="edit-drv-name">Full name</Label>
              <Input
                id="edit-drv-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-drv-phone">Phone Number</Label>
              <Input
                id="edit-drv-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={submitEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Driver?</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete {selectedDriver?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete Driver</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}

"""

if '/* ---------- Dashboard placeholder ---------- */' in text:
    text = text.replace('/* ---------- Dashboard placeholder ---------- */', driver_management_code + '\n/* ---------- Dashboard placeholder ---------- */')

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Nav items and DriverManagement component added.")
