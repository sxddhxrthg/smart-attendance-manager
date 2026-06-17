import { useState } from "react";
import type { Subject } from "../types/subject";

interface AddSubjectFormProps {
  onAddSubject: (subject: Subject) => void;
}

function AddSubjectForm({ onAddSubject }: AddSubjectFormProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [attendedClasses, setAttendedClasses] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [targetAttendancePercentage, setTargetAttendancePercentage] =
    useState(75);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newSubject: Subject = {
      id: crypto.randomUUID(),
      name,
      code,
      attendedClasses,
      totalClasses,
      targetAttendancePercentage,
    };

    onAddSubject(newSubject);

    setName("");
    setCode("");
    setAttendedClasses(0);
    setTotalClasses(0);
    setTargetAttendancePercentage(75);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Subject Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Subject Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <input
        type="number"
        placeholder="Attended Classes"
        value={attendedClasses}
        onChange={(e) => setAttendedClasses(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Total Classes"
        value={totalClasses}
        onChange={(e) => setTotalClasses(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Target %"
        value={targetAttendancePercentage}
        onChange={(e) =>
          setTargetAttendancePercentage(Number(e.target.value))
        }
      />

      <button type="submit">
        Add Subject
      </button>
    </form>
  );
}

export default AddSubjectForm;