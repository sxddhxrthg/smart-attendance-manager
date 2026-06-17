import { NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  PanelLeftClose,
  PanelLeft,
  Command,
  Zap,
} from "lucide-react";
import { useSidebarStore, useCommandStore } from "@/store";
import { NAV_ITEMS, NAV_SECTIONS } from "@/constants/navigation";

function SidebarNav() {
  const { isCollapsed, toggle } = useSidebarStore();
  const openCommand = useCommandStore((s) => s.open);
  const location = useLocation();

  const sidebarWidth = isCollapsed ? "72px" : "260px";

  return (
    <motion.aside
      animate={{ width: sidebarWidth }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="
        h-screen sticky top-0 shrink-0 overflow-hidden
        bg-[var(--bg-secondary)] border-r border-[var(--border-primary)]
        flex flex-col z-[100]
      "
    >
      {/* Logo Area */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-[var(--border-primary)]">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2.5 overflow-hidden"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm text-[var(--text-primary)] tracking-tight whitespace-nowrap">
                Zenith Grade
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {isCollapsed && (
          <div className="w-full flex justify-center">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Search / Command Palette Trigger */}
      <div className="px-3 py-3">
        <button
          onClick={openCommand}
          className={`
            w-full flex items-center gap-2.5 rounded-lg
            text-sm text-[var(--text-tertiary)] cursor-pointer
            hover:bg-[var(--surface-interactive)] transition-colors duration-150
            ${isCollapsed ? "justify-center px-2 py-2" : "px-3 py-2"}
          `}
        >
          <Command className="w-4 h-4 shrink-0" />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">Search...</span>
              <kbd className="text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--surface-interactive)] border border-[var(--border-primary)] rounded px-1.5 py-0.5">
                ⌘K
              </kbd>
            </>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3 scrollbar-thin">
        {NAV_SECTIONS.map((section) => {
          const sectionItems = NAV_ITEMS.filter(
            (item) => item.section === section.id,
          );
          if (sectionItems.length === 0) return null;

          return (
            <div key={section.id} className="mb-2">
              {!isCollapsed && (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] px-3 py-2">
                  {section.label}
                </p>
              )}
              {isCollapsed && <div className="h-px bg-[var(--border-primary)] mx-2 my-2" />}

              <div className="space-y-0.5">
                {sectionItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      className={`
                        relative flex items-center gap-3 rounded-lg
                        text-sm font-medium transition-colors duration-150
                        ${isCollapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"}
                        ${
                          isActive
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-interactive)]"
                        }
                      `}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute inset-0 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 rounded-lg"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}

                      <Icon className="w-[18px] h-[18px] shrink-0 relative z-10" />

                      {!isCollapsed && (
                        <span className="relative z-10 truncate">
                          {item.label}
                        </span>
                      )}

                      {!isCollapsed && item.badge && (
                        <span className="relative z-10 ml-auto text-[10px] font-semibold bg-[var(--accent-primary)]/20 text-[var(--accent-light)] rounded-full px-2 py-0.5">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-[var(--border-primary)] p-3">
        <button
          onClick={toggle}
          className={`
            w-full flex items-center gap-2.5 rounded-lg
            text-sm text-[var(--text-secondary)] cursor-pointer
            hover:text-[var(--text-primary)] hover:bg-[var(--surface-interactive)]
            transition-colors duration-150
            ${isCollapsed ? "justify-center px-2 py-2" : "px-3 py-2"}
          `}
        >
          {isCollapsed ? (
            <PanelLeft className="w-[18px] h-[18px]" />
          ) : (
            <>
              <PanelLeftClose className="w-[18px] h-[18px]" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}

export default SidebarNav;
