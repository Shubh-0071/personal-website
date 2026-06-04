"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { soundManager } from "@/lib/sounds";
import { KeyRound, ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    
    if (!password) {
      soundManager.playError();
      setErrorMsg("Password credentials cannot be blank.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        soundManager.playSuccess();
        router.push("/admin");
      } else {
        soundManager.playError();
        setErrorMsg(result.error || "Authentication rejected.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      soundManager.playError();
      setErrorMsg("Failed to synchronize with verification server.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center p-6 relative font-mono select-none">
      {/* CRT Effects */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20 -z-10" />

      <div className="max-w-md w-full glass-panel-heavy rounded-lg border border-cyber-purple/50 pixel-shadow overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-[#121218] border-b border-cyber-purple/30 px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-cyber-purple font-bold">
            <ShieldAlert size={14} className="animate-pulse" />
            <span className="font-display text-[10px] tracking-wider">ADMIN_AUTH_PORTAL.SYS</span>
          </div>
          <span className="text-[10px] text-red-500 font-mono">[SECURE_ZONE]</span>
        </div>

        {/* Content Box */}
        <form onSubmit={handleLogin} className="p-6 md:p-8 space-y-6 text-xs md:text-sm">
          <div className="text-center space-y-2">
            <h1 className="text-xl font-display font-bold text-white tracking-widest">
              PASSCODE ENTRY
            </h1>
            <p className="text-[10px] text-white/50 leading-relaxed uppercase tracking-wider">
              Enter admin authentication keys to open database pipelines
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 font-bold rounded">
              AUTH_ERROR: {errorMsg}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] text-cyber-purple/80 uppercase tracking-widest font-bold block">
              &gt; INPUT_SECURITY_KEY:
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-[#0d0d12] border border-cyber-purple/35 hover:border-cyber-purple focus:border-cyber-purple rounded pl-10 pr-3 py-2.5 text-white caret-cyber-purple outline-none transition-colors select-text font-bold tracking-widest"
                placeholder="••••••••••••"
                required
              />
              <KeyRound size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyber-purple/50" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyber-purple text-white font-display text-xs tracking-wider border-2 border-cyber-purple hover:bg-transparent hover:text-cyber-purple transition-all duration-300 flex items-center justify-center space-x-2 font-bold cursor-pointer pixel-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            {loading ? "CHECKING KEYS..." : "AUTHORIZE ACCESS"}
          </button>
        </form>
      </div>

      <button
        onClick={() => {
          soundManager.playClick();
          router.push("/");
        }}
        className="mt-6 text-xs text-cyber-purple/60 hover:text-white underline font-bold transition-colors cursor-pointer"
      >
        &lt; RETURN TO PORTAL HERO
      </button>
    </div>
  );
}
