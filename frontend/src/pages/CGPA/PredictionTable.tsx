import { motion } from "framer-motion";
import { SectionCard, Badge } from "@/components/ui";
import { marksToGrade } from "./mockData";
import type { CurrentSubject } from "./mockData";

interface PredictionTableProps {
  subjects: CurrentSubject[];
  onUpdatePrediction: (id: string, newTotal: number) => void;
}

export function PredictionTable({ subjects, onUpdatePrediction }: PredictionTableProps) {
  return (
    <SectionCard title="Subject Predictions" description="Adjust your expected totals out of 100">
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-primary)] text-sm text-[var(--text-secondary)]">
              <th className="pb-3 font-medium px-4">Subject</th>
              <th className="pb-3 font-medium px-4 text-center">Credits</th>
              <th className="pb-3 font-medium px-4 text-center">Internals</th>
              <th className="pb-3 font-medium px-4 text-center">Predicted Total</th>
              <th className="pb-3 font-medium px-4 text-center">Expected Grade</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub, i) => {
              const grade = marksToGrade(sub.predictedTotal);
              
              let gradeVariant: "success" | "warning" | "error" | "default" = "success";
              if (grade === "B" || grade === "C") gradeVariant = "warning";
              else if (grade === "P" || grade === "F") gradeVariant = "error";

              return (
                <motion.tr 
                  key={sub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-[var(--border-primary)]/50 hover:bg-[var(--surface-interactive)]/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{sub.name}</p>
                    <p className="text-xs font-mono text-[var(--text-tertiary)]">{sub.code}</p>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-[var(--text-secondary)]">
                    {sub.credits}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{sub.currentMarks}</span>
                    <span className="text-xs text-[var(--text-tertiary)]">/50</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        min={sub.currentMarks}
                        max={100}
                        value={sub.predictedTotal}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) {
                            onUpdatePrediction(sub.id, Math.min(100, Math.max(sub.currentMarks, val)));
                          }
                        }}
                        className="w-16 bg-[var(--surface-base)] border border-[var(--border-secondary)] rounded-md px-2 py-1 text-center text-sm font-bold text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] outline-none transition-all"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant={gradeVariant} className="font-mono text-sm px-2.5">
                      {grade}
                    </Badge>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
