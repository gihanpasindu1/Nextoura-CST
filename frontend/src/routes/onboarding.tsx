import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Building2, Plus, Trash2, Loader2, Mail, User, Phone, Building, ChevronDown, Search, ImagePlus, X } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

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
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

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
      const countryCode = p.code as CountryCode;

      if (!isValidPhoneNumber(p.number, countryCode)) {
        const country = COUNTRIES.find(c => c.code === p.code) || COUNTRIES[0];
        toast.error(`Please enter a valid phone number for ${country.name}`);
        return;
      }

      const phoneNumber = parsePhoneNumber(p.number, countryCode);
      formattedPhones.push(phoneNumber.number);
    }

    try {
      setSubmitting(true);

      let logoUrl = null;
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('company_logos')
          .upload(fileName, logoFile);

        if (error) throw new Error("Error uploading logo: " + error.message);

        const { data: publicUrlData } = supabase.storage
          .from('company_logos')
          .getPublicUrl(fileName);

        logoUrl = publicUrlData.publicUrl;
      }

      const res = await fetch("http://localhost:8000/api/companies/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: companyName,
          email: email,
          auth_user_id: user.id,
          ceo_name: ceoName,
          phone_numbers: formattedPhones,
          logo_url: logoUrl,
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
          {/* Logo Upload Component */}
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  if (file.size > 2 * 1024 * 1024) {
                    toast.error("Logo file size must be less than 2 MB.");
                    e.target.value = "";
                    return;
                  }
                  setLogoFile(file);
                  setLogoPreview(URL.createObjectURL(file));
                }
              }}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-[1.5px] shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300"
            >
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950 overflow-hidden relative">
                {logoPreview ? (
                  <>
                    <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImagePlus className="h-6 w-6 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-indigo-400 transition-colors">
                    <Building2 className="h-6 w-6 mb-1" strokeWidth={1.5} />
                    <span className="text-[8px] font-bold uppercase tracking-wider">Upload</span>
                  </div>
                )}
              </div>
            </label>
            {logoPreview && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setLogoFile(null);
                  setLogoPreview(null);
                }}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-500 hover:border-red-500 transition-colors z-20 cursor-pointer shadow-md"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
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
              {phoneNumbers.map((phone, index) => {
                const getPlaceholder = (code: string) => {
                  const formats: Record<string, string> = {
                    LK: "77 123 4567",
                    US: "202 555 0123",
                    GB: "7400 123456",
                    AU: "400 123 456",
                    IN: "98765 43210",
                    CA: "416 555 0123",
                    DE: "151 23456789",
                    FR: "6 12 34 56 78",
                    JP: "90 1234 5678",
                    CN: "139 1234 5678",
                    BR: "11 98765-4321",
                    ZA: "82 123 4567",
                    AE: "50 123 4567",
                    SG: "8123 4567",
                    MY: "12 345 6789",
                    NZ: "21 123 4567",
                    IT: "312 345 6789",
                    ES: "612 345 678",
                    NL: "6 12345678",
                    CH: "79 123 45 67",
                    SE: "70 123 45 67",
                    KR: "10-1234-5678",
                    MX: "55 1234 5678",
                  };
                  return formats[code] || "12 345 6789";
                };

                return (
                  <div key={index} className="relative flex items-center space-x-2 group">
                    <div className="relative flex-1 flex items-stretch rounded-xl border border-slate-800 bg-slate-950/60 transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:bg-slate-950/90 h-[42px]">
                      <CountrySelector
                        value={phone.code}
                        onChange={(val) => handlePhoneCountryChange(index, val)}
                      />
                      <div className="my-2.5 w-px bg-slate-700/50" />
                      <input
                        placeholder={getPlaceholder(phone.code)}
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
                );
              })}
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
