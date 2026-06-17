import { PageHeader, SectionCard } from "@/components/ui";
import { LayoutDashboard } from "lucide-react";

function DashboardPage() {
  return (
    <div className="animate-entry">
      <PageHeader
        title="Dashboard"
        subtitle="Your academic command center"
        icon={<LayoutDashboard className="w-5 h-5" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SectionCard
          title="Coming Soon"
          description="The dashboard module is currently under construction."
          className="col-span-full"
        >
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border-primary)] rounded-lg bg-[var(--surface-interactive)] mt-4">
            <p className="text-[var(--text-tertiary)]">Dashboard content will appear here</p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default DashboardPage;
