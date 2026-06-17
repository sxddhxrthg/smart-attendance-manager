import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertTriangle } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
  isLoading?: boolean;
}

function Dialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  isLoading = false,
}: DialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          {variant === "danger" && (
            <div className="p-2 rounded-lg bg-[var(--error)]/10 shrink-0">
              <AlertTriangle className="w-5 h-5 text-[var(--error)]" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {title}
            </h3>
            {description && (
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[var(--border-primary)]">
          <Button variant="ghost" size="sm" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export { Dialog };
export type { DialogProps };
