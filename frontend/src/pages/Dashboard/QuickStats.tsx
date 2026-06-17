import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import { TrendingUp, Target, FileText, CalendarClock } from "lucide-react";
import type { UserData } from "./mockData";

export function QuickStats({ user }: { user: UserData }) {
  const stats = [
    {
      label: "Current CGPA",
      value: user.currentCgpa.toFixed(2),
      icon: TrendingUp,
      color: "var(--accent-primary)",
      trend: "+0.14 this sem",
    },
    {
      label: "Overall Attendance",
      value: `${user.attendancePercentage}%`,
      icon: Target,
      color: "var(--success)",
      trend: "Above 75% target",
    },
    {
      label: "Marks Published",
      value: user.marksPublished,
      icon: FileText,
      color: "var(--warning)",
      trend: "2 new this week",
    },
    {
      label: "Classes Today",
      value: user.upcomingClasses,
      icon: CalendarClock,
      color: "var(--accent-secondary)",
      trend: "Next in 45 mins",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div key={i} variants={item}>
            <Card className="h-full group hover:border-[var(--border-secondary)] transition-colors duration-300">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-[var(--surface-interactive)] group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-medium text-[var(--text-secondary)] mt-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-2">
                    {stat.trend}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
