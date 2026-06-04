"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sounds";
import { Braces, Database, Network } from "lucide-react";

interface SkillNode {
  name: string;
  category: "languages" | "backend" | "ai";
  status: "STABLE" | "LEARNING" | "OPTIMIZING";
  level: string; // percentage representation
  description: string;
}

export default function TechStack() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const skills: SkillNode[] = [
    // Languages (Stable)
    {
      name: "Python",
      category: "languages",
      status: "STABLE",
      level: "90%",
      description: "Primary scripting engine. Applied heavily in computational robotics models, numerical simulations, and AI pipeline setups.",
    },
    {
      name: "C++",
      category: "languages",
      status: "STABLE",
      level: "85%",
      description: "Low-level system logic. Utilized for fast data processing, algorithmic computing, and robotics firmware integration.",
    },
    {
      name: "C",
      category: "languages",
      status: "STABLE",
      level: "80%",
      description: "Foundational embedded computing. Core knowledge of pointers, memory allocations, and hardware instructions.",
    },
    {
      name: "Java",
      category: "languages",
      status: "STABLE",
      level: "75%",
      description: "Object-oriented structures, concurrent execution threads, and enterprise logic patterns.",
    },
    {
      name: "JavaScript",
      category: "languages",
      status: "STABLE",
      level: "85%",
      description: "Primary engine of web client execution, browser animations, and custom interaction wrappers.",
    },
    {
      name: "HTML / CSS",
      category: "languages",
      status: "STABLE",
      level: "95%",
      description: "Layout structure and vector pixel styling. Supporting high-fidelity responsive systems and CSS shaders.",
    },
    {
      name: "MATLAB",
      category: "languages",
      status: "STABLE",
      level: "70%",
      description: "Mathematical computing and linear algebra modules. Used for control systems and robotics simulation profiles.",
    },
    {
      name: "R",
      category: "languages",
      status: "STABLE",
      level: "65%",
      description: "Statistical analysis, datasets computations, and analytical graphing pipelines.",
    },
    // Backends / DBs (Currently Learning)
    {
      name: "Node.js & Express",
      category: "backend",
      status: "LEARNING",
      level: "60%",
      description: "Constructing server configurations, writing request protocols, and managing api router ports.",
    },
    {
      name: "MongoDB",
      category: "backend",
      status: "LEARNING",
      level: "60%",
      description: "NoSQL storage matrices. Linking user records, contact logs, and tracking system datasets.",
    },
    {
      name: "SQL Databases",
      category: "backend",
      status: "LEARNING",
      level: "50%",
      description: "Relational table indices, entity relationships, query optimizations, and secure data storage schemas.",
    },
    // AI & Robotics (Currently Learning)
    {
      name: "Neural Networks",
      category: "ai",
      status: "LEARNING",
      level: "55%",
      description: "Deep learning configurations. Fine-tuning models, forward-backward propagation algorithms, and network layers.",
    },
    {
      name: "Machine Learning",
      category: "ai",
      status: "LEARNING",
      level: "65%",
      description: "Statistical classification, regression modules, dataset cleaning, and training algorithms.",
    },
    {
      name: "Robotics Vision & Kinematics",
      category: "ai",
      status: "LEARNING",
      level: "50%",
      description: "Spatial transformations, image parsing modules, sensor configurations, and physical kinematic translations.",
    },
  ];

  const handleNodeClick = (node: SkillNode) => {
    soundManager.playClick();
    setSelectedNode(node);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  // Group skills
  const languages = skills.filter((s) => s.category === "languages");
  const backend = skills.filter((s) => s.category === "backend");
  const ai = skills.filter((s) => s.category === "ai");

  return (
    <section id="skills" className="py-24 px-4 max-w-6xl mx-auto w-full relative">
      {/* Visual Accent Lines */}
      <div className="absolute left-1/2 top-0 w-px h-16 bg-cyber-purple/20 -translate-x-1/2" />

      {/* Section Header */}
      <div className="mb-16 space-y-2 select-none text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest">
          <span className="text-cyber-purple">//</span> CORE_MATRIX_NODE
        </h2>
        <p className="text-xs text-cyber-purple/60 font-mono tracking-widest uppercase">
          INTERACTIVE SKILLS AND UNDER-CONSTRUCTION CAPABILITIES
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Skills Grid Grid */}
        <div className="lg:col-span-2 space-y-8 select-none">
          {/* Languages Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-cyber-purple tracking-widest flex items-center space-x-2">
              <Braces size={14} />
              <span>STABLE_COMPILER_LANGUAGES</span>
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {languages.map((skill) => (
                <motion.button
                  key={skill.name}
                  variants={nodeVariants}
                  onClick={() => handleNodeClick(skill)}
                  className={`p-3 border font-mono text-xs text-left rounded cursor-pointer transition-all duration-200 ${
                    selectedNode?.name === skill.name
                      ? "bg-cyber-purple/25 border-cyber-purple text-white scale-[1.03]"
                      : "bg-[#0e0e14] border-cyber-purple/20 text-white/70 hover:border-cyber-purple/60 hover:text-white"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[10px] text-cyber-purple-light uppercase tracking-wider">{skill.status}</span>
                    <span className="text-[10px] text-green-400">{skill.level}</span>
                  </div>
                  <span className="font-display block truncate mt-1 text-sm">{skill.name}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Backend & Databases Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-cyber-purple tracking-widest flex items-center space-x-2">
              <Database size={14} />
              <span>SERVER_&_STORAGE_ENGINES</span>
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {backend.map((skill) => (
                <motion.button
                  key={skill.name}
                  variants={nodeVariants}
                  onClick={() => handleNodeClick(skill)}
                  className={`p-3 border font-mono text-xs text-left rounded cursor-pointer transition-all duration-200 ${
                    selectedNode?.name === skill.name
                      ? "bg-cyber-purple/25 border-cyber-purple text-white scale-[1.03]"
                      : "bg-[#0e0e14] border-cyber-purple/20 text-white/70 hover:border-cyber-purple/60 hover:text-white"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[10px] text-amber-400 uppercase tracking-wider">{skill.status}</span>
                    <span className="text-[10px] text-green-400">{skill.level}</span>
                  </div>
                  <span className="font-display block truncate mt-1 text-sm">{skill.name}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* AI & Robotics Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-cyber-purple tracking-widest flex items-center space-x-2">
              <Network size={14} />
              <span>AI_&_ROBOTICS_CORE</span>
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {ai.map((skill) => (
                <motion.button
                  key={skill.name}
                  variants={nodeVariants}
                  onClick={() => handleNodeClick(skill)}
                  className={`p-3 border font-mono text-xs text-left rounded cursor-pointer transition-all duration-200 ${
                    selectedNode?.name === skill.name
                      ? "bg-cyber-purple/25 border-cyber-purple text-white scale-[1.03]"
                      : "bg-[#0e0e14] border-cyber-purple/20 text-white/70 hover:border-cyber-purple/60 hover:text-white"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[10px] text-amber-400 uppercase tracking-wider">{skill.status}</span>
                    <span className="text-[10px] text-green-400">{skill.level}</span>
                  </div>
                  <span className="font-display block truncate mt-1 text-sm">{skill.name}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Real-time diagnostics details panel */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 border border-cyber-purple/40 rounded-lg h-full flex flex-col justify-between space-y-4 font-mono text-xs md:text-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-cyber-purple/20 pb-2 text-[10px] text-cyber-purple select-none">
                <span>SECTOR: SKILL_DIAGNOSTICS</span>
                <span className="animate-pulse">● IDLE</span>
              </div>

              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div
                    key={selectedNode.name}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 text-white/80"
                  >
                    <div>
                      <span className="text-cyber-purple/60 uppercase text-[10px] block">NODE_NAME</span>
                      <h4 className="text-lg font-display font-bold text-white tracking-wider">{selectedNode.name}</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-cyber-purple/60 uppercase text-[10px] block">COMPILER_LEVEL</span>
                        <span className="font-bold text-green-400">{selectedNode.level}</span>
                      </div>
                      <div>
                        <span className="text-cyber-purple/60 uppercase text-[10px] block">MODULE_STATUS</span>
                        <span className={`font-bold ${selectedNode.status === "STABLE" ? "text-green-400" : "text-amber-400"}`}>
                          {selectedNode.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-cyber-purple/60 uppercase text-[10px] block mb-1">SYSTEM_DESCRIPTION</span>
                      <p className="leading-relaxed border-l-2 border-cyber-purple/35 pl-3">{selectedNode.description}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-48 flex items-center justify-center text-center text-white/40 leading-relaxed py-10"
                  >
                    Select an active capabilities node on the grid to map diagnostic details.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simulated hardware usage info bar */}
            <div className="border-t border-cyber-purple/20 pt-4 space-y-2 select-none">
              <div className="flex justify-between text-[9px] text-cyber-purple/50">
                <span>INTEGRATION_SYNC_STATE</span>
                <span>ONLINE</span>
              </div>
              <div className="flex space-x-0.5">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 ${
                      selectedNode ? "bg-cyber-purple animate-pulse" : "bg-cyber-purple/20"
                    }`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
