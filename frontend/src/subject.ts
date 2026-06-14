export interface Subject {
  id: string;
  code: string;
  name: string;
  attendedClasses: number;
  totalClasses: number;
  targetAttendancePercentage: number;
}