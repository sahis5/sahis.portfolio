import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import MagneticButton from "./MagneticButton";

const TOTAL_FRAMES = 205;

// Only build the frames array once (desktop only uses this)
const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return `/images/herosection/ezgif-frame-${n}.png`;
});

// Check at module level so it doesn't change during render
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export default function Hero() {
  const wrapperRef    = useRef(null);
  const sectionRef    = useRef(null);
  const canvasRef     = useRef(null);
  const imagesRef     = useRef([]);
  const currentIdxRef = useRef(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // ── Scroll progress (used for text anims on both mobile & desktop) ──────
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30, // Higher damping prevents the "boomerang" bounce effect
    restDelta: 0.001,
  });

  // Desktop: frame index driven by scroll
  const frameIndex = useTransform(smoothProgress, [0, 0.6], [0, TOTAL_FRAMES - 1]);

  // ── Text scroll animations ──────────────────────────────────────────────
  const badgeY   = useTransform(scrollYProgress, [0, 0.28], [0, -50]);
  const badgeOp  = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const h1X      = useTransform(scrollYProgress, [0, 0.45], [0, 80]);
  const h1Scale  = useTransform(scrollYProgress, [0, 0.4],  [1, 1.07]);
  const h1Op     = useTransform(scrollYProgress, [0, 0.42], [1, 0]);
  const pX       = useTransform(scrollYProgress, [0, 0.5],  [0, -40]);
  const pOp      = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const btnY     = useTransform(scrollYProgress, [0, 0.42], [0, 50]);
  const btnOp    = useTransform(scrollYProgress, [0.08, 0.38], [1, 0]);
  const scrollOp = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Canvas fades out as it enters Projects section (desktop only)
  const canvasOp = useTransform(scrollYProgress, [0.55, 0.82], [1, 0]);

  // ── Canvas draw (desktop only) ─────────────────────────────────────────
  // Shift image slightly right (positive xOffset) to reveal the subject on the left
  const drawFrame = useCallback((idx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[Math.round(Math.max(0, Math.min(TOTAL_FRAMES - 1, idx)))];
    if (!img) return;
    const { offsetWidth: w, offsetHeight: h } = canvas;
    if (!w || !h) return;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width  = w;
      canvas.height = h;
    }
    const ctx = canvas.getContext("2d");
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth  * scale;
    const dh = img.naturalHeight * scale;
    // Shift right by 8% of canvas width so the subject (face, left side) is more visible
    const xShift = w * 0.08;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, (w - dw) / 2 + xShift, (h - dh) / 2, dw, dh);
  }, []);

  // Preload — DESKTOP ONLY (skip on mobile to avoid loading 205 images)
  useEffect(() => {
    if (isMobile) return;
    let loaded = 0;
    imagesRef.current = [];
    frames.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload  = () => { imagesRef.current[i] = img; if (++loaded === TOTAL_FRAMES) setImagesLoaded(true); };
      img.onerror = () => { if (++loaded === TOTAL_FRAMES) setImagesLoaded(true); };
    });
  }, []);

  // Subscribe canvas to frameIndex + ResizeObserver (desktop only)
  useEffect(() => {
    if (isMobile || !imagesLoaded) return;
    drawFrame(0);
    const unsubFrame = frameIndex.on("change", (v) => {
      currentIdxRef.current = v;
      drawFrame(v);
    });
    const ro = new ResizeObserver(() => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = 0; c.height = 0;
      drawFrame(currentIdxRef.current);
    });
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => { unsubFrame(); ro.disconnect(); };
  }, [imagesLoaded, frameIndex, drawFrame]);

  return (
    /* 350vh desktop / 200vh mobile wrapper so scroll animation is shorter on mobile */
    <div id="home" ref={wrapperRef} style={{ height: isMobile ? "200vh" : "350vh" }}>
      <section
        ref={sectionRef}
        className="sticky top-0 min-h-screen w-full flex items-center overflow-hidden"
      >
        {/* ── BACKGROUND ─────────────────────────────────────────────────── */}

        {/* MOBILE: Single static image — fast, no JS animation */}
        {isMobile && (
          <div className="absolute inset-0 z-0">
            <img
              src="/images/herosection/ezgif-frame-001.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              /* shift image right (positive X) so subject/face on the left becomes visible */
              style={{ objectPosition: "35% center" }}
            />
            {/* Edge fades — wider left fade to hide image border */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
            {/* Dark veil */}
            <div className="absolute inset-0 bg-[#050505]/55 pointer-events-none" />
          </div>
        )}

        {/* DESKTOP: Scroll-driven canvas animation */}
        {!isMobile && (
          <motion.div className="absolute inset-0 z-0" style={{ opacity: canvasOp }}>
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ display: "block" }}
            />
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-48 lg:w-64 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[#050505]/65 pointer-events-none" />
          </motion.div>
        )}

        {/* GLOW ACCENTS */}
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accentGlow rounded-full blur-[120px] mix-blend-screen opacity-20 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-[28rem] h-72 sm:h-[28rem] bg-indigo-900/30 rounded-full blur-[140px] mix-blend-screen opacity-20 pointer-events-none" />

        {/* ── TEXT BLOCK ─────────────────────────────────────────────────── */}
        <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 max-w-7xl mx-auto pt-24 pb-16 md:py-0">
          {/* Centered on mobile, right-column on desktop */}
          <div className="flex flex-col gap-5 w-full md:w-[50%] lg:w-[44%] md:ml-auto">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ y: badgeY, opacity: badgeOp }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                         bg-accent/25 border border-accent/55 text-accent font-semibold
                         text-xs sm:text-sm shadow-[0_0_18px_rgba(124,58,237,0.4)]
                         backdrop-blur-sm self-center md:self-start"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow shrink-0" />
              Available for Projects
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ x: h1X, scale: h1Scale, opacity: h1Op }}
              className="font-heading font-bold leading-[1.15] tracking-tight text-white
                         text-[clamp(1.75rem,4.5vw,3.5rem)] text-center md:text-left
                         [text-shadow:0_2px_20px_rgba(0,0,0,0.9)]"
            >
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-400">
                Mohammed&nbsp;Sahis&nbsp;NP
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{ x: pX, opacity: pOp }}
              className="text-gray-100 text-sm sm:text-base md:text-[1.05rem] leading-relaxed
                         text-center md:text-left max-w-[38ch] mx-auto md:mx-0
                         [text-shadow:0_1px_12px_rgba(0,0,0,0.95)]"
            >
              A Computer Science Engineer focused on{" "}
              <span className="text-white font-bold">machine learning</span>,{" "}
              <span className="text-white font-bold">data analytics</span>, and{" "}
              <span className="text-white font-bold">intelligent systems</span>.{" "}
              I build data-driven, security-aware solutions through hands-on projects.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{ y: btnY, opacity: btnOp }}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <MagneticButton>
                <a href="#projects"
                   className="block px-6 sm:px-7 py-3 rounded-full bg-accent hover:bg-violet-600
                              text-white font-semibold text-sm sm:text-base transition-all
                              shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]">
                  View Work
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="#contact"
                   className="block px-6 sm:px-7 py-3 rounded-full bg-white/10 hover:bg-white/15
                              border border-white/20 text-white font-semibold text-sm sm:text-base transition-all">
                  Contact Me
                </a>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ opacity: scrollOp }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        >
          <span className="text-gray-500 text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex justify-center pt-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
