import { useEffect } from "react";

type Modifier = "meta" | "ctrl" | "alt" | "shift";

interface ShortcutOptions {
  key: string;
  modifier?: Modifier | Modifier[];
  callback: (e: KeyboardEvent) => void;
  enabled?: boolean;
}

export function useKeyboardShortcut({
  key,
  modifier,
  callback,
  enabled = true,
}: ShortcutOptions) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      const modifiers = Array.isArray(modifier)
        ? modifier
        : modifier
          ? [modifier]
          : [];

      const modifierMatch = modifiers.every((mod) => {
        switch (mod) {
          case "meta":
            return e.metaKey;
          case "ctrl":
            return e.ctrlKey;
          case "alt":
            return e.altKey;
          case "shift":
            return e.shiftKey;
          default:
            return false;
        }
      });

      if (modifierMatch && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        callback(e);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, modifier, callback, enabled]);
}
