import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, BookOpen, Code2, Users, Target, AlertCircle } from "lucide-react";
import type { Subject } from "../types/subject";

interface AddSubjectFormProps {
  onAddSubject: (subject: Subject) => void;
}

function AddSubjectForm({ onAddSubject }: AddSubjectFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [attendedClasses, setAttendedClasses] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [targetAttendancePercentage, setTargetAttendancePercentage] =
    useState(75);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Subject name is required";
    if (!code.trim()) newErrors.code = "Subject code is required";
    if (totalClasses <= 0) newErrors.totalClasses = "Must be greater than 0";
    if (attendedClasses > totalClasses)
      newErrors.attendedClasses = "Cannot exceed total classes";
    if (targetAttendancePercentage < 0 || targetAttendancePercentage > 100)
      newErrors.target = "Must be between 0 and 100";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!validateForm()) return;

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
    setErrors({});
    setIsOpen(false);
  }

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="mb-2xl">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="btn-primary"
          >
            <Plus className="w-5 h-5" />
            Add Subject
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            key="form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card p-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-md bg-accent-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-accent-primary" />
              </div>
              <h3 className="text-heading-3 text-text-primary">
                Add New Subject
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name and Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-accent-primary" />
                      Subject Name
                    </div>
                  </label>
                  <input
                    type="text"
                    placeholder="Operating Systems"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    className={`input-base ${errors.name ? "border-error" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-error text-xs mt-2 flex items-center gap-xs">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="w-4 h-4 text-accent-primary" />
                      Subject Code
                    </div>
                  </label>
                  <input
                    type="text"
                    placeholder="CSE2001"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      if (errors.code) setErrors({ ...errors, code: "" });
                    }}
                    className={`input-base ${errors.code ? "border-error" : ""}`}
                  />
                  {errors.code && (
                    <p className="text-error text-xs mt-2 flex items-center gap-xs">
                      <AlertCircle className="w-3 h-3" />
                      {errors.code}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Classes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-accent-primary" />
                      Attended Classes
                    </div>
                  </label>
                  <input
                    type="number"
                    placeholder="32"
                    value={attendedClasses}
                    onChange={(e) => {
                      setAttendedClasses(Number(e.target.value));
                      if (errors.attendedClasses)
                        setErrors({ ...errors, attendedClasses: "" });
                    }}
                    className={`input-base ${
                      errors.attendedClasses ? "border-error" : ""
                    }`}
                    min="0"
                  />
                  {errors.attendedClasses && (
                    <p className="text-error text-xs mt-2 flex items-center gap-xs">
                      <AlertCircle className="w-3 h-3" />
                      {errors.attendedClasses}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-accent-primary" />
                      Total Classes
                    </div>
                  </label>
                  <input
                    type="number"
                    placeholder="40"
                    value={totalClasses}
                    onChange={(e) => {
                      setTotalClasses(Number(e.target.value));
                      if (errors.totalClasses)
                        setErrors({ ...errors, totalClasses: "" });
                    }}
                    className={`input-base ${
                      errors.totalClasses ? "border-error" : ""
                    }`}
                    min="0"
                  />
                  {errors.totalClasses && (
                    <p className="text-error text-xs mt-2 flex items-center gap-xs">
                      <AlertCircle className="w-3 h-3" />
                      {errors.totalClasses}
                    </p>
                  )}
                </div>
              </div>

              {/* Target Attendance */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-accent-primary" />
                    Target Attendance %
                  </div>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={targetAttendancePercentage}
                    onChange={(e) =>
                      setTargetAttendancePercentage(Number(e.target.value))
                    }
                    className="flex-1 h-2 bg-surface-interactive rounded-full cursor-pointer accent-accent-primary"
                  />
                  <div className="px-4 py-2 bg-surface-interactive rounded-md border border-border-primary min-w-fit">
                    <span className="font-bold text-text-primary">
                      {targetAttendancePercentage}%
                    </span>
                  </div>
                </div>
                {errors.target && (
                  <p className="text-error text-xs mt-2 flex items-center gap-xs">
                    <AlertCircle className="w-3 h-3" />
                    {errors.target}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-md pt-lg border-t border-border-primary">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  <Plus className="w-5 h-5" />
                  Add Subject
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setErrors({});
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddSubjectForm;