import { motion, useTransform } from "framer-motion";
import useSmoothScroll from "../hooks/useSmoothScroll";

export default function GlobalCanvas() {
  const scrollY = useSmoothScroll();

  const slow = useTransform(scrollY, [0, 3000], [0, -120]);
  const medium = useTransform(scrollY, [0, 3000], [0, -260]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#0b0b0f]">
      {/* Ambient purple glow */}
      <motion.div
        style={{ y: slow }}
        className="absolute -top-96 -left-96 w-[800px] h-[800px]
                   bg-purple-600/25 rounded-full blur-[180px]"
      />

      {/* Secondary glow */}
      <motion.div
        style={{ y: medium }}
        className="absolute top-1/3 -right-96 w-[700px] h-[700px]
                   bg-purple-500/20 rounded-full blur-[200px]"
      />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
