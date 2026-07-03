import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tourist } from "@/lib/tourism-data";
import { Loader2, Plus, UploadCloud, FileText, Settings2, Trash2, X, Users, AlertCircle, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function AddTouristSheet({ 
  open, 
  onOpenChange, 
  onAdd, 
  mode = "confirmed",
  initialData,
  agents = [],
  drivers = [],
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  onAdd: (tourist: Tourist) => void;
  mode?: "lead" | "confirmed";
  initialData?: Tourist;
  agents: any[];
  drivers: any[];
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    countryCode: "",
    passport: "",
    phone: "",
    email: "",
    pax: 1,
    arrival: "",
    departure: "",
    duration: "",
    status: "Upcoming",
    agent: "All Agents",
    driver: "All Drivers",
    group: [] as any[],
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData({
          name: initialData.name || "",
          country: initialData.country || "",
          countryCode: initialData.countryCode || "",
          passport: initialData.passport || "",
          phone: initialData.phone || "",
          email: initialData.email || "",
          pax: initialData.pax || 1,
          arrival: initialData.arrival || "",
          departure: (initialData as any).departure || "",
          duration: initialData.duration || "",
          status: initialData.status || "Upcoming",
          agent: initialData.agent || "All Agents",
          driver: initialData.driver || "All Drivers",
          group: initialData.group || [],
        });
        setItinerary(initialData.itinerary || []);
      } else {
        setFormData({
          name: "",
          country: "",
          countryCode: "",
          passport: "",
          phone: "",
          email: "",
          pax: 1,
          arrival: "",
          duration: "",
          departure: "",
          status: "Upcoming",
          agent: "All Agents",
          driver: "All Drivers",
          group: [],
        });
        setItinerary([]);
      }
      setErrors({});
    }
  }, [open, initialData]);


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

  const [itinerary, setItinerary] = useState<any[]>([]);
  const [itineraryText, setItineraryText] = useState("");

  const handleGenerate = (type: 'text' | 'pdf') => {
    setIsGenerating(true);
    // Mocking an AI generation delay
    setTimeout(() => {
      setItinerary([
        {
          day: 1,
          title: "Arrival & City Tour",
          hotel: "Galle Face Hotel",
          hotelEmail: "reservations@gallefacehotel.net",
          destinations: [
            { location: "Airport", activities: "Meet & greet at BIA, transfer to hotel." },
            { location: "Colombo", activities: "Evening city tour including Lotus Tower and Galle Face Green." }
          ]
        },
        {
          day: 2,
          title: "Cultural Triangle",
          hotel: "Heritance Kandalama",
          hotelEmail: "kandalama@heritancehotels.com",
          destinations: [
            { location: "Dambulla", activities: "Visit Dambulla Cave Temple." },
            { location: "Minneriya", activities: "Afternoon elephant safari at Minneriya National Park." }
          ]
        }
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (mode === "confirmed") {
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.countryCode) newErrors.countryCode = "Code is required";
      if (!formData.passport) newErrors.passport = "Passport is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.arrival) newErrors.arrival = "Arrival date is required";
      if (!formData.departure) newErrors.departure = "Departure date is required";
      if (!formData.duration) newErrors.duration = "Duration is required";
      if (formData.agent === "All Agents") newErrors.agent = "Agent is required";

      if (formData.pax > 1) {
        for (let i = 0; i < formData.pax - 1; i++) {
          const member = formData.group[i];
          if (!member || !member.name.trim()) {
            newErrors[`group_${i}_name`] = "Name is required";
          }
          if (!member || !member.passport.trim()) {
            newErrors[`group_${i}_passport`] = "Passport is required";
          }
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const newTourist: Tourist = {
      id: initialData ? initialData.id : "t" + Math.floor(Math.random() * 10000),
      name: formData.name,
      country: formData.country || "TBD",
      countryCode: formData.countryCode || "UN",
      pax: formData.pax,
      arrival: formData.arrival || "TBD",
      duration: formData.duration || "TBD",
      status: formData.status as any,
      agent: formData.agent !== "All Agents" ? formData.agent : "Direct",
      driver: formData.driver !== "All Drivers" ? formData.driver : "TBD",
      passport: formData.passport || "N/A",
      phone: formData.phone || "N/A",
      email: formData.email || "N/A",
      group: formData.group || [],
      currentLocation: initialData ? initialData.currentLocation : "TBD",
      itinerary: itinerary,
      isLead: mode === "lead",
    };
    onAdd(newTourist);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] w-full p-0 flex flex-col h-full bg-background border-l border-border">
        <SheetHeader className="px-6 py-4 border-b border-border bg-card">
          <SheetTitle>{mode === "lead" ? "Add New Inquiry" : (initialData ? "Confirm Tour" : "Add New Client")}</SheetTitle>
          <SheetDescription>
            {mode === "lead" 
              ? "Create a new lead profile. Only the name is mandatory." 
              : "Create a confirmed client profile. All personal details are required."}
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-6">
          <div className="grid gap-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <Settings2 className="h-4 w-4" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={cn(errors.name && "text-destructive")}>Full Name *</Label>
                  <Input className={cn(errors.name && "border-destructive focus-visible:ring-destructive")} value={formData.name} onChange={e => { setFormData({...formData, name: e.target.value}); if (errors.name) setErrors({...errors, name: ""}); }} placeholder="e.g. John Doe" />
                  {errors.name && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.name}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.country && "text-destructive")}>Country {mode === "confirmed" && "*"}</Label>
                  <Input className={cn(errors.country && "border-destructive focus-visible:ring-destructive")} value={formData.country} onChange={e => { setFormData({...formData, country: e.target.value}); if (errors.country) setErrors({...errors, country: ""}); }} placeholder="e.g. United Kingdom" />
                  {errors.country && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.country}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.countryCode && "text-destructive")}>Country Code (emoji) {mode === "confirmed" && "*"}</Label>
                  <Input className={cn(errors.countryCode && "border-destructive focus-visible:ring-destructive")} value={formData.countryCode} onChange={e => { setFormData({...formData, countryCode: e.target.value}); if (errors.countryCode) setErrors({...errors, countryCode: ""}); }} placeholder="e.g. GB" />
                  {errors.countryCode && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.countryCode}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.passport && "text-destructive")}>Passport Number {mode === "confirmed" && "*"}</Label>
                  <Input className={cn(errors.passport && "border-destructive focus-visible:ring-destructive")} value={formData.passport} onChange={e => { setFormData({...formData, passport: e.target.value}); if (errors.passport) setErrors({...errors, passport: ""}); }} placeholder="e.g. P1234567" />
                  {errors.passport && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.passport}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.phone && "text-destructive")}>Phone {mode === "confirmed" && "*"}</Label>
                  <Input className={cn(errors.phone && "border-destructive focus-visible:ring-destructive")} value={formData.phone} onChange={e => { setFormData({...formData, phone: e.target.value}); if (errors.phone) setErrors({...errors, phone: ""}); }} placeholder="+44 7700 900077" />
                  {errors.phone && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.phone}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.email && "text-destructive")}>Email {mode === "confirmed" && "*"}</Label>
                  <Input className={cn(errors.email && "border-destructive focus-visible:ring-destructive")} value={formData.email} onChange={e => { setFormData({...formData, email: e.target.value}); if (errors.email) setErrors({...errors, email: ""}); }} placeholder="john@example.com" />
                  {errors.email && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email}</div>}
                </div>
                <div className="space-y-2">
                  <Label>Pax (Group Size)</Label>
                  <Input type="number" min="1" value={formData.pax} onChange={e => setFormData({...formData, pax: parseInt(e.target.value) || 1})} />
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.agent && "text-destructive")}>Agent {mode === "confirmed" && "*"}</Label>
                  <Select value={formData.agent} onValueChange={v => { setFormData({...formData, agent: v}); if (errors.agent) setErrors({...errors, agent: ""}); }}>
                    <SelectTrigger className={cn(errors.agent && "border-destructive focus:ring-destructive")}><SelectValue placeholder="Select Agent" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Agents">Select Agent</SelectItem>
                      {agents.map((a: any) => (
                        <SelectItem key={a.id} value={a.agent_name || a.name}>{a.agent_name || a.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.agent && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.agent}</div>}
                </div>
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
                <div className="space-y-2">
                  <Label className={cn(errors.arrival && "text-destructive")}>Arrival Date {mode === "confirmed" && "*"}</Label>
                  <Input type="date" className={cn(errors.arrival && "border-destructive focus-visible:ring-destructive")} value={formData.arrival} onChange={e => { setFormData({...formData, arrival: e.target.value}); if (errors.arrival) setErrors({...errors, arrival: ""}); }} />
                  {errors.arrival && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.arrival}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.departure && "text-destructive")}>Departure Date {mode === "confirmed" && "*"}</Label>
                  <Input type="date" className={cn(errors.departure && "border-destructive focus-visible:ring-destructive")} value={formData.departure} onChange={e => { setFormData({...formData, departure: e.target.value}); if (errors.departure) setErrors({...errors, departure: ""}); }} />
                  {errors.departure && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.departure}</div>}
                </div>
                <div className="space-y-2">
                  <Label className={cn(errors.duration && "text-destructive")}>Duration {mode === "confirmed" && "*"}</Label>
                  <Input className={cn(errors.duration && "border-destructive focus-visible:ring-destructive")} value={formData.duration} onChange={e => { setFormData({...formData, duration: e.target.value}); if (errors.duration) setErrors({...errors, duration: ""}); }} placeholder="e.g. 7 Days" />
                  {errors.duration && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.duration}</div>}
                </div>
              </div>
            </div>

            {/* Group Details */}
            {formData.pax > 1 && (
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Users className="h-4 w-4" />
                  Other Group Members
                </h3>
                <div className="space-y-4">
                  {Array.from({ length: formData.pax - 1 }).map((_, i) => (
                    <div key={i} className="space-y-3 p-4 border border-border rounded-md bg-muted/20">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Member {i + 1}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className={cn("text-xs", errors[`group_${i}_name`] && "text-destructive")}>Name {mode === "confirmed" && "*"}</Label>
                          <Input className={cn("h-8 text-sm", errors[`group_${i}_name`] && "border-destructive focus-visible:ring-destructive")} value={formData.group[i]?.name || ""} onChange={e => {
                            const newGroup = [...formData.group];
                            if (!newGroup[i]) newGroup[i] = { name: "", passport: "" };
                            newGroup[i].name = e.target.value;
                            setFormData({...formData, group: newGroup});
                            if (errors[`group_${i}_name`]) {
                              const newErrors = {...errors};
                              delete newErrors[`group_${i}_name`];
                              setErrors(newErrors);
                            }
                          }} />
                          {errors[`group_${i}_name`] && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Required</div>}
                        </div>
                        <div className="space-y-1">
                          <Label className={cn("text-xs", errors[`group_${i}_passport`] && "text-destructive")}>Passport {mode === "confirmed" && "*"}</Label>
                          <Input className={cn("h-8 text-sm", errors[`group_${i}_passport`] && "border-destructive focus-visible:ring-destructive")} value={formData.group[i]?.passport || ""} onChange={e => {
                            const newGroup = [...formData.group];
                            if (!newGroup[i]) newGroup[i] = { name: "", passport: "" };
                            newGroup[i].passport = e.target.value;
                            setFormData({...formData, group: newGroup});
                            if (errors[`group_${i}_passport`]) {
                              const newErrors = {...errors};
                              delete newErrors[`group_${i}_passport`];
                              setErrors(newErrors);
                            }
                          }} />
                          {errors[`group_${i}_passport`] && <div className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Required</div>}
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Phone</Label>
                          <Input className="h-8 text-sm" value={formData.group[i]?.phone || ""} onChange={e => {
                            const newGroup = [...formData.group];
                            if (!newGroup[i]) newGroup[i] = { name: "", passport: "" };
                            newGroup[i].phone = e.target.value;
                            setFormData({...formData, group: newGroup});
                          }} />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Email</Label>
                          <Input className="h-8 text-sm" value={formData.group[i]?.email || ""} onChange={e => {
                            const newGroup = [...formData.group];
                            if (!newGroup[i]) newGroup[i] = { name: "", passport: "" };
                            newGroup[i].email = e.target.value;
                            setFormData({...formData, group: newGroup});
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <FileText className="h-4 w-4" />
                Itinerary Builder
              </h3>
              
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  <TabsTrigger value="text">Auto (Text)</TabsTrigger>
                  <TabsTrigger value="pdf">Auto (PDF)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="manual" className="pt-4 space-y-4">
                  {itinerary.map((day, i) => (
                    <div key={i} className="border border-border p-4 rounded-md space-y-3 bg-accent/20 relative">
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => {
                        const updated = [...itinerary];
                        updated.splice(i, 1);
                        setItinerary(updated);
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Day {day.day}</h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Title</Label>
                          <Input className="h-8 text-sm" value={day.title} onChange={e => {
                            const updated = [...itinerary]; updated[i].title = e.target.value; setItinerary(updated);
                          }} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Hotel</Label>
                            <Input className="h-8 text-sm" value={day.hotel} onChange={e => {
                              const updated = [...itinerary]; updated[i].hotel = e.target.value; setItinerary(updated);
                            }} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Hotel Email</Label>
                            <Input className="h-8 text-sm" value={day.hotelEmail} onChange={e => {
                              const updated = [...itinerary]; updated[i].hotelEmail = e.target.value; setItinerary(updated);
                            }} />
                          </div>
                        </div>
                        {(day.hotel && day.hotelEmail) && (
                          <div className="pt-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1.5 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 w-full sm:w-auto">
                                  <Send className="h-3 w-3" />
                                  Send Booking Request
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Auto-Generated Booking Request</DialogTitle>
                                  <DialogDescription>Draft a new booking email to {day.hotel}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-2">
                                  <div className="grid gap-2">
                                    <Label>From</Label>
                                    <Input disabled defaultValue="info@ceylonsignaturetravels.com" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label>To</Label>
                                    <Input disabled value={day.hotelEmail || "No email provided"} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`subject-${i}`}>Subject</Label>
                                    <Input id={`subject-${i}`} defaultValue={`New Booking Request - ${formData.name || "Client"} (Pax: ${formData.pax})`} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`message-${i}`}>Message</Label>
                                    <textarea 
                                      id={`message-${i}`}
                                      className="flex min-h-[160px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                      defaultValue={`Dear Reservation Team at ${day.hotel},\n\nWe would like to request a new booking for our client, ${formData.name || "Client Name"} (Group Size: ${formData.pax}), arriving for Day ${day.day} of their tour.\n\nPlease check your availability for these dates and provide us with a quotation.\n\nWe look forward to hearing from you soon.\n\nBest regards,\nCeylon Signature Travels`}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Send Booking Request</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Destinations & Activities</Label>
                        
                        {(day.destinations || []).map((dest: any, destIndex: number) => (
                          <div key={`dest-${destIndex}`} className="space-y-2 border-l-2 border-primary/20 pl-3 relative">
                            <Button variant="ghost" size="icon" className="absolute -left-3 top-0 h-5 w-5 rounded-full bg-background border border-border text-muted-foreground hover:text-destructive hover:border-destructive" onClick={() => {
                              const updated = [...itinerary];
                              updated[i].destinations.splice(destIndex, 1);
                              setItinerary(updated);
                            }}>
                              <X className="h-3 w-3" />
                            </Button>
                            <Input className="h-8 text-sm" placeholder="Location name (e.g. Dambulla)" value={dest.location} onChange={e => {
                              const updated = [...itinerary]; updated[i].destinations[destIndex].location = e.target.value; setItinerary(updated);
                            }} />
                            <Textarea className="min-h-[50px] text-sm" placeholder="Activities at this location..." value={dest.activities} onChange={e => {
                              const updated = [...itinerary]; updated[i].destinations[destIndex].activities = e.target.value; setItinerary(updated);
                            }} />
                          </div>
                        ))}

                        {(day.activities || []).map((activity: string, actIndex: number) => (
                          <div key={`act-${actIndex}`} className="relative pl-3">
                            <Button variant="ghost" size="icon" className="absolute -left-3 top-1.5 h-5 w-5 rounded-full bg-background border border-border text-muted-foreground hover:text-destructive hover:border-destructive" onClick={() => {
                              const updated = [...itinerary];
                              updated[i].activities.splice(actIndex, 1);
                              setItinerary(updated);
                            }}>
                              <X className="h-3 w-3" />
                            </Button>
                            <Input className="h-8 text-sm border-dashed" placeholder="Activity description..." value={activity} onChange={e => {
                              const updated = [...itinerary]; updated[i].activities[actIndex] = e.target.value; setItinerary(updated);
                            }} />
                          </div>
                        ))}

                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5" onClick={() => {
                            const updated = [...itinerary];
                            if (!updated[i].destinations) updated[i].destinations = [];
                            updated[i].destinations.push({ location: "", activities: "" });
                            setItinerary(updated);
                          }}>
                            <Plus className="h-3 w-3" /> Add Location
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5" onClick={() => {
                            const updated = [...itinerary];
                            if (!updated[i].activities) updated[i].activities = [];
                            updated[i].activities.push("");
                            setItinerary(updated);
                          }}>
                            <Plus className="h-3 w-3" /> Add Activity
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full gap-2 border-dashed" onClick={() => setItinerary([...itinerary, { day: itinerary.length + 1, title: "", hotel: "", hotelEmail: "", destinations: [{ location: "", activities: "" }] }])}>
                    <Plus className="h-4 w-4" />
                    Add Day
                  </Button>
                </TabsContent>
                
                <TabsContent value="text" className="pt-4 space-y-4">
                  <div className="text-sm text-muted-foreground">Paste rough itinerary notes or chat logs below. AI will extract the days, hotels, and locations.</div>
                  <Textarea 
                    placeholder="E.g. They arrive on the 24th and stay at Galle Face Hotel. Next day they go to Dambulla and stay at Kandalama..." 
                    className="min-h-[150px]"
                    value={itineraryText}
                    onChange={e => setItineraryText(e.target.value)}
                  />
                  <Button 
                    className="w-full" 
                    onClick={() => handleGenerate('text')}
                    disabled={isGenerating || !itineraryText.trim()}
                  >
                    {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Extracting Itinerary...</> : "Generate Itinerary"}
                  </Button>
                </TabsContent>
                
                <TabsContent value="pdf" className="pt-4 space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-10 flex flex-col items-center justify-center text-center space-y-3 hover:bg-accent/30 transition-colors cursor-pointer">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <UploadCloud className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF itineraries (max 5MB)</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleGenerate('pdf')}
                    disabled={isGenerating}
                  >
                    {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing PDF...</> : "Upload & Extract"}
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>
        
        <SheetFooter className="px-6 py-4 border-t border-border bg-card">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button onClick={handleSave}>Save Client</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
