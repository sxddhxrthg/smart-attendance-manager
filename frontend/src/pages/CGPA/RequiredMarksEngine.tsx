import { motion } from "framer-motion";
import { SectionCard } from "@/components/ui";
import { Sparkles, AlertTriangle, Lightbulb } from "lucide-react";
import type { CurrentSubject } from "./mockData";
import { marksToGrade } from "./mockData";

interface RequiredMarksEngineProps {
  subjects: CurrentSubject[];
  targetCGPA: number;
  overallCGPA: number;
}

export function RequiredMarksEngine({ subjects, targetCGPA, overallCGPA }: RequiredMarksEngineProps) {
  // Sort subjects by credits (descending) to find the most impactful ones
  const sortedSubjects = [...subjects].sort((a, b) => b.credits - a.credits);

  const isAchievingTarget = overallCGPA >= targetCGPA;
  const gap = targetCGPA - overallCGPA;

  return (
    <SectionCard title="Required Marks Engine" icon={<Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />} className="h-full">
      <div className="space-y-4 mt-2">
        {isAchievingTarget ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-[var(--success)]/10 border border-[var(--success)]/20"
          >
            <Sparkles className="w-5 h-5 text-[var(--success)] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">You are on track!</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Your predicted marks result in a CGPA of {overallCGPA.toFixed(2)}, exceeding your target of {targetCGPA.toFixed(2)}.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-[var(--error)]/10 border border-[var(--error)]/20"
          >
            <AlertTriangle className="w-5 h-5 text-[var(--error)] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Target Missed</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                You are {gap.toFixed(2)} points short of your {targetCGPA.toFixed(2)} target. Increase your predicted marks below.
              </p>
            </div>
          </motion.div>
        )}

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Subject Breakdown</h4>
          {sortedSubjects.map((sub, i) => {
            // Calculate how far they are from the next grade boundary
            const currentGrade = marksToGrade(sub.predictedTotal);
            let nextBoundary = 0;
            if (currentGrade !== "O") {
              if (sub.predictedTotal < 40) nextBoundary = 40;
              else if (sub.predictedTotal < 45) nextBoundary = 45;
              else if (sub.predictedTotal < 50) nextBoundary = 50;
              else if (sub.predictedTotal < 60) nextBoundary = 60;
              else if (sub.predictedTotal < 70) nextBoundary = 70;
              else if (sub.predictedTotal < 80) nextBoundary = 80;
              else if (sub.predictedTotal < 90) nextBoundary = 90;
            }

            const pointsNeeded = nextBoundary - sub.predictedTotal;

            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--surface-interactive)] border border-[var(--border-primary)]"
              >
                <Lightbulb className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  <strong className="text-[var(--text-primary)]">{sub.name}</strong> ({sub.credits} credits): 
                  Current prediction is {sub.predictedTotal}. 
                  {nextBoundary > 0 ? (
                    <span> You need <strong className="text-[var(--accent-primary)]">{pointsNeeded} more marks</strong> to secure the next grade boundary ({nextBoundary}).</span>
                  ) : (
                    <span className="text-[var(--success)]"> You have maxed out the grade points!</span>
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}
