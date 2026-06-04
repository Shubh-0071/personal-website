"use client";

import { useEffect, useState } from "react";
import { soundManager } from "@/lib/sounds";
import { Mail, Link as LinkIcon, Cpu } from "lucide-react";

export default function Footer() {
  const [timeStr, setTimeStr] = useState("00:00:00");

  useEffect(() => {
    // Dynamic system clock ticking
    const updateTime = () => {
      const date = new Date();
      setTimeStr(
        date.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = () => {
    soundManager.playClick();
  };

  return (
    <footer className="mt-auto border-t border-cyber-purple/20 bg-[#07070a]/90 py-10 px-6 font-mono text-xs text-white/50 select-none">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Connection node details */}
        <div className="flex flex-col space-y-1.5 items-center md:items-start">
          <div className="flex items-center space-x-2 text-cyber-purple font-bold">
            <Cpu size={14} className="animate-pulse" />
            <span className="font-display tracking-wider">SHUBHAM_NODE_ONLINE</span>
          </div>
          <p className="text-[10px] text-white/40">
            LOC_NODE: VIT_CHENNAI_INDIA // PORT_IP: 127.0.0.1
          </p>
        </div>

        {/* Dynamic ticking pixel clock */}
        <div className="flex flex-col items-center border border-cyber-purple/20 px-4 py-2 bg-[#09090d] rounded relative group hover:border-cyber-purple transition-all duration-300">
          <span className="text-[9px] text-cyber-purple font-semibold tracking-widest uppercase">
            SYSTEM_TIME_CLOCK
          </span>
          <span className="text-sm font-bold text-white font-mono tracking-wider mt-0.5">
            {timeStr}
          </span>
        </div>

        {/* Social connections */}
        <div className="flex flex-col items-center md:items-end space-y-2">
          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/in/shubham-kumar-41a956375"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="p-1.5 border border-cyber-purple/20 rounded text-cyber-purple-light hover:text-white hover:border-cyber-purple hover:bg-cyber-purple/10 transition-all duration-200"
              title="LinkedIn Connect"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="mailto:shubham7102222@gmail.com"
              onClick={handleLinkClick}
              className="p-1.5 border border-cyber-purple/20 rounded text-cyber-purple-light hover:text-white hover:border-cyber-purple hover:bg-cyber-purple/10 transition-all duration-200"
              title="Email Direct"
            >
              <Mail size={14} />
            </a>
          </div>
          <p className="text-[9px] text-white/30 text-center md:text-right">
            © 2026 SHUBHAM KUMAR // ALL SUBROUTINES EXECUTE STABLY.
          </p>
        </div>
      </div>
    </footer>
  );
}
