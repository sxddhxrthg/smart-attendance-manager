import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckSquare } from "lucide-react";
import AddSubjectForm from "@/components/AddSubjectForm";
import SubjectCard from "@/components/SubjectCard";
import type { Subject } from "@/types/subject";
import { PageHeader } from "@/components/ui";

const STORAGE_KEY = "zenith:subjects";

const DEFAULT_SUBJECTS: Subject[] = [
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
];

function AttendancePage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load subjects from localStorage on mount
  useEffect(() => {
    try {
      // Try to load from new key first, fallback to old key for migration
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("attendanceSubjects");
      if (stored) {
        setSubjects(JSON.parse(stored));
      } else {
        setSubjects(DEFAULT_SUBJECTS);
      }
    } catch (error) {
      console.error("Failed to load subjects from localStorage:", error);
      setSubjects(DEFAULT_SUBJECTS);
    }
    setIsLoaded(true);
  }, []);

  // Save subjects to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
      } catch (error) {
        console.error("Failed to save subjects to localStorage:", error);
      }
    }
  }, [subjects, isLoaded]);

  function addSubject(subject: Subject) {
    setSubjects((prev) => [...prev, subject]);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
    <div className="animate-entry">
      <PageHeader
        title="Attendance"
        subtitle="Track, manage, and optimize your attendance"
        icon={<CheckSquare className="w-5 h-5" />}
      />

      <div className="mt-8">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <AddSubjectForm onAddSubject={addSubject} />
        </motion.div>

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

        {subjects.length === 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="p-6 bg-[var(--surface-interactive)] rounded-lg mb-6">
              <BookOpen className="w-8 h-8 text-[var(--text-tertiary)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              No subjects yet
            </h2>
            <p className="text-[var(--text-secondary)] max-w-md">
              Add your first subject to start tracking attendance. You can manage
              multiple subjects and monitor your attendance at a glance.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AttendancePage;
