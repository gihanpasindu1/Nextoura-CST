import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Building2, Plus, Trash2, Loader2, Mail, User, Phone, Building, ChevronDown, Search } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

const COUNTRIES = [
  { name: "Sri Lanka", code: "LK", dialCode: "+94", flag: "🇱🇰" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "South Korea", code: "KR", dialCode: "+82", flag: "🇰🇷" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽" }
];

function CountrySelector({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  const selected = COUNTRIES.find(c => c.code === value) || COUNTRIES[0];
  const filtered = COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.dialCode.includes(search));

  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative h-full flex items-center" ref={dropdownRef}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 h-full pl-3 pr-2 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-l-xl"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="font-medium">{selected.dialCode}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-50" />
      </button>
      
      {isOpen && (
        <div className="absolute top-[110%] left-0 w-64 rounded-xl border border-slate-700 bg-slate-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] z-50 overflow-hidden">
          <div className="p-2 border-b border-slate-800 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              autoFocus
              placeholder="Search country or code..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-lg py-1.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-1 scrollbar-thin">
            {filtered.length === 0 ? (
              <div className="py-3 text-center text-xs text-slate-500">No countries found</div>
            ) : (
              filtered.map(c => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-800 cursor-pointer ${c.code === selected.code ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-300'}`}
                >
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="font-medium text-slate-400 w-10 text-left">{c.dialCode}</span>
                  <span className="truncate">{c.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState<{ code: string; number: string }[]>([{ code: "LK", number: "" }]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.navigate({ to: "/login" });
      } else {
        setUser(session.user);
        setEmail(session.user.email || "");
        setLoading(false);
      }
    });
  }, [router]);

  const handleAddPhone = () => {
    setPhoneNumbers([...phoneNumbers, { code: "LK", number: "" }]);
  };

  const handleRemovePhone = (index: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...phoneNumbers];
    newPhones[index].number = value;
    setPhoneNumbers(newPhones);
  };

  const handlePhoneCountryChange = (index: number, value: string) => {
    const newPhones = [...phoneNumbers];
    newPhones[index].code = value;
    setPhoneNumbers(newPhones);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email || !ceoName || phoneNumbers.some((p) => !p.number)) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate and format phone numbers
    const formattedPhones: string[] = [];
    for (const p of phoneNumbers) {
      // Remove spaces, hyphens and non-digit characters
      let cleanNumber = p.number.replace(/\D/g, '');
      // Strip leading zero if typed
      if (cleanNumber.startsWith('0')) {
        cleanNumber = cleanNumber.substring(1);
      }
      
      if (cleanNumber.length < 7 || cleanNumber.length > 15) {
        const country = COUNTRIES.find(c => c.code === p.code) || COUNTRIES[0];
        toast.error(`Please enter a valid phone number for ${country.name}`);
        return;
      }
      
      const country = COUNTRIES.find(c => c.code === p.code) || COUNTRIES[0];
      formattedPhones.push(`${country.dialCode}${cleanNumber}`);
    }

    try {
      setSubmitting(true);
      const res = await fetch("http://localhost:8000/api/companies/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: companyName,
          email: email,
          auth_user_id: user.id,
          ceo_name: ceoName,
          phone_numbers: formattedPhones,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to onboard company");
      }

      toast.success("Profile completed successfully!");
      router.navigate({ to: "/" });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 select-none overflow-hidden font-sans">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full bg-emerald-500/5 blur-[160px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 z-0 pointer-events-none" />

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-[420px] rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 sm:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-slate-800">
        <div className="flex flex-col items-center text-center">
          {/* Logo container with gradient border and subtle pulse */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-600 p-[1.5px] shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
              <Building2 className="h-6 w-6 text-indigo-400" strokeWidth={2} />
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Company Details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-1.5 group">
            <label htmlFor="companyName" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Company Name
            </label>
            <div className="relative flex items-center">
              <Building className="absolute left-3.5 h-4 w-4 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
              <input
                id="companyName"
                placeholder="Horizon Travel Agency"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-slate-950/90"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 group">
            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Company Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
              <input
                id="email"
                type="email"
                placeholder="info@horizontravel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-slate-950/90"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 group">
            <label htmlFor="ceoName" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              CEO Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 h-4 w-4 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
              <input
                id="ceoName"
                placeholder="John Doe"
                value={ceoName}
                onChange={(e) => setCeoName(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-slate-950/90"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Numbers</label>
            <div className="space-y-2">
              {phoneNumbers.map((phone, index) => (
                <div key={index} className="relative flex items-center space-x-2 group">
                  <div className="relative flex-1 flex items-stretch rounded-xl border border-slate-800 bg-slate-950/60 transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:bg-slate-950/90 h-[42px]">
                    <CountrySelector 
                      value={phone.code} 
                      onChange={(val) => handlePhoneCountryChange(index, val)} 
                    />
                    <div className="my-2.5 w-px bg-slate-700/50" />
                    <input
                      placeholder="77 123 4567"
                      value={phone.number}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                      className="w-full bg-transparent py-2.5 pl-3 pr-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none"
                      required
                    />
                  </div>
                  {phoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhone(index)}
                      className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 text-slate-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddPhone}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:border-slate-500 hover:text-slate-300 hover:bg-slate-800/40 transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Another Phone Number
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="relative mt-8 flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-blue-600 hover:to-indigo-700 hover:shadow-indigo-600/35 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving Profile...</span>
              </div>
            ) : (
              <span>Complete Setup & Continue</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
