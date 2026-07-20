import React, { useState, useEffect } from "react";
import { Building2, Mail, User, Phone, ImagePlus, X, Loader2, Save, AlertCircle } from "lucide-react";
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

  return (
    <div className="flex-1 overflow-auto bg-slate-950/50 p-6 sm:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Company Settings</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your business profile and contact information.</p>
        </div>

        {/* Main Settings Card */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-xl shadow-xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Logo & Basics */}
            <div className="space-y-6">
              
              <div className="space-y-2 group">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
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
                    "flex h-24 w-24 flex-col items-center justify-center rounded-xl border-2 border-dashed bg-slate-800/50 transition-all group-hover:bg-slate-800",
                    logoPreview ? "border-transparent" : "border-slate-700 group-hover:border-indigo-500"
                  )}>
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="h-full w-full rounded-xl object-cover shadow-md ring-1 ring-slate-800" />
                    ) : (
                      <div className="flex flex-col items-center text-slate-400 group-hover:text-indigo-400 transition-colors">
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
                      className="absolute -right-2 -top-2 z-50 rounded-full bg-red-500 p-1 text-white shadow-lg transition-transform hover:scale-110 hover:bg-red-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">Recommended: Square image, max 2MB.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Primary Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Details & Phones */}
            <div className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  CEO / Founder Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={formData.ceoName}
                    onChange={(e) => setFormData({ ...formData, ceoName: e.target.value })}
                    className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Phone Numbers
                  </label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={addPhoneField}
                    className="h-6 px-2 text-[10px] text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
                  >
                    + Add Another
                  </Button>
                </div>
                
                <div className="space-y-2.5">
                  {formData.phoneNumbers.map((phone, idx) => (
                    <div key={idx} className="flex gap-2">
                      <div className="relative flex-1">
                        <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => handlePhoneChange(idx, e.target.value)}
                          placeholder="e.g. +94 77 123 4567"
                          className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 py-2 pl-10 pr-4 text-sm text-white placeholder-slate-600 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      {formData.phoneNumbers.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removePhoneField(idx)}
                          className="h-9 w-9 shrink-0 text-slate-500 hover:bg-red-500/10 hover:text-red-400 rounded-xl"
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

          <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Changes will immediately reflect across your workspace.</span>
            </div>
            <Button 
              onClick={handleSave} 
              disabled={isSubmitting}
              className="min-w-[120px] bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all font-medium h-9"
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
