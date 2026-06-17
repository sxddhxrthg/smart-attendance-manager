import { motion } from "framer-motion";
import type { DayOfWeek } from "./mockData";

interface DaySwitcherProps {
  days: DayOfWeek[];
  selectedDay: DayOfWeek;
  onSelectDay: (day: DayOfWeek) => void;
}

export function DaySwitcher({ days, selectedDay, onSelectDay }: DaySwitcherProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {days.map((day) => {
        const isSelected = selectedDay === day;
        
        return (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            className={`
              relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200
              ${isSelected ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-interactive)]"}
            `}
          >
            {isSelected && (
              <motion.div
                layoutId="schedule-day-active"
                className="absolute inset-0 bg-[var(--surface-elevated)] border border-[var(--border-secondary)] rounded-xl shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            
            <span className="relative z-10">{day}</span>
            
            {/* Sliding Underline indicator */}
            {isSelected && (
              <motion.div
                layoutId="schedule-day-underline"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-[var(--accent-primary)] rounded-t-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
