import { useEffect, useRef, useState, useCallback } from "react";

function useMousePosition(enabled) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [enabled]);

  return pos;
}

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export default function ParticlesBackground({
  baseDensity = 0.00008,
  color = "124,58,237",
  size = 0.6,
  staticity = 90,
  ease = 45,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const ctxRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  const touch = isTouchDevice();
  const mousePos = useMousePosition(!touch);
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  const resize = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const rect = containerRef.current.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, [dpr]);

  const getParticleCount = useCallback(() => {
    const area =
      canvasRef.current.width *
      canvasRef.current.height;
    return Math.min(Math.floor(area * baseDensity), 220);
  }, [baseDensity]);

  const createParticle = useCallback(() => ({
    x: Math.random() * canvasRef.current.width,
    y: Math.random() * canvasRef.current.height,
    dx: (Math.random() - 0.5) * 0.25,
    dy: (Math.random() - 0.5) * 0.25,
    tx: 0,
    ty: 0,
    size: Math.random() * size + 0.3,
    alpha: Math.random() * 0.45 + 0.1,
    magnet: Math.random() * 4 + 0.3,
  }), [size]);

  const initParticles = useCallback(() => {
    particles.current = [];
    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
      particles.current.push(createParticle());
    }
  }, [getParticleCount, createParticle]);

  const animate = useCallback(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;

      if (!touch) {
        p.tx +=
          (mouse.current.x / (staticity / p.magnet) - p.tx) /
          ease;
        p.ty +=
          (mouse.current.y / (staticity / p.magnet) - p.ty) /
          ease;
      }

      ctx.beginPath();
      ctx.arc(
        p.x + p.tx,
        p.y + p.ty,
        p.size,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(${color},${p.alpha})`;
      ctx.fill();

      if (
        p.x < -20 ||
        p.x > canvas.width + 20 ||
        p.y < -20 ||
        p.y > canvas.height + 20
      ) {
        Object.assign(p, createParticle());
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [touch, staticity, ease, color, createParticle]);

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext("2d");
    resize();
    initParticles();
    animate();

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resize, initParticles, animate]);

  useEffect(() => {
    if (!canvasRef.current || touch) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouse.current.x = mousePos.x - rect.left - rect.width / 2;
    mouse.current.y = mousePos.y - rect.top - rect.height / 2;
  }, [mousePos, touch]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
