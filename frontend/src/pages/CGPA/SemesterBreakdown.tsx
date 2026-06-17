import { motion } from "framer-motion";
import { SectionCard } from "@/components/ui";
import { History } from "lucide-react";
import type { PastSemester } from "./mockData";

export function SemesterBreakdown({ pastSemesters }: { pastSemesters: PastSemester[] }) {
  return (
    <SectionCard title="Past Semesters" icon={<History className="w-4 h-4 text-[var(--accent-primary)]" />} className="h-full">
      <div className="grid grid-cols-2 gap-3 mt-4">
        {pastSemesters.map((sem, i) => (
          <motion.div
            key={sem.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-xl bg-[var(--surface-interactive)] border border-[var(--border-primary)]"
          >
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
              Semester {sem.id}
            </h4>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Credits</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">{sem.creditsEarned}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--text-secondary)]">GPA</p>
                <p className="text-lg font-bold text-[var(--accent-primary)]">{sem.gpa.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionCard>
  );
}
