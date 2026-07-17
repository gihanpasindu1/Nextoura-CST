import { createFileRoute, useRouter } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { useMemo, useState, useEffect } from "react";
import {
  LayoutDashboard,
  Plane,
  Users,
  BarChart3,
  MapPinned,
  Settings,
  Settings2,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  MapPin,
  Calendar,
  Phone,
  Mail,
  CreditCard,
  AlertTriangle,
  Info,
  CheckCircle2,
  Building2,
  UserPlus,
  Briefcase,
  ArrowLeft,
  MessageCircle,
  Send,
  Trash2,
  Copy,
  Clock,
  Car,
  XCircle,
  Navigation,
  LogOut,
  Shield,
  Activity,
  Globe2,
  Users2,
  CalendarDays,
  CalendarRange,
  Layers,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import {
  flagEmoji,
  type Tourist,
  type TourStatus,
} from "@/lib/tourism-data";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { AddTouristSheet } from "@/components/AddTouristSheet";
import { Calendar as UICalendar } from "@/components/ui/calendar";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Horizon Travel — Operations Console" },
      { name: "description", content: "Tour operator dashboard for managing tourists, agents and itineraries." },
    ],
  }),
  component: Console,
});

type NavKey = "dashboard" | "tours" | "leads" | "agents" | "drivers" | "reports" | "settings";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

type NavSection = {
  title: string;
  items: { key: NavKey; label: string; icon: typeof LayoutDashboard }[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Main",
    items: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { key: "tours", label: "Active Tours", icon: Plane },
      { key: "leads", label: "Inquiries", icon: MessageCircle },
    ],
  },
  {
    title: "Management",
    items: [
      { key: "agents", label: "Agent Management", icon: Briefcase },
      { key: "drivers", label: "Drivers & Guides", icon: Car },
    ],
  },
  {
    title: "System",
    items: [
      { key: "reports", label: "Reports", icon: BarChart3 },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
];

// Flat NAV for header lookups (preserving existing references)
const NAV = NAV_SECTIONS.flatMap((s) => s.items);

function Console() {
  const [nav, setNav] = useState<NavKey>("tours");
  const [agentFilter, setAgentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | TourStatus>("all");
  const [driverFilter, setDriverFilter] = useState("All Drivers");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>("t1");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [addClientMode, setAddClientMode] = useState<"lead" | "confirmed">("confirmed");
  const [editingTourist, setEditingTourist] = useState<Tourist | undefined>(undefined);
  const [driverPopoverOpen, setDriverPopoverOpen] = useState(false);
  const [driverSearchQuery, setDriverSearchQuery] = useState("");
  const { theme, toggle } = useTheme();

  const [touristsList, setTouristsList] = useState<Tourist[]>([]);
  const [notifications, setNotifications] = useState<{ id: string; touristId: string; type: string; title: string; body: string; time: string; resolved?: boolean }[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const router = useRouter();

  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [sidebarDate, setSidebarDate] = useState<Date | undefined>(new Date());
  const [calendarPopoverOpen, setCalendarPopoverOpen] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = useMemo(() => {
    if (!currentTime) return "";
    return currentTime.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }, [currentTime]);

  const formattedTime = useMemo(() => {
    if (!currentTime) return "";
    return currentTime.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  }, [currentTime]);

  useEffect(() => {
    const checkOnboarding = async (userSession: any) => {
      try {
        const res = await fetch(`http://localhost:8000/api/companies/me?user_id=${userSession.user.id}`);
        if (res.status === 404) {
          router.navigate({ to: "/onboarding" });
        } else if (res.ok) {
          const data = await res.json();
          setCompanyId(data.id);
          loadData(data.id);
        } else {
          console.error("Failed to fetch company profile");
        }
      } catch (err) {
        console.error(err);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        setIsLoadingAuth(false);
        router.navigate({ to: "/login" });
      } else {
        checkOnboarding(session).finally(() => setIsLoadingAuth(false));
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        router.navigate({ to: "/login" });
      } else {
        checkOnboarding(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!driverPopoverOpen) {
      setDriverSearchQuery("");
    }
  }, [driverPopoverOpen]);

  const loadData = async (compId: string) => {
    if (!compId) return;
    try {
      const [touristsRes, agentsRes, driversRes, notifsRes, hotelsRes] = await Promise.all([
        fetch(`http://localhost:8000/api/tourists?company_id=${compId}`),
        fetch(`http://localhost:8000/api/agents?company_id=${compId}`),
        fetch(`http://localhost:8000/api/drivers?company_id=${compId}`),
        fetch(`http://localhost:8000/api/notifications?company_id=${compId}`),
        fetch(`http://localhost:8000/api/hotels?company_id=${compId}`)
      ]);
      const touristsData = await touristsRes.json();
      const agentsData = await agentsRes.json();
      const driversData = await driversRes.json();
      const notifsData = await notifsRes.json();
      const hotelsData = await hotelsRes.json();

      setAgents(agentsData);
      setDrivers(driversData);
      setHotels(hotelsData);

      const agentMap: Record<string, string> = {};
      agentsData.forEach((a: any) => agentMap[a.id] = a.agent_name || a.name);
      const driverMap: Record<string, string> = {};
      driversData.forEach((d: any) => driverMap[d.id] = d.name);

      const mappedTourists = touristsData.map((t: any) => {
        const sortedItinerary = (t.itineraries || []).sort((a: any, b: any) => {
          if (a.day_number !== b.day_number) return a.day_number - b.day_number;
          return (a.stop_order || 0) - (b.stop_order || 0);
        });
        let loc = "Not Started";
        for (const i of sortedItinerary) {
          if (i.driver_status === 'Completed') {
            loc = i.location_name || i.day_title || "TBD";
          }
          if (i.destinations && i.destinations.length > 0) {
            const sortedDests = [...i.destinations].sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            for (const d of sortedDests) {
              if (d.driver_status === 'Completed') {
                loc = d.location_name;
              }
            }
          }
          if (i.hotel_driver_status === 'Completed' && i.hotel?.hotel_name) {
            loc = i.hotel.hotel_name;
          }
        }

        return {
          id: t.id,
          name: t.name,
          country: t.country,
          countryCode: t.country_code,
          passport: t.passport_number,
          phone: t.phone || "",
          email: t.email,
          pax: t.pax_count,
          arrival: t.arrival_date,
          departure: t.departure_date || "",
          duration: t.duration,
          status: t.status,
          currentLocation: loc,
          agent: agentMap[t.agent_id] || "All Agents",
          driver: driverMap[t.driver_id] || "All Drivers",
          group: t.group_members?.map((g: any) => ({ name: g.name, passport: g.passport_number, email: g.email, phone: g.phone || "" })) || [],
          itinerary: sortedItinerary.map((i: any) => ({
            day: i.day_number,
            title: i.day_title,
            hotel: i.hotel?.hotel_name || '',
            hotelEmail: i.hotel?.hotel_email || '',
            status: i.driver_status || 'Pending',
            destinations: i.destinations?.map((d: any) => ({ location: d.location_name, activities: d.activities, status: d.driver_status || 'Pending' })) || []
          })),
          isLead: t.is_lead
        };
      });
      setTouristsList(mappedTourists);

      const mappedNotifs = notifsData.map((n: any) => ({
        id: n.id,
        touristId: n.tourist_id,
        type: n.notification_type,
        title: n.alert_title,
        body: n.alert_message,
        time: n.created_at,
        resolved: n.is_resolved
      }));
      setNotifications(mappedNotifs);
    } catch (e) {
      console.error("Failed to load backend data", e);
    }
  };
  useEffect(() => {
    if (!companyId) return;

    // Subscribe to realtime updates for itineraries (when a driver marks a stop as completed)
    const channel1 = supabase.channel('itineraries_updates')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'tour_itineraries' },
        (payload) => {
          console.log('Itinerary updated in realtime! Refreshing data...', payload);
          loadData(companyId);
        }
      )
      .subscribe();

    const channel2 = supabase.channel('destinations_updates')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'itinerary_destinations' },
        (payload) => {
          console.log('Destination updated in realtime! Refreshing data...', payload);
          loadData(companyId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel1);
      supabase.removeChannel(channel2);
    };
  }, [companyId]);



  const alertCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const n of notifications) {
      if (!n.resolved && n.touristId && n.touristId !== "all" && (n.type === "alert" || n.type === "warn")) {
        counts[n.touristId] = (counts[n.touristId] || 0) + 1;
      }
    }
    return counts;
  }, [notifications]);

  const statusAlertCounts = useMemo(() => {
    const counts: Record<string, number> = { Active: 0, Upcoming: 0, Completed: 0, Cancelled: 0 };
    for (const n of notifications) {
      if (!n.resolved && n.touristId && n.touristId !== "all" && (n.type === "alert" || n.type === "warn")) {
        const tourist = touristsList.find((t) => t.id === n.touristId);
        if (tourist) {
          const key = (tourist.status === "Active" || tourist.status === "On Tour") ? "Active" : tourist.status;
          counts[key] = (counts[key] || 0) + 1;
        }
      }
    }
    return counts;
  }, [notifications, touristsList]);

  const filtered = useMemo(() => {
    const results = touristsList.filter((t) => {
      // Filter by nav section: leads show isLead=true, tours show isLead=falsy
      if (nav === "leads") {
        if (!t.isLead) return false;
      } else if (nav === "tours") {
        if (t.isLead) return false;
      }

      if (agentFilter !== "all") {
        const agent = agents.find((a) => a.id === agentFilter);
        if (agent && t.agent !== (agent.agent_name || agent.name)) return false;
      }
      if (statusFilter !== "all") {
        if (statusFilter === "Active") {
          if (t.status !== "Active" && t.status !== "On Tour") return false;
        } else {
          if (t.status !== statusFilter) return false;
        }
      }
      if (driverFilter !== "All Drivers" && t.driver !== driverFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !t.name.toLowerCase().includes(q) &&
          !t.country.toLowerCase().includes(q) &&
          !t.passport.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });

    results.sort((a, b) => {
      const aCount = alertCounts[a.id] || 0;
      const bCount = alertCounts[b.id] || 0;
      return bCount - aCount;
    });

    return results;
  }, [agentFilter, statusFilter, driverFilter, query, alertCounts, nav, touristsList]);

  const selected = filtered.find((t) => t.id === selectedId) ?? filtered[0] ?? touristsList[0];

  const stats = useMemo(() => {
    const active = touristsList.filter((t) => t.status === "Active").length;
    const upcoming = touristsList.filter((t) => t.status === "Upcoming").length;
    const pax = touristsList.filter((t) => t.status !== "Completed").reduce((s, t) => s + t.pax, 0);
    return { active, upcoming, pax, countries: new Set(touristsList.map((t) => t.country)).size };
  }, [touristsList]);

  const filteredDriversForFilter = drivers.filter((d: any) =>
    d.name?.toLowerCase().includes(driverSearchQuery.toLowerCase())
  );

  if (isLoadingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Left sidebar — theme-aware premium design */}
      <aside className="flex w-72 shrink-0 flex-col overflow-hidden transition-all duration-300" style={{
        background: theme === "light"
          ? 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)'
          : 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        borderRight: theme === "light"
          ? '1px solid rgba(0,0,0,0.08)'
          : '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* ── Brand header ── */}
        <div className="relative px-6 pb-5 pt-7">
          {/* Subtle top-glow decoration */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full transition-opacity duration-300" style={{
            background: theme === "light"
              ? 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)'
          }} />
          <div className="relative flex items-center gap-3.5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] shadow-lg" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              boxShadow: theme === "light"
                ? '0 6px 16px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                : '0 8px 24px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}>
              <MapPinned className="h-[21px] w-[21px] text-white" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <div className={cn(
                "flex items-baseline gap-1 text-[20px] font-extrabold leading-none tracking-tight transition-colors duration-300",
                theme === "light" ? "text-slate-900" : "text-white"
              )}>
                Horizon <span className={cn("font-medium transition-colors", theme === "light" ? "text-blue-600" : "text-blue-400")}>Travel</span>
              </div>
              <div className={cn(
                "mt-1.5 text-[9px] font-semibold uppercase tracking-[0.25em] transition-colors",
                theme === "light" ? "text-slate-500" : "text-slate-400"
              )}>
                Operations Console
              </div>
            </div>
          </div>
        </div>

        {/* ── Agent filter ── */}
        <div className="px-5 pb-4">
          <Label className={cn(
            "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
            theme === "light" ? "text-slate-500/80" : "text-slate-500"
          )}>
            Agent View
          </Label>
          <div className="flex gap-2">
            <Select value={agentFilter} onValueChange={(val) => {
              setAgentFilter(val);
              setIsDetailOpen(false);
              setSelectedId("");
            }}>
              <SelectTrigger className={cn(
                "h-9 flex-1 rounded-lg transition-all duration-200 focus:ring-blue-500/40",
                theme === "light"
                  ? "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                  : "border-slate-700/60 bg-slate-800/60 text-slate-200 hover:bg-slate-800"
              )}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                {agents.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.agent_name || a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {agentFilter !== "all" && (
              <button
                onClick={() => {
                  setAgentFilter("all");
                  setIsDetailOpen(false);
                  setSelectedId("");
                }}
                title="Reset to all agents"
                className={cn(
                  "h-9 w-9 shrink-0 flex items-center justify-center rounded-lg border transition-all duration-200",
                  theme === "light"
                    ? "border-slate-300 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    : "border-slate-700/60 bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-white"
                )}
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className={cn(
          "mx-5 h-px bg-gradient-to-r from-transparent to-transparent transition-all",
          theme === "light" ? "via-slate-300" : "via-slate-700/60"
        )} />

        {/* ── Navigation sections ── */}
        <nav className="flex-1 space-y-5 overflow-y-auto px-4 py-5" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: theme === "light" ? '#cbd5e1 transparent' : '#334155 transparent'
        }}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <div className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = nav === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        setNav(item.key);
                        setSelectedId("");
                        setIsDetailOpen(false);
                      }}
                      className={cn(
                        "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-all duration-200",
                        active
                          ? (theme === "light" ? "text-blue-600 font-semibold" : "text-white")
                          : (theme === "light" ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-slate-200"),
                      )}
                      style={active ? {
                        background: theme === "light"
                          ? 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 100%)'
                          : 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.08) 100%)',
                        boxShadow: theme === "light"
                          ? 'inset 0 0 0 1px rgba(59,130,246,0.15), 0 0 15px -4px rgba(59,130,246,0.08)'
                          : 'inset 0 0 0 1px rgba(59,130,246,0.2), 0 0 20px -4px rgba(59,130,246,0.15)',
                      } : undefined}
                    >
                      {/* Active left accent bar */}
                      {active && (
                        <span className={cn(
                          "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full",
                          theme === "light" ? "bg-blue-600" : "bg-blue-400"
                        )} style={{
                          boxShadow: theme === "light"
                            ? '0 0 6px 1px rgba(37,99,235,0.4)'
                            : '0 0 8px 1px rgba(96,165,250,0.5)',
                        }} />
                      )}
                      {/* Hover background */}
                      {!active && (
                        <span className={cn(
                          "pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                          theme === "light" ? "bg-slate-200/50" : "bg-white/[0.03]"
                        )} />
                      )}
                      <Icon className={cn(
                        "relative h-[18px] w-[18px] shrink-0 transition-colors duration-200",
                        active
                          ? (theme === "light" ? "text-blue-600" : "text-blue-400")
                          : (theme === "light" ? "text-slate-500 group-hover:text-slate-800" : "text-slate-500 group-hover:text-slate-300"),
                      )} strokeWidth={active ? 2.2 : 1.8} />
                      <span className="relative truncate">{item.label}</span>
                      {active && (
                        <ChevronRight className={cn(
                          "relative ml-auto h-3.5 w-3.5",
                          theme === "light" ? "text-blue-600/60" : "text-blue-400/60"
                        )} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ── Divider ── */}
        <div className={cn(
          "mx-5 h-px bg-gradient-to-r from-transparent to-transparent transition-all",
          theme === "light" ? "via-slate-300" : "via-slate-700/60"
        )} />

        {/* ── User profile & Sign out ── */}
        <div className="p-4 space-y-3">
          <div className={cn(
            "flex items-center gap-3 rounded-xl p-2.5 transition-colors",
            theme === "light" ? "hover:bg-slate-200/50" : "hover:bg-white/[0.04]"
          )}>
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-semibold text-[11px] text-white" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              boxShadow: '0 4px 12px rgba(99,102,241,0.25)',
            }}>
              {session?.user?.email?.substring(0, 2).toUpperCase() || "CP"}
            </div>
            <div className="min-w-0 flex-1">
              <div className={cn(
                "truncate text-[13px] font-medium transition-colors",
                theme === "light" ? "text-slate-800" : "text-slate-200"
              )}>{session?.user?.email || "Company Profile"}</div>
              <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                <Shield className="h-3 w-3" />
                <span>Authorized</span>
              </div>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className={cn(
                "group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
                theme === "light"
                  ? "text-slate-500 hover:bg-red-50 hover:text-red-600"
                  : "text-slate-500 hover:bg-red-500/10 hover:text-red-400"
              )}>
                <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span>Sign Out</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will end your current session. You will need to enter your email and password again to access the Operations Console.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={async () => {
                  await supabase.auth.signOut();
                  toast.success("Signed out successfully");
                }}>
                  Sign Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </aside>

      {/* Center + Right */}
      <div className="flex min-w-0 flex-1">
        <main className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-border bg-card/90 backdrop-blur-lg px-7">
            <div className="flex items-center gap-3.5">
              {/* Icon with subtle tinted background */}
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/10 bg-primary/5 text-primary">
                {nav === "agents" ? <Users className="h-4.5 w-4.5" /> :
                  nav === "leads" ? <MessageCircle className="h-4.5 w-4.5" /> :
                    nav === "dashboard" ? <LayoutDashboard className="h-4.5 w-4.5" /> :
                      nav === "reports" ? <BarChart3 className="h-4.5 w-4.5" /> :
                        nav === "settings" ? <Settings className="h-4.5 w-4.5" /> :
                          nav === "drivers" ? <Car className="h-4.5 w-4.5" /> :
                            <Plane className="h-4.5 w-4.5" />}
              </div>
              <div>
                <h1 className="text-[15px] font-bold tracking-tight text-foreground leading-none">
                  {nav === "agents"
                    ? "Agent Management"
                    : nav === "leads"
                      ? "Inquiries & Leads"
                      : nav === "dashboard"
                        ? "Dashboard"
                        : nav === "reports"
                          ? "Reports"
                          : nav === "settings"
                            ? "Settings"
                            : nav === "drivers"
                              ? "Drivers & Guides"
                              : "Active Tours"}
                </h1>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-medium tracking-wide">
                  {nav === "agents"
                    ? "Manage your operations team and their assignments"
                    : nav === "leads"
                      ? "Review and process unconfirmed inquiries and requested itineraries"
                      : nav === "dashboard"
                        ? "Overview of your business metrics and recent activity"
                        : nav === "reports"
                          ? "Analytics and performance reports"
                          : nav === "settings"
                            ? "Manage your account, preferences, and system settings"
                            : nav === "drivers"
                              ? "Manage your drivers, guides and vehicle assignments"
                              : "Live overview of tourists currently on tour"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                id="view-graphs-btn"
                variant="outline"
                size="sm"
                onClick={() => router.navigate({ to: "/analytics" })}
                className="flex items-center gap-1.5 h-8 rounded-lg border border-border px-3 text-[11px] font-semibold text-muted-foreground bg-card/50 transition-all hover:bg-accent hover:text-primary hover:border-primary/30 shadow-sm"
              >
                <BarChart3 className="h-3.5 w-3.5 text-primary" />
                <span className="hidden sm:inline">View Graphs</span>
              </Button>
              <div className="h-4 w-px bg-border mx-0.5" />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={toggle}
                className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200"
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <div className="h-4 w-px bg-border mx-0.5" />
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200 relative">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
                </span>
              </Button>
            </div>
          </header>

          {nav === "agents" ? (
            <AgentManagement agents={agents} onAddAgent={async (form) => {
              try {
                const res = await fetch("http://localhost:8000/api/agents", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ agent_name: form.name, email: form.email, region: form.region, company_id: companyId })
                });
                if (res.ok) {
                  const newAgent = await res.json();
                  setAgents((prev: any[]) => [...prev, newAgent]);
                }
              } catch (e) {
                console.error(e);
              }
            }}
              onEditAgent={async (agent: any, form: any) => {
                try {
                  const res = await fetch(`http://localhost:8000/api/agents/${agent.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ agent_name: form.name, email: form.email, region: form.region, company_id: companyId })
                  });
                  if (res.ok) {
                    const updated = await res.json();
                    setAgents((prev: any[]) => prev.map((a: any) => a.id === updated.id ? updated : a));
                  }
                } catch (e) {
                  console.error(e);
                }
              }}
              onDeleteAgent={async (agentId: string) => {
                try {
                  const res = await fetch(`http://localhost:8000/api/agents/${agentId}`, { method: "DELETE" });
                  if (res.ok) {
                    setAgents((prev: any[]) => prev.filter((a: any) => a.id !== agentId));
                  }
                } catch (e) {
                  console.error(e);
                }
              }}
            />
          ) : nav === "drivers" ? (
            <DriverManagement drivers={drivers} onAddDriver={async (form) => {
              const res = await fetch("http://localhost:8000/api/drivers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, password: form.password, company_id: companyId })
              });
              if (res.ok) {
                const newDriver = await res.json();
                setDrivers((prev: any[]) => [...prev, newDriver]);
                toast.success("Driver added!");
              } else {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.detail || "Server error");
              }
            }}
              onUpdateDriver={async (driverId: string, form) => {
                try {
                  const res = await fetch(`http://localhost:8000/api/drivers/${driverId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, password: form.password, company_id: companyId })
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
          ) : nav === "dashboard" || nav === "reports" || nav === "settings" ? (
            <DashboardOverview stats={stats} navLabel={nav} onNavigate={setNav} />
          ) : (
            <ToursWorkspace
              drivers={drivers}
              query={query}
              setQuery={setQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              driverFilter={driverFilter}
              setDriverFilter={setDriverFilter}
              tourists={filtered}
              selected={selected}
              onSelect={setSelectedId}
              isDetailOpen={isDetailOpen}
              setIsDetailOpen={setIsDetailOpen}
              alertCounts={alertCounts}
              statusAlertCounts={statusAlertCounts}
              notifications={notifications}
              nav={nav}
              onResolveAlert={async (id) => {
                try {
                  await fetch(`http://localhost:8000/api/notifications/${id}/resolve`, { method: "PATCH" });
                  if (companyId) loadData(companyId);
                } catch (e) {
                  toast.error("Failed to resolve notification");
                }
              }}
              onAddClient={() => {
                setAddClientMode(nav === "leads" ? "lead" : "confirmed");
                setEditingTourist(undefined);
                setIsAddClientOpen(true);
              }}
              onConfirmTour={(t) => {
                setAddClientMode("confirmed");
                setEditingTourist(t);
                setIsAddClientOpen(true);
              }}
              onDeleteClient={async (id) => {
                console.log('DELETE called with id:', id);
                try {
                  const res = await fetch(`http://localhost:8000/api/tourists/${id}`, { method: 'DELETE' });
                  console.log('DELETE response status:', res.status);
                  if (res.ok) {
                    setTouristsList(prev => prev.filter(t => t.id !== id));
                    setIsDetailOpen(false);
                  } else {
                    const text = await res.text();
                    console.error('DELETE failed:', text);
                  }
                } catch (e) {
                  console.error("Failed to delete client", e);
                }
              }}
            />
          )}
        </main>

        <AddTouristSheet
          open={isAddClientOpen}
          onOpenChange={setIsAddClientOpen}
          mode={addClientMode}
          initialData={editingTourist}
          agents={agents}
          drivers={drivers}
          hotels={hotels}
          onAdd={async (newTourist) => {
            if (editingTourist) {
              setTouristsList(touristsList.map(t => t.id === newTourist.id ? newTourist : t));
            } else {
              setTouristsList([newTourist, ...touristsList]);
            }
            setSelectedId(newTourist.id);
            setIsDetailOpen(true);

            try {
              const matchedAgent = agents.find((a: any) => (a.agent_name || a.name) === newTourist.agent);
              const matchedDriver = drivers.find((d: any) => d.name === newTourist.driver);

              let arrivalStr = new Date().toISOString().split('T')[0];
              if (newTourist.arrival && newTourist.arrival !== 'TBD') {
                const parsed = new Date(newTourist.arrival);
                if (!isNaN(parsed.getTime())) {
                  arrivalStr = parsed.toISOString().split('T')[0];
                }
              }

              const payload = {
                name: newTourist.name || 'Unknown',
                passport_number: newTourist.passport || 'N/A',
                phone: newTourist.phone || 'N/A',
                email: newTourist.email || 'N/A',
                pax_count: newTourist.pax || 1,
                country: newTourist.country || 'Unknown',
                country_code: newTourist.countryCode || 'UN',
                arrival_date: arrivalStr,
                departure_date: (newTourist as any).departure && (newTourist as any).departure !== '' ? (newTourist as any).departure : null,
                duration: newTourist.duration || '1 Day',
                status: newTourist.status || 'Upcoming',
                is_lead: newTourist.isLead || false,
                company_id: companyId,
                agent_id: matchedAgent ? matchedAgent.id : null,
                driver_id: matchedDriver ? matchedDriver.id : null,
                group_members: (newTourist.group || []).map((g: any) => ({
                  name: g.name || 'Unknown',
                  passport_number: g.passport || 'N/A',
                  email: g.email || 'N/A',
                  phone: g.phone || null
                })),
                itineraries: (newTourist.itinerary || []).map((it: any) => ({
                  day_number: it.day || 1,
                  day_title: it.title || `Day ${it.day || 1}`,
                  stop_order: 1,
                  location_name: (it.destinations?.[0]?.location) || it.title || 'Unknown',
                  is_hotel_stay: !!it.hotel,
                  hotel_name: it.hotel || null,
                  hotel_email: it.hotelEmail || null,
                  destinations: (it.destinations || []).map((d: any) => ({
                    location_name: d.location || 'Unknown',
                    activities: Array.isArray(d.activities)
                      ? d.activities.filter(Boolean).join('\n')
                      : (d.activities || '')
                  }))
                }))
              };

              const url = editingTourist
                ? `http://localhost:8000/api/tourists/${editingTourist.id}`
                : 'http://localhost:8000/api/tourists';
              const method = editingTourist ? 'PUT' : 'POST';
              await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
            } catch (e) {
              console.error('Failed to save to db', e);
            }
          }}
        />

        {/* Right sidebar — show on all pages */}
        {!isDetailOpen && (
          <aside className="hidden w-[200px] shrink-0 flex-col border-l border-border bg-card/30 backdrop-blur-sm xl:flex">
            {/* Top section: Date */}
            <div className="flex items-start gap-2.5 px-4 py-4">
              <Popover open={calendarPopoverOpen} onOpenChange={setCalendarPopoverOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    title="Open Calendar"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-primary/10 bg-primary/5 text-primary mt-0.5 hover:bg-primary/10 hover:border-primary/20 transition-all cursor-pointer"
                  >
                    <CalendarDays className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[100] bg-card border border-border rounded-md shadow-md" align="start" side="bottom">
                  <UICalendar
                    mode="single"
                    selected={sidebarDate}
                    onSelect={setSidebarDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className="min-w-0">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Today</h3>
                {currentTime ? (
                  <div className="mt-0.5 text-[11px] font-semibold text-foreground leading-snug tabular-nums break-words">
                    {formattedDate}
                  </div>
                ) : (
                  <div className="mt-0.5 text-xs font-bold text-foreground opacity-50">Loading...</div>
                )}
              </div>
            </div>

            {/* Center: Brand logo */}
            <div className="flex flex-1 flex-col items-center justify-center px-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl" style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                boxShadow: '0 4px 16px rgba(59,130,246,0.15)',
              }}>
                <MapPinned className="h-5.5 w-5.5 text-white" strokeWidth={2} />
              </div>
            </div>

            {/* Pinned to the bottom of the sidebar: Live Time */}
            {currentTime && (
              <div className="mt-auto p-3">
                <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Local Time</span>
                  <span className="text-[15px] font-extrabold tracking-tight text-primary tabular-nums">
                    {formattedTime}
                  </span>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}

/* ---------- Right-panel pieces ---------- */

function StatTile({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string;
  value: number;
  tone: "success" | "info" | "default";
  icon: typeof Activity;
}) {
  const iconColor =
    tone === "success"
      ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
      : tone === "info"
        ? "text-blue-500 bg-blue-500/10 border-blue-500/20"
        : "text-slate-500 bg-slate-500/10 border-slate-500/20";

  return (
    <div className="group rounded-xl border border-border bg-card p-3.5 transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 relative overflow-hidden">
      {/* Subtle background tone glow on hover */}
      <div className={cn(
        "absolute -right-6 -bottom-6 h-16 w-16 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300",
        tone === "success" && "bg-emerald-500",
        tone === "info" && "bg-blue-500",
        tone === "default" && "bg-slate-500"
      )} />

      <div className="flex items-center justify-between gap-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">{label}</div>
        <div className={cn("grid h-6 w-6 place-items-center rounded-lg border text-xs", iconColor)}>
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-xl font-extrabold tracking-tight text-foreground leading-none">{value}</span>
        <span className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "success" && "bg-emerald-500",
          tone === "info" && "bg-blue-500",
          tone === "default" && "bg-slate-400"
        )} />
      </div>
    </div>
  );
}

function NotificationItem({
  n,
  onResolve,
}: {
  n: { id: string; type: string; title: string; body: string; time: string; resolved?: boolean };
  onResolve?: (id: string) => void;
}) {
  const Icon = n.type === "alert" ? AlertTriangle : n.type === "warn" ? Info : CheckCircle2;
  const color =
    n.type === "alert"
      ? "text-destructive"
      : n.type === "warn"
        ? "text-warning"
        : "text-success";
  return (
    <div className={cn("rounded-xl border border-border p-3 transition-all hover:bg-accent/40", n.resolved ? "bg-muted/30" : "bg-card shadow-sm")}>
      <div className="flex items-start gap-2.5">
        <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", color)} />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium leading-tight">{n.title}</div>
          <div className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">{n.body}</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-[10px] text-muted-foreground/70">{n.time}</div>
            {!n.resolved && onResolve && (
              <Button variant="outline" size="sm" onClick={() => onResolve(n.id)} className="h-7 text-xs px-3 rounded-lg">
                Mark as Resolved
              </Button>
            )}
            {n.resolved && (
              <Badge variant="outline" className="text-[10px] font-normal text-muted-foreground bg-muted/50 border-border">Resolved</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Tours workspace ---------- */

function ToursWorkspace({
  drivers,
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
  driverFilter,
  setDriverFilter,
  tourists,
  selected,
  onSelect,
  isDetailOpen,
  setIsDetailOpen,
  alertCounts,
  statusAlertCounts,
  notifications,
  onResolveAlert,
  onAddClient,
  onConfirmTour,
  onDeleteClient,
  nav,
}: {
  drivers: any[];
  query: string;
  setQuery: (v: string) => void;
  statusFilter: "all" | TourStatus;
  setStatusFilter: (v: "all" | TourStatus) => void;
  driverFilter: string;
  setDriverFilter: (v: string) => void;
  tourists: Tourist[];
  selected: Tourist;
  onSelect: (id: string) => void;
  isDetailOpen: boolean;
  setIsDetailOpen: (v: boolean) => void;
  alertCounts: Record<string, number>;
  statusAlertCounts: Record<string, number>;
  notifications: any[];
  onResolveAlert: (id: string) => void;
  onAddClient: () => void;
  onConfirmTour: (t: Tourist) => void;
  onDeleteClient: (id: string) => void;
  nav: string;
}) {
  const wsRouter = useRouter();
  const [driverPopoverOpen, setDriverPopoverOpen] = useState(false);
  const [driverSearchQuery, setDriverSearchQuery] = useState("");

  useEffect(() => {
    if (!driverPopoverOpen) {
      setDriverSearchQuery("");
    }
  }, [driverPopoverOpen]);

  const filteredDriversForFilter = useMemo(() => {
    const query = driverSearchQuery.trim().toLowerCase();
    if (!query) return drivers;
    return drivers.filter((d: any) => d.name?.toLowerCase().includes(query));
  }, [drivers, driverSearchQuery]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {isDetailOpen ? (
        <div className="flex-1 bg-background overflow-hidden">
          <TouristDetail
            t={selected}
            onBack={() => setIsDetailOpen(false)}
            notifications={notifications}
            onResolveAlert={onResolveAlert}
            onConfirmTour={() => onConfirmTour(selected)}
            onEditClient={() => onConfirmTour(selected)}
            onDeleteClient={() => onDeleteClient(selected.id)}
          />
        </div>
      ) : (
        <>
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border bg-card/60 backdrop-blur-md px-6 py-2.5">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, country, or passport number…"
                className="h-8.5 pl-9 rounded-lg border-border/80 bg-background/50 hover:bg-background/80 focus:bg-background shadow-none transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary/30 text-xs"
              />
            </div>
            <Popover open={driverPopoverOpen} onOpenChange={setDriverPopoverOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center justify-between h-8.5 w-[170px] px-3 rounded-lg border border-border/80 bg-background text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/40 hover:border-border transition-all duration-200 cursor-pointer focus:outline-none"
                >
                  <span className="truncate">
                    {driverFilter === "All Drivers" ? "Driver/Guide" : driverFilter}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0 ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[200px] flex flex-col z-[100] bg-card border border-border rounded-lg shadow-md" align="end">
                <div className="p-2 border-b border-border">
                  <Input
                    placeholder="Search driver..."
                    value={driverSearchQuery}
                    onChange={(e) => setDriverSearchQuery(e.target.value)}
                    className="h-8 text-xs focus-visible:ring-0"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto flex-1 max-h-[200px] py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setDriverFilter("All Drivers");
                      setDriverPopoverOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center rounded-sm cursor-pointer",
                      driverFilter === "All Drivers" && "font-semibold bg-accent/50"
                    )}
                  >
                    All Drivers
                  </button>
                  {filteredDriversForFilter.map((d: any) => (
                    <button
                      type="button"
                      onClick={() => {
                        setDriverFilter(d.name);
                        setDriverPopoverOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center rounded-sm cursor-pointer",
                        driverFilter === d.name && "font-semibold bg-accent/50"
                      )}
                    >
                      <span className="truncate">{d.name}</span>
                    </button>
                  ))}
                  {filteredDriversForFilter.length === 0 && (
                    <div className="text-[10px] text-muted-foreground text-center py-2">No drivers found</div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-center border-b border-border bg-accent/10 dark:bg-slate-950/10 px-6 py-2">
            <div className="flex bg-muted/60 dark:bg-slate-900/40 p-0.5 rounded-lg border border-border/40 gap-1 shadow-sm">
              {[
                {
                  key: "all",
                  label: "All Statuses",
                  icon: Layers,
                  activeBorder: "border-border/60 dark:border-border/50",
                  activeText: "text-foreground bg-background",
                  iconClass: "text-muted-foreground/80 dark:text-muted-foreground/60"
                },
                {
                  key: "Active",
                  label: "Active",
                  icon: Plane,
                  activeBorder: "border-teal-200/60 dark:border-teal-900/40",
                  activeText: "text-teal-600 dark:text-teal-400 bg-background",
                  iconClass: "text-teal-600 dark:text-teal-400"
                },
                {
                  key: "Upcoming",
                  label: "Upcoming",
                  icon: Clock,
                  activeBorder: "border-indigo-200/60 dark:border-indigo-900/40",
                  activeText: "text-indigo-600 dark:text-indigo-400 bg-background",
                  iconClass: "text-indigo-600 dark:text-indigo-400"
                },
                {
                  key: "Completed",
                  label: "Completed",
                  icon: CheckCircle2,
                  activeBorder: "border-purple-200/60 dark:border-purple-900/40",
                  activeText: "text-purple-600 dark:text-purple-400 bg-background",
                  iconClass: "text-purple-600 dark:text-purple-400"
                },
                {
                  key: "Cancelled",
                  label: "Cancelled",
                  icon: XCircle,
                  activeBorder: "border-orange-200/60 dark:border-orange-900/40",
                  activeText: "text-orange-600 dark:text-orange-400 bg-background",
                  iconClass: "text-orange-600 dark:text-orange-400"
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = statusFilter === tab.key;
                const hasAlert = (tab.key === "Active" || tab.key === "Upcoming") && statusAlertCounts[tab.key] > 0;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setStatusFilter(tab.key as any)}
                    className={cn(
                      "group flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-semibold rounded-md transition-all duration-200 cursor-pointer border shadow-[none]",
                      active
                        ? cn("shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]", tab.activeBorder, tab.activeText)
                        : "text-muted-foreground border-transparent hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    <div className="relative flex items-center justify-center">
                      <Icon className={cn("h-3 w-3 shrink-0 transition-transform duration-200 group-hover:scale-105", active ? tab.iconClass : "text-muted-foreground/60")} />
                      {hasAlert && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
                        </span>
                      )}
                    </div>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tourist List */}
          <div className="flex min-h-0 flex-1">
            <div className="flex w-full flex-col">
              <div className="flex items-center justify-between bg-accent/30 px-5 py-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                  {nav === "leads" ? (
                    <MessageCircle className="h-3 w-3" />
                  ) : (
                    <Users className="h-3 w-3" />
                  )}
                  <span>
                    {tourists.length} {nav === "leads" ? (tourists.length === 1 ? "Inquiry" : "Inquiries") : (tourists.length === 1 ? "Tourist" : "Tourists")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[10px] text-muted-foreground/70 font-medium">Sorted by status</div>
                  <Button size="sm" onClick={onAddClient} className="gap-1.5 h-7 px-3 text-[11px] rounded-lg shadow-sm">
                    {nav === "leads" ? (
                      <>
                        <MessageCircle className="h-3 w-3" />
                        Add Inquiry
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-3 w-3" />
                        Add Client
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="space-y-2 p-4">
                  {[...tourists].sort((a, b) => {
                    const order: Record<string, number> = { Active: 0, "On Tour": 0, Upcoming: 1, Completed: 2, Cancelled: 3 };
                    return (order[a.status] ?? 4) - (order[b.status] ?? 4);
                  }).map((t) => {
                    const hasAlerts = (alertCounts[t.id] || 0) > 0;
                    const isEngaged = t.status === "Active" || t.status === "On Tour";
                    const statusBorder = t.status === "Active" || t.status === "On Tour"
                      ? "border-l-teal-500"
                      : t.status === "Upcoming"
                        ? "border-l-indigo-400"
                        : t.status === "Completed"
                          ? "border-l-purple-400"
                          : t.status === "Cancelled"
                            ? "border-l-orange-400"
                            : "border-l-slate-300 dark:border-l-slate-600";
                    return (
                      <div
                        key={t.id}
                        onClick={() => {
                          onSelect(t.id);
                          setIsDetailOpen(true);
                        }}
                        className={cn(
                          "group cursor-pointer rounded-xl border border-border bg-card px-5 py-4 transition-all duration-300 relative border-l-[3px]",
                          statusBorder,
                          hasAlerts
                            ? "animate-[alert-glow_3s_ease-in-out_infinite] z-10 hover:brightness-110"
                            : "hover:shadow-md hover:-translate-y-0.5 hover:border-border",
                          isEngaged && !hasAlerts && "bg-teal-50/30 dark:bg-teal-950/10"
                        )}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-4">
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/60 text-sm relative border border-border/40">
                              {t.countryCode && t.countryCode !== "UN" ? (
                                <img
                                  src={`https://flagcdn.com/w20/${t.countryCode.toLowerCase()}.png`}
                                  width="20"
                                  height="15"
                                  alt={t.country}
                                  className="object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const parent = (e.target as HTMLElement).parentElement;
                                    if (parent) {
                                      const fallback = parent.querySelector('.flag-fallback');
                                      if (fallback) (fallback as HTMLElement).style.display = 'block';
                                    }
                                  }}
                                />
                              ) : null}
                              <div
                                className="flag-fallback text-muted-foreground"
                                style={{ display: (!t.countryCode || t.countryCode === "UN") ? "block" : "none" }}
                              >
                                <Globe2 className="h-4 w-4" />
                              </div>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-3">
                                <span className="truncate text-[14px] font-semibold text-foreground">{t.name}</span>
                                <StatusPill status={t.status} />
                              </div>
                              <div className="mt-1 truncate text-xs text-muted-foreground">
                                {t.country} · {t.pax} Pax · {t.duration}
                              </div>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="flex items-center justify-end gap-1.5 text-xs font-medium text-foreground">
                              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                              {t.currentLocation}
                            </div>
                            <div className="mt-1 text-[11px] text-muted-foreground">Driver: {t.driver.split(" ")[0]}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {tourists.length === 0 && (
                    <div className="p-10 text-center text-sm text-muted-foreground">
                      No tourists match these filters.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: TourStatus }) {
  const displayStatus = status === "On Tour" ? "Active" : status;
  const config: Record<TourStatus, { color: string; icon: any }> = {
    Active: {
      color: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20",
      icon: Plane,
    },
    Upcoming: {
      color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
      icon: Clock,
    },
    Completed: {
      color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
      icon: CheckCircle2,
    },
    "On Tour": {
      color: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20",
      icon: Navigation,
    },
    Cancelled: {
      color: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
      icon: XCircle,
    },
  };

  const { color, icon: Icon } = config[displayStatus] || { color: "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20", icon: Clock };

  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1 rounded-full border px-2 text-[10px] font-semibold tracking-wide",
        color
      )}
    >
      <Icon className="h-2.5 w-2.5" strokeWidth={2.5} />
      {displayStatus}
    </span>
  );
}

function TouristDetail({
  t,
  onBack,
  notifications,
  onResolveAlert,
  onConfirmTour,
  onEditClient,
  onDeleteClient
}: {
  t: Tourist;
  onBack?: () => void;
  notifications: any[];
  onResolveAlert: (id: string) => void;
  onConfirmTour: () => void;
  onEditClient?: () => void;
  onDeleteClient: () => void;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const personAlerts = notifications.filter((n) => n.touristId === t.id || n.touristId === "all");
  const activeAlerts = personAlerts.filter((n) => !n.resolved);
  const activeComplains = activeAlerts.filter((n) => n.type === "alert");
  const activeGuideNotices = activeAlerts.filter((n) => n.type !== "alert");
  const resolvedAlerts = personAlerts.filter((n) => n.resolved);

  return (
    <ScrollArea className="h-full">
      <div key={t.id} className="animate-in fade-in slide-in-from-right-2 duration-200">
        {/* Header */}
        <div className="border-b border-border bg-card/90 backdrop-blur-sm px-7 py-5">
          {onBack && (
            <div className="mb-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 -ml-2 text-muted-foreground hover:text-foreground rounded-lg transition-all duration-200">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to list
              </Button>
            </div>
          )}
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/60 text-xl relative border border-border/40">
                {t.countryCode && t.countryCode !== "UN" ? (
                  <img
                    src={`https://flagcdn.com/w20/${t.countryCode.toLowerCase()}.png`}
                    width="28"
                    height="21"
                    alt={t.country}
                    className="object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent) {
                        const fallback = parent.querySelector('.flag-fallback');
                        if (fallback) (fallback as HTMLElement).style.display = 'block';
                      }
                    }}
                  />
                ) : null}
                <div
                  className="flag-fallback text-muted-foreground"
                  style={{ display: (!t.countryCode || t.countryCode === "UN") ? "block" : "none" }}
                >
                  <Globe2 className="h-5 w-5" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-[16px] font-bold tracking-tight text-foreground">{t.name}</h2>
                  <StatusPill status={t.status} />
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {t.currentLocation}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {t.duration}
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden shrink-0 gap-2 sm:flex">
              {t.isLead && (
                <Button variant="default" size="sm" onClick={onConfirmTour} className="gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm h-8 text-xs">
                  Confirm Tour
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onEditClient} className="gap-2 border-primary text-primary hover:bg-primary/10 rounded-lg h-8 text-xs">
                <Settings2 className="h-3.5 w-3.5" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 rounded-lg h-8 text-xs"
                onClick={() => {
                  if (t.phone) {
                    const num = t.phone.replace(/[^0-9]/g, '');
                    window.open(`https://wa.me/${num}`, '_blank');
                  }
                }}
              >
                <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" className="gap-2 rounded-lg h-8 text-xs" onClick={() => t.email && (window.location.href = `mailto:${t.email}`)}>
                <Mail className="h-3.5 w-3.5" />
                Email
              </Button>
              <Button size="sm" className="rounded-lg shadow-sm h-8 text-xs">Open Booking</Button>
            </div>
          </div>
        </div>

        {activeAlerts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-7 pt-5">
            {activeComplains.length > 0 && (
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border mb-3">
                  <h3 className="text-sm font-semibold text-destructive flex items-center gap-2 pb-2">
                    <AlertTriangle className="h-4 w-4" />
                    Client Complain
                  </h3>
                  <Badge variant="destructive" className="h-5 px-1.5 text-[10px] mb-2">
                    {activeComplains.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {activeComplains.map((n) => (
                    <NotificationItem key={n.id} n={n} onResolve={onResolveAlert} />
                  ))}
                </div>
              </div>
            )}

            {activeGuideNotices.length > 0 && (
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border mb-3">
                  <h3 className="text-sm font-semibold text-orange-500 flex items-center gap-2 pb-2">
                    <MessageCircle className="h-4 w-4" />
                    Guide Notice
                  </h3>
                  <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20 h-5 px-1.5 text-[10px] mb-2">
                    {activeGuideNotices.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {activeGuideNotices.map((n) => (
                    <NotificationItem key={n.id} n={n} onResolve={onResolveAlert} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {resolvedAlerts.length > 0 && (
          <div className="px-7 pt-5">
            <div className="flex items-center justify-between pb-2 border-b border-border mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 pb-2">
                <CheckCircle2 className="h-4 w-4" />
                Alert History
              </h3>
              <Badge variant="outline" className="h-5 px-1.5 text-[10px] mb-2 font-normal">
                {resolvedAlerts.length}
              </Badge>
            </div>
            <div className="space-y-2 opacity-70">
              {resolvedAlerts.map((n) => (
                <NotificationItem key={n.id} n={n} />
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="contact" className="px-7 py-5">
          <TabsList>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="group">Group ({t.group.length + 1})</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="mt-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoField icon={Users} label="Full Name" value={t.name} />
              <InfoField icon={CreditCard} label="Passport Number" value={t.passport || "N/A"} />
              <InfoField icon={Phone} label="Phone" value={t.phone || "N/A"} />
              <InfoField icon={Mail} label="Email" value={t.email || "N/A"} />
              <InfoField icon={Briefcase} label="Assigned Agent" value={t.agent && t.agent !== "All Agents" ? t.agent : "Unassigned"} />
              <InfoField icon={Car} label="Assigned Driver" value={t.driver && t.driver !== "All Drivers" ? t.driver : "Unassigned"} />
            </div>
          </TabsContent>

          <TabsContent value="group" className="mt-5">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <table className="w-full text-sm text-left">
                <thead className="bg-accent/30 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Traveler</th>
                    <th className="px-4 py-2.5 font-semibold">Passport No.</th>
                    <th className="px-4 py-2.5 font-semibold hidden sm:table-cell">Phone</th>
                    <th className="px-4 py-2.5 font-semibold hidden md:table-cell">Email</th>
                    <th className="px-4 py-2.5 font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-2.5 font-medium">{t.name}</td>
                    <td className="px-4 py-2.5 font-mono text-xs">{t.passport}</td>
                    <td className="px-4 py-2.5 text-xs hidden sm:table-cell">{t.phone}</td>
                    <td className="px-4 py-2.5 text-xs hidden md:table-cell">{t.email}</td>
                    <td className="px-4 py-2.5"><Badge variant="secondary">Lead</Badge></td>
                  </tr>
                  {t.group.map((g) => (
                    <tr key={g.passport} className="border-t border-border">
                      <td className="px-4 py-2.5">{g.name}</td>
                      <td className="px-4 py-2.5 font-mono text-xs">{g.passport}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground hidden sm:table-cell">{g.phone || "—"}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground hidden md:table-cell">{g.email || "—"}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">Companion</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="mt-5">
            <ol className="relative ml-3 space-y-5 border-l border-border pl-6">
              {t.itinerary.map((d) => (
                <li key={d.day} className="relative">
                  <span className="absolute -left-[31px] top-0.5 grid h-6 w-6 place-items-center rounded-full border-2 border-background bg-primary text-[10px] font-semibold text-primary-foreground">
                    {d.day.toString().padStart(2, "0")}
                  </span>
                  <div className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <div>
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">
                            Day {d.day.toString().padStart(2, "0")} {d.location ? `· ${d.location}` : ""}
                          </div>
                          <div className="mt-0.5 text-sm font-semibold">{d.title}</div>
                        </div>
                        {d.status === 'Completed' ? (
                          <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20">
                            <CheckCircle2 className="h-3 w-3" /> Arrived
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
                            <Clock className="h-3 w-3" /> Pending
                          </div>
                        )}
                      </div>
                    </div>

                    {d.destinations && d.destinations.length > 0 ? (
                      <div className="mt-4 space-y-4">
                        {d.destinations.map((dest, i) => (
                          <div key={i} className="space-y-1.5 relative pl-4 border-l-2 border-muted">
                            <span className="absolute -left-1.5 top-1.5 h-2 w-2 rounded-full bg-primary/40 ring-4 ring-background" />
                            <h4 className="text-sm font-medium">{dest.location}</h4>
                            <p className="text-[13px] text-muted-foreground leading-relaxed whitespace-pre-wrap">{dest.activities}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                        {d.activities?.map((a, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-4 grid gap-2 rounded-xl bg-accent/30 p-3 sm:grid-cols-[1fr_1fr_auto] items-center">
                      <div className="flex items-center gap-2 text-xs">
                        <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="font-medium">{d.hotel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="truncate">{d.hotelEmail}</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1.5 w-full sm:w-auto bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 rounded-lg dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 dark:hover:bg-blue-500/20">
                            <Send className="h-3 w-3" />
                            Review Auto-Generated Email
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Review Confirmation Email</DialogTitle>
                            <DialogDescription>Automated email to {d.hotelEmail}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-2">
                            <div className="grid gap-2">
                              <Label>From</Label>
                              <Input disabled defaultValue="info@ceylonsignaturetravels.com" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="subject">Subject</Label>
                              <Input id="subject" defaultValue={`Booking Confirmation for ${t.name} (Ref: ${t.id})`} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="message">Message</Label>
                              <textarea
                                id="message"
                                className="flex min-h-[160px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue={`Dear Reservation Team at ${d.hotel},\n\nWe would like to confirm the booking for our client, ${t.name} (Group Size: ${t.pax}), arriving for Day ${d.day} of their tour.\n\nPlease let us know if everything is confirmed on your end and provide any relevant reservation numbers.\n\nBest regards,\nCeylon Signature Travels`}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Send Confirmation</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </TabsContent>
        </Tabs>

        <div className="px-7 pb-10 pt-6 mt-8 border-t border-border/50">
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto rounded-lg">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete <strong>{t.name}</strong> and remove all of their data, itineraries, and group members from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={() => {
                  setDeleteOpen(false);
                  onDeleteClient();
                  toast.success("Client deleted successfully");
                  if (onBack) onBack();
                }}>
                  Yes, delete client
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </ScrollArea>
  );
}

function InfoField({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200 dark:bg-card dark:border-slate-800 dark:hover:border-slate-700 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <div className="grid h-6 w-6 place-items-center rounded-md bg-primary/5 border border-primary/10">
          <Icon className="h-3 w-3 text-primary" />
        </div>
        {label}
      </div>
      <div className="break-words text-[14px] font-semibold text-slate-900 dark:text-slate-100">{value}</div>
    </div>
  );
}

/* ---------- Agent management ---------- */

function AgentManagement({ agents, onAddAgent, onEditAgent, onDeleteAgent }: {
  agents: any[];
  onAddAgent: (form: any) => void;
  onEditAgent: (agent: any, form: any) => void;
  onDeleteAgent: (agentId: string) => void;
}) {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", region: "" });
  const [editForm, setEditForm] = useState({ name: "", email: "", region: "" });

  const [addRegionOpen, setAddRegionOpen] = useState(false);
  const [addSearch, setAddSearch] = useState("");
  const [editRegionOpen, setEditRegionOpen] = useState(false);
  const [editSearch, setEditSearch] = useState("");

  function submitAdd() {
    if (!form.name || !form.email) {
      toast.error("Name and email required");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    onAddAgent(form);
    setForm({ name: "", email: "", region: "" });
    setAddOpen(false);
    toast.success("Agent profile created");
  }

  function submitEdit() {
    if (!editForm.name || !editForm.email) {
      toast.error("Name and email required");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(editForm.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    onEditAgent(editingAgent, editForm);
    setEditOpen(false);
    toast.success("Agent updated successfully");
  }

  function openEdit(a: any) {
    setEditingAgent(a);
    setEditForm({ name: a.agent_name || a.name || "", email: a.email || "", region: a.region || "" });
    setEditOpen(true);
  }

  function openDelete(a: any) {
    setEditingAgent(a);
    setDeleteOpen(true);
  }

  const regions = [
    "Americas",
    "Caribbean",
    "Central Africa",
    "Central Asia",
    "East Africa",
    "East Asia",
    "Eastern Europe",
    "Europe",
    "Middle East",
    "North Africa",
    "North America",
    "Northern Europe",
    "Oceania",
    "South Africa",
    "South America",
    "South Asia",
    "Southeast Asia",
    "Southern Africa",
    "Southern Europe",
    "West Africa",
    "Western Europe"
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-accent/30 px-6 py-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
          <Briefcase className="h-3.5 w-3.5" />
          <span>
            {agents.length} Agents · {agents.reduce((s, a) => s + (a.clients || 0), 0)} Clients Under Management
          </span>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 rounded-lg shadow-sm text-xs h-8">
              <UserPlus className="h-3.5 w-3.5" />
              Add Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new agent</DialogTitle>
              <DialogDescription>Create a profile for a new team member.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label htmlFor="ag-name">Full name</Label>
                <Input id="ag-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Amara Jayawardena" />
              </div>
              <div>
                <Label htmlFor="ag-email">Email</Label>
                <Input id="ag-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="amara@horizon.travel" />
              </div>
              <div>
                <Label htmlFor="ag-region">Assigned region</Label>
                <Popover open={addRegionOpen} onOpenChange={setAddRegionOpen}>
                  <PopoverTrigger asChild>
                    <button
                      id="ag-region"
                      type="button"
                      className="w-full flex items-center justify-between h-9 px-3 py-2 text-sm rounded-md border border-input bg-background hover:bg-muted text-left cursor-pointer"
                    >
                      <span className={form.region ? "text-foreground" : "text-muted-foreground"}>
                        {form.region || "Choose a region"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[240px] flex flex-col z-[100] bg-card border border-border rounded-md shadow-md" align="start">
                    <div className="p-2 border-b border-border">
                      <Input
                        placeholder="Search region..."
                        value={addSearch}
                        onChange={(e) => setAddSearch(e.target.value)}
                        className="h-8 text-xs focus-visible:ring-0"
                        autoFocus
                      />
                    </div>
                    <div className="overflow-y-auto flex-1 max-h-[200px] py-1">
                      {regions
                        .filter((r) => r.toLowerCase().includes(addSearch.toLowerCase()))
                        .map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => {
                              setForm({ ...form, region: r });
                              setAddRegionOpen(false);
                              setAddSearch("");
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between rounded-sm cursor-pointer"
                          >
                            <span className="text-slate-700 dark:text-slate-300">{r}</span>
                            {form.region === r && (
                              <span className="h-2 w-2 rounded-full bg-blue-500" />
                            )}
                          </button>
                        ))}
                      {regions.filter((r) => r.toLowerCase().includes(addSearch.toLowerCase())).length === 0 && (
                        <div className="text-[10px] text-muted-foreground text-center py-2">No regions found</div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button onClick={submitAdd}>Create agent</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
            <DialogDescription>Update the agent's profile information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Full name</Label>
              <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Full name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" />
            </div>
            <div>
              <Label>Assigned region</Label>
              <Popover open={editRegionOpen} onOpenChange={setEditRegionOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between h-9 px-3 py-2 text-sm rounded-md border border-input bg-background hover:bg-muted text-left cursor-pointer"
                  >
                    <span className={editForm.region ? "text-foreground" : "text-muted-foreground"}>
                      {editForm.region || "Choose a region"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[240px] flex flex-col z-[100] bg-card border border-border rounded-md shadow-md" align="start">
                  <div className="p-2 border-b border-border">
                    <Input
                      placeholder="Search region..."
                      value={editSearch}
                      onChange={(e) => setEditSearch(e.target.value)}
                      className="h-8 text-xs focus-visible:ring-0"
                      autoFocus
                    />
                  </div>
                  <div className="overflow-y-auto flex-1 max-h-[200px] py-1">
                    {regions
                      .filter((r) => r.toLowerCase().includes(editSearch.toLowerCase()))
                      .map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => {
                            setEditForm({ ...editForm, region: r });
                            setEditRegionOpen(false);
                            setEditSearch("");
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between rounded-sm cursor-pointer"
                        >
                          <span className="text-slate-700 dark:text-slate-300">{r}</span>
                          {editForm.region === r && (
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </button>
                      ))}
                    {regions.filter((r) => r.toLowerCase().includes(editSearch.toLowerCase())).length === 0 && (
                      <div className="text-[10px] text-muted-foreground text-center py-2">No regions found</div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={submitEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Agent?</DialogTitle>
            <DialogDescription>
              This will permanently delete <strong>{editingAgent?.agent_name || editingAgent?.name}</strong>. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => {
              setDeleteOpen(false);
              onDeleteAgent(editingAgent.id);
              toast.success("Agent deleted");
            }}>Yes, delete agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <ScrollArea className="flex-1">
        <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3">
          {agents.map((a: any) => {
            const initials = (a.agent_name || a.name || "?")
              .split(" ")
              .map((p: any) => p[0])
              .slice(0, 2)
              .join("");
            return (
              <div
                key={a.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/20"
              >
                {/* Visual accent left line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/40 transition-colors group-hover:bg-primary" />

                {/* Hover action buttons */}
                <div className="absolute right-3 top-3 flex items-center gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100 bg-background/95 backdrop-blur-sm p-1 rounded-lg border border-border shadow-sm">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/5"
                    onClick={() => openEdit(a)}
                    title="Edit agent"
                  >
                    <Settings2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                    onClick={() => openDelete(a)}
                    title="Delete agent"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="flex items-start gap-4">
                  {/* Initial Badge with slate styling */}
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/5 border border-primary/10 text-primary font-bold text-sm">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="truncate text-sm font-bold text-foreground mb-0.5">
                      {a.agent_name || a.name}
                    </div>
                    {a.email && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                        <span className="truncate">{a.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="my-3.5 bg-border/40" />

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Region</div>
                    <div className="mt-1 flex items-center gap-1 font-semibold text-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                      <span>{a.region || "Unassigned"}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Clients</div>
                    <div className="mt-1 font-bold text-sm text-primary">
                      {a.clients || 0}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}



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
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  async function submit() {
    if (!form.name || !form.phone || !form.email) {
      toast.error("Name, phone, and email required");
      return;
    }
    
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Sri Lankan phone number validation
    let cleanPhone = form.phone.replace(/[\s\-\(\)]/g, "");
    if (cleanPhone.startsWith("+94")) {
      cleanPhone = cleanPhone.slice(3);
    } else if (cleanPhone.startsWith("94")) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.startsWith("0")) {
      cleanPhone = cleanPhone.slice(1);
    }

    const slPhoneRegex = /^[1-9]\d{8}$/;
    if (!slPhoneRegex.test(cleanPhone)) {
      toast.error("Invalid phone number. Must be a valid Sri Lankan number (e.g., 77 123 4567)");
      return;
    }

    const finalPhone = `+94${cleanPhone}`;

    try {
      await onAddDriver({ ...form, phone: finalPhone });
      setForm({ name: "", phone: "", email: "", password: "" });
      setOpen(false);
    } catch (e) {
      toast.error("Failed to add driver. Please try again.");
    }
  }

  async function submitEdit() {
    if (!form.name || !form.phone || !form.email) {
      toast.error("Name, phone, and email required");
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Sri Lankan phone number validation
    let cleanPhone = form.phone.replace(/[\s\-\(\)]/g, "");
    if (cleanPhone.startsWith("+94")) {
      cleanPhone = cleanPhone.slice(3);
    } else if (cleanPhone.startsWith("94")) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.startsWith("0")) {
      cleanPhone = cleanPhone.slice(1);
    }

    const slPhoneRegex = /^[1-9]\d{8}$/;
    if (!slPhoneRegex.test(cleanPhone)) {
      toast.error("Invalid phone number. Must be a valid Sri Lankan number (e.g., 77 123 4567)");
      return;
    }

    const finalPhone = `+94${cleanPhone}`;

    if (selectedDriver) {
      try {
        await onUpdateDriver(selectedDriver.id, { ...form, phone: finalPhone });
      } catch (e) {
        toast.error("Failed to update driver.");
        return;
      }
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
    let rawPhone = driver.phone || "";
    let cleanPhone = rawPhone.replace(/[\s\-\(\)]/g, "");
    if (cleanPhone.startsWith("+94")) {
      cleanPhone = cleanPhone.slice(3);
    } else if (cleanPhone.startsWith("94")) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.startsWith("0")) {
      cleanPhone = cleanPhone.slice(1);
    }
    setForm({ name: driver.name || "", phone: cleanPhone, email: driver.email || "", password: "" });
    setEditOpen(true);
  }

  function openDelete(driver: any) {
    setSelectedDriver(driver);
    setDeleteOpen(true);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-accent/30 px-6 py-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
          <Car className="h-3.5 w-3.5" />
          <span>
            {drivers.length} Drivers & Guides
          </span>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 rounded-lg shadow-sm text-xs h-8">
              <UserPlus className="h-3.5 w-3.5" />
              Add Driver / Guide
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new driver / guide</DialogTitle>
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
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm font-semibold select-none">
                    🇱🇰 +94
                  </span>
                  <Input
                    id="drv-phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="77 123 4567"
                    className="rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

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

            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={submit}>Create profile</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>


      <ScrollArea className="flex-1">
        <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3">
          {drivers.map((d: any) => {
            const initials = (d.name || "?")
              .split(" ")
              .map((p: any) => p[0])
              .slice(0, 2)
              .join("");
            return (
              <div
                key={d.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/20"
              >
                {/* Visual accent left line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/40 transition-colors group-hover:bg-primary" />

                {/* Actions (visible on hover) */}
                <div className="absolute right-3 top-3 flex items-center gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100 bg-background/95 backdrop-blur-sm p-1 rounded-lg border border-border shadow-sm">
                  {d.password && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/5"
                      onClick={() => {
                        navigator.clipboard.writeText(`Email: ${d.email}\nPassword: ${d.password}`);
                        toast.success("Credentials copied!");
                      }}
                      title="Copy Credentials"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/5"
                    onClick={() => openEdit(d)}
                  >
                    <Settings2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                    onClick={() => openDelete(d)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="flex items-start gap-4">
                  {/* Avatar Initials Badge */}
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/5 border border-primary/10 text-primary font-bold text-sm">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="truncate text-sm font-bold text-foreground mb-0.5">
                      {d.name}
                    </div>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                        <span className="truncate">{d.phone}</span>
                      </div>
                      {d.email && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                          <span className="truncate">{d.email}</span>
                        </div>
                      )}
                    </div>
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
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm font-semibold select-none">
                  🇱🇰 +94
                </span>
                <Input
                  id="edit-drv-phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="77 123 4567"
                  className="rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-drv-email">Email</Label>
              <Input
                id="edit-drv-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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


/* ---------- Dashboard placeholder ---------- */

function DashboardOverview({
  stats,
  navLabel,
  onNavigate,
}: {
  stats: { active: number; upcoming: number; pax: number; countries: number };
  navLabel: NavKey;
  onNavigate: (key: NavKey) => void;
}) {
  const tiles = [
    {
      label: "Active tours",
      value: stats.active,
      hint: "Currently in country",
      color: "teal",
      bgClass: "bg-teal-50 dark:bg-teal-950/10",
      textClass: "text-teal-600 dark:text-teal-400",
      borderClass: "border-teal-100 dark:border-teal-900/30",
      accentLine: "bg-teal-500",
      icon: Plane,
    },
    {
      label: "Upcoming arrivals",
      value: stats.upcoming,
      hint: "Next 30 days",
      color: "indigo",
      bgClass: "bg-indigo-50 dark:bg-indigo-950/10",
      textClass: "text-indigo-600 dark:text-indigo-400",
      borderClass: "border-indigo-100 dark:border-indigo-900/30",
      accentLine: "bg-indigo-500",
      icon: CalendarRange,
    },
    {
      label: "Travelers on tour",
      value: stats.pax,
      hint: "Total pax in service",
      color: "emerald",
      bgClass: "bg-emerald-50 dark:bg-emerald-950/10",
      textClass: "text-emerald-600 dark:text-emerald-400",
      borderClass: "border-emerald-100 dark:border-emerald-900/30",
      accentLine: "bg-emerald-500",
      icon: Users2,
    },
    {
      label: "Source countries",
      value: stats.countries,
      hint: "Markets this month",
      color: "amber",
      bgClass: "bg-amber-50 dark:bg-amber-950/10",
      textClass: "text-amber-600 dark:text-amber-400",
      borderClass: "border-amber-100 dark:border-amber-900/30",
      accentLine: "bg-amber-500",
      icon: Globe2,
    },
  ];

  const labelMap: Record<NavKey, string> = {
    dashboard: "Dashboard",
    tours: "Active Tours",
    leads: "Inquiries & Leads",
    agents: "Agent Management",
    drivers: "Drivers & Guides",
    reports: "Reports",
    settings: "Settings",
  };

  return (
    <ScrollArea className="flex-1">
      <div className="p-6">
        {navLabel !== "settings" && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {tiles.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.label}
                  className={cn(
                    "relative overflow-hidden rounded-xl border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                    t.borderClass
                  )}
                >
                  {/* Visual accent indicator line */}
                  <div className={cn("absolute left-0 top-0 bottom-0 w-1", t.accentLine)} />

                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {t.label}
                    </div>
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-opacity-10", t.bgClass)}>
                      <Icon className={cn("h-4 w-4", t.textClass)} />
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-baseline gap-1.5">
                    <div className="text-2xl font-extrabold tracking-tight text-foreground">
                      {t.value}
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                    <span>{t.hint}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-[13px] font-bold text-foreground">{labelMap[navLabel]}</h3>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            Detailed {labelMap[navLabel].toLowerCase()} views are available here. Switch to{" "}
            <span
              onClick={() => onNavigate("tours")}
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              Active Tours
            </span>{" "}
            from the left
            navigation to manage tourist itineraries, agent performance logs, and real-time coordinator actions.
          </p>
        </div>
      </div>
    </ScrollArea>
  );
}
