import { motion } from "framer-motion";
import { BrainCircuit, Activity } from "lucide-react";
import profile from "../assets/me.jpg";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center pt-24 pb-12 overflow-hidden"
    >
      {/* BACKGROUND ACCENTS */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accentGlow rounded-full blur-[120px] mix-blend-screen opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-indigo-900/30 rounded-full blur-[140px] mix-blend-screen opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent font-medium text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"></span>
            Available for Projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] mb-6 tracking-tight text-white"
          >
            Hi, I'm <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-400 whitespace-nowrap">Mohammed Sahis NP</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
          >
            A Computer Science Engineer focused on <span className="text-gray-200 font-medium">machine learning</span>, <span className="text-gray-200 font-medium">data analytics</span>, and <span className="text-gray-200 font-medium">intelligent systems</span>. I build data-driven, security-aware solutions through hands-on projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <MagneticButton>
              <a href="#projects" className="block px-8 py-3.5 rounded-full bg-accent hover:bg-violet-600 text-white font-semibold transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]">
                View Work
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#contact" className="block px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all">
                Contact Me
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end order-1 lg:order-2 mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative w-72 h-56 sm:w-80 sm:h-64 md:w-96 md:h-72 lg:w-[30rem] lg:h-[22rem]"
          >
            {/* Animated glowing border behind */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-indigo-500 rounded-[2rem] md:rounded-[3rem] rotate-6 opacity-60 blur-lg animate-pulse-slow"></div>

            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-indigo-500 rounded-[2rem] md:rounded-[3rem] rotate-3 opacity-80"></div>

            {/* Image Container */}
            <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden border-2 border-white/20 glass-card z-10 animate-float shadow-2xl">
              <img
                src={profile}
                alt="Mohammed Sahis"
                className="w-full h-full object-cover mix-blend-overlay opacity-90 hover:mix-blend-normal hover:opacity-100 transition-all duration-500 hover:scale-105"
              />
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="hidden md:block absolute -right-6 top-1/4 glass-card py-2 px-4 rounded-xl z-20 shadow-xl border border-white/10 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold">AI/ML</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="hidden md:block absolute -left-8 bottom-1/4 glass-card py-2 px-4 rounded-xl z-20 shadow-xl border border-white/10 animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold">Data Analytics</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
