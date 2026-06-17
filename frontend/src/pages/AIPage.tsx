import { PageHeader, SectionCard } from "@/components/ui";
import { Sparkles } from "lucide-react";

function AIPage() {
  return (
    <div className="animate-entry">
      <PageHeader
        title="AI Assistant"
        subtitle="Your personal academic copilot"
        icon={<Sparkles className="w-5 h-5" />}
      />

      <SectionCard
        title="Coming Soon"
        description="The AI assistant module is currently under construction."
      >
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border-primary)] rounded-lg bg-[var(--surface-interactive)] mt-4">
          <p className="text-[var(--text-tertiary)]">AI assistant content will appear here</p>
        </div>
      </SectionCard>
    </div>
  );
}

export default AIPage;
