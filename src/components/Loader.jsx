import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ progress, isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
        >
          {/* Subtle animated background glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-96 h-96 bg-accentGlow rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo / Initials */}
            <div className="relative flex items-center justify-center w-24 h-24">
              <motion.div
                initial={{ rotate: -90, strokeDasharray: "0 100" }}
                animate={{ rotate: 0, strokeDasharray: `${progress} 100` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="transparent"
                    stroke="#7c3aed"
                    strokeWidth="2"
                    strokeDasharray="301.59" // 2 * PI * r
                    strokeDashoffset={301.59 - (301.59 * progress) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-out"
                  />
                </svg>
              </motion.div>
              <div className="text-2xl font-bold tracking-widest font-heading font-outline">
                MS
              </div>
            </div>

            {/* Percentage Text */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs tracking-[0.3em] text-gray-400 uppercase font-medium">
                Initializing
              </span>
              <span className="text-4xl font-light tabular-nums tracking-wider text-white">
                {Math.round(progress)}
                <span className="text-xl text-gray-500">%</span>
              </span>
            </div>
            
            {/* Loading Bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-4">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-indigo-400"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
