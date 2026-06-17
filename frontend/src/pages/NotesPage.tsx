import { PageHeader, SectionCard } from "@/components/ui";
import { StickyNote } from "lucide-react";

function NotesPage() {
  return (
    <div className="animate-entry">
      <PageHeader
        title="Notes"
        subtitle="Organize your study materials"
        icon={<StickyNote className="w-5 h-5" />}
      />

      <SectionCard
        title="Coming Soon"
        description="The notes module is currently under construction."
      >
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border-primary)] rounded-lg bg-[var(--surface-interactive)] mt-4">
          <p className="text-[var(--text-tertiary)]">Notes content will appear here</p>
        </div>
      </SectionCard>
    </div>
  );
}

export default NotesPage;
