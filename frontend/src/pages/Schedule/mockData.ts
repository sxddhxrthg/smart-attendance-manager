export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

export interface ScheduledClass {
  id: string;
  subject: string;
  code: string;
  faculty: string;
  room: string;
  startTime: string; // HH:mm format (24-hour)
  endTime: string;   // HH:mm format (24-hour)
  type: "Theory" | "Lab" | "Project";
  color?: string; // Optional custom color mapping for subjects
}

export type WeeklySchedule = Record<DayOfWeek, ScheduledClass[]>;

const SUBJECT_COLORS = {
  CSE2001: "var(--accent-primary)",
  CSE2005: "var(--success)",
  CSE2003: "var(--warning)",
  CSE2004: "#ec4899", // Pink
  ENG1001: "#a855f7", // Purple
};

export const MOCK_WEEKLY_SCHEDULE: WeeklySchedule = {
  Monday: [
    {
      id: "m1",
      subject: "Operating Systems",
      code: "CSE2001",
      faculty: "Dr. Smitha",
      room: "TP101",
      startTime: "08:00",
      endTime: "08:50",
      type: "Theory",
      color: SUBJECT_COLORS.CSE2001,
    },
    {
      id: "m2",
      subject: "Database Management Systems",
      code: "CSE2005",
      faculty: "Prof. Kumar",
      room: "TP102",
      startTime: "09:50",
      endTime: "11:30",
      type: "Lab",
      color: SUBJECT_COLORS.CSE2005,
    },
    {
      id: "m3",
      subject: "Design and Analysis of Algorithms",
      code: "CSE2003",
      faculty: "Dr. Priya",
      room: "TP105",
      startTime: "13:30",
      endTime: "14:20",
      type: "Theory",
      color: SUBJECT_COLORS.CSE2003,
    },
  ],
  Tuesday: [
    {
      id: "t1",
      subject: "Computer Architecture",
      code: "CSE2004",
      faculty: "Dr. Ramesh",
      room: "TP201",
      startTime: "08:50",
      endTime: "10:30",
      type: "Theory",
      color: SUBJECT_COLORS.CSE2004,
    },
    {
      id: "t2",
      subject: "Technical English",
      code: "ENG1001",
      faculty: "Prof. Anita",
      room: "TP304",
      startTime: "11:35",
      endTime: "12:25",
      type: "Theory",
      color: SUBJECT_COLORS.ENG1001,
    },
  ],
  Wednesday: [
    {
      id: "w1",
      subject: "Design and Analysis of Algorithms",
      code: "CSE2003",
      faculty: "Dr. Priya",
      room: "TP105",
      startTime: "08:00",
      endTime: "08:50",
      type: "Theory",
      color: SUBJECT_COLORS.CSE2003,
    },
    {
      id: "w2",
      subject: "Operating Systems",
      code: "CSE2001",
      faculty: "Dr. Smitha",
      room: "TP101",
      startTime: "09:50",
      endTime: "10:40",
      type: "Theory",
      color: SUBJECT_COLORS.CSE2001,
    },
    {
      id: "w3",
      subject: "Database Management Systems",
      code: "CSE2005",
      faculty: "Prof. Kumar",
      room: "TP102",
      startTime: "13:30",
      endTime: "15:10",
      type: "Theory",
      color: SUBJECT_COLORS.CSE2005,
    },
  ],
  Thursday: [
    {
      id: "th1",
      subject: "Operating Systems Lab",
      code: "CSE2001",
      faculty: "Dr. Smitha",
      room: "Lab 4",
      startTime: "08:50",
      endTime: "10:30",
      type: "Lab",
      color: SUBJECT_COLORS.CSE2001,
    },
    {
      id: "th2",
      subject: "Technical English",
      code: "ENG1001",
      faculty: "Prof. Anita",
      room: "TP304",
      startTime: "14:25",
      endTime: "15:15",
      type: "Theory",
      color: SUBJECT_COLORS.ENG1001,
    },
  ],
  Friday: [
    {
      id: "f1",
      subject: "Computer Architecture",
      code: "CSE2004",
      faculty: "Dr. Ramesh",
      room: "TP201",
      startTime: "08:00",
      endTime: "08:50",
      type: "Theory",
      color: SUBJECT_COLORS.CSE2004,
    },
    {
      id: "f2",
      subject: "Algorithms Lab",
      code: "CSE2003",
      faculty: "Dr. Priya",
      room: "Lab 2",
      startTime: "09:50",
      endTime: "11:30",
      type: "Lab",
      color: SUBJECT_COLORS.CSE2003,
    },
  ],
};
