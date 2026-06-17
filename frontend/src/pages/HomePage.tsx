import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import AddSubjectForm from "../components/AddSubjectForm";
import SubjectCard from "../components/SubjectCard";
import type { Subject } from "../types/subject";

function HomePage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: crypto.randomUUID(),
      code: "CSE2001",
      name: "Operating Systems",
      attendedClasses: 32,
      totalClasses: 40,
      targetAttendancePercentage: 75,
    },
    {
      id: crypto.randomUUID(),
      code: "CSE2005",
      name: "DBMS",
      attendedClasses: 15,
      totalClasses: 20,
      targetAttendancePercentage: 75,
    },
  ]);

  function addSubject(subject: Subject) {
    setSubjects((prev) => [...prev, subject]);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-border-primary"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 sm:px-8 sm:py-12">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-accent-primary/10 rounded-lg backdrop-blur-sm">
              <BookOpen className="w-6 h-6 text-accent-primary" />
            </div>
            <div>
              <h1 className="text-display text-text-primary">
                Smart Attendance Manager
              </h1>
              <p className="text-text-secondary mt-2">
                Track, manage, and optimize your attendance
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 sm:px-8 sm:py-12">
        {/* Add Subject Form Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <AddSubjectForm onAddSubject={addSubject} />
        </motion.div>

        {/* Subjects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {subjects.map((subject) => (
            <motion.div key={subject.id} variants={itemVariants}>
              <SubjectCard subject={subject} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {subjects.length === 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-3xl text-center"
          >
            <div className="p-lg bg-surface-interactive rounded-lg mb-lg">
              <BookOpen className="w-8 h-8 text-text-tertiary" />
            </div>
            <h2 className="text-heading-2 text-text-primary mb-4">
              No subjects yet
            </h2>
            <p className="text-text-secondary max-w-md">
              Add your first subject to start tracking attendance. You can manage
              multiple subjects and monitor your attendance at a glance.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default HomePage;