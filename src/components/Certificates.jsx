import { motion } from "framer-motion";
import InteractiveCard from "./InteractiveCard";

const certificates = [
  { title: "Data Analyst Course", issuer: "Udemy" },
  { title: "IBM Data Science (Ongoing)", issuer: "Coursera" },
  { title: "Data Structures & Algorithms", issuer: "Udemy" },
  { title: "Data Analyst Certification", issuer: "OneRoadMap" },
  { title: "Cybersecurity Analyst Job Simulation", issuer: "Tata Group (Forage)" },
  { title: "Robotics Internship", issuer: "ComedKares" },
  { title: "Data Analysis Internship", issuer: "Cognifyz Technologies" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
};

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="relative px-6 md:px-20 py-32 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-400">Training</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Continuous learning is key. Here are some of the professional certifications and training programs I've completed.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative"
            style={{ perspective: 1000 }}
          >
            <InteractiveCard className="h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
              <div className="relative h-full w-full glass-card rounded-2xl p-6 border-l-4 border-l-white/10 group-hover:border-l-accent transition-all duration-300 flex flex-col justify-center min-h-[140px]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:text-accent transition-colors">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg leading-snug mb-1 group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
