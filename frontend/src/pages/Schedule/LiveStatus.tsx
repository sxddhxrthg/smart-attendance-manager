import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, Badge } from "@/components/ui";
import { Clock, MapPin, AlertCircle } from "lucide-react";
import type { ScheduledClass, DayOfWeek } from "./mockData";

// Helper to convert "HH:mm" to minutes since midnight
const timeToMins = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function LiveStatus({ schedule, todayStr }: { schedule: ScheduledClass[], todayStr: DayOfWeek }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulate a live ticking clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // For testing purposes, let's pretend the time is between the first and second class if today is Monday
  // Normally, we'd use: const currentMins = currentTime.getHours() * 60 + currentTime.getMinutes();
  // To ensure the mock UI looks good, we'll force a "mock" current time if it's outside class hours on Monday.
  const realMins = currentTime.getHours() * 60 + currentTime.getMinutes();
  let currentMins = realMins;
  
  if (todayStr === "Monday" && (realMins < timeToMins("08:00") || realMins > timeToMins("14:20"))) {
    currentMins = timeToMins("08:25"); // Force it to be in the middle of the first class
  }

  // Find current and next classes
  let currentClass: ScheduledClass | null = null;
  let nextClass: ScheduledClass | null = null;

  for (const cls of schedule) {
    const startMins = timeToMins(cls.startTime);
    const endMins = timeToMins(cls.endTime);

    if (currentMins >= startMins && currentMins < endMins) {
      currentClass = cls;
    } else if (startMins > currentMins && !nextClass) {
      nextClass = cls;
    }
  }

  // Formatting helpers
  const formatTimeRemaining = (targetMins: number) => {
    const diff = targetMins - currentMins;
    const hrs = Math.floor(diff / 60);
    const mins = Math.floor(diff % 60);
    const secs = 60 - currentTime.getSeconds();
    
    if (hrs > 0) return `${hrs}h ${mins}m left`;
    return `${mins}m ${secs}s left`;
  };

  return (
    <Card variant="elevated" className="overflow-hidden border-[var(--accent-primary)]/30 relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)]/10 rounded-bl-full blur-2xl pointer-events-none" />
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {currentClass ? (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)] animate-pulse shadow-[0_0_8px_var(--success)]" />
                <span className="text-sm font-bold text-[var(--success)] uppercase tracking-wider">Ongoing Class</span>
              </>
            ) : nextClass ? (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--warning)] animate-pulse shadow-[0_0_8px_var(--warning)]" />
                <span className="text-sm font-bold text-[var(--warning)] uppercase tracking-wider">Up Next</span>
              </>
            ) : (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-tertiary)]" />
                <span className="text-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Classes Over</span>
              </>
            )}
          </div>
          <span className="text-xs font-mono text-[var(--text-secondary)]">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        {currentClass ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1">
                {currentClass.subject}
              </h2>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <span className="font-mono bg-[var(--surface-interactive)] px-1.5 py-0.5 rounded text-[var(--text-primary)]">
                  {currentClass.code}
                </span>
                <span>•</span>
                <span>{currentClass.faculty}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[var(--border-primary)]">
              <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                <div className="p-2 rounded-lg bg-[var(--surface-interactive)]">
                  <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">Time</p>
                  <p className="font-medium">{currentClass.startTime} - {currentClass.endTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                <div className="p-2 rounded-lg bg-[var(--surface-interactive)]">
                  <MapPin className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">Room</p>
                  <p className="font-medium">{currentClass.room}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-[var(--text-secondary)]">Progress</span>
                <span className="text-[var(--accent-primary)] font-mono">
                  {formatTimeRemaining(timeToMins(currentClass.endTime))}
                </span>
              </div>
              <div className="w-full h-2.5 bg-[var(--surface-interactive)] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[var(--accent-primary)] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${((currentMins - timeToMins(currentClass.startTime)) / (timeToMins(currentClass.endTime) - timeToMins(currentClass.startTime))) * 100}%` 
                  }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        ) : nextClass ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="p-4 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/5">
              <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-2">
                {nextClass.subject}
              </h2>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Clock className="w-4 h-4 text-[var(--warning)]" />
                  <span>{nextClass.startTime} in {nextClass.room}</span>
                </div>
                <Badge variant="warning">
                  Starts in {Math.floor((timeToMins(nextClass.startTime) - currentMins) / 60)}h {Math.floor((timeToMins(nextClass.startTime) - currentMins) % 60)}m
                </Badge>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
            <div className="inline-flex p-3 rounded-full bg-[var(--success)]/10 mb-3">
              <AlertCircle className="w-6 h-6 text-[var(--success)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">You're all done for today!</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Enjoy your free time.</p>
          </motion.div>
        )}
      </div>
    </Card>
  );
}
