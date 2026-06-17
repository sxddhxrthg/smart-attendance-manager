import { motion } from "framer-motion";
import { SectionCard } from "@/components/ui";
import { LineChart } from "lucide-react";
import type { PastSemester } from "./mockData";

export function TrendChart({ pastSemesters, currentPredictedCGPA }: { pastSemesters: PastSemester[], currentPredictedCGPA: number }) {
  // Combine past semesters with the current prediction to draw the full line
  const data = [...pastSemesters.map(s => s.gpa), currentPredictedCGPA];
  
  // Chart dimensions
  const width = 600;
  const height = 200;
  const paddingX = 40;
  const paddingY = 40;

  // Find min/max for scaling
  const minGPA = Math.min(...data) - 0.2; // Add padding to bottom
  const maxGPA = Math.max(...data) + 0.2; // Add padding to top
  const range = maxGPA - minGPA;

  // Calculate coordinates
  const points = data.map((gpa, i) => {
    const x = paddingX + (i * (width - 2 * paddingX)) / (data.length - 1);
    const y = height - paddingY - ((gpa - minGPA) / range) * (height - 2 * paddingY);
    return { x, y, gpa, isPredicted: i === data.length - 1 };
  });

  // Generate SVG path command
  const linePath = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    
    // Create a smooth cubic bezier curve
    const prev = points[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point.x},${point.y}`;
  }, "");

  return (
    <SectionCard title="Performance Trend" icon={<LineChart className="w-4 h-4 text-[var(--accent-primary)]" />} className="h-full">
      <div className="relative w-full aspect-[2.5/1] mt-4 flex items-center justify-center overflow-visible">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Grid lines */}
          {[0, 0.5, 1].map((ratio) => {
            const y = paddingY + ratio * (height - 2 * paddingY);
            const value = maxGPA - ratio * range;
            return (
              <g key={ratio}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="var(--border-primary)" strokeDasharray="4 4" />
                <text x={paddingX - 10} y={y + 4} textAnchor="end" fontSize="12" fill="var(--text-tertiary)" fontFamily="monospace">
                  {value.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* The main curve */}
          <motion.path
            d={linePath}
            fill="transparent"
            stroke="var(--accent-primary)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Data Points */}
          {points.map((point, i) => (
            <g key={i}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={5}
                fill={point.isPredicted ? "var(--surface-base)" : "var(--accent-primary)"}
                stroke="var(--accent-primary)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 + i * 0.1, type: "spring" }}
              />
              <motion.text
                x={point.x}
                y={point.y - 15}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill={point.isPredicted ? "var(--accent-primary)" : "var(--text-primary)"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1 }}
              >
                {point.gpa.toFixed(2)}
              </motion.text>
              <text
                x={point.x}
                y={height - 15}
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-secondary)"
              >
                {point.isPredicted ? "Current" : `Sem ${i + 1}`}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </SectionCard>
  );
}
