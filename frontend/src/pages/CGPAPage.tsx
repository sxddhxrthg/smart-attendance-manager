import { PageHeader, SectionCard } from "@/components/ui";
import { TrendingUp } from "lucide-react";

function CGPAPage() {
  return (
    <div className="animate-entry">
      <PageHeader
        title="CGPA Planner"
        subtitle="Simulate and plan your grade point average"
        icon={<TrendingUp className="w-5 h-5" />}
      />

      <SectionCard
        title="Coming Soon"
        description="The CGPA planner module is currently under construction."
      >
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border-primary)] rounded-lg bg-[var(--surface-interactive)] mt-4">
          <p className="text-[var(--text-tertiary)]">CGPA planner content will appear here</p>
        </div>
      </SectionCard>
    </div>
  );
}

export default CGPAPage;
