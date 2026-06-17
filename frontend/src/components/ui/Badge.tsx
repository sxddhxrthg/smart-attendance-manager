type BadgeVariant = "default" | "success" | "warning" | "error" | "accent";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--surface-interactive)] text-[var(--text-secondary)] border-[var(--border-primary)]",
  success:
    "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20",
  warning:
    "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20",
  error:
    "bg-[var(--error)]/10 text-[var(--error)] border-[var(--error)]/20",
  accent:
    "bg-[var(--accent-primary)]/10 text-[var(--accent-light)] border-[var(--accent-primary)]/20",
};

function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5
        text-xs font-medium rounded-md border
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant };
