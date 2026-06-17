import { motion } from "framer-motion";
import { SectionCard, Button } from "@/components/ui";
import { Sparkles, AlertTriangle, Lightbulb, ChevronRight } from "lucide-react";
import type { AIInsight } from "./mockData";

export function AIInsights({ insights }: { insights: AIInsight[] }) {
  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-[var(--error)]" />;
      case "positive":
        return <Sparkles className="w-4 h-4 text-[var(--success)]" />;
      case "recommendation":
        return <Lightbulb className="w-4 h-4 text-[var(--accent-primary)]" />;
    }
  };

  const getInsightStyle = (type: AIInsight["type"]) => {
    switch (type) {
      case "warning":
        return "bg-[var(--error)]/5 border-[var(--error)]/20";
      case "positive":
        return "bg-[var(--success)]/5 border-[var(--success)]/20";
      case "recommendation":
        return "bg-[var(--accent-primary)]/5 border-[var(--accent-primary)]/20";
    }
  };

  return (
    <SectionCard
      title="AI Insights"
      description="Personalized recommendations"
      icon={<Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />}
      className="h-full bg-gradient-to-br from-[var(--surface-base)] to-[var(--surface-interactive)] border-[var(--border-secondary)] relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--accent-primary)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-3 relative z-10">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 30 }}
            className={`
              flex flex-col gap-2 p-4 rounded-xl border
              ${getInsightStyle(insight.type)}
            `}
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">{getInsightIcon(insight.type)}</div>
              <p className="text-sm text-[var(--text-primary)] leading-snug">
                {insight.message}
              </p>
            </div>
            
            {insight.actionText && (
              <div className="ml-7 mt-1">
                <Button variant="ghost" size="sm" className="h-7 text-xs px-2 -ml-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  {insight.actionText}
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SectionCard>
  );
}
