import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export function EmptyState({ message = "No classes scheduled for today!" }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-[var(--border-secondary)] rounded-2xl bg-[var(--surface-interactive)]/30"
    >
      <div className="w-16 h-16 mb-6 rounded-full bg-[var(--surface-base)] flex items-center justify-center border border-[var(--border-primary)] shadow-sm">
        <Coffee className="w-8 h-8 text-[var(--text-tertiary)]" />
      </div>
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
        Enjoy your day off
      </h3>
      <p className="text-[var(--text-secondary)] max-w-sm">
        {message} Use this time to catch up on assignments or relax.
      </p>
    </motion.div>
  );
}
