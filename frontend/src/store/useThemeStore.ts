import { create } from "zustand";
import { THEMES, DEFAULT_THEME_ID } from "@/constants/themes";
import type { ThemeColors, ThemeId } from "@/types/theme";

interface ThemeState {
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  getColors: () => ThemeColors;
}

function applyTheme(themeId: ThemeId) {
  const theme = THEMES.find((t) => t.id === themeId);
  if (!theme) return;

  const root = document.documentElement;
  const c = theme.colors;

  root.style.setProperty("--bg-primary", c.bgPrimary);
  root.style.setProperty("--bg-secondary", c.bgSecondary);
  root.style.setProperty("--bg-tertiary", c.bgTertiary);
  root.style.setProperty("--bg-hover", c.bgHover);
  root.style.setProperty("--surface-base", c.surfaceBase);
  root.style.setProperty("--surface-elevated", c.surfaceElevated);
  root.style.setProperty("--surface-interactive", c.surfaceInteractive);
  root.style.setProperty("--text-primary", c.textPrimary);
  root.style.setProperty("--text-secondary", c.textSecondary);
  root.style.setProperty("--text-tertiary", c.textTertiary);
  root.style.setProperty("--border-primary", c.borderPrimary);
  root.style.setProperty("--border-secondary", c.borderSecondary);
  root.style.setProperty("--accent-primary", c.accentPrimary);
  root.style.setProperty("--accent-secondary", c.accentSecondary);
  root.style.setProperty("--accent-hover", c.accentHover);
  root.style.setProperty("--accent-light", c.accentLight);
  root.style.setProperty("--success", c.success);
  root.style.setProperty("--warning", c.warning);
  root.style.setProperty("--error", c.error);

  localStorage.setItem("zenith:theme", themeId);
}

function getStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem("zenith:theme");
    if (stored && THEMES.some((t) => t.id === stored)) {
      return stored as ThemeId;
    }
  } catch {
    // Ignore localStorage errors
  }
  return DEFAULT_THEME_ID as ThemeId;
}

export const useThemeStore = create<ThemeState>((set, get) => {
  const initialTheme = getStoredTheme();

  // Apply on load
  if (typeof document !== "undefined") {
    applyTheme(initialTheme);
  }

  return {
    themeId: initialTheme,

    setTheme: (id: ThemeId) => {
      applyTheme(id);
      set({ themeId: id });
    },

    getColors: () => {
      const theme = THEMES.find((t) => t.id === get().themeId);
      return theme?.colors ?? THEMES[0].colors;
    },
  };
});
