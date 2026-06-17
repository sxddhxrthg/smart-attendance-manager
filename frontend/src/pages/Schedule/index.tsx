import { useState, useMemo } from "react";
import { PageHeader } from "@/components/ui";

import { DaySwitcher } from "./DaySwitcher";
import { LiveStatus } from "./LiveStatus";
import { TimelineView } from "./TimelineView";
import { WeeklyOverview } from "./WeeklyOverview";
import { MiniCalendar } from "./MiniCalendar";
import { EmptyState } from "./EmptyState";

import { MOCK_WEEKLY_SCHEDULE, type DayOfWeek } from "./mockData";

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Helper to determine the default active day based on actual current day (fallback to Monday on weekends)
const getInitialDay = (): DayOfWeek => {
  const d = new Date().getDay(); // 0 = Sunday, 1 = Monday
  if (d === 0 || d === 6) return "Monday";
  return DAYS[d - 1];
};

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(getInitialDay());

  const currentSchedule = useMemo(() => MOCK_WEEKLY_SCHEDULE[selectedDay] || [], [selectedDay]);

  return (
    <div className="animate-entry pb-12">
      <PageHeader 
        title="Schedule" 
        description="Your academic timetable and live tracking" 
      />

      <div className="mt-6 mb-8">
        <DaySwitcher 
          days={DAYS} 
          selectedDay={selectedDay} 
          onSelectDay={setSelectedDay} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column / Main Area */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-8">
          <LiveStatus schedule={currentSchedule} todayStr={selectedDay} />
          
          <div className="mt-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
              Timeline
            </h2>
            {currentSchedule.length > 0 ? (
              <TimelineView schedule={currentSchedule} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        {/* Right Column / Sidebar */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-6">
          <MiniCalendar />
          <WeeklyOverview schedule={MOCK_WEEKLY_SCHEDULE} currentDay={selectedDay} />
        </div>
      </div>
    </div>
  );
}
