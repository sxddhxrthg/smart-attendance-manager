export function calculateAttendancePercentage(
  attendedClasses: number,
  totalClasses: number
): number {
  if (totalClasses === 0) {
    return 0;
  }

  return (attendedClasses / totalClasses) * 100;
}

export function isBelowTarget(
  attendancePercentage: number,
  targetAttendancePercentage: number
): boolean {
  return attendancePercentage < targetAttendancePercentage;
}

export function calculateSafeToMiss(
  attendedClasses: number,
  totalClasses: number,
  targetAttendancePercentage: number
): number {
  let safeToMiss = 0;

  while (
    (attendedClasses / (totalClasses + safeToMiss + 1)) * 100 >=
    targetAttendancePercentage
  ) {
    safeToMiss++;
  }

  return safeToMiss;
}

export function calculateClassesNeeded(
  attendedClasses: number,
  totalClasses: number,
  targetAttendancePercentage: number
): number {
  let classesNeeded = 0;

  while (
    ((attendedClasses + classesNeeded) /
      (totalClasses + classesNeeded)) *
      100 <
    targetAttendancePercentage
  ) {
    classesNeeded++;
  }

  return classesNeeded;
}