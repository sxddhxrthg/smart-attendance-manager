import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionCard } from "@/components/ui";

interface HeatmapDay {
  date: string;
  status: "present" | "absent" | "holiday" | "none";
  classesAttended: number;
  totalClasses: number;
}

export function AttendanceHeatmap({ data }: { data: HeatmapDay[] }) {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  // Group data by weeks (columns)
  const weeks: HeatmapDay[][] = [];
  let currentWeek: HeatmapDay[] = [];

  data.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === data.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const getColorClass = (status: HeatmapDay["status"], attended: number, total: number) => {
    if (status === "none") return "bg-[var(--surface-interactive)] border-[var(--border-primary)]";
    if (status === "holiday") return "bg-[var(--accent-primary)]/20 border-[var(--accent-primary)]/30";
    
    if (status === "absent" || (total > 0 && attended === 0)) {
      return "bg-[var(--error)] border-[var(--error)]/50";
    }
    
    // Gradient based on attendance percentage for the day
    const ratio = attended / total;
    if (ratio === 1) return "bg-[var(--success)] border-[var(--success)]/50";
    if (ratio >= 0.75) return "bg-[#34d399] border-[#34d399]/50"; // Light green
    if (ratio >= 0.5) return "bg-[#fcd34d] border-[#fcd34d]/50"; // Yellow
    return "bg-[#f87171] border-[#f87171]/50"; // Light red
  };

  const getStatusText = (day: HeatmapDay) => {
    if (day.status === "none") return "No classes scheduled";
    if (day.status === "holiday") return "Holiday";
    if (day.status === "absent" || day.totalClasses === 0) return "Absent from all classes";
    return `Attended ${day.classesAttended} / ${day.totalClasses} classes`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <SectionCard
      title="Attendance Heatmap"
      description="Last 90 days of activity"
      className="col-span-full xl:col-span-2 overflow-hidden"
    >
      <div className="relative mt-2">
        <div className="overflow-x-auto pb-4 scrollbar-thin">
          <div className="inline-flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (weekIndex * 7 + dayIndex) * 0.005,
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`
                      w-3.5 h-3.5 rounded-[3px] border cursor-pointer transition-transform
                      hover:scale-125 hover:z-10
                      ${getColorClass(day.status, day.classesAttended, day.totalClasses)}
                    `}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 text-xs text-[var(--text-tertiary)] mt-2">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-[2px] bg-[var(--surface-interactive)] border border-[var(--border-primary)]" />
            <div className="w-3 h-3 rounded-[2px] bg-[#fcd34d] border border-[#fcd34d]/50" />
            <div className="w-3 h-3 rounded-[2px] bg-[#34d399] border border-[#34d399]/50" />
            <div className="w-3 h-3 rounded-[2px] bg-[var(--success)] border border-[var(--success)]/50" />
          </div>
          <span>More</span>
        </div>

        {/* Floating Tooltip */}
        <AnimatePresence>
          {hoveredDay && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute left-0 bottom-0 bg-[var(--surface-elevated)] border border-[var(--border-secondary)] shadow-xl rounded-lg px-3 py-2 text-sm z-20 pointer-events-none"
            >
              <p className="font-semibold text-[var(--text-primary)]">
                {formatDate(hoveredDay.date)}
              </p>
              <p className="text-[var(--text-secondary)] mt-0.5">
                {getStatusText(hoveredDay)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionCard>
  );
}
