import { PageHeader, SectionCard } from "@/components/ui";
import { CalendarClock } from "lucide-react";

function SchedulePage() {
  return (
    <div className="animate-entry">
      <PageHeader
        title="Schedule"
        subtitle="Manage your classes and timetable"
        icon={<CalendarClock className="w-5 h-5" />}
      />

      <SectionCard
        title="Coming Soon"
        description="The schedule module is currently under construction."
      >
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border-primary)] rounded-lg bg-[var(--surface-interactive)] mt-4">
          <p className="text-[var(--text-tertiary)]">Schedule content will appear here</p>
        </div>
      </SectionCard>
    </div>
  );
}

export default SchedulePage;
