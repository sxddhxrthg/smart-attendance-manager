import { useState } from "react";
import { motion } from "framer-motion";

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}

function Tabs({ items, value, onChange, className = "" }: TabsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className={`
        flex gap-1 p-1 rounded-xl
        bg-[var(--surface-interactive)] border border-[var(--border-primary)]
        ${className}
      `}
    >
      {items.map((item) => {
        const isActive = value === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-lg
              text-sm font-medium transition-colors duration-200 cursor-pointer
              ${
                isActive
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }
            `}
          >
            {/* Active background */}
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-[var(--surface-elevated)] border border-[var(--border-secondary)] rounded-lg shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}

            {/* Hover highlight */}
            {hoveredId === item.id && !isActive && (
              <motion.div
                layoutId="hovered-tab"
                className="absolute inset-0 bg-white/5 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { Tabs };
export type { TabsProps, TabItem };
