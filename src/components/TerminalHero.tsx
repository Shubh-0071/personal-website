"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/lib/sounds";

interface HistoryItem {
  command: string;
  output: ReactNode;
}

export default function TerminalHero() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  const welcomeMessage = (
    <div className="space-y-1">
      <p className="text-cyber-purple font-bold">SYSTEM BOOT COMPLETE // AUTHENTIC LINK ESTABLISHED</p>
      <p className="text-xs text-white/60">
        Welcome to the cyber-portal of Shubham Kumar, Creative Technologist.
      </p>
      <p className="text-xs text-white/60">
        Type <span className="text-green-400">help</span> for a list of available subroutines, or click the buttons below.
      </p>
    </div>
  );

  useEffect(() => {
    // Focus terminal input
    inputRef.current?.focus();
    // Scroll to bottom
    scrollToBottom();
  }, [history]);

  const scrollToBottom = () => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTo({
        top: logsContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleCommand = (commandStr: string) => {
    soundManager.playClick();
    const cmd = commandStr.trim().toLowerCase();
    let output: ReactNode = "";

    if (cmd === "") return;

    switch (cmd) {
      case "help":
        output = (
          <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-green-400/90 font-mono">
            <div><span className="text-white font-bold">about</span> - Core developer identity & mission</div>
            <div><span className="text-white font-bold">projects</span> - Catalog of full-stack & local creations</div>
            <div><span className="text-white font-bold">skills</span> - Installed frameworks and systems</div>
            <div><span className="text-white font-bold">contact</span> - Secure communication paths</div>
            <div><span className="text-white font-bold">clear</span> - Wipe console buffer history</div>
          </div>
        );
        break;
      case "about":
        output = (
          <div className="space-y-2 text-xs md:text-sm font-mono text-white/95 leading-relaxed">
            <p className="text-cyber-purple font-bold border-b border-cyber-purple/20 pb-1">SUBJECT PROFILE: SHUBHAM KUMAR</p>
            <p><span className="text-green-400">Role:</span> 2nd Year CS Student (Specializing in AI & Robotics) @ VIT Chennai</p>
            <p><span className="text-green-400">Core Engine:</span> Deeply dedicated to problem-solving. Once I commit to a project, I fully execute and constantly implement new creative ideas.</p>
            <p><span className="text-green-400">Focus:</span> Full-Stack Web Architecture + Robotics & Artificial Intelligence.</p>
          </div>
        );
        break;
      case "projects":
        output = (
          <div className="space-y-2 text-xs md:text-sm font-mono text-white/95">
            <p className="text-cyber-purple font-bold border-b border-cyber-purple/20 pb-1">CATALOG_ARCHIVE</p>
            <div>
              <p className="font-bold text-green-400">1. Pulse Crisis [Full Stack / Team Project]</p>
              <p className="text-white/70 ml-4">Real-time disaster management & medical tracker. Connects citizens with volunteers. Includes Night Safewalking feature.</p>
              <a href="https://pulse-crisis.onrender.com" target="_blank" rel="noopener noreferrer" className="text-cyber-purple underline ml-4 hover:text-white transition-colors">https://pulse-crisis.onrender.com</a>
            </div>
            <div className="mt-1">
              <p className="font-bold text-green-400">2. Arcade & Tool Suite [Localhost]</p>
              <p className="text-white/70 ml-4">Snake Game, Treasure Hunt, Rock Paper Scissors, New Year Wish Card.</p>
            </div>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="space-y-2 text-xs md:text-sm font-mono text-white/95">
            <p className="text-cyber-purple font-bold border-b border-cyber-purple/20 pb-1">CAPABILITIES_MATRIX</p>
            <p><span className="text-green-400">Languages:</span> Python, C, C++, Java, HTML, CSS, JavaScript, MATLAB, R</p>
            <p><span className="text-green-400">Under Construction:</span> Databases (MongoDB, SQL), Node.js, Express, Deep Learning models, Robotics Vision.</p>
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="space-y-1 text-xs md:text-sm font-mono text-white/95">
            <p className="text-cyber-purple font-bold border-b border-cyber-purple/20 pb-1">COMMUNICATION_LINK</p>
            <p><span className="text-green-400">Terminal Email:</span> shubham7102222@gmail.com</p>
            <p><span className="text-green-400">LinkedIn Link:</span> <a href="https://www.linkedin.com/in/shubham-kumar-41a956375" target="_blank" rel="noopener noreferrer" className="text-cyber-purple underline hover:text-white transition-colors">Profile Portal</a></p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        output = `Command not recognized: "${cmd}". Type "help" to see valid inputs.`;
        break;
    }

    setHistory((prev) => [...prev, { command: commandStr, output }]);
    setInputVal("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="min-h-screen pt-20 pb-12 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Cinematic Glowing Background overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyber-purple/20 rounded-full blur-[80px] -z-10" />

      <div className="max-w-4xl w-full flex flex-col space-y-6">
        {/* Title Brand - Using Display Custom Font */}
        <div className="text-center space-y-2 select-none">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-display font-bold text-white tracking-widest leading-none"
          >
            SHUBHAM KUMAR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-cyber-purple font-mono text-xs md:text-sm font-semibold tracking-widest uppercase pixel-text-glow"
          >
            // ARCHITECTING THE DIGITAL FRONTIER
          </motion.p>
        </div>

        {/* Custom Terminal Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full glass-panel-heavy rounded-lg overflow-hidden border border-cyber-purple/40 pixel-shadow flex flex-col h-[400px] md:h-[450px]"
          onClick={focusInput}
        >
          {/* Terminal Window Header Bar */}
          <div className="bg-[#121218] border-b border-cyber-purple/30 px-4 py-2 flex items-center justify-between text-xs select-none">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="text-cyber-purple font-mono font-bold tracking-wider text-[10px] md:text-xs">
              SHUBHAM_SHELL_v1.0.4.sys
            </div>
            <div className="text-white/40 text-[9px] md:text-[10px] font-mono">
              [CONNECTED_NODE]
            </div>
          </div>

          {/* Terminal Shell Logs Output */}
          <div ref={logsContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs md:text-sm text-white/90">
            {welcomeMessage}

            {history.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center text-green-400">
                  <span className="text-cyber-purple/60 mr-2">shubham@portfolio:~$</span>
                  <span>{item.command}</span>
                </div>
                <div className="text-white/80 whitespace-pre-wrap pl-4 border-l border-cyber-purple/10">
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Prompt Command Bar Input */}
          <div className="p-3 bg-[#0d0d12] border-t border-cyber-purple/20 flex items-center">
            <span className="text-cyber-purple/75 font-mono text-xs md:text-sm mr-2 font-bold select-none">
              shubham@portfolio:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs md:text-sm text-white caret-cyber-purple selection:bg-cyber-purple/30"
              placeholder='Type a command or click "help"...'
            />
          </div>
        </motion.div>

        {/* Quick Commands Button Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 select-none"
        >
          {["about", "projects", "skills", "contact", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-4 py-1.5 glass-panel text-xs text-cyber-purple font-mono font-bold tracking-wider hover:bg-cyber-purple hover:text-white border border-cyber-purple/40 pixel-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-200 cursor-pointer"
            >
              &gt; {cmd.toUpperCase()}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
