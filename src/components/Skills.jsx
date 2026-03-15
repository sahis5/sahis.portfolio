import { motion } from "framer-motion";
import { TerminalSquare, BrainCircuit, Library, Blocks } from "lucide-react";
import InteractiveCard from "./InteractiveCard";

const skillGroups = [
  {
    title: "Languages & Databases",
    icon: <TerminalSquare className="w-6 h-6 text-white group-hover:text-accent transition-colors" />,
    skills: ["Python", "SQL", "MySQL", "MS SQL Server"],
  },
  {
    title: "Data Science & Libraries",
    icon: <Library className="w-6 h-6 text-white group-hover:text-accent transition-colors" />,
    skills: ["Pandas", "NumPy", "scikit-learn"],
  },
  {
    title: "Machine Learning Concepts",
    icon: <BrainCircuit className="w-6 h-6 text-white group-hover:text-accent transition-colors" />,
    skills: ["XGBoost", "LightGBM"],
  },
  {
    title: "Tools & Environments",
    icon: <Blocks className="w-6 h-6 text-white group-hover:text-accent transition-colors" />,
    skills: [
      "Power BI",
      "Excel",
      "Git & GitHub",
      "VS Code",
      "Jupyter Notebook",
      "Google Colab",
      "Windows",
      "Linux",
      "MacOS",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="px-6 md:px-20 py-24 max-w-7xl mx-auto relative"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16 text-center relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-400">Skills</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          The comprehensive toolkit I use to build robust system architectures, analyze complex data, and train intelligent models.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10"
      >
        {skillGroups.map((group, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            style={{ perspective: 1000 }}
            className="group relative"
          >
            <InteractiveCard className="h-full w-full">
              <div className="h-full w-full glass-card rounded-3xl p-8 border border-white/5 hover:border-accent/30 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(124,58,237,0.1)] relative overflow-hidden">
                {/* Top accent gradient line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl bg-white/5 w-12 h-12 flex items-center justify-center rounded-2xl border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300 shadow-inner">
                    {group.icon}
                  </span>
                  <h3 className="text-xl font-heading font-semibold text-white group-hover:text-accent transition-colors">
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 text-sm font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-accent hover:border-accent hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
