import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

const sections = ["home", "projects", "education", "skills", "certificates", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* DESKTOP NAV (Always visible, top right, glassmorphism) */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          fixed top-6 right-6 z-50
          hidden md:flex items-center gap-2
          rounded-[2rem] p-2
          glass-card
        "
      >
        {sections.map((section) => (
          <MagneticButton key={section}>
            <a
              href={`#${section}`}
              className={`
                relative px-5 py-2 rounded-full capitalize text-sm font-medium
                transition-colors duration-300 block
                ${active === section
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
                }
              `}
            >
              {active === section && (
                <motion.div
                  layoutId="nav-bubble"
                  className="absolute inset-0 -z-10 rounded-full bg-accent/30 border border-white/20 shadow-[0_0_15px_rgba(124,58,237,0.3)] backdrop-blur-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{section}</span>
            </a>
          </MagneticButton>
        ))}

        <MagneticButton>
          <a
            href="/resume.pdf"
            download
            className="
              ml-2 block px-5 py-2 rounded-full text-sm font-medium
              border border-accent text-accent
              hover:bg-accent hover:text-white
              transition-all duration-300
            "
          >
            Resume
          </a>
        </MagneticButton>
      </motion.nav>

      {/* MOBILE NAV BUTTON */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="
            p-3 rounded-xl
            glass-card
            text-white
          "
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="
            fixed top-20 right-4 z-40
            w-48 rounded-2xl
            glass-card
            shadow-2xl
            md:hidden overflow-hidden
          "
        >
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => setOpen(false)}
              className={`
                block px-5 py-3.5 capitalize border-b border-white/5 last:border-0
                ${active === section
                  ? "text-white bg-accent/20 font-medium"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {section}
            </a>
          ))}

          <a
            href="/resume.pdf"
            download
            className="
              block px-5 py-3.5
              text-accent border-t border-white/10
              hover:bg-accent hover:text-white transition-colors
              font-medium
            "
          >
            Download Resume
          </a>
        </motion.div>
      )}
    </>
  );
}
