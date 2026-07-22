import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { Plane, MapPinned, Mail, Lock, Eye, EyeOff, Loader2, Shield } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.session) {
        toast.success("Successfully logged in");
        router.navigate({ to: "/" });
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 select-none overflow-hidden font-sans">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full bg-emerald-500/5 blur-[160px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 z-0 pointer-events-none" />

      {/* Login Card Container */}
      <div className="relative z-10 w-full max-w-[420px] rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 sm:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-slate-800">
        <div className="flex flex-col items-center text-center">
          {/* Logo container with gradient border and subtle pulse */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 via-indigo-500 to-orange-500 p-[1.5px] shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950 overflow-hidden">
              <Plane className="h-6.5 w-6.5 text-indigo-400" strokeWidth={2} />
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white transition-all duration-300">
            NEX TOURA
          </h2>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400/80">
            Since 2026
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div className="space-y-1.5 group">
            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Email address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4.5 w-4.5 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
              <input
                id="email"
                type="email"
                placeholder="operator@horizontravel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-slate-950/90"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 group">
            <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4.5 w-4.5 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-11 pr-11 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-slate-950/90"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative mt-6 flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-blue-600 hover:to-indigo-700 hover:shadow-indigo-600/35 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying credentials...</span>
              </div>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-1.5 border-t border-slate-800/60 pt-5 text-center text-[10px] font-medium tracking-wide text-slate-500">
          <Shield className="h-3.5 w-3.5 text-slate-600" />
          <span>Access restricted to authorized personnel.</span>
        </div>
      </div>
    </div>
  );
}

