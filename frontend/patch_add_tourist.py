import re

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/components/AddTouristSheet.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update initial formData state
text = text.replace(
    '''    arrival: "",
    duration: "",''',
    '''    arrival: "",
    departure: "",
    duration: "",
    status: "Upcoming",'''
)

text = text.replace(
    '''          arrival: initialData.arrival || "",
          duration: initialData.duration || "",''',
    '''          arrival: initialData.arrival || "",
          departure: (initialData as any).departure || "",
          duration: initialData.duration || "",
          status: initialData.status || "Upcoming",'''
)

# 2. Add useEffect for auto-calculating duration
auto_calc_effect = """
  useEffect(() => {
    if (formData.arrival && formData.departure) {
      const start = new Date(formData.arrival);
      const end = new Date(formData.departure);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
        const diff = end.getTime() - start.getTime();
        const days = Math.ceil(diff / (1000 * 3600 * 24)) + 1; // inclusive of start day
        if (formData.duration !== `${days} Days`) {
          setFormData(prev => ({ ...prev, duration: `${days} Days` }));
        }
      }
    }
  }, [formData.arrival, formData.departure]);

  const [itinerary, setItinerary] = useState<any[]>([]);"""

text = text.replace('  const [itinerary, setItinerary] = useState<any[]>([]);', auto_calc_effect)


# 3. Replace the UI inputs
old_inputs = """            <div className="space-y-2">
              <Label className={cn(errors.arrival && "text-destructive")}>Arrival Date {mode === "confirmed" && "*"}</Label>
              <Input className={cn(errors.arrival && "border-destructive focus-visible:ring-destructive")} value={formData.arrival} onChange={e => { setFormData({...formData, arrival: e.target.value}); if (errors.arrival) setErrors({...errors, arrival: ""}); }} placeholder="e.g. 24 June 2026" />
              {errors.arrival && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.arrival}</div>}
            </div>
            <div className="space-y-2">
              <Label className={cn(errors.duration && "text-destructive")}>Duration {mode === "confirmed" && "*"}</Label>
              <Input className={cn(errors.duration && "border-destructive focus-visible:ring-destructive")} value={formData.duration} onChange={e => { setFormData({...formData, duration: e.target.value}); if (errors.duration) setErrors({...errors, duration: ""}); }} placeholder="e.g. 7 Days" />
              {errors.duration && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.duration}</div>}
            </div>"""

new_inputs = """            <div className="space-y-2">
              <Label className={cn(errors.arrival && "text-destructive")}>Arrival Date {mode === "confirmed" && "*"}</Label>
              <Input type="date" className={cn(errors.arrival && "border-destructive focus-visible:ring-destructive")} value={formData.arrival} onChange={e => { setFormData({...formData, arrival: e.target.value}); if (errors.arrival) setErrors({...errors, arrival: ""}); }} />
              {errors.arrival && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.arrival}</div>}
            </div>
            <div className="space-y-2">
              <Label>Departure Date</Label>
              <Input type="date" value={formData.departure} onChange={e => setFormData({...formData, departure: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label className={cn(errors.duration && "text-destructive")}>Duration {mode === "confirmed" && "*"}</Label>
              <Input className={cn(errors.duration && "border-destructive focus-visible:ring-destructive")} value={formData.duration} onChange={e => { setFormData({...formData, duration: e.target.value}); if (errors.duration) setErrors({...errors, duration: ""}); }} placeholder="e.g. 7 Days" />
              {errors.duration && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.duration}</div>}
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>"""

text = text.replace(old_inputs, new_inputs)


# 4. Modify the returned object in `submit()`
old_submit = """      arrival: formData.arrival || "TBD",
      duration: formData.duration || "TBD","""

new_submit = """      arrival: formData.arrival || "TBD",
      departure: formData.departure || null,
      duration: formData.duration || "TBD",
      status: formData.status,"""

text = text.replace(old_submit, new_submit)


with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/components/AddTouristSheet.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print('Patched AddTouristSheet.tsx')
