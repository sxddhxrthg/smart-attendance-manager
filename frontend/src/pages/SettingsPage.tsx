import { PageHeader, SectionCard } from "@/components/ui";
import { Settings } from "lucide-react";

function SettingsPage() {
  return (
    <div className="animate-entry">
      <PageHeader
        title="Settings"
        subtitle="Manage your preferences and account"
        icon={<Settings className="w-5 h-5" />}
      />

      <SectionCard
        title="Coming Soon"
        description="The settings module is currently under construction."
      >
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border-primary)] rounded-lg bg-[var(--surface-interactive)] mt-4">
          <p className="text-[var(--text-tertiary)]">Settings content will appear here</p>
        </div>
      </SectionCard>
    </div>
  );
}

export default SettingsPage;
