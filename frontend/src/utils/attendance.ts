export function calculateAttendance(
  attendedClasses: number,
  totalClasses: number
) {
  return (attendedClasses / totalClasses) * 100;
}

export function classesNeededForTarget(
  attendedClasses: number,
  totalClasses: number,
  targetPercentage: number
) {
  let attended = attendedClasses;
  let total = totalClasses;
  let count = 0;

  while ((attended / total) * 100 < targetPercentage) {
    attended++;
    total++;
    count++;
  }

  return count;
}

export function classesCanBunk(
  attendedClasses: number,
  totalClasses: number,
  targetPercentage: number
) {
  let total = totalClasses;
  let count = 0;

  while ((attendedClasses / (total + 1)) * 100 >= targetPercentage) {
    total++;
    count++;
  }

  return count;
}