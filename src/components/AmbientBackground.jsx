import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function AmbientBackground() {
  // cursor values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 20, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 20, damping: 30 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 120;
      const y = (e.clientY / window.innerHeight - 0.5) * 120;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#0b0b0f]">
      
      {/* ORB 1 – AUTO DRIFT + CURSOR */}
      <motion.div
        className="
          absolute top-1/4 left-1/4
          w-[700px] h-[700px]
          bg-accent/35
          rounded-full
          blur-[220px]
        "
        animate={{
          x: [-120, 120, -120],
          y: [80, -80, 80],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          translateX: smoothX,
          translateY: smoothY,
        }}
      />

      {/* ORB 2 – COUNTER DRIFT */}
      <motion.div
        className="
          absolute bottom-1/4 right-1/4
          w-[600px] h-[600px]
          bg-accent/25
          rounded-full
          blur-[240px]
        "
        animate={{
          x: [100, -100, 100],
          y: [-60, 60, -60],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          translateX: smoothX,
          translateY: smoothY,
        }}
      />

      {/* SUBTLE MOVING LIGHT LINE */}
      <motion.div
        className="
          absolute left-1/2 top-0
          w-px h-[200vh]
          bg-gradient-to-b
          from-transparent via-white/10 to-transparent
        "
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* FILM GRAIN */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(https://grainy-gradients.vercel.app/noise.svg)",
        }}
      />
    </div>
  );
}
