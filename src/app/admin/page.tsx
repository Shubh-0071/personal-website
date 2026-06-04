"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { soundManager } from "@/lib/sounds";
import { LogOut, Trash2, Mail, ShieldAlert, Cpu } from "lucide-react";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages");
      const result = await response.json();

      if (response.ok && result.success) {
        setMessages(result.data);
      } else if (response.status === 401) {
        // Redirect to login if unauthorized
        router.push("/admin/login");
      } else {
        setErrorMsg(result.error || "Failed to load database logs.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to synchronize with server. Verify connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to purge this message from database logs?")) return;

    soundManager.playClick();
    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok && result.success) {
        soundManager.playSuccess();
        // Remove from local state
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      } else {
        soundManager.playError();
        alert(result.error || "Purge failed.");
      }
    } catch (error) {
      console.error(error);
      soundManager.playError();
      alert("Failed to establish purge connection.");
    }
  };

  const handleLogout = async () => {
    soundManager.playClick();
    // Clear cookies by hitting a logout API or deleting client-side cookie
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (e) {
      console.error(e);
    }
    soundManager.playSuccess();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] p-4 md:p-8 font-mono select-none">
      {/* CRT Effects */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-10 -z-10" />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation / Header Bar */}
        <div className="glass-panel p-4 border border-cyber-purple/30 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 text-cyber-purple font-bold">
            <Cpu size={18} className="animate-pulse" />
            <span className="font-display tracking-widest text-sm md:text-base">
              SHUBHAM_ADMIN_CONSOLES
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-[10px] text-green-400 font-mono flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>SECURE_CONNECTION: ESTABLISHED</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 bg-red-950/20 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold flex items-center space-x-1.5 cursor-pointer text-xs"
            >
              <LogOut size={12} />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Stat Deck */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-panel p-4 border border-cyber-purple/20 rounded-lg">
            <span className="text-[9px] text-cyber-purple/60 tracking-wider font-semibold block uppercase">
              TOTAL_RECORDS_STORED
            </span>
            <span className="text-xl md:text-2xl font-bold text-white tracking-wide block mt-1">
              {loading ? "..." : messages.length}
            </span>
          </div>
          <div className="glass-panel p-4 border border-cyber-purple/20 rounded-lg">
            <span className="text-[9px] text-cyber-purple/60 tracking-wider font-semibold block uppercase">
              SYNC_STATUS
            </span>
            <span className="text-xl md:text-2xl font-bold text-green-400 tracking-wide block mt-1">
              ONLINE
            </span>
          </div>
          <div className="glass-panel p-4 border border-cyber-purple/20 rounded-lg">
            <span className="text-[9px] text-cyber-purple/60 tracking-wider font-semibold block uppercase">
              SECTOR_CLEARANCE
            </span>
            <span className="text-xl md:text-2xl font-bold text-cyber-purple-light tracking-wide block mt-1">
              LEVEL_ALPHA
            </span>
          </div>
        </div>

        {/* Database Logs display */}
        <div className="glass-panel-heavy border border-cyber-purple/40 rounded-lg overflow-hidden pixel-shadow">
          <div className="bg-[#121218] border-b border-cyber-purple/30 px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-cyber-purple font-bold">
              <Mail size={14} />
              <span className="font-display text-[10px] tracking-wider">CONTACT_TRANSMISSIONS_DATABASE</span>
            </div>
            <span className="text-[10px] text-white/40 font-mono">
              DB_BUFFER_OK
            </span>
          </div>

          <div className="p-4 space-y-4">
            {loading ? (
              <div className="py-12 text-center text-cyber-purple animate-pulse text-sm">
                SYNCHRONIZING WITH MONGODB SERVER LOGS...
              </div>
            ) : errorMsg ? (
              <div className="py-12 text-center text-red-400 text-sm font-bold">
                DIAGNOSTICS_ERROR: {errorMsg}
              </div>
            ) : messages.length === 0 ? (
              <div className="py-12 text-center text-white/30 text-sm">
                No transmission records logged in database buffer.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className="p-4 bg-[#0d0d12] border border-cyber-purple/15 rounded flex flex-col md:flex-row justify-between gap-4 hover:border-cyber-purple/50 transition-colors"
                  >
                    <div className="space-y-2 flex-1 text-xs md:text-sm">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-white font-bold text-sm tracking-wide">
                          {msg.name}
                        </span>
                        <span className="text-cyber-purple/75 underline font-mono text-xs">
                          {msg.email}
                        </span>
                        <span className="text-[10px] text-white/30 font-mono ml-auto">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-white/80 font-mono leading-relaxed bg-[#08080b] p-3 border border-cyber-purple/10 rounded break-words select-text">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex items-start justify-end select-none">
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="p-2 bg-red-950/20 text-red-400 border border-red-500/25 hover:bg-red-500 hover:text-white transition-colors cursor-pointer rounded"
                        title="Purge message record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center select-none pt-4">
          <button
            onClick={() => {
              soundManager.playClick();
              router.push("/");
            }}
            className="text-xs text-cyber-purple/60 hover:text-white underline font-bold transition-colors cursor-pointer"
          >
            &lt; RETURN TO MAIN INTERACTION SCREEN
          </button>
        </div>
      </div>
    </div>
  );
}
