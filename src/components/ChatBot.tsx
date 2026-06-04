"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareCode, X, Send, Cpu } from "lucide-react";
import { soundManager } from "@/lib/sounds";

interface ChatMessage {
  sender: "bot" | "user";
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "System initialized. I am SHUBHAM_BOT v1.0, a neural interface configured to answer questions about Shubham Kumar. What data would you like to retrieve?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    soundManager.playClick();
    setIsOpen(!isOpen);
  };

  const getBotResponse = (input: string): string => {
    const query = input.toLowerCase().trim();

    if (query.includes("who is") || query.includes("shubham") || query.includes("about")) {
      return "Shubham Kumar is a B.Tech Computer Science student specializing in AI & Robotics at VIT Chennai (2nd Year). He is highly dedicated to full-stack dev and AI, and is known for implementing innovative features into all his project builds.";
    }
    if (query.includes("vit") || query.includes("chennai") || query.includes("education") || query.includes("college")) {
      return "Shubham is currently pursuing B.Tech in CSE specializing in AI & Robotics at Vellore Institute of Technology (VIT) Chennai. He focuses on algorithms, software architecture, neural networks, and embedded systems.";
    }
    if (query.includes("pulse") || query.includes("crisis") || query.includes("emergency")) {
      return "Pulse Crisis is one of his star builds! It is a real-time crisis coordination platform to connect citizens with verified emergency volunteers during disasters. It also includes a SafeWalk tool for tracking solo night travelers.";
    }
    if (query.includes("game") || query.includes("snake") || query.includes("treasure") || query.includes("localhost") || query.includes("scissors")) {
      return "He has built several interactive local games and projects: a canvas-based Snake Game, an algorithmic Geographical Treasure Hunt, a CSS-styled Rock Paper Scissors, and a canvas New Year wish renderer.";
    }
    if (query.includes("skills") || query.includes("languages") || query.includes("tech") || query.includes("stack")) {
      return "His matrix includes Python, C++, C, Java, HTML, CSS, JavaScript, MATLAB, and R. He is currently learning databases (MongoDB, SQL), backend configurations (Node.js, Express), and deep learning.";
    }
    if (query.includes("contact") || query.includes("email") || query.includes("linkedin")) {
      return "You can reach Shubham at shubham7102222@gmail.com. You can also view his professional portal on LinkedIn at https://www.linkedin.com/in/shubham-kumar-41a956375";
    }
    if (query.includes("help") || query.includes("menu")) {
      return "Ask me about: 'Who is Shubham?', 'VIT Chennai', 'Pulse Crisis', 'His technical skills', or 'Contact info'. You can also type custom queries!";
    }

    return "Data query unresolved. Try asking: 'Who is Shubham?', 'What is Pulse Crisis?', 'What are his skills?', or 'How can I contact him?'";
  };

  const handleSend = (textToSend: string) => {
    if (textToSend.trim() === "") return;

    soundManager.playClick();
    
    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    setInputVal("");

    // Simulate bot thinking and reply
    setTimeout(() => {
      const reply = getBotResponse(textToSend);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      soundManager.playSuccess();
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend(inputVal);
    }
  };

  const presetQuestions = [
    "Who is Shubham?",
    "Pulse Crisis details?",
    "Technical skills?",
    "Contact routes?",
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40 font-mono select-none">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="w-12 h-12 rounded-lg bg-cyber-purple border-2 border-white flex items-center justify-center text-white cursor-pointer pixel-shadow hover:bg-[#0b0b0f] hover:text-cyber-purple hover:border-cyber-purple transition-all duration-300"
      >
        <MessageSquareCode size={20} className="animate-pulse" />
      </motion.button>

      {/* Chat Dialogue Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="absolute bottom-14 right-0 w-[300px] sm:w-[350px] h-[400px] glass-panel-heavy rounded-lg border border-cyber-purple/50 flex flex-col justify-between pixel-shadow overflow-hidden"
          >
            {/* Header bar */}
            <div className="bg-[#121218] border-b border-cyber-purple/30 px-3 py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5 text-cyber-purple font-bold">
                <Cpu size={12} className="animate-spin" />
                <span className="font-display text-[10px] tracking-wider">SHUBHAM_BOT_v1.0</span>
              </div>
              <button
                onClick={toggleChat}
                className="text-white/40 hover:text-cyber-purple cursor-pointer transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs flex flex-col justify-start">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                  }`}
                >
                  <span className="text-[8px] text-cyber-purple/55 mb-0.5 uppercase tracking-wide">
                    {msg.sender === "user" ? "USER" : "BOT"}
                  </span>
                  <div
                    className={`p-2.5 rounded font-mono text-[11px] leading-relaxed border ${
                      msg.sender === "user"
                        ? "bg-[#161622] border-cyber-purple text-white rounded-tr-none"
                        : "bg-[#0b0b0f] border-green-500/30 text-green-400 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Presets Section */}
            <div className="px-2 pb-1 flex flex-wrap gap-1">
              {presetQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-2 py-1 bg-[#101016] border border-cyber-purple/20 text-[9px] font-semibold text-cyber-purple-light hover:border-cyber-purple hover:bg-cyber-purple/10 rounded cursor-pointer transition-all duration-200"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form Bar */}
            <div className="p-2 bg-[#09090d] border-t border-cyber-purple/25 flex items-center">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-white/30 px-2 py-1 select-text caret-cyber-purple"
                placeholder="Ask bot something..."
              />
              <button
                onClick={() => handleSend(inputVal)}
                className="p-1 text-cyber-purple hover:text-white cursor-pointer transition-colors"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
