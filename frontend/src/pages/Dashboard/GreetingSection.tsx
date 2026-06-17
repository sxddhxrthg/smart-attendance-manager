import { motion } from "framer-motion";
import type { UserData } from "./mockData";

export function GreetingSection({ user }: { user: UserData }) {
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-4"
    >
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-1"
        >
          {today}
        </motion.p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
          {greeting},{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">
            {user.name.split(" ")[0]}
          </span>
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-interactive)] border border-[var(--border-primary)] self-start md:self-auto"
      >
        <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
        <span className="text-xs font-mono text-[var(--text-secondary)]">
          {user.registrationNumber}
        </span>
      </motion.div>
    </motion.div>
  );
}
