import { PageHeader, SectionCard } from "@/components/ui";
import { BarChart3 } from "lucide-react";

function AnalyticsPage() {
  return (
    <div className="animate-entry">
      <PageHeader
        title="Analytics"
        subtitle="Insights and trends across your academic data"
        icon={<BarChart3 className="w-5 h-5" />}
      />

      <SectionCard
        title="Coming Soon"
        description="The analytics module is currently under construction."
      >
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border-primary)] rounded-lg bg-[var(--surface-interactive)] mt-4">
          <p className="text-[var(--text-tertiary)]">Analytics content will appear here</p>
        </div>
      </SectionCard>
    </div>
  );
}

export default AnalyticsPage;
