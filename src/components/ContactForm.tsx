"use client";

import { useState } from "react";
import { soundManager } from "@/lib/sounds";
import { Send, Terminal } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    
    if (!formData.name || !formData.email || !formData.message) {
      soundManager.playError();
      setStatus("error");
      setErrorMsg("All parameters are required for sync.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        soundManager.playSuccess();
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        soundManager.playError();
        setStatus("error");
        setErrorMsg(result.error || "Transmission failed.");
      }
    } catch (error) {
      console.error(error);
      soundManager.playError();
      setStatus("error");
      setErrorMsg("Connection packet lost. Check database port.");
    }
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-3xl mx-auto w-full relative">
      {/* Visual Accent Lines */}
      <div className="absolute left-0 top-0 w-16 h-px bg-cyber-purple/20" />
      <div className="absolute left-0 top-0 w-px h-16 bg-cyber-purple/20" />

      {/* Section Header */}
      <div className="mb-12 space-y-2 select-none text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest">
          <span className="text-cyber-purple">//</span> SECURE_TRANSMISSIONS
        </h2>
        <p className="text-xs text-cyber-purple/60 font-mono tracking-widest uppercase">
          ESTABLISH A NEURAL COMM LINK TO THE STUDENT DIRECTORY
        </p>
      </div>

      <div className="glass-panel-heavy rounded-lg border border-cyber-purple/40 pixel-shadow overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-[#121218] border-b border-cyber-purple/30 px-4 py-2 flex items-center justify-between text-xs select-none">
          <div className="flex items-center space-x-2">
            <Terminal size={14} className="text-cyber-purple animate-pulse" />
            <span className="font-mono text-white/50 tracking-wider">SECURE_COMM_PROTOCOL.EXE</span>
          </div>
          <span className="text-[10px] text-green-400 font-mono">[READY_TO_TRANSMIT]</span>
        </div>

        {/* Contact Form Details */}
        {status === "success" ? (
          <div className="p-8 text-center space-y-4 font-mono">
            <h3 className="text-lg text-green-400 font-bold tracking-wider">
              ✦ TRANSMISSION COMPLETED ✦
            </h3>
            <p className="text-xs text-white/70 leading-relaxed max-w-md mx-auto">
              Your message packet has been securely logged and buffered in the database system. Shubham Kumar will initialize a response query shortly.
            </p>
            <button
              onClick={() => {
                soundManager.playClick();
                setStatus("idle");
              }}
              className="px-6 py-2 bg-cyber-purple text-white font-display text-xs tracking-wider border border-cyber-purple hover:bg-transparent hover:text-cyber-purple transition-all duration-300 font-bold"
            >
              ESTABLISH NEW LINK
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 font-mono text-xs md:text-sm">
            {status === "error" && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 font-bold rounded">
                ERROR_DUMP: {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name input */}
              <div className="space-y-1">
                <label className="text-[10px] text-cyber-purple/80 uppercase tracking-widest font-bold flex items-center">
                  <span className="mr-1">&gt;</span> ENTER_FULL_NAME:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className="w-full bg-[#0d0d12] border border-cyber-purple/35 hover:border-cyber-purple focus:border-cyber-purple rounded px-3 py-2 text-white caret-cyber-purple outline-none transition-colors select-text"
                  placeholder="e.g. Jane Doe"
                  required
                />
              </div>

              {/* Email input */}
              <div className="space-y-1">
                <label className="text-[10px] text-cyber-purple/80 uppercase tracking-widest font-bold flex items-center">
                  <span className="mr-1">&gt;</span> ENTER_EMAIL_ADDRESS:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className="w-full bg-[#0d0d12] border border-cyber-purple/35 hover:border-cyber-purple focus:border-cyber-purple rounded px-3 py-2 text-white caret-cyber-purple outline-none transition-colors select-text"
                  placeholder="e.g. jane@company.com"
                  required
                />
              </div>
            </div>

            {/* Message input */}
            <div className="space-y-1">
              <label className="text-[10px] text-cyber-purple/80 uppercase tracking-widest font-bold flex items-center">
                <span className="mr-1">&gt;</span> ENTER_TRANSMISSION_DETAILS:
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={status === "submitting"}
                rows={5}
                className="w-full bg-[#0d0d12] border border-cyber-purple/35 hover:border-cyber-purple focus:border-cyber-purple rounded px-3 py-2 text-white caret-cyber-purple outline-none transition-colors resize-none select-text"
                placeholder="Write your message here..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center pt-2">
              <div className="text-[9px] text-cyber-purple/50 select-none hidden md:block">
                SYS.ENCRYPTION: AES_256_ACTIVE
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full md:w-auto px-6 py-3 bg-cyber-purple text-white font-display text-xs tracking-wider border-2 border-cyber-purple hover:bg-transparent hover:text-cyber-purple transition-all duration-300 flex items-center justify-center space-x-2 font-bold cursor-pointer pixel-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <span>{status === "submitting" ? "TRANSMITTING..." : "SEND TRANSMISSION"}</span>
                <Send size={12} />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
