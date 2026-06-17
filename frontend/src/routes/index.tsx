import { lazy } from "react";
import { Navigate } from "react-router";
import type { RouteObject } from "react-router";
import AppShell from "@/layouts/AppShell";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const SchedulePage = lazy(() => import("@/pages/SchedulePage"));
const AttendancePage = lazy(() => import("@/pages/AttendancePage"));
const MarksPage = lazy(() => import("@/pages/MarksPage"));
const CGPAPage = lazy(() => import("@/pages/CGPAPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));
const CalendarPage = lazy(() => import("@/pages/CalendarPage"));
const FacultyPage = lazy(() => import("@/pages/FacultyPage"));
const NotesPage = lazy(() => import("@/pages/NotesPage"));
const AIPage = lazy(() => import("@/pages/AIPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "schedule",
        element: <SchedulePage />,
      },
      {
        path: "attendance",
        element: <AttendancePage />,
      },
      {
        path: "marks",
        element: <MarksPage />,
      },
      {
        path: "cgpa",
        element: <CGPAPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "faculty",
        element: <FacultyPage />,
      },
      {
        path: "notes",
        element: <NotesPage />,
      },
      {
        path: "ai",
        element: <AIPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "*",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
];
