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
import { AddTouristSheet } from "@/components/AddTouristSheet";
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
          group: t.group_members?.map((g: any) => ({ name: g.name, passport: g.passport_number, email: g.email })) || [],
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
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
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

  if (isLoadingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Left sidebar — premium dark design */}
      <aside className="flex w-72 shrink-0 flex-col overflow-hidden" style={{
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* ── Brand header ── */}
        <div className="relative px-6 pb-5 pt-7">
          {/* Subtle top-glow decoration */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
          <div className="relative flex items-center gap-3.5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] shadow-lg" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              boxShadow: '0 8px 24px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}>
              <MapPinned className="h-[21px] w-[21px] text-white" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1 text-[20px] font-extrabold leading-none tracking-tight text-white">
                Horizon <span className="font-medium text-blue-400">Travel</span>
              </div>
              <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                Operations Console
              </div>
            </div>
          </div>
        </div>

        {/* ── Agent filter ── */}
        <div className="px-5 pb-4">
          <Label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Agent View
          </Label>
          <Select value={agentFilter} onValueChange={setAgentFilter}>
            <SelectTrigger className="h-9 w-full border-slate-700/60 bg-slate-800/60 text-slate-200 hover:bg-slate-800 focus:ring-blue-500/40">
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
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

        {/* ── Navigation sections ── */}
        <nav className="flex-1 space-y-5 overflow-y-auto px-4 py-5" style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}>
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
                          ? "text-white"
                          : "text-slate-400 hover:text-slate-200",
                      )}
                      style={active ? {
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.08) 100%)',
                        boxShadow: 'inset 0 0 0 1px rgba(59,130,246,0.2), 0 0 20px -4px rgba(59,130,246,0.15)',
                      } : undefined}
                    >
                      {/* Active left accent bar */}
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-400" style={{
                          boxShadow: '0 0 8px 1px rgba(96,165,250,0.5)',
                        }} />
                      )}
                      {/* Hover background */}
                      {!active && (
                        <span className="pointer-events-none absolute inset-0 rounded-lg bg-white/[0.03] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      )}
                      <Icon className={cn(
                        "relative h-[18px] w-[18px] shrink-0 transition-colors duration-200",
                        active ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300",
                      )} strokeWidth={active ? 2.2 : 1.8} />
                      <span className="relative truncate">{item.label}</span>
                      {active && (
                        <ChevronRight className="relative ml-auto h-3.5 w-3.5 text-blue-400/60" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ── Divider ── */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

        {/* ── User profile & Sign out ── */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.04]">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-semibold text-[11px] text-white" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              boxShadow: '0 4px 12px rgba(99,102,241,0.25)',
            }}>
              {session?.user?.email?.substring(0, 2).toUpperCase() || "CP"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium text-slate-200">{session?.user?.email || "Company Profile"}</div>
              <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                <Shield className="h-3 w-3" />
                <span>Authorized</span>
              </div>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-500 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400">
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
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-7">
            <div className="flex items-center gap-4">
              {/* Icon with subtle tinted background and soft shadow */}
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/10 bg-primary/5 shadow-sm text-primary">
                {nav === "agents" ? <Users className="h-5 w-5" /> :
                  nav === "leads" ? <MessageCircle className="h-5 w-5" /> :
                    nav === "dashboard" ? <LayoutDashboard className="h-5 w-5" /> :
                      nav === "reports" ? <BarChart3 className="h-5 w-5" /> :
                        nav === "settings" ? <Settings className="h-5 w-5" /> :
                          nav === "drivers" ? <Car className="h-5 w-5" /> :
                            <Plane className="h-5 w-5" />}
              </div>
              <div>
                <h1 className="text-[17px] font-bold tracking-tight text-foreground leading-none">
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
                <p className="text-[12.5px] text-muted-foreground mt-1 font-medium tracking-wide opacity-90">
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
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={toggle}
                className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                {theme === "light" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
              </Button>
              <div className="h-4 w-px bg-border mx-1" />
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors relative">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute right-2 top-2 flex h-2 w-2">
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
            <DashboardOverview stats={stats} navLabel={nav} />
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
              notifications={notifications}
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
                  email: g.email || 'N/A'
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

        {/* Right sidebar — only show on tours/leads pages */}
        {!isDetailOpen && (nav === "tours" || nav === "leads") && (
          <aside className="hidden w-80 shrink-0 flex-col border-l border-border bg-sidebar xl:flex">
            <div className="px-5 py-4">
              <h3 className="text-sm font-semibold">Today</h3>
              <p className="text-xs text-muted-foreground">Monday, 22 June 2026</p>
            </div>
            <Separator />

            <div className="grid grid-cols-2 gap-3 p-4">
              <StatTile label="Active" value={stats.active} tone="success" />
              <StatTile label="Upcoming" value={stats.upcoming} tone="info" />
              <StatTile label="Pax on tour" value={stats.pax} tone="default" />
              <StatTile label="Countries" value={stats.countries} tone="default" />
            </div>
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
}: {
  label: string;
  value: number;
  tone: "success" | "info" | "default";
}) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 flex items-baseline gap-1.5">
        <span className="text-xl font-semibold tracking-tight">{value}</span>
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "success" && "bg-success",
            tone === "info" && "bg-primary",
            tone === "default" && "bg-muted-foreground/40",
          )}
        />
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
    <div className={cn("rounded-md border border-border p-3 transition-colors hover:bg-accent/40", n.resolved ? "bg-muted/30" : "bg-card")}>
      <div className="flex items-start gap-2.5">
        <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", color)} />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium leading-tight">{n.title}</div>
          <div className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">{n.body}</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-[10px] text-muted-foreground/70">{n.time}</div>
            {!n.resolved && onResolve && (
              <Button variant="outline" size="sm" onClick={() => onResolve(n.id)} className="h-7 text-xs px-3">
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
  notifications,
  onResolveAlert,
  onAddClient,
  onConfirmTour,
  onDeleteClient,
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
  notifications: any[];
  onResolveAlert: (id: string) => void;
  onAddClient: () => void;
  onConfirmTour: (t: Tourist) => void;
  onDeleteClient: (id: string) => void;
}) {
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
          <div className="flex flex-wrap items-center gap-2 border-b border-border bg-card px-6 py-3">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, country, or passport number…"
                className="h-9 pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={driverFilter} onValueChange={setDriverFilter}>
              <SelectTrigger className="h-9 w-[180px]">
                <SelectValue placeholder="Driver" />
              </SelectTrigger>
              <SelectContent>
                {drivers.map((d: any) => (
                  <SelectItem key={d.id} value={d.name}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* List Full Width */}
          <div className="flex min-h-0 flex-1">
            <div className="flex w-full flex-col">
              <div className="flex items-center justify-between border-b border-border bg-card px-5 py-2.5">
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  {tourists.length} {tourists.length === 1 ? "tourist" : "tourists"}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-[11px] text-muted-foreground">Sorted by status</div>
                  <Button size="sm" onClick={onAddClient} className="gap-2 h-7 px-3 text-xs">
                    <UserPlus className="h-3.5 w-3.5" />
                    Add Client
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <ul>
                  {[...tourists].sort((a, b) => {
                    const order: Record<string, number> = { Active: 0, "On Tour": 0, Upcoming: 1, Completed: 2, Cancelled: 3 };
                    return (order[a.status] ?? 4) - (order[b.status] ?? 4);
                  }).map((t) => {
                    const hasAlerts = (alertCounts[t.id] || 0) > 0;
                    const isEngaged = t.status === "Active" || t.status === "On Tour";
                    return (
                      <li
                        key={t.id}
                        onClick={() => {
                          onSelect(t.id);
                          setIsDetailOpen(true);
                        }}
                        className={cn(
                          "group cursor-pointer border-b px-6 py-4 transition-all duration-500 relative",
                          hasAlerts
                            ? "animate-[alert-glow_3s_ease-in-out_infinite] z-10 hover:brightness-110"
                            : "border-border hover:bg-accent/30",
                          isEngaged && !hasAlerts && "border-l-[3px] border-l-teal-500 bg-teal-50/30 dark:bg-teal-950/10"
                        )}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-4">
                            <span className="text-2xl leading-none">{flagEmoji(t.countryCode)}</span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-3">
                                <span className="truncate text-base font-semibold">{t.name}</span>
                                <StatusPill status={t.status} />
                              </div>
                              <div className="mt-1 truncate text-sm text-muted-foreground">
                                {t.country} · {t.pax} Pax · {t.duration}
                              </div>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="flex items-center justify-end gap-1.5 text-sm font-medium">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {t.currentLocation}
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">Driver: {t.driver.split(" ")[0]}</div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  {tourists.length === 0 && (
                    <li className="p-10 text-center text-sm text-muted-foreground">
                      No tourists match these filters.
                    </li>
                  )}
                </ul>
              </ScrollArea>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: TourStatus }) {
  const config: Record<TourStatus, { color: string; icon: any }> = {
    Active: {
      color: "bg-teal-500 text-white border-teal-600",
      icon: Plane,
    },
    Upcoming: {
      color: "bg-indigo-400 text-white border-indigo-500",
      icon: Clock,
    },
    Completed: {
      color: "bg-slate-400 text-white border-slate-500",
      icon: CheckCircle2,
    },
    "On Tour": {
      color: "bg-violet-500 text-white border-violet-600",
      icon: Navigation,
    },
    Cancelled: {
      color: "bg-orange-400 text-white border-orange-500",
      icon: XCircle,
    },
  };

  const { color, icon: Icon } = config[status] || { color: "bg-slate-400 text-white border-slate-500", icon: Clock };

  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1 rounded-full border px-2 text-[10px] font-semibold tracking-wide shadow-sm",
        color
      )}
    >
      <Icon className="h-2.5 w-2.5" strokeWidth={2.5} />
      {status}
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
        <div className="border-b border-border bg-card px-7 py-5">
          {onBack && (
            <div className="mb-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to list
              </Button>
            </div>
          )}
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-accent text-xl">
                {flagEmoji(t.countryCode)}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-lg font-semibold tracking-tight">{t.name}</h2>
                  <StatusPill status={t.status} />
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
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
                <Button variant="default" size="sm" onClick={onConfirmTour} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                  Confirm Tour
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onEditClient} className="gap-2 border-primary text-primary hover:bg-primary/10">
                <Settings2 className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Button>
              <Button size="sm">Open Booking</Button>
            </div>
          </div>
        </div>

        {activeAlerts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-7 pt-5">
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
            <div className="overflow-hidden rounded-md border border-border bg-card">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 font-medium">Traveler</th>
                    <th className="px-4 py-2 font-medium">Passport No.</th>
                    <th className="px-4 py-2 font-medium hidden sm:table-cell">Phone</th>
                    <th className="px-4 py-2 font-medium hidden md:table-cell">Email</th>
                    <th className="px-4 py-2 font-medium">Role</th>
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
                  <div className="rounded-md border border-border bg-card p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <div>
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">
                            Day {d.day.toString().padStart(2, "0")} {d.location ? `· ${d.location}` : ""}
                          </div>
                          <div className="mt-0.5 text-sm font-semibold">{d.title}</div>
                        </div>
                        {d.status === 'Completed' ? (
                          <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700 border border-green-200">
                            <CheckCircle2 className="h-3 w-3" /> Arrived
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600 border border-amber-200">
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

                    <div className="mt-4 grid gap-2 rounded-md bg-muted/40 p-3 sm:grid-cols-[1fr_1fr_auto] items-center">
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
                          <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1.5 w-full sm:w-auto bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
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
              <Button variant="destructive" className="w-full sm:w-auto">
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
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200 dark:bg-card dark:border-slate-800 flex flex-col gap-1.5">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <Icon className="h-3.5 w-3.5 text-blue-500" />
        {label}
      </div>
      <div className="break-words text-[15px] font-semibold text-slate-900 dark:text-slate-100">{value}</div>
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

  function submitAdd() {
    if (!form.name || !form.email) {
      toast.error("Name and email required");
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

  const regions = ["South Asia", "Europe", "East Asia", "Oceania", "Middle East", "Americas"];

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-6 py-3">
        <div className="text-sm text-muted-foreground">
          {agents.length} agents · {agents.reduce((s, a) => s + (a.clients || 0), 0)} clients under management
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <UserPlus className="h-4 w-4" />
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
                <Select value={form.region} onValueChange={(v) => setForm({ ...form, region: v })}>
                  <SelectTrigger id="ag-region"><SelectValue placeholder="Choose a region" /></SelectTrigger>
                  <SelectContent>
                    {regions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
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
              <Select value={editForm.region} onValueChange={(v) => setEditForm({ ...editForm, region: v })}>
                <SelectTrigger><SelectValue placeholder="Choose a region" /></SelectTrigger>
                <SelectContent>
                  {regions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
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
        <div className="grid gap-3 p-6 sm:grid-cols-2 xl:grid-cols-3">
          {agents.map((a: any) => {
            const initials = (a.agent_name || a.name || "?")
              .split(" ")
              .map((p: any) => p[0])
              .slice(0, 2)
              .join("");
            return (
              <div key={a.id} className="group relative rounded-xl border border-slate-200 bg-white p-5 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200 dark:bg-card dark:border-slate-800">
                
                {/* Hover action buttons */}
                <div className="absolute right-3 top-3 flex items-center gap-0.5 opacity-0 transition-all duration-200 group-hover:opacity-100 bg-white/90 backdrop-blur-sm p-1 rounded-lg shadow-sm border border-slate-100 dark:bg-slate-900/90 dark:border-slate-800">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => openEdit(a)}
                    title="Edit agent"
                  >
                    <Settings2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => openDelete(a)}
                    title="Delete agent"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue-50/50 border border-blue-100/50 text-blue-600 font-bold dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-400">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="truncate text-[15px] font-semibold text-slate-900 dark:text-slate-100 mb-0.5">
                      {a.agent_name || a.name}
                    </div>
                    {a.email && (
                      <div className="flex items-center gap-2 mt-2 text-[13px] text-slate-500 dark:text-slate-400">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span className="truncate">{a.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Separator className="my-5 bg-slate-100 dark:bg-slate-800/50" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Region</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-slate-700 dark:text-slate-300">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {a.region || "Unassigned"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Clients</div>
                    <div className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
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
    try {
      await onAddDriver(form);
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
    if (selectedDriver) {
      try {
        await onUpdateDriver(selectedDriver.id, form);
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
    setForm({ name: driver.name || "", phone: driver.phone || "", email: driver.email || "", password: "" });
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
                <Input
                  id="drv-phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+94 77 123 4567"
                />
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
        <div className="grid gap-3 p-6 sm:grid-cols-2 xl:grid-cols-3">
          {drivers.map((d: any) => {
            const initials = (d.name || "?")
              .split(" ")
              .map((p: any) => p[0])
              .slice(0, 2)
              .join("");
            return (
              <div key={d.id} className="group relative rounded-xl border border-slate-200 bg-white p-5 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200 dark:bg-card dark:border-slate-800">
                
                {/* Actions (visible on hover) */}
                <div className="absolute right-3 top-3 flex items-center gap-0.5 opacity-0 transition-all duration-200 group-hover:opacity-100 bg-white/90 backdrop-blur-sm p-1 rounded-lg shadow-sm border border-slate-100 dark:bg-slate-900/90 dark:border-slate-800">
                  {d.password && (
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20" onClick={() => {
                      navigator.clipboard.writeText(`Email: ${d.email}\nPassword: ${d.password}`);
                      toast.success("Credentials copied!");
                    }} title="Copy Credentials">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20" onClick={() => openEdit(d)}>
                    <Settings2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => openDelete(d)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue-50/50 border border-blue-100/50 text-blue-600 font-bold dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-400">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="truncate text-[15px] font-semibold text-slate-900 dark:text-slate-100 mb-0.5">
                      {d.name}
                    </div>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <div className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span className="truncate">{d.phone}</span>
                      </div>
                      {d.email && (
                        <div className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                          <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
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
              <Input
                id="edit-drv-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
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
}: {
  stats: { active: number; upcoming: number; pax: number; countries: number };
  navLabel: NavKey;
}) {
  const tiles = [
    { label: "Active tours", value: stats.active, hint: "Currently in country" },
    { label: "Upcoming arrivals", value: stats.upcoming, hint: "Next 30 days" },
    { label: "Travelers on tour", value: stats.pax, hint: "Total pax in service" },
    { label: "Source countries", value: stats.countries, hint: "Markets this month" },
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
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-lg border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.label}</div>
              <div className="mt-2 text-3xl font-semibold tracking-tight">{t.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{t.hint}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold">{labelMap[navLabel]}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed {labelMap[navLabel].toLowerCase()} views are available here. Switch to{" "}
            <span className="font-medium text-foreground">Active Tours</span> from the left
            navigation to manage tourist itineraries and bookings.
          </p>
        </div>
      </div>
    </ScrollArea>
  );
}
