import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import { Target } from "lucide-react";

interface CGPASimulatorProps {
  currentCGPA: number;
  targetCGPA: number;
  setTargetCGPA: (val: number) => void;
  bestCase: number;
  worstCase: number;
}

export function CGPASimulator({ currentCGPA, targetCGPA, setTargetCGPA, bestCase, worstCase }: CGPASimulatorProps) {
  // SVG Circle variables
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentCGPA / 10) * circumference;

  return (
    <Card className="h-full flex flex-col md:flex-row items-center gap-8 relative overflow-hidden p-6 md:p-8 border-[var(--accent-primary)]/30">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)]/5 rounded-bl-full blur-3xl pointer-events-none" />

      {/* Animated Ring */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg width="160" height="160" className="-rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="var(--surface-interactive)"
            strokeWidth="12"
          />
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="url(#cgpaGradient)"
            strokeWidth="12"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="cgpaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-primary)" />
              <stop offset="100%" stopColor="var(--accent-secondary)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-2">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-3xl font-bold text-[var(--text-primary)]"
          >
            {currentCGPA.toFixed(2)}
          </motion.span>
          <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest mt-1">Expected</span>
        </div>
      </div>

      {/* Target Slider */}
      <div className="flex-1 w-full space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-[var(--accent-primary)]" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Target CGPA Simulator</h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Adjust the slider to see what marks you need to hit your goal.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-[var(--text-tertiary)]">Min: {worstCase.toFixed(2)}</span>
            <span className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">{targetCGPA.toFixed(2)}</span>
            <span className="text-sm font-medium text-[var(--accent-primary)]">Max: {bestCase.toFixed(2)}</span>
          </div>
          
          <div className="relative pt-2">
            <input
              type="range"
              min={worstCase}
              max={bestCase}
              step={0.01}
              value={targetCGPA}
              onChange={(e) => setTargetCGPA(parseFloat(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-[var(--surface-interactive)] cursor-pointer outline-none slider-thumb-premium"
              style={{
                background: `linear-gradient(to right, var(--accent-primary) ${((targetCGPA - worstCase) / (bestCase - worstCase)) * 100}%, var(--surface-interactive) ${((targetCGPA - worstCase) / (bestCase - worstCase)) * 100}%)`
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
