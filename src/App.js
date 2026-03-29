import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import ParticlesBackground from "./components/ParticlesBackground";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import SectionDivider from "./components/SectionDivider";
import Loader from "./components/Loader";

export default function App() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Premium Scroll Progress with Spring smoothing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transformations
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  // Removing negative Y translation on content to prevent it from pushing the bounding box down and creating scroll overflow

  return (
    <>
      {/* GLOBAL LOADING PANE */}
      <Loader progress={loadProgress} isLoading={isLoading} />

      {/* Main app is fully rendered behind the loader, but scroll is locked until loaded */}
      <div
        ref={containerRef}
        className={`relative text-white flex flex-col min-h-screen overflow-clip transition-opacity duration-1000 ${
          isLoading ? "max-h-screen overflow-hidden opacity-0" : "opacity-100"
        }`}
      >
        {/* CUSTOM CURSOR EFFECT */}
        <CursorGlow />

        {/* PARALLAX BACKGROUND LAYER */}
        <motion.div
          style={{ y: backgroundY }}
          className="fixed inset-0 z-0 h-[120vh] pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-indigo-950/10 to-[#050505]" />
          <ParticlesBackground />
        </motion.div>

        {/* PARALLAX CONTENT LAYER */}
        <motion.div className="relative z-10 w-full flex-grow">
          <Navbar />
          <Hero
            onProgress={(val) => setLoadProgress(val)}
            onReady={() => setIsLoading(false)}
          />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Education />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Certificates />
          <SectionDivider />
          <Contact />
        </motion.div>
      </div>
    </>
  );
}
