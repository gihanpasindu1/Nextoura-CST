import React, { useState, useEffect } from "react";
import { Building2, Mail, User, Phone, ImagePlus, X, Loader2, Save, AlertCircle, Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
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
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    ceoName: "",
    phoneNumbers: [""],
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
          ? companyProfile.phone_numbers 
          : [""],
      });
      setLogoPreview(companyProfile.logo_url || null);
    }
  }, [companyProfile]);

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...formData.phoneNumbers];
    newPhones[index] = value;
    setFormData({ ...formData, phoneNumbers: newPhones });
  };

  const addPhoneField = () => {
    setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, ""] });
  };

  const removePhoneField = (index: number) => {
    const newPhones = formData.phoneNumbers.filter((_, i) => i !== index);
    if (newPhones.length === 0) newPhones.push("");
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
        phone_numbers: formData.phoneNumbers.filter(p => p.trim() !== ""),
        logo_url: finalLogoUrl
      };

      const res = await fetch(`http://localhost:8000/api/companies/${companyProfile.id}`, {
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
  const [currentView, setCurrentView] = useState<"menu" | "company" | "theme">("menu");

  if (currentView === "menu") {
    return (
      <div className="flex-1 overflow-auto p-6 sm:p-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={() => setCurrentView("company")}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-foreground/20 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-foreground">Company Profile</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">Update company details, logo, and contact info.</p>
              </div>
            </button>

            <button className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all opacity-50 cursor-not-allowed">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <User className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-foreground">Account & Security</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">Manage password and security preferences.</p>
              </div>
            </button>
            
            <button className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all opacity-50 cursor-not-allowed">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-foreground">Notifications</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">Email and push notification alerts.</p>
              </div>
            </button>

            <button
              onClick={() => setCurrentView("theme")}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-foreground/20 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-foreground">Theme Settings</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">Switch between Light and Dark mode.</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "theme") {
    return (
      <div className="flex-1 overflow-auto p-6 sm:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView("menu")}
              className="h-9 w-9 p-0 rounded-full text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Theme Settings</h1>
              <p className="text-sm text-muted-foreground mt-1">Customize the appearance of the application.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="space-y-4 max-w-md">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Application Theme
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => theme !== "light" && toggle()}
                  className={cn(
                    "flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all",
                    theme === "light" 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Sun className="h-8 w-8" />
                  <span className="font-semibold">Light Mode</span>
                </button>

                <button
                  onClick={() => theme !== "dark" && toggle()}
                  className={cn(
                    "flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all",
                    theme === "dark" 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Moon className="h-8 w-8" />
                  <span className="font-semibold">Dark Mode</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-6 sm:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView("menu")}
            className="h-9 w-9 p-0 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Company Profile</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your business profile and contact information.</p>
          </div>
        </div>

        {/* Main Settings Card */}
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
                    <div key={idx} className="flex gap-2">
                      <div className="relative flex-1">
                        <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => handlePhoneChange(idx, e.target.value)}
                          placeholder="e.g. +94 77 123 4567"
                          className="w-full rounded-xl border border-input bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      {formData.phoneNumbers.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removePhoneField(idx)}
                          className="h-9 w-9 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-xl"
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
    </div>
  );
}
