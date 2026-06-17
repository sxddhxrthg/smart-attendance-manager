import { motion } from "framer-motion";
import { SectionCard } from "@/components/ui";
import { BrainCircuit } from "lucide-react";
import type { CurrentSubject } from "./mockData";

export function AIRecommendations({ subjects }: { subjects: CurrentSubject[] }) {
  // Simple heuristic recommendations
  const recommendations: string[] = [];
  
  const highCreditLowMarks = subjects.filter(s => s.credits >= 3 && s.predictedTotal < 70);
  const lowCreditHighMarks = subjects.filter(s => s.credits <= 2 && s.predictedTotal >= 90);
  const closeToO = subjects.filter(s => s.predictedTotal >= 85 && s.predictedTotal < 90);

  if (highCreditLowMarks.length > 0) {
    recommendations.push(`Focus heavily on ${highCreditLowMarks.map(s => s.name).join(", ")}. They are high-credit subjects but your predictions are low.`);
  }

  if (closeToO.length > 0) {
    recommendations.push(`You are incredibly close to an 'O' grade in ${closeToO.map(s => s.name).join(", ")}. Push just a few more marks!`);
  }

  if (lowCreditHighMarks.length > 0) {
    recommendations.push(`Great job maxing out ${lowCreditHighMarks.map(s => s.name).join(", ")}. Maintain this pace, but don't over-invest at the cost of core subjects.`);
  }

  if (recommendations.length === 0) {
    recommendations.push("Your current predictions look balanced. Keep up the consistent effort across all subjects.");
  }

  return (
    <SectionCard title="AI Strategy" icon={<BrainCircuit className="w-4 h-4 text-[var(--accent-primary)]" />} className="h-full bg-gradient-to-br from-[var(--surface-base)] to-[var(--surface-interactive)] border-[var(--border-secondary)]">
      <div className="space-y-3 mt-4 relative z-10">
        {recommendations.map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, type: "spring" }}
            className="p-3 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20"
          >
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">
              {rec}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionCard>
  );
}
