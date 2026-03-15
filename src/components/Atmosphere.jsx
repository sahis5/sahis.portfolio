import { motion } from "framer-motion";

export default function Atmosphere() {
  return (
    <>
      {/* Animated noise */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "url(https://grainy-gradients.vercel.app/noise.svg)",
        }}
        animate={{ opacity: [0.03, 0.045, 0.03] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Slow breathing vignette */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        animate={{ opacity: [0.35, 0.45, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.9) 100%)",
        }}
      />
    </>
  );
}
