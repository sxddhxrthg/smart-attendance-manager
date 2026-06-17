import { PageHeader, SectionCard } from "@/components/ui";
import { Calendar } from "lucide-react";

function CalendarPage() {
  return (
    <div className="animate-entry">
      <PageHeader
        title="Calendar"
        subtitle="Academic calendar, exam dates, and holidays"
        icon={<Calendar className="w-5 h-5" />}
      />

      <SectionCard
        title="Coming Soon"
        description="The calendar module is currently under construction."
      >
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border-primary)] rounded-lg bg-[var(--surface-interactive)] mt-4">
          <p className="text-[var(--text-tertiary)]">Calendar content will appear here</p>
        </div>
      </SectionCard>
    </div>
  );
}

export default CalendarPage;
