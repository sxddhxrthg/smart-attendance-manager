// Design System Constants
// Inspired by Linear, Apple, and modern SaaS aesthetics

export const COLORS = {
  background: {
    primary: "#0f0f0f",
    secondary: "#1a1a1a",
    tertiary: "#252525",
  },
  surface: {
    base: "#131313",
    elevated: "#1f1f1f",
  },
  accent: {
    primary: "#3b82f6",
    hover: "#2563eb",
    light: "#60a5fa",
  },
  text: {
    primary: "#f5f5f5",
    secondary: "#a0a0a0",
    tertiary: "#666666",
  },
  success: "#10b981",
  error: "#ef4444",
} as const;

export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "48px",
  "4xl": "64px",
} as const;

export const RADIUS = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
} as const;

export const TRANSITIONS = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 100,
  fixed: 1020,
  modal: 1050,
} as const;
