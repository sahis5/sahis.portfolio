import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smoother scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // More pronounced reactions
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 0]);
  const scaleX = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const y = useTransform(smoothProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={ref}
      className="relative h-40 w-full flex items-center justify-center"
    >
      {/* Core glow line expanding on scroll */}
      <motion.div
        style={{ opacity, scaleX }}
        className="
          absolute w-[80%] h-[2px]
          bg-gradient-to-r
          from-transparent
          via-accent
          to-transparent
        "
      />

      {/* Ambient blur glow moving vertically on scroll */}
      <motion.div
        style={{ opacity, y }}
        className="
          absolute w-[60%] h-16
          bg-accent/40
          blur-[40px]
          rounded-full
        "
      />
    </div>
  );
}
