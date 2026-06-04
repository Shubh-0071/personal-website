"use client";

import { motion } from "framer-motion";
import { ExternalLink, ShieldAlert, Award, Play } from "lucide-react";
import { soundManager } from "@/lib/sounds";

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  status: "DEPLOYED" | "LOCALHOST";
  link?: string;
  features?: string[];
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: "Pulse Crisis",
      category: "EMERGENCY RESPONSE & LOGISTICS NETWORK",
      description:
        "An impactful collaborative platform engineered to coordinate immediate assistance during crises, accidents, or medical emergencies. Connecting users instantly to verified volunteers in their area, and incorporating unique night-safeguarding features.",
      tech: ["Node.js", "Express", "React", "MongoDB", "Render Hosting", "Geolocator API"],
      status: "DEPLOYED",
      link: "https://pulse-crisis.onrender.com/",
      features: [
        "Instant connection to verified volunteer responders",
        "Disaster/Medical crisis coordination panels",
        "SafeWalk utility: Live route tracking for solo night commuters",
      ],
    },
    {
      title: "Interactive New Year Wish Card",
      category: "CREATIVE RENDERING ENGINE",
      description:
        "A highly customized interactive greeting system. Utilizes canvas particle rendering and SVG transformations to display animated 3D greeting vectors.",
      tech: ["HTML5 Canvas", "CSS3 Animations", "JavaScript"],
      status: "LOCALHOST",
    },
    {
      title: "Retro Snake Game",
      category: "8-BIT ARCADE ENGINE",
      description:
        "Modernized classic arcade game. Implements grid collision algorithms, high-score memory storage, and retro synth beep sound effects.",
      tech: ["JavaScript", "HTML5 Canvas", "Web Audio API"],
      status: "LOCALHOST",
    },
    {
      title: "Geographical Treasure Hunt",
      category: "ALGORITHMIC LOGIC GAME",
      description:
        "A JavaScript-based puzzle game that tracks user movements, coordinates inputs against geometric riddles, and unlock secrets on completion.",
      tech: ["JavaScript ES6", "DOM Manipulation", "CSS Grids"],
      status: "LOCALHOST",
    },
    {
      title: "Rock Paper Scissors",
      category: "GAME THEORY LOGIC",
      description:
        "A sleek implementation of the classic game with scoring streaks, animated win/loss banners, and visual choices.",
      tech: ["JavaScript", "CSS Transition Core", "Audio Feedback"],
      status: "LOCALHOST",
    },
  ];

  const handleCardClick = () => {
    soundManager.playClick();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const featured = projects[0];
  const listItems = projects.slice(1);

  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto w-full relative">
      {/* Visual Accent Lines */}
      <div className="absolute right-0 top-0 w-24 h-px bg-cyber-purple/20" />
      <div className="absolute right-0 top-0 w-px h-24 bg-cyber-purple/20" />

      {/* Section Header */}
      <div className="mb-16 space-y-2 select-none text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest flex items-center justify-center md:justify-start">
          <span className="text-cyber-purple mr-3">//</span> PROJECTS_PORTAL
        </h2>
        <p className="text-xs text-cyber-purple/60 font-mono tracking-widest uppercase">
          EXPLORING COMPLETED CONSTRUCTS AND LOCALHOST LABS
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8"
      >
        {/* Featured Project - Pulse Crisis */}
        <motion.div
          variants={itemVariants}
          onClick={handleCardClick}
          className="group relative glass-panel-heavy p-6 md:p-8 rounded-lg border border-cyber-purple/50 flex flex-col md:flex-row gap-6 md:gap-10 hover:border-cyber-purple transition-all duration-300 pixel-shadow"
        >
          {/* Neon Glow Corner Overlay */}
          <div className="absolute top-0 right-0 p-3 bg-cyber-purple/10 border-l border-b border-cyber-purple/30 text-cyber-purple text-[10px] font-mono tracking-widest rounded-bl flex items-center space-x-1 select-none">
            <Award size={10} className="animate-spin" />
            <span>FEATURED_LAB_BUILD</span>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] text-cyber-purple font-mono tracking-wider font-bold block uppercase">
                {featured.category}
              </span>
              <h3 className="text-2xl font-display font-bold text-white tracking-wide group-hover:text-cyber-purple transition-colors duration-300">
                {featured.title}
              </h3>
            </div>

            <p className="text-xs md:text-sm text-white/70 font-mono leading-relaxed">
              {featured.description}
            </p>

            {/* Unique features bullet list */}
            {featured.features && (
              <ul className="space-y-2 text-xs font-mono text-green-400/90 pl-1 border-l border-cyber-purple/30 my-4">
                {featured.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2 text-cyber-purple/70">✦</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech tag list */}
            <div className="flex flex-wrap gap-2 pt-2">
              {featured.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 bg-[#12121c] border border-cyber-purple/20 rounded text-[10px] font-mono text-cyber-purple-light uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Deployed Action Link */}
            {featured.link && (
              <div className="pt-4 flex items-center space-x-4">
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playSuccess();
                  }}
                  className="px-5 py-2.5 bg-cyber-purple text-white font-display text-xs tracking-wider border border-cyber-purple hover:bg-transparent hover:text-cyber-purple transition-all duration-300 flex items-center space-x-2 font-bold cursor-pointer"
                >
                  <span>ACCESS WEB DEPLOYMENT</span>
                  <ExternalLink size={12} />
                </a>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-green-400 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span>ONLINE_NODE</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Localhost Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listItems.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              onClick={handleCardClick}
              className="group glass-panel p-6 rounded-lg border border-cyber-purple/30 hover:border-cyber-purple/60 hover:bg-cyber-purple/5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center select-none">
                  <span className="text-[9px] text-cyber-purple/80 font-mono tracking-wider uppercase font-semibold">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded text-[9px] font-mono font-bold tracking-wider">
                    {project.status}
                  </span>
                </div>

                <h4 className="text-lg font-display font-bold text-white tracking-wide group-hover:text-cyber-purple transition-colors duration-300">
                  {project.title}
                </h4>

                <p className="text-xs text-white/60 font-mono leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 flex flex-col space-y-4">
                {/* Tech tag list */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-[#0e0e14] border border-cyber-purple/10 rounded text-[9px] font-mono text-cyber-purple-light uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Local run indicator */}
                <div className="flex items-center space-x-1.5 text-[9px] text-white/40 font-mono select-none">
                  <Play size={8} />
                  <span>RUNS_ON: http://localhost:3000/labs</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
