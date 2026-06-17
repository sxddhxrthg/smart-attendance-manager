import type { Subject } from "../types/subject";
import {
  calculateAttendance,
  classesNeededForTarget,
  classesCanBunk,
} from "../utils/attendance";

interface SubjectCardProps {
  subject: Subject;
}

function SubjectCard({ subject }: SubjectCardProps) {
  const attendancePercentage = calculateAttendance(
    subject.attendedClasses,
    subject.totalClasses
  );

  const neededClasses = classesNeededForTarget(
    subject.attendedClasses,
    subject.totalClasses,
    subject.targetAttendancePercentage
  );

  const bunkClasses = classesCanBunk(
    subject.attendedClasses,
    subject.totalClasses,
    subject.targetAttendancePercentage
  );

  return (
    <div>
      <h2>
        {subject.name} ({subject.code})
      </h2>

      <p>
        {subject.attendedClasses} / {subject.totalClasses}
      </p>

      <p>
        Attendance: {attendancePercentage.toFixed(1)}%
      </p>

      <p>
        Target: {subject.targetAttendancePercentage}%
      </p>

      <p>
        Can bunk: {bunkClasses} classes
      </p>

      <p>
        Need to attend: {neededClasses} classes
      </p>
    </div>
  );
}

export default SubjectCard;