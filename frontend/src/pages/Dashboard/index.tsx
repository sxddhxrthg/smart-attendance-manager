import { GreetingSection } from "./GreetingSection";
import { QuickStats } from "./QuickStats";
import { TodaySchedule } from "./TodaySchedule";
import { AttendanceHeatmap } from "./AttendanceHeatmap";
import { QuickAccess } from "./QuickAccess";
import { AIInsights } from "./AIInsights";
import { RecentMarks } from "./RecentMarks";
import { AcademicCalendar } from "./AcademicCalendar";

import {
  MOCK_USER,
  MOCK_SCHEDULE,
  MOCK_HEATMAP_DATA,
  MOCK_QUICK_ACCESS,
  MOCK_INSIGHTS,
  MOCK_RECENT_MARKS,
  MOCK_ACADEMIC_CALENDAR,
} from "./mockData";

export default function Dashboard() {
  return (
    <div className="space-y-6 sm:space-y-8 pb-12 animate-entry">
      <GreetingSection user={MOCK_USER} />
      
      <QuickStats user={MOCK_USER} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AttendanceHeatmap data={MOCK_HEATMAP_DATA} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentMarks marks={MOCK_RECENT_MARKS} />
            <AIInsights insights={MOCK_INSIGHTS} />
          </div>
        </div>

        <div className="space-y-6">
          <TodaySchedule schedule={MOCK_SCHEDULE} />
          <QuickAccess links={MOCK_QUICK_ACCESS} />
        </div>
      </div>

      <AcademicCalendar events={MOCK_ACADEMIC_CALENDAR} />
    </div>
  );
}
