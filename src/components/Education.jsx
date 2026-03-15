import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import InteractiveCard from "./InteractiveCard";

const educationData = [
    {
        degree: "B.Tech in Computer Science and Engineering",
        institution: "MS Ramaiah University of Applied Sciences",
        location: "Bangalore, India",
        duration: "2022 - 2026",
        grade: "CGPA: 8.72/10",
        description: "Pursuing undergraduate studies with a strong focus on core computer science subjects.",
    },
    {
        degree: "Higher Secondary",
        institution: "GHSS Anamangadu",
        location: "Kerala, India",
        duration: "2020 - 2022",
        grade: "Percentage: 94.6%",
        description: "Core subjects: Physics, Chemistry, Mathematics, and Biology.",
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
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

export default function Education() {
    return (
        <section
            id="education"
            className="relative px-6 md:px-20 py-32 max-w-7xl mx-auto"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-20 text-center relative z-10"
            >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                    Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-400">Qualifications</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    My academic background and formal engineering training.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto flex flex-col gap-8 relative z-10"
            >
                {/* Animated timeline connecting line */}
                <div className="absolute left-8 top-10 bottom-10 w-px bg-gradient-to-b from-accent/50 via-indigo-500/30 to-transparent hidden md:block" />

                {educationData.map((edu, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="group relative"
                        style={{ perspective: 1000 }}
                    >
                        {/* Timeline Node */}
                        <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent border-4 border-[#0a0a0c] hidden md:block z-20 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_15px_rgba(124,58,237,0.8)]" />

                        <div className="md:pl-16">
                            <InteractiveCard className="w-full">
                                <div className="w-full glass-card rounded-3xl p-8 border border-white/5 hover:border-accent/30 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(124,58,237,0.15)] relative overflow-hidden">

                                    {/* Subtle top gradient line */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Internal Glow */}
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <GraduationCap className="w-6 h-6 text-accent" />
                                                <h3 className="text-2xl font-heading font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-indigo-400 transition-all duration-300">
                                                    {edu.degree}
                                                </h3>
                                            </div>
                                            <h4 className="text-lg text-gray-300 font-medium ml-9">
                                                {edu.institution}
                                            </h4>
                                        </div>

                                        <div className="flex flex-col items-start md:items-end gap-2 shrink-0 md:ml-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                                <Calendar className="w-4 h-4 text-accent/80" />
                                                {edu.duration}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                                <span className="font-semibold text-accent/80">Grade:</span> {edu.grade}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4 ml-9">
                                        <MapPin className="w-4 h-4" />
                                        {edu.location}
                                    </div>

                                    <p className="text-gray-400 leading-relaxed ml-9 group-hover:text-gray-300 transition-colors duration-300">
                                        {edu.description}
                                    </p>
                                </div>
                            </InteractiveCard>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
