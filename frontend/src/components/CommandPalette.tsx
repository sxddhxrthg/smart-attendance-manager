import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useCommandStore } from "@/store";
import { NAV_ITEMS } from "@/constants/navigation";

function CommandPalette() {
  const { isOpen, close } = useCommandStore();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return NAV_ITEMS;
    const lower = query.toLowerCase();
    return NAV_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(lower) ||
        item.id.toLowerCase().includes(lower),
    );
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems.length]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredItems.length - 1,
      );
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      navigateTo(filteredItems[selectedIndex].path);
    }
  }

  function navigateTo(path: string) {
    navigate(path);
    close();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1060] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="
              relative z-10 w-full max-w-lg mx-4
              bg-[var(--bg-secondary)] border border-[var(--border-primary)]
              rounded-2xl shadow-2xl overflow-hidden
            "
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 border-b border-[var(--border-primary)]">
              <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="
                  w-full py-4 bg-transparent text-sm text-[var(--text-primary)]
                  placeholder:text-[var(--text-tertiary)]
                  outline-none border-none
                "
              />
              <kbd className="text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--surface-interactive)] border border-[var(--border-primary)] rounded px-1.5 py-0.5 shrink-0">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-2">
              {filteredItems.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-[var(--text-tertiary)]">
                    No results found
                  </p>
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.path)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-2.5 text-left
                        transition-colors duration-75 cursor-pointer
                        ${
                          isSelected
                            ? "bg-[var(--accent-primary)]/10 text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="ml-auto text-xs text-[var(--text-tertiary)]">
                        {item.section}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--border-primary)] text-[10px] text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1">
                <kbd className="font-mono bg-[var(--surface-interactive)] border border-[var(--border-primary)] rounded px-1 py-0.5">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="font-mono bg-[var(--surface-interactive)] border border-[var(--border-primary)] rounded px-1 py-0.5">↵</kbd>
                Open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="font-mono bg-[var(--surface-interactive)] border border-[var(--border-primary)] rounded px-1 py-0.5">esc</kbd>
                Close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export { CommandPalette };
