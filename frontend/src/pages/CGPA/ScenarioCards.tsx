import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Target } from "lucide-react";

interface ScenarioCardsProps {
  bestCase: number;
  worstCase: number;
  overallCGPA: number;
}

export function ScenarioCards({ bestCase, worstCase, overallCGPA }: ScenarioCardsProps) {
  const cards = [
    {
      title: "Best Case",
      value: bestCase,
      icon: TrendingUp,
      color: "text-[var(--success)]",
      bg: "bg-[var(--success)]/5",
      border: "border-[var(--success)]/20",
      delay: 0
    },
    {
      title: "Predicted (Pace)",
      value: overallCGPA,
      icon: Target,
      color: "text-[var(--accent-primary)]",
      bg: "bg-[var(--accent-primary)]/5",
      border: "border-[var(--accent-primary)]/20",
      delay: 0.1
    },
    {
      title: "Worst Case",
      value: worstCase,
      icon: TrendingDown,
      color: "text-[var(--error)]",
      bg: "bg-[var(--error)]/5",
      border: "border-[var(--error)]/20",
      delay: 0.2
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: card.delay, type: "spring", stiffness: 300, damping: 24 }}
            className={`p-5 rounded-2xl border backdrop-blur-sm ${card.bg} ${card.border} flex items-center justify-between group hover:scale-[1.02] transition-transform`}
          >
            <div>
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">{card.title}</p>
              <p className={`text-3xl font-bold tracking-tight ${card.color}`}>
                {card.value.toFixed(2)}
              </p>
            </div>
            <div className={`p-3 rounded-xl bg-[var(--surface-base)] shadow-sm ${card.color} group-hover:rotate-12 transition-transform`}>
              <Icon className="w-6 h-6" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
