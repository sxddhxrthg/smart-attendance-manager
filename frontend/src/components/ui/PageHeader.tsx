import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

function PageHeader({ title, subtitle, icon, actions, className = "" }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 ${className}`}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </motion.div>
  );
}

export { PageHeader };
export type { PageHeaderProps };
