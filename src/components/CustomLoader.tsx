"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sounds";

interface CustomLoaderProps {
  onComplete: () => void;
}

export default function CustomLoader({ onComplete }: CustomLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const bootLogs = [
    "SHUBHAM_OS v1.0.4 loaded successfully.",
    "CPU: AMD RYZEN ROBOTICS NEURAL v4.2 [OK]",
    "SYSTEM MEMORY: 64GB INTEGRATED COGNITION [OK]",
    "LOADING GRAPHICS SUBSYSTEM (THREE.JS GRIDS)... [OK]",
    "MOUNTING MONGODB DATA PIPELINES... [OK]",
    "FETCHING LAB PROFILE: CSSpecialization(AI, Robotics)... [OK]",
    "ESTABLISHING VERIFIED EMERGENCY CHANNELS... [OK]",
    "PREPARING NEURAL INTERACTION WIDGET... [OK]",
    "INITIALIZATION COMPLETE. READY FOR LINK."
  ];

  useEffect(() => {
    // Add logs one by one based on progress
    const logInterval = setInterval(() => {
      setLogs((prev) => {
        const nextIndex = prev.length;
        if (nextIndex < bootLogs.length) {
          return [...prev, bootLogs[nextIndex]];
        }
        clearInterval(logInterval);
        return prev;
      });
    }, 350);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    // Increment progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsLoaded(true);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  const handleStart = () => {
    soundManager.playBoot();
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-[#0B0B0F] z-50 flex flex-col justify-between p-6 font-mono select-none overflow-hidden">
      {/* CRT Effects */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />

      {/* Top Banner */}
      <div className="flex justify-between items-center text-xs text-cyber-purple border-b border-cyber-purple/20 pb-4">
        <div>CORE MODULE // BOOT_SEQUENCE</div>
        <div className="animate-pulse">● ONLINE</div>
      </div>

      {/* Main Log Screen */}
      <div className="flex-1 my-6 overflow-y-auto flex flex-col justify-start space-y-2 text-sm text-green-400 max-w-4xl mx-auto w-full">
        <div className="text-cyber-purple font-bold mb-4 font-display text-xl">
          SHUBHAM KUMAR // SYSTEM INITIALIZATION
        </div>
        
        {logs.map((log, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start font-mono text-xs md:text-sm text-green-400/90"
          >
            <span className="text-cyber-purple/60 mr-2">&gt;&gt;</span>
            {log}
          </motion.div>
        ))}

        {progress < 100 && (
          <div className="flex items-center space-y-1 text-xs text-cyber-purple/50 animate-pulse mt-4">
            <span className="mr-2">SYNCING MATRIX DATA...</span>
          </div>
        )}
      </div>

      {/* Bottom Interface */}
      <div className="max-w-4xl mx-auto w-full flex flex-col space-y-4 border-t border-cyber-purple/20 pt-4">
        {/* Progress Bar Container */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-cyber-purple/80 mb-1">
            <span>MEM_BUFFER_STATUS</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-4 border border-cyber-purple/30 bg-[#07070a] p-[2px] relative">
            <motion.div
              className="h-full bg-cyber-purple"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence>
            {isLoaded && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={handleStart}
                className="px-8 py-3 bg-cyber-purple text-white font-display text-sm tracking-wider font-bold border-2 border-cyber-purple hover:bg-transparent hover:text-cyber-purple transition-all duration-300 pixel-shadow active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                INITIALIZE NEURAL LINK
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
