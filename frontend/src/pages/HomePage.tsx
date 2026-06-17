import { useState } from "react";
import AddSubjectForm from "../components/AddSubjectForm";
import SubjectCard from "../components/SubjectCard";
import type { Subject } from "../types/subject";

function HomePage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: crypto.randomUUID(),
      code: "CSE2001",
      name: "Operating Systems",
      attendedClasses: 32,
      totalClasses: 40,
      targetAttendancePercentage: 75,
    },
    {
      id: crypto.randomUUID(),
      code: "CSE2005",
      name: "DBMS",
      attendedClasses: 15,
      totalClasses: 20,
      targetAttendancePercentage: 75,
    },
  ]);

  function addSubject(subject: Subject) {
    setSubjects((prev) => [...prev, subject]);
  }

  return (
    <>
      <h1>Smart Attendance Manager</h1>

      <AddSubjectForm onAddSubject={addSubject} />

      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
        />
      ))}
    </>
  );
}

export default HomePage;