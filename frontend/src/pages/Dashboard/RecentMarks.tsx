import { motion } from "framer-motion";
import { SectionCard } from "@/components/ui";
import type { RecentMark } from "./mockData";

export function RecentMarks({ marks }: { marks: RecentMark[] }) {
  return (
    <SectionCard
      title="Recent Marks"
      description="Your latest academic performance"
      className="h-full"
    >
      <div className="space-y-4 mt-2">
        {marks.map((mark, i) => {
          const percentage = (mark.score / mark.maxScore) * 100;

          // Determine color based on percentage
          let colorClass = "bg-[var(--success)]";
          if (percentage < 50) colorClass = "bg-[var(--error)]";
          else if (percentage < 75) colorClass = "bg-[var(--warning)]";

          return (
            <motion.div
              key={mark.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-[var(--surface-interactive)] border border-[var(--border-primary)]"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                    {mark.subject}
                  </h4>
                  <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                    {mark.type} • {new Date(mark.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-[var(--text-primary)]">
                    {mark.score}
                  </span>
                  <span className="text-sm text-[var(--text-tertiary)] ml-1">
                    / {mark.maxScore}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[var(--surface-base)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full ${colorClass}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionCard>
  );
}
