import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ progress, isLoading }) {
  // As progress goes from 0 to 100, the balls move closer to the center:
  // Offset starts at 60px away, moves down to 0px
  const offset = 70 - (progress / 100) * 70;

  const ballColors = [
    "from-accent to-purple-500",
    "from-indigo-400 to-cyan-400",
    "from-fuchsia-500 to-rose-500",
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader-container"
          initial="initial"
          animate="visible"
          exit="exit"
          variants={{
            initial: { opacity: 1 },
            visible: { opacity: 1 },
            // Outer container fades out after the blast
            exit: { opacity: 0, transition: { duration: 1, ease: "easeInOut", delay: 0.2 } },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Subtle background glow that pulses with energy */}
          <motion.div
            animate={{ 
              scale: 1 + (progress / 100), 
              opacity: 0.1 + (progress / 100) * 0.3 
            }}
            className="absolute w-96 h-96 bg-accentGlow rounded-full blur-[120px] pointer-events-none"
          />

          {/* 
            THE NOVA BLAST 
            Hidden initially. On exit, scales massive to create the "flash" that transitions to the portfolio.
          */}
          <motion.div
            variants={{
              initial: { scale: 0, opacity: 0 },
              visible: { scale: 0, opacity: 0 },
              exit: { 
                scale: 40, // 32 * 4 * 40 = 5120px (fills screen)
                opacity: [0, 1, 0], 
                transition: { duration: 1.2, ease: "circIn" } 
              }
            }}
            className="absolute z-20 w-32 h-32 bg-white rounded-full mix-blend-screen pointer-events-none"
          />

          {/* 
            ENERGY BALLS SYSTEM 
            Shrinks away into the blast on exit.
          */}
          <motion.div
            variants={{
              initial: { scale: 0, opacity: 0 },
              visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
              exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } }
            }}
            className="relative flex items-center justify-center z-10"
          >
            {/* The spinning container */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="relative flex items-center justify-center w-64 h-64"
            >
              {[0, 120, 240].map((angle, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: Math.cos((angle * Math.PI) / 180) * offset,
                    y: Math.sin((angle * Math.PI) / 180) * offset,
                    scale: 1 + (progress / 100) * 0.5,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className={`absolute w-12 h-12 rounded-full bg-gradient-to-br mix-blend-screen blur-[2px] ${ballColors[i]}`}
                  style={{
                    boxShadow: "0 0 20px currentColor",
                    color: i === 0 ? "#7c3aed" : i === 1 ? "#38bdf8" : "#f43f5e"
                  }}
                />
              ))}
            </motion.div>

            {/* Core energy nucleus (appears as they come closer) */}
            <motion.div
              animate={{ 
                scale: (progress / 100), 
                opacity: progress > 50 ? (progress / 100) : 0 
              }}
              className="absolute w-16 h-16 bg-white rounded-full blur-[8px] mix-blend-screen"
            />
          </motion.div>

          {/* Progress Number below */}
          <motion.div
            variants={{
              initial: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
              exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
            }}
            className="absolute bottom-32 flex flex-col items-center gap-2"
          >
             <span className="text-xs tracking-[0.4em] text-gray-400/70 uppercase font-medium">
               Stabilizing Core
             </span>
             <span className="text-3xl font-light tabular-nums tracking-widest text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
               {Math.round(progress)}<span className="text-lg text-gray-500/80">%</span>
             </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
