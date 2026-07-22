import React, { useState, useEffect } from "react";
import { Building2, Mail, User, Phone, ImagePlus, X, Loader2, Save, AlertCircle, Bell, Moon, Sun, ChevronDown, Search } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { COUNTRIES } from "@/lib/countries";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

function SettingsCountrySelector({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = COUNTRIES.find(c => c.code === value) || COUNTRIES[0];
  const filtered = COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.dialCode.includes(search));
  const dropdownRef = React.useRef<HTMLDivElement>(null);

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
        className="flex items-center gap-1.5 h-full pl-3 pr-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-l-xl"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="font-medium">{selected.dialCode}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute top-[110%] left-0 w-64 rounded-xl border border-border bg-popover shadow-md z-50 overflow-hidden">
          <div className="p-2 border-b border-border relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              autoFocus
              placeholder="Search country or code..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-lg py-1.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-1 scrollbar-thin">
            {filtered.length === 0 ? (
              <div className="py-3 text-center text-xs text-muted-foreground">No countries found</div>
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
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${c.code === selected.code ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                >
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="font-medium text-muted-foreground w-10 text-left">{c.dialCode}</span>
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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function SettingsView({ 
  companyProfile, 
  setCompanyProfile 
}: { 
  companyProfile: any; 
  setCompanyProfile: (profile: any) => void;
}) {
  const [formData, setFormData] = useState<{
    companyName: string;
    email: string;
    ceoName: string;
    phoneNumbers: { code: string; number: string }[];
  }>({
    companyName: "",
    email: "",
    ceoName: "",
    phoneNumbers: [{ code: "LK", number: "" }],
  });
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with company profile data
  useEffect(() => {
    if (companyProfile) {
      setFormData({
        companyName: companyProfile.company_name || "",
        email: companyProfile.email || "",
        ceoName: companyProfile.ceo_name || "",
        phoneNumbers: companyProfile.phone_numbers && companyProfile.phone_numbers.length > 0 
          ? companyProfile.phone_numbers.map((num: string) => {
              try {
                const parsed = parsePhoneNumber(num);
                return { code: parsed.country || "LK", number: parsed.formatNational() };
              } catch (e) {
                return { code: "LK", number: num };
              }
            })
          : [{ code: "LK", number: "" }],
      });
      setLogoPreview(companyProfile.logo_url || null);
    }
  }, [companyProfile]);

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...formData.phoneNumbers];
    newPhones[index].number = value;
    setFormData({ ...formData, phoneNumbers: newPhones });
  };

  const handlePhoneCountryChange = (index: number, value: string) => {
    const newPhones = [...formData.phoneNumbers];
    newPhones[index].code = value;
    setFormData({ ...formData, phoneNumbers: newPhones });
  };

  const addPhoneField = () => {
    setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, { code: "LK", number: "" }] });
  };

  const removePhoneField = (index: number) => {
    const newPhones = formData.phoneNumbers.filter((_, i) => i !== index);
    if (newPhones.length === 0) newPhones.push({ code: "LK", number: "" });
    setFormData({ ...formData, phoneNumbers: newPhones });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB");
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!companyProfile?.id) return;
    
    setIsSubmitting(true);
    try {
      // Validate email with stricter regex to catch invalid TLDs like .com3333
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        setIsSubmitting(false);
        return;
      }

      // Validate and format phone numbers
      const formattedPhones: string[] = [];
      for (const p of formData.phoneNumbers) {
        if (!p.number.trim()) continue;
        const countryCode = p.code as CountryCode;

        if (!isValidPhoneNumber(p.number, countryCode)) {
          const country = COUNTRIES.find(c => c.code === p.code) || COUNTRIES[0];
          toast.error(`Please enter a valid phone number for ${country.name}`);
          setIsSubmitting(false);
          return;
        }

        const phoneNumber = parsePhoneNumber(p.number, countryCode);
        formattedPhones.push(phoneNumber.number);
      }

      let finalLogoUrl = companyProfile.logo_url;

      // Handle Logo Upload if changed
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${companyProfile.auth_user_id}_${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('company_logos')
          .upload(fileName, logoFile);

        if (uploadError) {
          throw new Error("Logo Upload Failed. Please check Supabase storage permissions. Details: " + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from('company_logos')
          .getPublicUrl(fileName);

        finalLogoUrl = publicUrlData.publicUrl;
      } else if (!logoPreview) {
        // Logo was removed
        finalLogoUrl = null;
      }

      // Update backend
      const payload = {
        company_name: formData.companyName,
        email: formData.email,
        ceo_name: formData.ceoName,
        phone_numbers: formattedPhones,
        logo_url: finalLogoUrl
      };

      const res = await fetch(`https://cst-tour-management-system.onrender.com/api/companies/${companyProfile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to update company settings");
      }

      const updatedCompany = await res.json();
      setCompanyProfile(updatedCompany);
      setLogoFile(null); // Reset file selection state after successful upload
      toast.success("Settings updated successfully!");

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { theme, toggle } = useTheme();
  const [currentView, setCurrentView] = useState<"company" | "theme">("company");

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Sidebar Navigation */}
      <div className="w-64 shrink-0 border-r border-border bg-card/30 flex flex-col">
        <div className="p-6 pb-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Settings</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage your preferences.</p>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setCurrentView("company")}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              currentView === "company"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
          >
            <Building2 className="h-4 w-4" />
            Company Profile
          </button>
          
          <button
            disabled
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed"
          >
            <User className="h-4 w-4" />
            Account & Security
          </button>
          
          <button
            disabled
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </button>

          <button
            onClick={() => setCurrentView("theme")}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              currentView === "theme"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
          >
            {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            Theme Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-background/50">
        {currentView === "theme" && (
          <div className="p-6 sm:p-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Theme Settings</h1>
              <p className="text-sm text-muted-foreground mt-1">Customize the appearance of the application.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="space-y-4 max-w-md">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Application Theme
                </label>
                
                <div className="grid grid-cols-2 gap-3 max-w-[320px]">
                  <button
                    onClick={() => theme !== "light" && toggle()}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all duration-200",
                      theme === "light" 
                        ? "border-primary bg-primary/5 text-primary shadow-sm" 
                        : "border-border bg-card hover:border-primary/40 text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <Sun className="h-5 w-5" />
                    <span className="text-[13px] font-medium">Light Mode</span>
                  </button>

                  <button
                    onClick={() => theme !== "dark" && toggle()}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all duration-200",
                      theme === "dark" 
                        ? "border-primary bg-primary/5 text-primary shadow-sm" 
                        : "border-border bg-card hover:border-primary/40 text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <Moon className="h-5 w-5" />
                    <span className="text-[13px] font-medium">Dark Mode</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === "company" && (
          <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Company Profile</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage your business profile and contact information.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Column: Logo & Basics */}
                <div className="space-y-6">
                  
                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Company Logo
                    </label>
                    <div className="relative group w-fit">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                      />
                      <div className={cn(
                        "flex h-24 w-24 flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/50 transition-all group-hover:bg-muted",
                        logoPreview ? "border-transparent" : "border-border group-hover:border-primary/50"
                      )}>
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo" className="h-full w-full rounded-xl object-cover shadow-sm ring-1 ring-border" />
                        ) : (
                          <div className="flex flex-col items-center text-muted-foreground group-hover:text-primary/70 transition-colors">
                            <ImagePlus className="mb-1.5 h-6 w-6" />
                            <span className="text-[10px] font-medium">Upload</span>
                          </div>
                        )}
                      </div>

                      {logoPreview && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setLogoFile(null);
                            setLogoPreview(null);
                          }}
                          className="absolute -right-2 -top-2 z-50 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm transition-transform hover:scale-110 hover:bg-destructive/90"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground">Recommended: Square image, max 2MB.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Primary Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                </div>

                {/* Right Column: Details & Phones */}
                <div className="space-y-6">
                  
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      CEO / Founder Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.ceoName}
                        onChange={(e) => setFormData({ ...formData, ceoName: e.target.value })}
                        className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Phone Numbers
                      </label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={addPhoneField}
                        className="h-6 px-2 text-[10px] text-primary hover:text-primary hover:bg-primary/10"
                      >
                        + Add Another
                      </Button>
                    </div>
                    
                    <div className="space-y-2.5">
                      {formData.phoneNumbers.map((phone, idx) => (
                        <div key={idx} className="flex gap-2 group">
                          <div className="relative flex-1 flex items-stretch rounded-xl border border-input bg-background transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary h-[42px]">
                            <SettingsCountrySelector
                              value={phone.code}
                              onChange={(val) => handlePhoneCountryChange(idx, val)}
                            />
                            <div className="my-2.5 w-px bg-border mx-1" />
                            <input
                              type="text"
                              value={phone.number}
                              onChange={(e) => handlePhoneChange(idx, e.target.value)}
                              placeholder="e.g. 77 123 4567"
                              className="w-full bg-transparent py-2 pl-3 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                            />
                          </div>
                          {formData.phoneNumbers.length > 1 && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removePhoneField(idx)}
                              className="h-[42px] w-[42px] shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-xl border border-border"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Changes will immediately reflect across your workspace.</span>
                </div>
                <Button 
                  onClick={handleSave} 
                  disabled={isSubmitting}
                  className="min-w-[120px] rounded-xl font-medium h-9"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
