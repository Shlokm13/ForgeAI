"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const STEPS = [
  "Retrieving repository context",
  "Expanding cross-file semantic evidence",
  "Evaluating retrieved context",
  "Generating grounded technical analysis",
];

// Purely a generic loading visualization for perceived progress.
// It has no connection to real backend/LangGraph state.
export default function AnalysisLoading() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 420);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center flex-1 p-8">
      <div className="w-full max-w-sm">
        <p className="text-[10px] font-medium tracking-widest text-forge-purpleLight uppercase mb-5 text-center">
          Analyzing Repository
        </p>

        <div className="h-[3px] w-full bg-panel-elevated rounded-full overflow-hidden mb-6">
          <div
            className="h-full transition-all duration-500 ease-out rounded-full bg-forge-purple"
            style={{
              width: `${((activeIndex + 1) / STEPS.length) * 100}%`,
            }}
          />
        </div>

        <ul className="space-y-3">
          {STEPS.map((step, index) => {
            const isComplete = index < activeIndex;
            const isCurrent = index === activeIndex;
            return (
              <li key={step} className="flex items-center gap-3">
                <span
                  className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 ${
                    isComplete
                      ? "bg-evidence-source/15 text-evidence-source"
                      : isCurrent
                      ? "bg-forge-purple/15 text-forge-purpleLight"
                      : "bg-panel-elevated text-text-muted"
                  }`}
                >
                  {isComplete ? (
                    <Check size={10} strokeWidth={3} />
                  ) : (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isCurrent ? "bg-forge-purpleLight" : "bg-text-muted"
                      }`}
                    />
                  )}
                </span>
                <span
                  className={`text-[13px] ${
                    isCurrent
                      ? "text-text-primary"
                      : isComplete
                      ? "text-text-secondary"
                      : "text-text-muted"
                  }`}
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
