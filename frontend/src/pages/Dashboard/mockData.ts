export interface UserData {
  name: string;
  registrationNumber: string;
  currentCgpa: number;
  attendancePercentage: number;
  marksPublished: number;
  upcomingClasses: number;
}

export interface ClassSchedule {
  id: string;
  subject: string;
  code: string;
  faculty: string;
  room: string;
  startTime: string;
  endTime: string;
  type: "Theory" | "Lab";
}

export interface QuickAccessLink {
  id: string;
  title: string;
  url: string;
  icon: string;
}

export interface AIInsight {
  id: string;
  type: "warning" | "recommendation" | "positive";
  message: string;
  actionText?: string;
}

export interface RecentMark {
  id: string;
  subject: string;
  type: "CT 1" | "CT 2" | "Assignment" | "Lab";
  score: number;
  maxScore: number;
  date: string;
}

export interface AcademicEvent {
  id: string;
  title: string;
  date: string;
  type: "exam" | "holiday" | "deadline" | "event";
  daysLeft: number;
}

export const MOCK_USER: UserData = {
  name: "Siddharth Ganesh",
  registrationNumber: "RA2211013010000",
  currentCgpa: 9.24,
  attendancePercentage: 86.5,
  marksPublished: 12,
  upcomingClasses: 3,
};

export const MOCK_SCHEDULE: ClassSchedule[] = [
  {
    id: "1",
    subject: "Operating Systems",
    code: "CSE2001",
    faculty: "Dr. Smitha",
    room: "TP101",
    startTime: "08:00",
    endTime: "08:50",
    type: "Theory",
  },
  {
    id: "2",
    subject: "Database Management Systems",
    code: "CSE2005",
    faculty: "Prof. Kumar",
    room: "TP102",
    startTime: "09:50",
    endTime: "11:30",
    type: "Lab",
  },
  {
    id: "3",
    subject: "Design and Analysis of Algorithms",
    code: "CSE2003",
    faculty: "Dr. Priya",
    room: "TP105",
    startTime: "13:30",
    endTime: "14:20",
    type: "Theory",
  },
];

export const MOCK_QUICK_ACCESS: QuickAccessLink[] = [
  { id: "1", title: "SRM Academia", url: "https://academia.srmist.edu.in/", icon: "GraduationCap" },
  { id: "2", title: "Student Portal", url: "https://sp.srmist.edu.in/", icon: "UserCircle" },
  { id: "3", title: "SRM WiFi Login", url: "https://iach.srmist.edu.in/", icon: "Wifi" },
  { id: "4", title: "Gmail", url: "https://mail.google.com/", icon: "Mail" },
  { id: "5", title: "Google Classroom", url: "https://classroom.google.com/", icon: "BookOpen" },
];

export const MOCK_INSIGHTS: AIInsight[] = [
  {
    id: "1",
    type: "warning",
    message: "Your attendance in Operating Systems has dropped below 75%.",
    actionText: "View Details",
  },
  {
    id: "2",
    type: "positive",
    message: "Great job! You scored highest in the recent DBMS CT-2 exam.",
  },
  {
    id: "3",
    type: "recommendation",
    message: "You have 3 assignments due next week. Start planning now.",
    actionText: "View Planner",
  },
];

export const MOCK_RECENT_MARKS: RecentMark[] = [
  { id: "1", subject: "DBMS", type: "CT 2", score: 45, maxScore: 50, date: "2023-10-15" },
  { id: "2", subject: "Operating Systems", type: "Assignment", score: 10, maxScore: 10, date: "2023-10-12" },
  { id: "3", subject: "DAA", type: "CT 1", score: 38, maxScore: 50, date: "2023-10-05" },
];

export const MOCK_ACADEMIC_CALENDAR: AcademicEvent[] = [
  { id: "1", title: "Diwali Holidays", date: "Oct 23 - Oct 25", type: "holiday", daysLeft: 5 },
  { id: "2", title: "End Semester Exams Start", date: "Nov 15", type: "exam", daysLeft: 28 },
  { id: "3", title: "DBMS Project Submission", date: "Nov 01", type: "deadline", daysLeft: 14 },
  { id: "4", title: "Tech Fest 2023", date: "Nov 05", type: "event", daysLeft: 18 },
];

// Helper to generate 90 days of heatmap data
export const generateHeatmapData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    
    // Skip weekends mostly
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    let status: "present" | "absent" | "holiday" | "none" = "none";
    
    if (isWeekend) {
      status = "none";
    } else {
      const rand = Math.random();
      if (rand > 0.85) status = "absent";
      else if (rand > 0.1) status = "present";
      else status = "holiday";
    }
    
    data.push({
      date: d.toISOString().split("T")[0],
      status,
      classesAttended: status === "present" ? Math.floor(Math.random() * 4) + 1 : 0,
      totalClasses: status === "present" || status === "absent" ? Math.floor(Math.random() * 2) + 3 : 0,
    });
  }
  
  return data;
};

export const MOCK_HEATMAP_DATA = generateHeatmapData();
