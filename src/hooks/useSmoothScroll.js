import { useScroll, useSpring } from "framer-motion";

export default function useSmoothScroll() {
  const { scrollY } = useScroll();

  // One global smoothing config
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  return smoothScrollY;
}
