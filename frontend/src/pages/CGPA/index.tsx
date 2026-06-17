import { PageHeader } from "@/components/ui";

import { useCGPAEngine } from "./useCGPAEngine";
import { MOCK_PAST_SEMESTERS, MOCK_CURRENT_SUBJECTS } from "./mockData";

import { CGPASimulator } from "./CGPASimulator";
import { ScenarioCards } from "./ScenarioCards";
import { PredictionTable } from "./PredictionTable";
import { RequiredMarksEngine } from "./RequiredMarksEngine";
import { TrendChart } from "./TrendChart";
import { SemesterBreakdown } from "./SemesterBreakdown";
import { AIRecommendations } from "./AIRecommendations";

export default function CGPAPlanner() {
  const {
    pastSemesters,
    currentSubjects,
    targetCGPA,
    setTargetCGPA,
    updateSubjectPrediction,
    stats,
    scenarios,
  } = useCGPAEngine(MOCK_PAST_SEMESTERS, MOCK_CURRENT_SUBJECTS);

  return (
    <div className="animate-entry pb-12">
      <PageHeader 
        title="CGPA Planner" 
        subtitle="Simulate and predict your academic trajectory" 
      />

      <div className="space-y-6">
        <CGPASimulator 
          currentCGPA={stats.overallCGPA}
          targetCGPA={targetCGPA}
          setTargetCGPA={setTargetCGPA}
          bestCase={scenarios.bestCaseCGPA}
          worstCase={scenarios.worstCaseCGPA}
        />

        <ScenarioCards 
          bestCase={scenarios.bestCaseCGPA}
          worstCase={scenarios.worstCaseCGPA}
          overallCGPA={stats.overallCGPA}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <PredictionTable 
              subjects={currentSubjects}
              onUpdatePrediction={updateSubjectPrediction}
            />
            <TrendChart 
              pastSemesters={pastSemesters}
              currentPredictedCGPA={stats.overallCGPA}
            />
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <RequiredMarksEngine 
              subjects={currentSubjects}
              targetCGPA={targetCGPA}
              overallCGPA={stats.overallCGPA}
            />
            <AIRecommendations subjects={currentSubjects} />
            <SemesterBreakdown pastSemesters={pastSemesters} />
          </div>
        </div>
      </div>
    </div>
  );
}
