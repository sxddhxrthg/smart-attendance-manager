import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import SidebarNav from "./SidebarNav";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ui";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { useCommandStore } from "@/store";
import { NAV_ITEMS } from "@/constants/navigation";

function LoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[var(--border-secondary)] border-t-[var(--accent-primary)] rounded-full"
        />
        <p className="text-sm text-[var(--text-tertiary)]">Loading...</p>
      </div>
    </div>
  );
}

function AppShell() {
  const location = useLocation();
  const toggleCommand = useCommandStore((s) => s.toggle);

  // ⌘K to toggle command palette
  useKeyboardShortcut({
    key: "k",
    modifier: "meta",
    callback: toggleCommand,
  });

  // Also support Ctrl+K for non-Mac
  useKeyboardShortcut({
    key: "k",
    modifier: "ctrl",
    callback: toggleCommand,
  });

  // Get current page title from nav items
  const currentNav = NAV_ITEMS.find(
    (item) => item.path === location.pathname,
  );

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      <SidebarNav />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-3">
            {currentNav && (
              <motion.div
                key={currentNav.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <currentNav.icon className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {currentNav.label}
                </span>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* User avatar placeholder */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">ZG</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 max-w-7xl mx-auto w-full"
            >
              <Suspense fallback={<LoadingFallback />}>
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global overlays */}
      <CommandPalette />
      <ToastContainer />
    </div>
  );
}

export default AppShell;
