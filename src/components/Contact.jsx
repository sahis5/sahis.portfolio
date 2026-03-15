import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-[80vh] px-6 py-24 w-full flex flex-col justify-center items-center"
    >
      {/* Intense Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] bg-accentGlow rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium text-sm mb-8"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          Open to Opportunities
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight text-white leading-tight"
        >
          Let's Build Something <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-400">Extraordinary</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-xl text-lg md:text-xl mb-12 leading-relaxed"
        >
          Whether you have a project in mind, a question about my work, or just want to connect — I'd love to hear from you.
        </motion.p>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
        >
          <MagneticButton>
            <a
              href="mailto:sahisnp@gmail.com"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent hover:bg-violet-600 text-white font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.7)]"
            >
              <Mail className="w-5 h-5" />
              <span>Send me an Email</span>
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>

          <div className="flex gap-4 justify-center">
            <MagneticButton>
              <a
                href="https://github.com/sahis5"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="http://www.linkedin.com/in/sahisnp"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/20 text-gray-300 hover:text-[#0a66c2] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Optional Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-6 text-gray-600 font-medium text-sm text-center"
      >
        © {new Date().getFullYear()} Mohammed Sahis. Crafted with curiosity.
      </motion.p>
    </section>
  );
}
