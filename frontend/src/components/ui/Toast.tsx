import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useToastStore } from "@/store";
import type { ToastItem } from "@/store";

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: "var(--success)",
  error: "var(--error)",
  warning: "var(--warning)",
  info: "var(--accent-primary)",
};

function ToastSingle({ toast }: { toast: ToastItem }) {
  const removeToast = useToastStore((s) => s.removeToast);
  const Icon = iconMap[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="
        flex items-start gap-3 w-80 p-4
        bg-[var(--surface-elevated)] border border-[var(--border-secondary)]
        rounded-xl shadow-2xl backdrop-blur-xl
      "
    >
      <Icon
        className="w-5 h-5 shrink-0 mt-0.5"
        style={{ color: colorMap[toast.type] }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text-primary)]">
          {toast.title}
        </p>
        {toast.description && (
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="p-1 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)]
          hover:bg-[var(--surface-interactive)] transition-colors shrink-0 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="fixed bottom-6 right-6 z-[1100] flex flex-col-reverse gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastSingle key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export { ToastContainer };
