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
  const statusCounts = useMemo(() => STATUS_CFG.map((s) => ({ ...s, count: confirmed.filter((t) => t.status === s.key).length })), [confirmed]);
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
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-7"
        style={{ background: theme === "light" ? "linear-gradient(135deg,#f8fafc,#f1f5f9)" : "linear-gradient(135deg,#0f172a,#1e293b)" }}>
        <div className="flex items-center gap-4">
          <Button id="analytics-back" variant="ghost" size="sm"
            onClick={() => router.navigate({ to: "/" })}
            className="gap-2 -ml-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Console
          </Button>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-primary/10 bg-primary/5 text-primary">
              <BarChart3 className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-[16px] font-bold tracking-tight leading-none text-foreground">Analytics</h1>
              <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">Tour · Agent · Driver performance</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{confirmed.length} confirmed tours</span>
          </div>
          {/* Theme toggle */}
          <button
            id="analytics-theme-toggle"
            type="button"
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div id="analytics-report-content" className="mx-auto max-w-6xl space-y-10 p-6 pb-16">

          {/* ══ 1. Tour Status ══ */}
          <section id="analytics-status">
            <SectionHeader icon={<Plane className="h-4 w-4" />} title="Tour Status Distribution" />
            <div className="grid gap-6 lg:grid-cols-[220px_1fr]">

              {/* Donut */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border p-6" style={card}>
                <DonutChart
                  segments={statusCounts.filter((s) => s.count > 0).map((s) => ({ label: s.label, value: s.count, color: s.color }))}
                  total={statusTotal} />
                <div className="mt-4 w-full space-y-2">
                  {statusCounts.map((s) => (
                    <div key={s.key} className="flex items-center justify-between text-xs">
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
              <div className="rounded-2xl border border-border p-6 space-y-5" style={card}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Count by Status</p>
                {statusCounts.map((s) => (
                  <HBar key={s.key} value={s.count} max={maxStatus} color={s.color} label={s.label} count={s.count}
                    sub={`${statusTotal > 0 ? Math.round((s.count / statusTotal) * 100) : 0}%`} />
                ))}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border sm:grid-cols-3 xl:grid-cols-5">
                  {statusCounts.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.key} className="rounded-xl border p-3 text-center transition-all hover:shadow-sm"
                        style={{ borderColor: `${s.color}30`, background: `${s.color}08` }}>
                        <Icon className="mx-auto mb-1 h-4 w-4" style={{ color: s.color }} />
                        <div className="text-xl font-bold tabular-nums" style={{ color: s.color }}>{s.count}</div>
                        <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</div>
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
              <div className="rounded-2xl border border-border p-6" style={card}>
                <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tourist Count per Agent</p>
                    {agentStats.map((a, i) => (
                      <HBar key={a.id} value={a.count} max={maxAgent}
                        color={AGENT_COLORS[i % AGENT_COLORS.length]}
                        label={a.name} count={a.count} sub={a.region} />
                    ))}
                  </div>
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Agent Profiles</p>
                    {agentStats.map((a, i) => {
                      const color = AGENT_COLORS[i % AGENT_COLORS.length];
                      const initials = a.name.split(" ").map((p: string) => p[0]).slice(0, 2).join("");
                      return (
                        <div key={a.id} className="flex items-center gap-3 rounded-xl border p-3 transition-all hover:shadow-sm"
                          style={{ background: `${color}06`, borderColor: `${color}22` }}>
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold"
                            style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>{initials}</div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[13px] font-semibold text-foreground">{a.name}</div>
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <MapPin className="h-3 w-3 shrink-0" />{a.region}
                            </div>
                          </div>
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                            style={{ background: `${color}18`, color }}>{a.count}</div>
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
                <div className="rounded-2xl border border-border p-6" style={card}>
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
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold"
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
                      className={cn("rounded-2xl border p-5 transition-all hover:shadow-md",
                        d.active > 0 ? "border-teal-200/60 dark:border-teal-900/40" : "border-border")}
                      style={{
                        background: d.active > 0
                          ? theme === "light" ? "linear-gradient(135deg,#f0fdfb,#ffffff)" : "linear-gradient(135deg,rgba(20,184,166,0.06),var(--card))"
                          : theme === "light" ? "#ffffff" : "var(--card)",
                      }}>
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold"
                          style={{
                            background: d.active > 0 ? "rgba(20,184,166,0.15)" : "rgba(148,163,184,0.1)",
                            color: d.active > 0 ? "#0d9488" : "#94a3b8",
                            border: `1.5px solid ${d.active > 0 ? "rgba(20,184,166,0.35)" : "rgba(148,163,184,0.2)"}`,
                          }}>{d.initials}</div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[14px] font-semibold text-foreground">{d.name}</div>
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold mt-0.5"
                            style={{
                              background: d.active > 0 ? "rgba(20,184,166,0.12)" : "rgba(148,163,184,0.1)",
                              color: d.active > 0 ? "#0d9488" : "#94a3b8",
                            }}>
                            <Car className="h-2.5 w-2.5" />{d.active} active · {d.total} total
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 space-y-1.5">
                        {d.phone && (
                          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                            <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" /><span className="truncate">{d.phone}</span>
                          </div>
                        )}
                        {d.email && (
                          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                            <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" /><span className="truncate">{d.email}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
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
                  const html2canvas = (await import("html2canvas")).default;
                  const { jsPDF } = await import("jspdf");

                  const element = document.getElementById("analytics-report-content");
                  if (!element) {
                    toast.error("Report content element not found", { id: "pdf-gen" });
                    return;
                  }

                  // Force background colors to be rendered during capture
                  const canvas = await html2canvas(element, {
                    scale: 2, // High resolution
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: theme === "light" ? "#f8fafc" : "#0b0f19",
                    onclone: (clonedDoc) => {
                      // Find all elements in the cloned document and rewrite oklch colors
                      const elements = clonedDoc.getElementsByTagName("*");
                      for (let i = 0; i < elements.length; i++) {
                        const el = elements[i] as HTMLElement;
                        const style = window.getComputedStyle(el);
                        
                        // If color or background-color uses oklch, override it with standard fallback
                        if (style.backgroundColor && style.backgroundColor.includes("oklch")) {
                          el.style.backgroundColor = theme === "light" ? "#ffffff" : "#111827";
                        }
                        if (style.color && style.color.includes("oklch")) {
                          el.style.color = theme === "light" ? "#1f2937" : "#f9fafb";
                        }
                        if (style.borderColor && style.borderColor.includes("oklch")) {
                          el.style.borderColor = theme === "light" ? "#e5e7eb" : "#374151";
                        }
                      }
                    }
                  });

                  const imgData = canvas.toDataURL("image/jpeg", 0.95);
                  const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "px",
                    format: [canvas.width / 2, canvas.height / 2],
                  });

                  const pdfWidth = pdf.internal.pageSize.getWidth();
                  const pdfHeight = pdf.internal.pageSize.getHeight();

                  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
                  pdf.save("Horizon_Travel_Analytics_Report.pdf");

                  toast.success("PDF report downloaded successfully!", { id: "pdf-gen" });
                } catch (error) {
                  console.error("PDF generation failed:", error);
                  toast.error("Failed to generate PDF. Please try again.", { id: "pdf-gen" });
                }
              }}
              className="gap-2 px-6 py-5 text-sm font-semibold shadow-md bg-primary text-primary-foreground hover:bg-primary/95 transition-all duration-200"
            >
              <TrendingUp className="h-4 w-4" />
              Download PDF Report
            </Button>
          </div>

          <div className="h-8" />
        </div>
      </ScrollArea>
    </div>
  );
}
