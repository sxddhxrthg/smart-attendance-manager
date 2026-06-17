import { motion } from "framer-motion";
import { SectionCard } from "@/components/ui";
import { CalendarDays, AlertCircle, CalendarRange, PartyPopper } from "lucide-react";
import type { AcademicEvent } from "./mockData";

export function AcademicCalendar({ events }: { events: AcademicEvent[] }) {
  const getEventIcon = (type: AcademicEvent["type"]) => {
    switch (type) {
      case "exam": return <AlertCircle className="w-4 h-4 text-[var(--error)]" />;
      case "deadline": return <CalendarDays className="w-4 h-4 text-[var(--warning)]" />;
      case "holiday": return <PartyPopper className="w-4 h-4 text-[var(--success)]" />;
      case "event": return <CalendarRange className="w-4 h-4 text-[var(--accent-primary)]" />;
    }
  };

  const getEventStyle = (type: AcademicEvent["type"]) => {
    switch (type) {
      case "exam": return "border-[var(--error)] bg-[var(--error)]/5 text-[var(--error)]";
      case "deadline": return "border-[var(--warning)] bg-[var(--warning)]/5 text-[var(--warning)]";
      case "holiday": return "border-[var(--success)] bg-[var(--success)]/5 text-[var(--success)]";
      case "event": return "border-[var(--accent-primary)] bg-[var(--accent-primary)]/5 text-[var(--accent-primary)]";
    }
  };

  return (
    <SectionCard
      title="Upcoming Events"
      description="Academic calendar and deadlines"
      className="col-span-full"
    >
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 24 }}
            className={`
              shrink-0 w-64 snap-start p-4 rounded-xl border
              ${getEventStyle(event.type)}
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-[var(--bg-primary)]/50 backdrop-blur-sm">
                {getEventIcon(event.type)}
              </div>
              <span className="text-xs font-bold tracking-wider uppercase opacity-80">
                {event.daysLeft} days left
              </span>
            </div>
            
            <h4 className="text-base font-bold mb-1 line-clamp-1">
              {event.title}
            </h4>
            <p className="text-sm font-medium opacity-80">
              {event.date}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionCard>
  );
}
