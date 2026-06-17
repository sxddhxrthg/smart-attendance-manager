import { PageHeader, SectionCard } from "@/components/ui";
import { GraduationCap } from "lucide-react";

function MarksPage() {
  return (
    <div className="animate-entry">
      <PageHeader
        title="Marks"
        subtitle="Track your internal and external assessments"
        icon={<GraduationCap className="w-5 h-5" />}
      />

      <SectionCard
        title="Coming Soon"
        description="The marks module is currently under construction."
      >
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border-primary)] rounded-lg bg-[var(--surface-interactive)] mt-4">
          <p className="text-[var(--text-tertiary)]">Marks content will appear here</p>
        </div>
      </SectionCard>
    </div>
  );
}

export default MarksPage;
