import { motion } from "framer-motion";
import { SectionCard } from "@/components/ui";
import { CalendarDays } from "lucide-react";
import type { WeeklySchedule, DayOfWeek } from "./mockData";

export function WeeklyOverview({ schedule, currentDay }: { schedule: WeeklySchedule, currentDay: DayOfWeek }) {
  const days: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <SectionCard title="Weekly Overview" icon={<CalendarDays className="w-4 h-4 text-[var(--accent-primary)]" />}>
      <div className="space-y-3 mt-2">
        {days.map((day, i) => {
          const classes = schedule[day] || [];
          const isToday = day === currentDay;

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`
                flex items-center justify-between p-3 rounded-xl border
                ${isToday 
                  ? "bg-[var(--accent-primary)]/5 border-[var(--accent-primary)]/30" 
                  : "bg-[var(--surface-interactive)] border-[var(--border-primary)]"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold w-10 ${isToday ? "text-[var(--accent-primary)]" : "text-[var(--text-primary)]"}`}>
                  {day.slice(0, 3)}
                </span>
                
                {/* Mini dots representing classes */}
                <div className="flex gap-1">
                  {classes.map((cls) => (
                    <div 
                      key={cls.id} 
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{ backgroundColor: cls.color || "var(--accent-primary)" }}
                      title={cls.subject}
                    />
                  ))}
                  {classes.length === 0 && (
                    <span className="text-xs text-[var(--text-tertiary)] italic">Free day</span>
                  )}
                </div>
              </div>
              
              {classes.length > 0 && (
                <span className="text-xs font-mono text-[var(--text-secondary)]">
                  {classes.length} classes
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </SectionCard>
  );
}
