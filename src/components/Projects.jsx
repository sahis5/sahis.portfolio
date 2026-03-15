import { motion } from "framer-motion";
import InteractiveCard from "./InteractiveCard";

const projects = [
  {
    title: "Adaptive Honeypot System (ML + RL)",
    description:
      "Designed an adaptive cybersecurity honeypot that dynamically responds to attacker behavior using Machine Learning and Reinforcement Learning to enhance intrusion detection and threat analysis.",
    tech: ["Python", "Machine Learning", "Reinforcement Learning", "Cybersecurity"],
  },
  {
    title: "Credit Card Fraud Detection",
    description:
      "Built a machine learning–based fraud detection system for highly imbalanced transaction data using advanced classification models with strong precision and recall.",
    tech: ["Python", "Scikit-learn", "XGBoost", "EDA"],
  },
  {
    title: "Insurance Analytics Dashboard",
    description:
      "Developed an interactive Power BI dashboard with automated refresh, KPI tracking, and business insight generation for insurance data.",
    tech: ["Power BI", "Python", "SQL", "Data Visualization"],
  },
  {
    title: "Sales & Business Analytics",
    description:
      "Created multiple business dashboards analyzing sales performance, profitability, and regional trends to support data-driven decision making.",
    tech: ["Power BI", "Excel", "Business Analytics"],
  },
  {
    title: "Full-Stack Web Applications",
    description:
      "Developed full-stack web applications including hotel reservation and e-commerce systems with database integration and authentication.",
    tech: ["PHP", "MySQL", "HTML", "CSS"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative px-6 md:px-20 py-32 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-20 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-400">Projects</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A showcase of my recent work in machine learning, data analytics, and full-stack development.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative p-[1px] rounded-3xl overflow-hidden"
            style={{ perspective: 1000 }}
          >
            <InteractiveCard className="relative h-full w-full group">
              <div className="relative h-full bg-[#0a0a0c] rounded-[23px] p-8 md:p-10 flex flex-col justify-between overflow-hidden">
                {/* Subtle hover background glow */}
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-indigo-400 transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors duration-300">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="
                        px-3 py-1 text-xs font-medium rounded-full
                        bg-white/5 border border-white/10 text-gray-300
                        group-hover:border-accent/30 group-hover:text-white transition-colors duration-300
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </InteractiveCard>
          </motion.div>
        ))
        }
      </motion.div >
    </section >
  );
}
