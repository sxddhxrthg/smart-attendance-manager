import AddSubjectForm from "../components/AddSubjectForm";
import SubjectCard from "../components/SubjectCard";

function HomePage() {
  return (
    <>
      <h1>Smart Attendance Manager</h1>

      <AddSubjectForm />

      <SubjectCard />
    </>
  );
}

export default HomePage;