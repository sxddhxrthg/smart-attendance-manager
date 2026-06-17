import type { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  section: NavSection;
  badge?: string;
}

export type NavSection = "core" | "academic" | "tools" | "system";

export interface NavSectionConfig {
  id: NavSection;
  label: string;
}
