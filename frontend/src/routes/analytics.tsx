import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/lib/theme";
import {
  ArrowLeft, BarChart3, Car, Briefcase, TrendingUp,
  MapPin, Phone, Mail, CheckCircle2, Clock, Plane, XCircle, Navigation,
  Moon, Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Horizon Travel" },
      { name: "description", content: "Tour analytics and performance graphs." },
    ],
  }),
  component: AnalyticsPage,
});

/* ─────────────────────────────────────────────
   Chart primitives — pure SVG/CSS, zero deps
───────────────────────────────────────────── */

function HBar({ value, max, color, label, count, sub }: {
  value: number; max: number; color: string;
  label: string; count: number; sub?: string;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: color }} />
          <span className="text-sm font-medium text-foreground truncate max-w-[180px]">{label}</span>
          {sub && <span className="text-xs text-muted-foreground hidden sm:inline shrink-0"> · {sub}</span>}
        </div>
        <span className="ml-3 shrink-0 text-sm font-bold tabular-nums" style={{ color }}>{count}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted/70">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            minWidth: count > 0 ? 8 : 0,
          }}
        />
      </div>
    </div>
  );
}

function DonutChart({ segments, total, size = 168 }: {
  segments: { label: string; value: number; color: string }[];
  total: number; size?: number;
}) {
  const r = 56, cx = size / 2, cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const gap = 3;
  let offset = 0;
  const arcs = segments.map((s) => {
    const dashLen = total > 0 ? (s.value / total) * (circumference - segments.length * gap) : 0;
    const arc = { ...s, dashLen, dashOffset: -offset };
    offset += dashLen + gap;
    return arc;
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeOpacity={0.08} strokeWidth={18} />
      {arcs.map((a, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={a.color} strokeWidth={18}
          strokeDasharray={`${a.dashLen} ${circumference}`} strokeDashoffset={a.dashOffset}
          strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dasharray 0.8s ease-out" }} />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={22} fontWeight={700} fill="currentColor">{total}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize={10} fontWeight={500} fill="currentColor" opacity={0.45}>TOTAL</text>
    </svg>
  );
}

function VBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex flex-col items-center" style={{ height: 80 }}>
      <div className="flex flex-1 w-full items-end justify-center">
        <div className="w-9 rounded-t-md transition-all duration-700"
          style={{
            height: `${Math.max(pct, value > 0 ? 10 : 2)}%`,
            background: value > 0 ? `linear-gradient(180deg, ${color}88, ${color})` : "rgba(148,163,184,0.2)",
            minHeight: 2,
          }} />
      </div>
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-primary shadow-sm">{icon}</div>
      <h2 className="text-[15px] font-bold tracking-tight text-foreground">{title}</h2>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex h-28 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 text-sm text-muted-foreground">
      {message}
    </div>
  );
}

const AGENT_COLORS = ["#3b82f6","#8b5cf6","#ec4899","#f59e0b","#10b981","#06b6d4","#f97316","#6366f1"];

const STATUS_CFG = [
  { key: "Active",    label: "Active",    color: "#14b8a6", icon: Plane,         keys: ["Active", "On Tour"] },
  { key: "Upcoming",  label: "Upcoming",  color: "#6366f1", icon: Clock,         keys: ["Upcoming"]          },
  { key: "Completed", label: "Completed", color: "#64748b", icon: CheckCircle2,  keys: ["Completed"]         },
  { key: "Cancelled", label: "Cancelled", color: "#f97316", icon: XCircle,       keys: ["Cancelled"]         },
];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */

function AnalyticsPage() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [tourists, setTourists] = useState<any[]>([]);
  const [agents,   setAgents]   = useState<any[]>([]);
  const [drivers,  setDrivers]  = useState<any[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { router.navigate({ to: "/login" }); return; }
        const meRes = await fetch(`http://localhost:8000/api/companies/me?user_id=${session.user.id}`);
        if (!meRes.ok) { router.navigate({ to: "/" }); return; }
        const { id: cid } = await meRes.json();
        const [tRes, aRes, dRes] = await Promise.all([
          fetch(`http://localhost:8000/api/tourists?company_id=${cid}`),
          fetch(`http://localhost:8000/api/agents?company_id=${cid}`),
          fetch(`http://localhost:8000/api/drivers?company_id=${cid}`),
        ]);
        const [tData, aData, dData] = await Promise.all([tRes.json(), aRes.json(), dRes.json()]);
        setTourists(Array.isArray(tData) ? tData : []);
        setAgents(Array.isArray(aData)   ? aData : []);
        setDrivers(Array.isArray(dData)  ? dData : []);
      } catch (e) { console.error(e); }
      finally     { setLoading(false); }
    })();
  }, []);

  const confirmed    = useMemo(() => tourists.filter((t) => !t.is_lead), [tourists]);
  const statusCounts = useMemo(() => STATUS_CFG.map((s) => ({ ...s, count: confirmed.filter((t) => s.keys.includes(t.status)).length })), [confirmed]);
  const statusTotal  = statusCounts.reduce((s, x) => s + x.count, 0);
  const maxStatus    = Math.max(...statusCounts.map((s) => s.count), 1);

  const agentStats = useMemo(() =>
    agents.map((a: any) => {
      const name  = a.agent_name || a.name || "Unknown";
      const count = confirmed.filter((t) => t.agent_id === a.id || t.agent === name).length;
      return { id: a.id, name, count, region: a.region || "—" };
    }).sort((a, b) => b.count - a.count),
  [agents, confirmed]);
  const maxAgent = Math.max(...agentStats.map((a) => a.count), 1);

  const driverStats = useMemo(() =>
    drivers.map((d: any) => {
      const active = confirmed.filter((t) =>
        (t.driver_id === d.id || t.driver === d.name) &&
        (t.status === "Active" || t.status === "On Tour" || t.status === "Upcoming"),
      ).length;
      const total = confirmed.filter((t) => t.driver_id === d.id || t.driver === d.name).length;
      const initials = (d.name || "?").split(" ").map((p: string) => p[0]).slice(0, 2).join("");
      return { id: d.id, name: d.name, phone: d.phone, email: d.email, active, total, initials };
    }).sort((a, b) => b.active - a.active),
  [drivers, confirmed]);
  const maxDriver = Math.max(...driverStats.map((d) => d.active), 1);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground font-medium">Loading analytics…</p>
        </div>
      </div>
    );
  }

  const card = { background: theme === "light" ? "#ffffff" : "var(--card)" };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">

      {/* ── header ── */}
      <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-border bg-card/90 backdrop-blur-lg px-7">
        <div className="flex items-center gap-3.5">
          <Button id="analytics-back" variant="ghost" size="sm"
            onClick={() => router.navigate({ to: "/" })}
            className="gap-2 -ml-1 text-muted-foreground hover:text-foreground rounded-lg transition-all duration-200 h-8 text-xs">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Console
          </Button>
          <div className="h-4 w-px bg-border mx-1" />
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-primary/10 bg-primary/5 text-primary">
              <BarChart3 className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-[15px] font-bold tracking-tight leading-none text-foreground">Analytics</h1>
              <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">Tour · Agent · Driver performance</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span>{confirmed.length} confirmed tours</span>
          </div>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex flex-col">
        <ScrollArea className="flex-1">
          <div id="analytics-report-content" className="mx-auto max-w-6xl space-y-10 p-6 pb-16">

          {/* ══ 1. Tour Status ══ */}
          <section id="analytics-status">
            <SectionHeader icon={<Plane className="h-4 w-4" />} title="Tour Status Distribution" />
            <div className="grid gap-6 lg:grid-cols-[220px_1fr]">

              {/* Donut */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-border/80 bg-card p-6 shadow-sm">
                <DonutChart
                  segments={statusCounts.filter((s) => s.count > 0).map((s) => ({ label: s.label, value: s.count, color: s.color }))}
                  total={statusTotal} />
                <div className="mt-4 w-full space-y-2">
                  {statusCounts.map((s) => (
                    <div key={s.key} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full shrink-0" style={{ background: s.color }} />
                        <span className="text-muted-foreground">{s.label}</span>
                      </div>
                      <span className="font-semibold tabular-nums" style={{ color: s.color }}>{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bars + KPI chips */}
              <div className="rounded-xl border border-border/80 bg-card p-6 space-y-5 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Count by Status</p>
                <div className="space-y-4">
                  {statusCounts.map((s) => (
                    <HBar key={s.key} value={s.count} max={maxStatus} color={s.color} label={s.label} count={s.count}
                      sub={`${statusTotal > 0 ? Math.round((s.count / statusTotal) * 100) : 0}%`} />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/60 sm:grid-cols-3 xl:grid-cols-4">
                  {statusCounts.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.key} className="rounded-xl border p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                        style={{ borderColor: `${s.color}25`, background: `${s.color}08` }}>
                        <Icon className="mx-auto mb-1 h-4 w-4" style={{ color: s.color }} />
                        <div className="text-xl font-bold tabular-nums" style={{ color: s.color }}>{s.count}</div>
                        <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ══ 2. Agent Activity ══ */}
          <section id="analytics-agents">
            <SectionHeader icon={<Briefcase className="h-4 w-4" />} title="Agent Activity" />
            {agentStats.length === 0 ? <EmptyState message="No agents registered yet." /> : (
              <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm">
                <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tourist Count per Agent</p>
                    <div className="space-y-4">
                      {agentStats.map((a, i) => (
                        <HBar key={a.id} value={a.count} max={maxAgent}
                          color={AGENT_COLORS[i % AGENT_COLORS.length]}
                          label={a.name} count={a.count} sub={a.region} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Agent Profiles</p>
                    {agentStats.map((a, i) => {
                      const color = AGENT_COLORS[i % AGENT_COLORS.length];
                      const initials = a.name.split(" ").map((p: string) => p[0]).slice(0, 2).join("");
                      return (
                        <div key={a.id} className="flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 hover:shadow-sm"
                          style={{ background: `${color}06`, borderColor: `${color}18` }}>
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold"
                            style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>{initials}</div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[13px] font-bold text-foreground">{a.name}</div>
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                              <MapPin className="h-3 w-3 shrink-0" />{a.region}
                            </div>
                          </div>
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold"
                            style={{ background: `${color}15`, color }}>{a.count}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ══ 3. Driver Workload ══ */}
          <section id="analytics-drivers">
            <SectionHeader icon={<Car className="h-4 w-4" />} title="Driver & Guide Workload" />
            {driverStats.length === 0 ? <EmptyState message="No drivers registered yet." /> : (
              <div className="space-y-5">

                {/* Column chart */}
                <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-5">
                    Active / Upcoming Tours per Driver
                  </p>
                  <div className="flex items-end gap-4 overflow-x-auto pb-2">
                    {driverStats.map((d) => {
                      const tealColor = "#14b8a6";
                      const greyColor = "#94a3b8";
                      const col = d.active > 0 ? tealColor : greyColor;
                      return (
                        <div key={d.id} className="flex min-w-[60px] flex-col items-center gap-2">
                          <span className="text-xs font-bold tabular-nums" style={{ color: d.active > 0 ? "#0d9488" : greyColor }}>{d.active}</span>
                          <VBar value={d.active} max={maxDriver} color={col} />
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[10px] font-bold"
                            style={{
                              background: d.active > 0 ? "rgba(20,184,166,0.12)" : "rgba(148,163,184,0.1)",
                              color: d.active > 0 ? "#0d9488" : greyColor,
                              border: `1px solid ${d.active > 0 ? "rgba(20,184,166,0.25)" : "rgba(148,163,184,0.18)"}`,
                            }}>{d.initials}</div>
                          <span className="max-w-[60px] truncate text-center text-[10px] text-muted-foreground leading-tight">
                            {d.name.split(" ")[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 flex items-center gap-5 border-t border-border pt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-teal-500" />Active / Upcoming tours</div>
                    <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-slate-300 dark:bg-slate-600" />No current assignment</div>
                  </div>
                </div>

                {/* Driver detail cards */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {driverStats.map((d) => (
                    <div key={d.id}
                      className={cn("rounded-xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                        d.active > 0 ? "border-teal-200/50 dark:border-teal-900/30" : "border-border/80")}
                      style={{
                        background: d.active > 0
                          ? theme === "light" ? "linear-gradient(135deg,#f0fdfb,#ffffff)" : "linear-gradient(135deg,rgba(20,184,166,0.04),var(--card))"
                          : "var(--card)",
                      }}>
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold"
                          style={{
                            background: d.active > 0 ? "rgba(20,184,166,0.12)" : "rgba(148,163,184,0.08)",
                            color: d.active > 0 ? "#0d9488" : "#94a3b8",
                            border: `1px solid ${d.active > 0 ? "rgba(20,184,166,0.25)" : "rgba(148,163,184,0.18)"}`,
                          }}>{d.initials}</div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[14px] font-bold text-foreground">{d.name}</div>
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold mt-1"
                            style={{
                              background: d.active > 0 ? "rgba(20,184,166,0.1)" : "rgba(148,163,184,0.08)",
                              color: d.active > 0 ? "#0d9488" : "#94a3b8",
                            }}>
                            <Car className="h-2.5 w-2.5" />{d.active} active · {d.total} total
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 space-y-1.5 border-t border-border/40 pt-3">
                        {d.phone && (
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" /><span className="truncate">{d.phone}</span>
                          </div>
                        )}
                        {d.email && (
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" /><span className="truncate">{d.email}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 border-t border-border/40 pt-3">
                        <div className="mb-1 flex justify-between text-[10px] text-muted-foreground font-medium">
                          <span>Workload</span>
                          <span className="font-semibold">{d.total > 0 ? Math.round((d.active / d.total) * 100) : 0}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/70">
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${d.total > 0 ? (d.active / d.total) * 100 : 0}%`,
                              background: d.active > 0 ? "linear-gradient(90deg,#5eead4,#14b8a6)" : "#cbd5e1",
                              minWidth: d.active > 0 ? 4 : 0,
                            }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ── PDF Download Button ── */}
          <div className="flex justify-center pt-4">
            <Button
              id="download-pdf-btn"
              onClick={async () => {
                const toast = (await import("sonner")).toast;
                toast.loading("Generating professional PDF report...", { id: "pdf-gen" });
                try {
                  const { jsPDF } = await import("jspdf");

                  const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "pt",
                    format: "a4",
                  });

                  const pageWidth = pdf.internal.pageSize.getWidth();
                  const pageHeight = pdf.internal.pageSize.getHeight();
                  const margin = 45;
                  const contentWidth = pageWidth - margin * 2;

                  // Brand Colors
                  const primary = [15, 23, 42];      // Deep Slate
                  const primaryText = [30, 41, 59];  // Slate 800
                  const mutedText = [100, 116, 139]; // Slate 500
                  const accent = [13, 148, 136];     // Teal 600
                  const border = [226, 232, 240];     // Slate 200
                  const zebra = [248, 250, 252];      // Slate 50

                  // Helper: Draw decorative report page frame and header
                  const drawPageDecoration = (title: string, pageNum: number) => {
                    // Page border frame
                    pdf.setDrawColor(border[0], border[1], border[2]);
                    pdf.setLineWidth(1);
                    pdf.rect(20, 20, pageWidth - 40, pageHeight - 40, "S");

                    // Top header block
                    pdf.setFillColor(primary[0], primary[1], primary[2]);
                    pdf.rect(20, 20, pageWidth - 40, 65, "F");

                    // Brand title
                    pdf.setTextColor(255, 255, 255);
                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(14);
                    pdf.text("HORIZON TRAVELS", margin, 50);
                    
                    pdf.setFont("helvetica", "normal");
                    pdf.setFontSize(9);
                    pdf.setTextColor(148, 163, 184);
                    pdf.text("OPERATIONS MANAGEMENT CONSOLE", margin, 65);

                    // Section Title
                    pdf.setTextColor(accent[0], accent[1], accent[2]);
                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(11);
                    pdf.text(title, pageWidth - margin, 58, { align: "right" });

                    // Footer
                    pdf.setDrawColor(border[0], border[1], border[2]);
                    pdf.setLineWidth(1);
                    pdf.line(margin, pageHeight - 45, pageWidth - margin, pageHeight - 45);

                    pdf.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
                    pdf.setFont("helvetica", "normal");
                    pdf.setFontSize(8);
                    pdf.text("CONFIDENTIAL REPORT - FOR INTERNAL USE ONLY", margin, pageHeight - 30);
                    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 30, { align: "center" });
                    pdf.text(`Page ${pageNum} of 3`, pageWidth - margin, pageHeight - 30, { align: "right" });
                  };

                  // ── PAGE 1: EXECUTIVE SUMMARY & STATUS DISTRIBUTION ──
                  drawPageDecoration("TOUR STATUS OVERVIEW", 1);
                  let y = 120;

                  // Header
                  pdf.setTextColor(primary[0], primary[1], primary[2]);
                  pdf.setFont("helvetica", "bold");
                  pdf.setFontSize(15);
                  pdf.text("Executive Analytics Summary", margin, y);
                  y += 8;
                  
                  pdf.setDrawColor(accent[0], accent[1], accent[2]);
                  pdf.setLineWidth(2);
                  pdf.line(margin, y, margin + 60, y);
                  y += 20;

                  // Executive Summary text
                  pdf.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
                  pdf.setFont("helvetica", "normal");
                  pdf.setFontSize(9.5);
                  pdf.text(
                    "This report outlines the current operational workload and tour distribution for Horizon Travels. It aggregates confirmed tour statuses, agent assignments, and driver capacities to deliver an overall health index of active operations.",
                    margin,
                    y,
                    { maxWidth: contentWidth, lineHeightFactor: 1.4 }
                  );
                  y += 45;

                  // KPI Cards Grid (4 boxes)
                  const cardW = contentWidth / 4 - 8;
                  const statuses = [
                    { label: "Active", count: confirmed.filter((t) => ["Active", "On Tour"].includes(t.status)).length, color: [20, 184, 166] },
                    { label: "Upcoming", count: confirmed.filter((t) => t.status === "Upcoming").length, color: [99, 102, 241] },
                    { label: "Completed", count: confirmed.filter((t) => t.status === "Completed").length, color: [100, 116, 139] },
                    { label: "Cancelled", count: confirmed.filter((t) => t.status === "Cancelled").length, color: [249, 115, 22] },
                  ];

                  statuses.forEach((s, idx) => {
                    const cardX = margin + idx * (cardW + 10);
                    // Draw Card background
                    pdf.setFillColor(zebra[0], zebra[1], zebra[2]);
                    pdf.rect(cardX, y, cardW, 55, "F");
                    
                    // Card border
                    pdf.setDrawColor(border[0], border[1], border[2]);
                    pdf.setLineWidth(1);
                    pdf.rect(cardX, y, cardW, 55, "S");

                    // Status left highlight line
                    pdf.setFillColor(s.color[0], s.color[1], s.color[2]);
                    pdf.rect(cardX, y, 3, 55, "F");

                    // Card contents
                    pdf.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(8);
                    pdf.text(s.label.toUpperCase(), cardX + 12, y + 20);

                    pdf.setTextColor(s.color[0], s.color[1], s.color[2]);
                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(18);
                    pdf.text(`${s.count}`, cardX + 12, y + 42);
                  });
                  y += 85;

                  // Table title
                  pdf.setTextColor(primary[0], primary[1], primary[2]);
                  pdf.setFont("helvetica", "bold");
                  pdf.setFontSize(12);
                  pdf.text("Tour Status Distribution Table", margin, y);
                  y += 18;

                  // Status Table Headers
                  pdf.setFillColor(primary[0], primary[1], primary[2]);
                  pdf.rect(margin, y, contentWidth, 24, "F");
                  
                  pdf.setTextColor(255, 255, 255);
                  pdf.setFont("helvetica", "bold");
                  pdf.setFontSize(9);
                  pdf.text("OPERATIONAL STATUS", margin + 15, y + 15);
                  pdf.text("TOTAL CONFIRMED", margin + 220, y + 15, { align: "center" });
                  pdf.text("PERCENTAGE SHARE", margin + 380, y + 15, { align: "center" });
                  y += 24;

                  // Status Table Rows
                  pdf.setFont("helvetica", "normal");
                  statusCounts.forEach((s, idx) => {
                    // Row bg zebra
                    if (idx % 2 === 1) {
                      pdf.setFillColor(zebra[0], zebra[1], zebra[2]);
                      pdf.rect(margin, y, contentWidth, 24, "F");
                    }
                    // Border line bottom
                    pdf.setDrawColor(border[0], border[1], border[2]);
                    pdf.setLineWidth(0.5);
                    pdf.line(margin, y + 24, margin + contentWidth, y + 24);

                    pdf.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
                    pdf.text(s.label, margin + 15, y + 15);
                    
                    pdf.setFont("helvetica", "bold");
                    pdf.text(`${s.count}`, margin + 220, y + 15, { align: "center" });
                    
                    const pct = statusTotal > 0 ? Math.round((s.count / statusTotal) * 100) : 0;
                    pdf.setFont("helvetica", "normal");
                    pdf.text(`${pct}%`, margin + 380, y + 15, { align: "center" });
                    y += 24;
                  });

                  // ── PAGE 2: AGENT ACTIVITY ──
                  pdf.addPage();
                  drawPageDecoration("AGENT PERFORMANCE REPORT", 2);
                  y = 120;

                  pdf.setTextColor(primary[0], primary[1], primary[2]);
                  pdf.setFont("helvetica", "bold");
                  pdf.setFontSize(14);
                  pdf.text("Agent Performance & Volume Breakdown", margin, y);
                  y += 8;
                  
                  pdf.setDrawColor(accent[0], accent[1], accent[2]);
                  pdf.setLineWidth(2);
                  pdf.line(margin, y, margin + 60, y);
                  y += 25;

                  if (agentStats.length === 0) {
                    pdf.setFont("helvetica", "italic");
                    pdf.setFontSize(10);
                    pdf.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
                    pdf.text("No active agent distribution statistics found.", margin, y);
                  } else {
                    // Table Header
                    pdf.setFillColor(primary[0], primary[1], primary[2]);
                    pdf.rect(margin, y, contentWidth, 24, "F");
                    
                    pdf.setTextColor(255, 255, 255);
                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(9);
                    pdf.text("AGENT REGISTERED NAME", margin + 15, y + 15);
                    pdf.text("GEOGRAPHICAL REGION", margin + 220, y + 15);
                    pdf.text("TOTAL ASSIGNED TOURS", margin + 380, y + 15, { align: "center" });
                    y += 24;

                    pdf.setFont("helvetica", "normal");
                    agentStats.forEach((a, idx) => {
                      if (idx % 2 === 1) {
                        pdf.setFillColor(zebra[0], zebra[1], zebra[2]);
                        pdf.rect(margin, y, contentWidth, 24, "F");
                      }
                      pdf.setDrawColor(border[0], border[1], border[2]);
                      pdf.setLineWidth(0.5);
                      pdf.line(margin, y + 24, margin + contentWidth, y + 24);

                      pdf.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
                      pdf.text(a.name, margin + 15, y + 15);
                      pdf.text(a.region, margin + 220, y + 15);
                      
                      pdf.setFont("helvetica", "bold");
                      pdf.text(`${a.count}`, margin + 380, y + 15, { align: "center" });
                      pdf.setFont("helvetica", "normal");
                      y += 24;
                    });
                  }

                  // ── PAGE 3: DRIVER & GUIDE WORKLOAD ──
                  pdf.addPage();
                  drawPageDecoration("DRIVER WORKLOAD REPORT", 3);
                  y = 120;

                  pdf.setTextColor(primary[0], primary[1], primary[2]);
                  pdf.setFont("helvetica", "bold");
                  pdf.setFontSize(14);
                  pdf.text("Driver Assignments & Active Workloads", margin, y);
                  y += 8;
                  
                  pdf.setDrawColor(accent[0], accent[1], accent[2]);
                  pdf.setLineWidth(2);
                  pdf.line(margin, y, margin + 60, y);
                  y += 25;

                  if (driverStats.length === 0) {
                    pdf.setFont("helvetica", "italic");
                    pdf.setFontSize(10);
                    pdf.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
                    pdf.text("No registered driver workloads to evaluate.", margin, y);
                  } else {
                    // Table Header
                    pdf.setFillColor(primary[0], primary[1], primary[2]);
                    pdf.rect(margin, y, contentWidth, 24, "F");
                    
                    pdf.setTextColor(255, 255, 255);
                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(9);
                    pdf.text("DRIVER / GUIDE NAME", margin + 15, y + 15);
                    pdf.text("COMMUNICATION CHANNELS", margin + 180, y + 15);
                    pdf.text("ACTIVE / TOTAL", margin + 360, y + 15, { align: "center" });
                    pdf.text("WORKLOAD INDEX", margin + 440, y + 15, { align: "center" });
                    y += 24;

                    pdf.setFont("helvetica", "normal");
                    driverStats.forEach((d, idx) => {
                      if (idx % 2 === 1) {
                        pdf.setFillColor(zebra[0], zebra[1], zebra[2]);
                        pdf.rect(margin, y, contentWidth, 34, "F");
                      }
                      pdf.setDrawColor(border[0], border[1], border[2]);
                      pdf.setLineWidth(0.5);
                      pdf.line(margin, y + 34, margin + contentWidth, y + 34);

                      // Name
                      pdf.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
                      pdf.setFont("helvetica", "bold");
                      pdf.text(d.name, margin + 15, y + 20);
                      
                      // Contacts (small font stacked)
                      pdf.setFont("helvetica", "normal");
                      pdf.setFontSize(7.5);
                      pdf.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
                      pdf.text(`Phone: ${d.phone || "—"}`, margin + 180, y + 14);
                      pdf.text(`Email: ${d.email || "—"}`, margin + 180, y + 24);
                      
                      // Counts & index
                      pdf.setFontSize(9.5);
                      pdf.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
                      pdf.text(`${d.active} / ${d.total}`, margin + 360, y + 20, { align: "center" });
                      
                      const workloadPct = d.total > 0 ? Math.round((d.active / d.total) * 100) : 0;
                      pdf.setFont("helvetica", "bold");
                      pdf.text(`${workloadPct}%`, margin + 440, y + 20, { align: "center" });
                      
                      y += 34;
                    });
                  }

                  pdf.save("Horizon_Travel_Analytics_Report.pdf");
                  toast.success("PDF report downloaded successfully!", { id: "pdf-gen" });
                } catch (error) {
                  console.error("PDF generation failed:", error);
                  toast.error("Failed to generate PDF. Please try again.", { id: "pdf-gen" });
                }
              }}
              className="gap-1.5 px-5 h-10 rounded-lg shadow-sm text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/95 transition-all duration-200"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Download PDF Report
            </Button>
          </div>

          <div className="h-8" />
        </div>
        </ScrollArea>
      </div>
    </div>
  );
}
