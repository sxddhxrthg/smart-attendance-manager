import { motion } from "framer-motion";
import { SectionCard } from "@/components/ui";
import { GraduationCap, UserCircle, Wifi, Mail, BookOpen, ExternalLink } from "lucide-react";
import type { QuickAccessLink } from "./mockData";

const ICONS: Record<string, React.ElementType> = {
  GraduationCap,
  UserCircle,
  Wifi,
  Mail,
  BookOpen,
};

export function QuickAccess({ links }: { links: QuickAccessLink[] }) {
  return (
    <SectionCard title="Quick Access" className="h-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {links.map((link, i) => {
          const Icon = ICONS[link.icon] || ExternalLink;

          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="
                group flex flex-col items-center justify-center p-4 gap-3
                bg-[var(--surface-interactive)] border border-[var(--border-primary)]
                rounded-xl transition-all duration-300
                hover:bg-[var(--surface-elevated)] hover:border-[var(--accent-primary)]/50
                hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.15)]
              "
            >
              <div className="p-2.5 rounded-lg bg-[var(--surface-base)] border border-[var(--border-secondary)] group-hover:scale-110 group-hover:bg-[var(--accent-primary)]/10 group-hover:text-[var(--accent-primary)] transition-all duration-300">
                <Icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
              </div>
              <span className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] text-center">
                {link.title}
              </span>
            </motion.a>
          );
        })}
      </div>
    </SectionCard>
  );
}
