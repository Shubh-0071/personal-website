"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

// Dynamically import client-only components to prevent SSR WebGL / DOM errors
const Canvas3D = dynamic(() => import("@/components/Canvas3D"), { ssr: false });
const CustomLoader = dynamic(() => import("@/components/CustomLoader"), { ssr: false });
const SoundController = dynamic(() => import("@/components/SoundController"), { ssr: false });
const TerminalHero = dynamic(() => import("@/components/TerminalHero"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: false });
const ChatBot = dynamic(() => import("@/components/ChatBot"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorTarget, setCursorTarget] = useState({ x: -100, y: -100 });

  // Custom Inertial Mouse Trailer
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorTarget({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    
    const updateCursor = () => {
      setCursorPos((prev) => {
        // Lerp for smooth inertia trailer
        const dx = cursorTarget.x - prev.x;
        const dy = cursorTarget.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    updateCursor();
    return () => cancelAnimationFrame(animationFrameId);
  }, [cursorTarget]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <CustomLoader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex flex-col justify-start relative w-full text-white bg-[#0B0B0F]"
          >
            {/* Custom Mouse Glow Trailer */}
            <div
              className="fixed w-8 h-8 rounded-full border border-cyber-purple bg-cyber-purple/5 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-screen hidden md:block"
              style={{ left: cursorPos.x, top: cursorPos.y }}
            />
            <div
              className="fixed w-1.5 h-1.5 rounded-full bg-cyber-purple pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 hidden md:block"
              style={{ left: cursorTarget.x, top: cursorTarget.y }}
            />

            {/* CRT Screen Filter Overlays */}
            <div className="crt-overlay" />
            <div className="crt-vignette" />

            {/* Custom Grid overlay & ThreeJS perspective background */}
            <div className="absolute inset-0 cyber-grid opacity-15 -z-20" />
            <Canvas3D />

            {/* Fixed Floating HUD Utilities */}
            <SoundController />
            <ChatBot />

            {/* Main scroll layouts */}
            <main className="relative z-10 w-full flex flex-col items-center">
              <TerminalHero />
              <About />
              <TechStack />
              <Projects />
              <ContactForm />
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
