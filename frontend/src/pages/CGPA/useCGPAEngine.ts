import { useState, useMemo } from "react";
import {
  PastSemester,
  CurrentSubject,
  marksToGrade,
  GRADE_POINTS,
} from "./mockData";

export function useCGPAEngine(
  initialPastSemesters: PastSemester[],
  initialCurrentSubjects: CurrentSubject[]
) {
  const [pastSemesters] = useState(initialPastSemesters);
  const [currentSubjects, setCurrentSubjects] = useState(initialCurrentSubjects);
  const [targetCGPA, setTargetCGPA] = useState(9.25); // Default target

  // Calculate past cumulative totals
  const { totalPastCredits, totalPastPoints } = useMemo(() => {
    let credits = 0;
    let points = 0;
    for (const sem of pastSemesters) {
      credits += sem.creditsEarned;
      points += sem.gpa * sem.creditsEarned;
    }
    return { totalPastCredits: credits, totalPastPoints: points };
  }, [pastSemesters]);

  // Calculate current semester stats based on predicted marks
  const currentSemesterStats = useMemo(() => {
    let currentSemCredits = 0;
    let currentSemPoints = 0;
    
    for (const sub of currentSubjects) {
      currentSemCredits += sub.credits;
      const grade = marksToGrade(sub.predictedTotal);
      currentSemPoints += GRADE_POINTS[grade] * sub.credits;
    }

    const currentSemGPA = currentSemCredits > 0 ? currentSemPoints / currentSemCredits : 0;
    
    // Overall CGPA if predicted marks hold true
    const overallCredits = totalPastCredits + currentSemCredits;
    const overallPoints = totalPastPoints + currentSemPoints;
    const overallCGPA = overallCredits > 0 ? overallPoints / overallCredits : 0;

    return {
      currentSemCredits,
      currentSemGPA,
      overallCGPA,
    };
  }, [currentSubjects, totalPastCredits, totalPastPoints]);

  // Scenarios
  const scenarios = useMemo(() => {
    let maxSemPoints = 0;
    let minSemPoints = 0; // assuming passing grade 'P' (4) is minimum worst case, else 'F' (0). Let's use 'P' as worst realistic case.

    let currentSemCredits = 0;
    for (const sub of currentSubjects) {
      currentSemCredits += sub.credits;
      maxSemPoints += GRADE_POINTS["O"] * sub.credits; // Max is 10 points
      
      // Worst case: they just pass (4 points) or fail (0). Let's say if they already have > 40 internals, worst is P or C. 
      // We'll just use a pessimistic grade like 'C' (5) or 'B' (6) for worst case if internals are good.
      // For simplicity, worst case is minimum passing grade 'P' (4).
      minSemPoints += GRADE_POINTS["P"] * sub.credits; 
    }

    const bestCaseCGPA = (totalPastPoints + maxSemPoints) / (totalPastCredits + currentSemCredits);
    const worstCaseCGPA = (totalPastPoints + minSemPoints) / (totalPastCredits + currentSemCredits);

    return { bestCaseCGPA, worstCaseCGPA };
  }, [currentSubjects, totalPastCredits, totalPastPoints]);

  const updateSubjectPrediction = (id: string, predictedTotal: number) => {
    setCurrentSubjects((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, predictedTotal } : sub))
    );
  };

  return {
    pastSemesters,
    currentSubjects,
    targetCGPA,
    setTargetCGPA,
    updateSubjectPrediction,
    stats: currentSemesterStats,
    scenarios,
    totalPastCredits
  };
}
