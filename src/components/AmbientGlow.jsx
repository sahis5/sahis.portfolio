import { useEffect, useState } from "react";

export default function AmbientGlow() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Left glow */}
      <div
        className="pointer-events-none fixed top-0 left-0 h-full w-64 z-0"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          background:
            "linear-gradient(to right, rgba(124,58,237,0.15), transparent)",
        }}
      />

      {/* Right glow */}
      <div
        className="pointer-events-none fixed top-0 right-0 h-full w-64 z-0"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          background:
            "linear-gradient(to left, rgba(124,58,237,0.15), transparent)",
        }}
      />
    </>
  );
}
