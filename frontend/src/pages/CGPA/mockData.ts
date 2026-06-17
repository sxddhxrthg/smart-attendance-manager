export type Grade = "O" | "A+" | "A" | "B+" | "B" | "C" | "P" | "F";

export const GRADE_POINTS: Record<Grade, number> = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "P": 4,
  "F": 0,
};

export const marksToGrade = (marks: number): Grade => {
  if (marks >= 90) return "O";
  if (marks >= 80) return "A+";
  if (marks >= 70) return "A";
  if (marks >= 60) return "B+";
  if (marks >= 50) return "B";
  if (marks >= 45) return "C";
  if (marks >= 40) return "P";
  return "F";
};

export interface PastSemester {
  id: number;
  creditsEarned: number;
  gpa: number;
}

export interface CurrentSubject {
  id: string;
  name: string;
  code: string;
  credits: number;
  currentMarks: number; // Marks achieved so far (out of e.g. 50 internal)
  predictedTotal: number; // User predicted total (out of 100)
}

export const MOCK_PAST_SEMESTERS: PastSemester[] = [
  { id: 1, creditsEarned: 22, gpa: 9.4 },
  { id: 2, creditsEarned: 24, gpa: 9.1 },
  { id: 3, creditsEarned: 23, gpa: 9.2 },
];

export const MOCK_CURRENT_SUBJECTS: CurrentSubject[] = [
  { id: "1", name: "Operating Systems", code: "CSE2001", credits: 4, currentMarks: 42, predictedTotal: 85 },
  { id: "2", name: "Database Mgt", code: "CSE2005", credits: 3, currentMarks: 38, predictedTotal: 78 },
  { id: "3", name: "Algorithms", code: "CSE2003", credits: 4, currentMarks: 45, predictedTotal: 92 },
  { id: "4", name: "Comp Arch", code: "CSE2004", credits: 3, currentMarks: 35, predictedTotal: 70 },
  { id: "5", name: "Tech English", code: "ENG1001", credits: 2, currentMarks: 48, predictedTotal: 95 },
];
