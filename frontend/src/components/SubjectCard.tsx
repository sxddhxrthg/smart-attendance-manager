import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, AlertCircle, BookMarked } from "lucide-react";
import type { Subject } from "../types/subject";
import {
  calculateAttendance,
  classesNeededForTarget,
  classesCanBunk,
} from "../utils/attendance";

interface SubjectCardProps {
  subject: Subject;
}

function SubjectCard({ subject }: SubjectCardProps) {
  const attendancePercentage = calculateAttendance(
    subject.attendedClasses,
    subject.totalClasses
  );

  const neededClasses = classesNeededForTarget(
    subject.attendedClasses,
    subject.totalClasses,
    subject.targetAttendancePercentage
  );

  const bunkClasses = classesCanBunk(
    subject.attendedClasses,
    subject.totalClasses,
    subject.targetAttendancePercentage
  );

  const isOnTrack = attendancePercentage >= subject.targetAttendancePercentage;
  const isAboveTarget = attendancePercentage > subject.targetAttendancePercentage + 5;

  const progressColor = isAboveTarget
    ? "bg-success"
    : isOnTrack
      ? "bg-accent-primary"
      : "bg-warning";

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card group cursor-pointer overflow-hidden"
    >
      {/* Card Header */}
      <div className="px-6 py-6 border-b border-border-primary bg-gradient-to-r from-surface-interactive to-surface-base">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-heading-3 text-text-primary font-bold group-hover:text-accent-primary transition-colors">
              {subject.name}
            </h3>
            <p className="text-text-secondary text-sm mt-xs font-mono">
              {subject.code}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-md bg-accent-primary/10 rounded-lg"
          >
            <BookMarked className="w-5 h-5 text-accent-primary" />
          </motion.div>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 py-6 space-y-6">
        {/* Attendance Percentage */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-sm text-text-secondary">Attendance</span>
            <span className="text-2xl font-bold text-text-primary">
              {attendancePercentage.toFixed(1)}%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-surface-interactive rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(attendancePercentage, 100)}%` }}
              transition={{ duration: 0.8 }}
              className={`h-full ${progressColor} rounded-full shadow-glow`}
            />
          </div>
          <div className="flex items-center justify-between mt-md">
            <span className="text-xs text-text-tertiary">
              {subject.attendedClasses} / {subject.totalClasses} classes
            </span>
            <span className="text-xs text-text-secondary">
              Target: {subject.targetAttendancePercentage}%
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-md">
          {/* Classes Needed */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-md bg-surface-interactive rounded-md border border-border-primary hover:border-border-secondary transition-colors"
          >
            <div className="flex items-center gap-2 mb-xs">
              <TrendingUp className="w-4 h-4 text-accent-light" />
              <span className="text-xs text-text-secondary">To Reach Target</span>
            </div>
            <div className="text-lg font-bold text-text-primary">
              {neededClasses}
            </div>
            <span className="text-xs text-text-tertiary">classes</span>
          </motion.div>

          {/* Classes Can Bunk */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-md rounded-md border transition-colors ${
              bunkClasses > 0
                ? "bg-surface-interactive border-border-primary hover:border-border-secondary"
                : "bg-warning/10 border-warning/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-xs">
              <AlertCircle
                className={`w-4 h-4 ${
                  bunkClasses > 0 ? "text-success" : "text-warning"
                }`}
              />
              <span className="text-xs text-text-secondary">Can Skip</span>
            </div>
            <div className="text-lg font-bold text-text-primary">
              {bunkClasses}
            </div>
            <span className="text-xs text-text-tertiary">classes</span>
          </motion.div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-md pt-md border-t border-border-primary">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isAboveTarget ? (
              <CheckCircle2 className="w-5 h-5 text-success" />
            ) : isOnTrack ? (
              <CheckCircle2 className="w-5 h-5 text-accent-primary" />
            ) : (
              <AlertCircle className="w-5 h-5 text-warning" />
            )}
          </motion.div>
          <span className="text-sm text-text-secondary">
            {isAboveTarget
              ? "Above target 🎯"
              : isOnTrack
                ? "On track ✓"
                : "Needs attention"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default SubjectCard;