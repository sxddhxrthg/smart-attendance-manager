import { forwardRef } from "react";

type CardVariant = "default" | "elevated" | "glass";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-[var(--surface-base)] border border-[var(--border-primary)] hover:border-[var(--border-secondary)]",
  elevated:
    "bg-[var(--surface-elevated)] border border-[var(--border-secondary)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]",
  glass:
    "bg-white/5 backdrop-blur-xl border border-white/10",
};

const paddingStyles: Record<string, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", padding = "md", className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-xl transition-all duration-300
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export { Card };
export type { CardProps, CardVariant };
