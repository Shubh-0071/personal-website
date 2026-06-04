"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/sounds";

export default function SoundController() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Sync initial state
    setEnabled(soundManager.isEnabled());
  }, []);

  const handleToggle = () => {
    const newState = soundManager.toggle();
    setEnabled(newState);
    if (newState) {
      soundManager.playClick();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-4 z-40 px-3 py-1.5 glass-panel text-xs text-cyber-purple font-mono flex items-center space-x-2 border border-cyber-purple/30 hover:border-cyber-purple hover:bg-cyber-purple/10 transition-all duration-300 pixel-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      title={enabled ? "Mute audio" : "Unmute audio"}
    >
      {enabled ? (
        <>
          <Volume2 size={14} className="animate-pulse" />
          <span className="font-display">AUDIO: ON</span>
        </>
      ) : (
        <>
          <VolumeX size={14} className="text-gray-500" />
          <span className="font-display text-gray-500">AUDIO: OFF</span>
        </>
      )}
    </button>
  );
}
