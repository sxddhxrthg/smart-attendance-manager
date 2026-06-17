import { PageHeader, SectionCard } from "@/components/ui";
import { Users } from "lucide-react";

function FacultyPage() {
  return (
    <div className="animate-entry">
      <PageHeader
        title="Faculty Finder"
        subtitle="Locate faculty cabins and view schedules"
        icon={<Users className="w-5 h-5" />}
      />

      <SectionCard
        title="Coming Soon"
        description="The faculty finder module is currently under construction."
      >
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border-primary)] rounded-lg bg-[var(--surface-interactive)] mt-4">
          <p className="text-[var(--text-tertiary)]">Faculty finder content will appear here</p>
        </div>
      </SectionCard>
    </div>
  );
}

export default FacultyPage;
