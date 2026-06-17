import { Card } from "./Card";

interface SectionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

function SectionCard({
  title,
  description,
  icon,
  children,
  actions,
  className = "",
}: SectionCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          {icon && <div className="mt-0.5">{icon}</div>}
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </Card>
  );
}

export { SectionCard };
export type { SectionCardProps };
