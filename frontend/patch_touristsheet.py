with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/components/AddTouristSheet.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add driver to initial formData
text = text.replace(
    'agent: "All Agents",',
    'agent: "All Agents",\n    driver: "All Drivers",'
)

# Add driver to useEffect initialData setting
if 'agent: initialData.agent || "All Agents",' in text:
    text = text.replace(
        'agent: initialData.agent || "All Agents",',
        'agent: initialData.agent || "All Agents",\n          driver: initialData.driver || "All Drivers",'
    )
if 'agent: "All Agents",' in text:
    # We already replaced the first occurrence, the second occurrence is in the else block
    text = text.replace(
        '          agent: "All Agents",\n          group: [],',
        '          agent: "All Agents",\n          driver: "All Drivers",\n          group: [],'
    )

# Fix handleSave mapping
if 'driver: initialData ? initialData.driver : (drivers.length > 0 ? drivers[Math.floor(Math.random() * drivers.length)].name : "TBD"),' in text:
    text = text.replace(
        'driver: initialData ? initialData.driver : (drivers.length > 0 ? drivers[Math.floor(Math.random() * drivers.length)].name : "TBD"),',
        'driver: formData.driver !== "All Drivers" ? formData.driver : "TBD",'
    )

# Add Driver select field right after Agent select field
driver_select_field = """
                <div className="space-y-2">
                  <Label>Driver / Guide</Label>
                  <Select value={formData.driver} onValueChange={v => setFormData({...formData, driver: v})}>
                    <SelectTrigger><SelectValue placeholder="Select Driver" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Drivers">Select Driver / Guide</SelectItem>
                      {drivers.map((d: any) => (
                        <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
"""

if '</Select>\n                  {errors.agent && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.agent}</div>}\n                </div>\n                <div className="space-y-2">\n                  <Label className={cn(errors.arrival && "text-destructive")}>Arrival Date' in text:
    text = text.replace(
        '</Select>\n                  {errors.agent && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.agent}</div>}\n                </div>\n                <div className="space-y-2">\n                  <Label className={cn(errors.arrival && "text-destructive")}>Arrival Date',
        '</Select>\n                  {errors.agent && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.agent}</div>}\n                </div>' + driver_select_field + '                <div className="space-y-2">\n                  <Label className={cn(errors.arrival && "text-destructive")}>Arrival Date'
    )

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/components/AddTouristSheet.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("AddTouristSheet patched successfully.")
