import { motion } from "framer-motion";
import { SectionCard, Badge } from "@/components/ui";
import { Clock, MapPin, UserSquare } from "lucide-react";
import type { ClassSchedule } from "./mockData";

export function TodaySchedule({ schedule }: { schedule: ClassSchedule[] }) {
  return (
    <SectionCard
      title="Today's Schedule"
      description="You have 3 classes today"
      className="h-full flex flex-col"
    >
      <div className="relative mt-4 flex-1">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-4 bottom-4 w-px bg-[var(--border-primary)]" />

        <div className="space-y-6">
          {schedule.map((cls, index) => {
            const isCurrent = index === 1; // Mocking the second class as current
            const isPast = index === 0;

            return (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-6 group"
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex flex-col items-center mt-1">
                  <div
                    className={`
                      w-3 h-3 rounded-full border-2 
                      ${
                        isCurrent
                          ? "bg-[var(--accent-primary)] border-[var(--accent-primary)] ring-4 ring-[var(--accent-primary)]/20"
                          : isPast
                          ? "bg-[var(--surface-interactive)] border-[var(--border-secondary)]"
                          : "bg-[var(--bg-primary)] border-[var(--border-primary)] group-hover:border-[var(--text-tertiary)] transition-colors"
                      }
                    `}
                  />
                </div>

                {/* Content Card */}
                <div
                  className={`
                    flex-1 rounded-xl border p-4 transition-all duration-200
                    ${
                      isCurrent
                        ? "bg-[var(--accent-primary)]/5 border-[var(--accent-primary)]/30"
                        : "bg-[var(--surface-base)] border-[var(--border-primary)] group-hover:border-[var(--border-secondary)]"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h4
                        className={`text-sm font-semibold ${
                          isCurrent ? "text-[var(--accent-light)]" : "text-[var(--text-primary)]"
                        }`}
                      >
                        {cls.subject}
                      </h4>
                      <p className="text-xs font-mono text-[var(--text-tertiary)] mt-0.5">
                        {cls.code}
                      </p>
                    </div>
                    <Badge variant={isCurrent ? "accent" : "default"}>
                      {cls.type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[var(--border-primary)]">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {cls.startTime} - {cls.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{cls.room}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                      <UserSquare className="w-3.5 h-3.5 shrink-0" />
                      <span>{cls.faculty}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}
