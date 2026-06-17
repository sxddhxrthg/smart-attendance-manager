import {
  LayoutDashboard,
  CalendarClock,
  CheckSquare,
  GraduationCap,
  TrendingUp,
  BarChart3,
  Calendar,
  Users,
  StickyNote,
  Sparkles,
  Settings,
} from "lucide-react";
import type { NavItem, NavSectionConfig } from "@/types/navigation";

export const NAV_SECTIONS: NavSectionConfig[] = [
  { id: "core", label: "Core" },
  { id: "academic", label: "Academic" },
  { id: "tools", label: "Tools" },
  { id: "system", label: "System" },
];

export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    section: "core",
  },
  {
    id: "schedule",
    label: "Schedule",
    path: "/schedule",
    icon: CalendarClock,
    section: "core",
  },
  {
    id: "attendance",
    label: "Attendance",
    path: "/attendance",
    icon: CheckSquare,
    section: "academic",
  },
  {
    id: "marks",
    label: "Marks",
    path: "/marks",
    icon: GraduationCap,
    section: "academic",
  },
  {
    id: "cgpa",
    label: "CGPA Planner",
    path: "/cgpa",
    icon: TrendingUp,
    section: "academic",
  },
  {
    id: "analytics",
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
    section: "academic",
  },
  {
    id: "calendar",
    label: "Calendar",
    path: "/calendar",
    icon: Calendar,
    section: "tools",
  },
  {
    id: "faculty",
    label: "Faculty",
    path: "/faculty",
    icon: Users,
    section: "tools",
  },
  {
    id: "notes",
    label: "Notes",
    path: "/notes",
    icon: StickyNote,
    section: "tools",
  },
  {
    id: "ai",
    label: "AI Assistant",
    path: "/ai",
    icon: Sparkles,
    section: "tools",
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: Settings,
    section: "system",
  },
];
