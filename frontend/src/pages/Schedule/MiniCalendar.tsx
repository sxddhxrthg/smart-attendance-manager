import { SectionCard } from "@/components/ui";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

export function MiniCalendar() {
  // Mock calendar for visual purposes (October 2023)
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  
  // Generating a grid of 35 days (5 weeks)
  const dates = Array.from({ length: 35 }, (_, i) => {
    const date = i - 1; // Starts on Tuesday
    return date > 0 && date <= 31 ? date : null;
  });

  const today = 17; // Mock today's date
  const events = [5, 12, 15, 23]; // Mock days with events/exams

  return (
    <SectionCard title="Calendar" icon={<CalendarIcon className="w-4 h-4 text-[var(--accent-primary)]" />}>
      <div className="flex items-center justify-between mb-4 mt-2">
        <span className="text-sm font-bold text-[var(--text-primary)]">October 2023</span>
        <div className="flex gap-1">
          <button className="p-1 rounded hover:bg-[var(--surface-interactive)] text-[var(--text-secondary)]">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-[var(--surface-interactive)] text-[var(--text-secondary)]">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {days.map(day => (
          <span key={day} className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dates.map((date, i) => {
          if (!date) return <div key={i} className="aspect-square" />;

          const isToday = date === today;
          const hasEvent = events.includes(date);

          return (
            <button
              key={i}
              className={`
                relative flex items-center justify-center aspect-square rounded-lg text-xs font-medium transition-colors
                ${isToday ? "bg-[var(--accent-primary)] text-white shadow-md" : "text-[var(--text-secondary)] hover:bg-[var(--surface-interactive)] hover:text-[var(--text-primary)]"}
              `}
            >
              {date}
              {hasEvent && !isToday && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--error)]" />
              )}
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}
