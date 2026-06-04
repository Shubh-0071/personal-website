"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Compass, Eye } from "lucide-react";
import { soundManager } from "@/lib/sounds";

export default function About() {
  const stats = [
    { label: "ACADEMIC_STANDING", value: "2ND YEAR B.TECH" },
    { label: "SPECIALIZATION", value: "AI & ROBOTICS" },
    { label: "CAMPUS_NODE", value: "VIT CHENNAI" },
    { label: "COMMITMENT_LEVEL", value: "HYPER-DEDICATED" },
  ];

  const handleStatHover = () => {
    soundManager.playClick();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="about" className="py-24 px-4 max-w-6xl mx-auto w-full relative">
      {/* Decorative Matrix overlay grid for sector visual split */}
      <div className="absolute left-0 bottom-0 w-24 h-px bg-cyber-purple/20" />
      <div className="absolute left-0 bottom-0 w-px h-24 bg-cyber-purple/20" />

      {/* Section Header */}
      <div className="mb-16 space-y-2 select-none text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest flex items-center justify-center md:justify-start">
          <span className="text-cyber-purple mr-3">//</span> LAB_PROFILE
        </h2>
        <p className="text-xs text-cyber-purple/60 font-mono tracking-widest uppercase">
          ACADEMIC DATABASES AND SYSTEM DEDICATION MATRIX
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card & Stats Grid */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-panel p-6 border border-cyber-purple/30 rounded-lg flex flex-col justify-between space-y-6"
          >
            {/* Simulation Avatar Box */}
            <div className="space-y-4">
              <div className="w-full aspect-square border border-cyber-purple/30 bg-[#0d0d12] relative overflow-hidden group select-none rounded">
                {/* Retro brackets and coordinates */}
                <div className="absolute top-2 left-2 text-[9px] text-cyber-purple/60 font-mono z-10 bg-[#0b0b0f]/80 px-1.5 py-0.5 border border-cyber-purple/20 rounded">[011_NODE]</div>
                <div className="absolute bottom-2 right-2 text-[9px] text-green-400/60 font-mono z-10 bg-[#0b0b0f]/80 px-1.5 py-0.5 border border-green-500/20 rounded">STATUS: ACTIVE</div>
                
                <img
                  src="/profile.jpg"
                  alt="Shubham Kumar"
                  className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 filter brightness-[85%] contrast-[110%]"
                />
                
                {/* Neon scanner line overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-purple/20 to-transparent pointer-events-none group-hover:translate-y-full transition-all duration-1000 ease-in-out" />
              </div>
              
              <div className="text-center">
                <span className="text-sm font-display font-bold text-white tracking-wide block">
                  SHUBHAM KUMAR
                </span>
                <span className="text-[10px] text-cyber-purple font-mono tracking-widest uppercase block mt-1">
                  SYS.CONSTRUCT_INITIATED
                </span>
              </div>
            </div>

            {/* Quick Stat Blocks */}
            <div className="space-y-3 font-mono">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  onMouseEnter={handleStatHover}
                  className="p-3 bg-[#111116] border border-cyber-purple/15 rounded flex flex-col hover:border-cyber-purple/50 transition-all duration-200"
                >
                  <span className="text-[9px] text-cyber-purple/60 tracking-wider font-semibold uppercase">
                    {stat.label}
                  </span>
                  <span className="text-xs font-bold text-white tracking-wide mt-0.5">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Narrative / Focus Grid */}
        <div className="lg:col-span-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Core Identity Narrative */}
            <motion.div
              variants={cardVariants}
              className="glass-panel-heavy p-6 md:p-8 rounded-lg border border-cyber-purple/40 space-y-4"
            >
              <h3 className="text-lg font-display font-bold text-white tracking-wide flex items-center space-x-2">
                <Terminal size={16} className="text-cyber-purple" />
                <span>CYBER_IDENTITY_BIOGRAPHY</span>
              </h3>
              <div className="font-mono text-xs md:text-sm text-white/80 space-y-4 leading-relaxed">
                <p>
                  I am a second-year Computer Science student specializing in **Artificial Intelligence and Robotics** at **VIT Chennai**. My educational focus sits at the nexus of full-stack engineering, robotic kinematics, and cognitive systems.
                </p>
                <p>
                  As an engineer, my core philosophy centers on **unrelenting dedication**. When I start working on a build, I commit fully. I push past baseline criteria, constantly experimenting, tweaking, and implementing new features until the deployment matches my creative vision.
                </p>
                <p>
                  Whether configuring serverless backends, designing custom pixel graphics, or training neural networks, I aim to create codebases that are robust, premium, and visually stunning.
                </p>
              </div>
            </motion.div>

            {/* Mission / Values Deck */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={cardVariants}
                className="glass-panel p-6 rounded-lg border border-cyber-purple/20 space-y-3"
              >
                <h4 className="font-display text-sm font-bold text-cyber-purple flex items-center space-x-2">
                  <Compass size={14} />
                  <span>CORE_DEDICATION</span>
                </h4>
                <p className="font-mono text-xs text-white/70 leading-relaxed">
                  Total project focus. Standard templates are rejected in favor of bespoke configurations, unique assets, and customized micro-interactions.
                </p>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="glass-panel p-6 rounded-lg border border-cyber-purple/20 space-y-3"
              >
                <h4 className="font-display text-sm font-bold text-cyber-purple flex items-center space-x-2">
                  <Eye size={14} />
                  <span>FUTURE_TARGETS</span>
                </h4>
                <p className="font-mono text-xs text-white/70 leading-relaxed">
                  Engaging in AI integrations, robotic logic systems, and high-performance Web apps. Seeking collaborations that push technical boundaries.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
