import { motion } from "framer-motion";
import { Coffee, MapPin, Clock, UserSquare } from "lucide-react";
import { Badge } from "@/components/ui";
import type { ScheduledClass } from "./mockData";

const timeToMins = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const formatDuration = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
};

// Represents either a class or a free slot
type TimelineItem =
  | { type: "class"; data: ScheduledClass }
  | { type: "free"; startTime: string; endTime: string; durationMins: number };

export function TimelineView({ schedule }: { schedule: ScheduledClass[] }) {
  // Compute timeline with free slots
  const timeline: TimelineItem[] = [];
  
  if (schedule.length > 0) {
    // Sort schedule by start time just in case
    const sorted = [...schedule].sort((a, b) => timeToMins(a.startTime) - timeToMins(b.startTime));
    
    for (let i = 0; i < sorted.length; i++) {
      timeline.push({ type: "class", data: sorted[i] });
      
      // Check if there's a gap before the next class
      if (i < sorted.length - 1) {
        const currentEnd = timeToMins(sorted[i].endTime);
        const nextStart = timeToMins(sorted[i + 1].startTime);
        const gap = nextStart - currentEnd;
        
        // If gap is 30 mins or more, it's a notable free slot
        if (gap >= 30) {
          timeline.push({
            type: "free",
            startTime: sorted[i].endTime,
            endTime: sorted[i + 1].startTime,
            durationMins: gap,
          });
        }
      }
    }
  }

  return (
    <div className="relative pl-6 sm:pl-8 py-4">
      {/* Vertical Timeline Line */}
      <div className="absolute left-[11px] sm:left-[15px] top-6 bottom-6 w-px bg-gradient-to-b from-[var(--border-primary)] via-[var(--border-secondary)] to-[var(--border-primary)]" />

      <div className="space-y-6">
        {timeline.map((item, index) => {
          if (item.type === "free") {
            return (
              <motion.div
                key={`free-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-center gap-4 sm:gap-6 group"
              >
                <div className="absolute -left-6 sm:-left-8 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--surface-base)] border border-[var(--border-primary)]">
                  <Coffee className="w-3 h-3 text-[var(--text-tertiary)]" />
                </div>
                
                <div className="flex-1 py-3 px-4 rounded-xl border border-dashed border-[var(--border-secondary)] bg-[var(--surface-interactive)]/50 text-[var(--text-secondary)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Free Period</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--surface-base)]">
                      {formatDuration(item.durationMins)}
                    </span>
                  </div>
                  <span className="text-xs font-mono opacity-60">
                    {item.startTime} - {item.endTime}
                  </span>
                </div>
              </motion.div>
            );
          }

          const cls = item.data;
          const color = cls.color || "var(--accent-primary)";

          return (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-4 sm:gap-6 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-6 sm:-left-8 mt-4 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--surface-base)] border-2 transition-colors duration-300" style={{ borderColor: color }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              </div>

              {/* Class Card */}
              <div className="flex-1 bg-[var(--surface-base)] border border-[var(--border-primary)] rounded-2xl p-4 sm:p-5 hover:border-[var(--border-secondary)] transition-all duration-300 hover:shadow-lg group-hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-1">
                      {cls.subject}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="font-mono bg-[var(--surface-interactive)] px-1.5 py-0.5 rounded text-[var(--text-primary)]">
                        {cls.code}
                      </span>
                      <Badge variant="default" className="text-xs font-normal">
                        {cls.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--surface-interactive)] self-start border border-[var(--border-primary)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                    <span className="text-sm font-mono font-medium text-[var(--text-primary)]">
                      {cls.startTime} - {cls.endTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--text-tertiary)]" />
                    <span>{cls.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserSquare className="w-4 h-4 text-[var(--text-tertiary)]" />
                    <span>{cls.faculty}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
