export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgHover: string;
  surfaceBase: string;
  surfaceElevated: string;
  surfaceInteractive: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  borderPrimary: string;
  borderSecondary: string;
  accentPrimary: string;
  accentSecondary: string;
  accentHover: string;
  accentLight: string;
  success: string;
  warning: string;
  error: string;
}

export interface Theme {
  id: string;
  name: string;
  label: string;
  colors: ThemeColors;
}

export type ThemeId =
  | "midnight"
  | "amoled"
  | "matrix"
  | "nord"
  | "cyberpunk"
  | "ocean";
