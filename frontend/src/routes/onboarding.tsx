import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Building2, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""]);

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
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const handleRemovePhone = (index: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...phoneNumbers];
    newPhones[index] = value;
    setPhoneNumbers(newPhones);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email || !ceoName || phoneNumbers.some((p) => !p)) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("https://cst-tour-management-system.onrender.com/api/companies/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: companyName,
          email: email,
          auth_user_id: user.id,
          ceo_name: ceoName,
          phone_numbers: phoneNumbers,
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
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-xl space-y-8 rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-xl bg-blue-600 text-white shadow-md ring-4 ring-blue-600/10">
            <Building2 className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Welcome! Please provide your company details to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-slate-700 font-medium">
                Company Name
              </Label>
              <Input
                id="companyName"
                placeholder="Horizon Travel Agency"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-white border-slate-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Company Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="info@horizontravel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-slate-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ceoName" className="text-slate-700 font-medium">
                CEO Name
              </Label>
              <Input
                id="ceoName"
                placeholder="John Doe"
                value={ceoName}
                onChange={(e) => setCeoName(e.target.value)}
                className="bg-white border-slate-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-medium">Phone Numbers</Label>
              {phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="+1 234 567 8900"
                    value={phone}
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                    className="bg-white border-slate-200 focus:border-blue-500 flex-1"
                    required
                  />
                  {phoneNumbers.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemovePhone(index)}
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddPhone}
                className="w-full mt-2 border-dashed border-slate-300 text-slate-600 hover:text-slate-900"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Phone Number
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Profile...
              </>
            ) : (
              "Complete Setup & Continue"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
