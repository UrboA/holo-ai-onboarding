"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="w-full h-[15px] rounded-full border border-white overflow-hidden relative">
      {/* Inactive track with faded gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(62,134,198,0.1) 0%, rgba(166,102,170,0.1) 25%, rgba(236,68,146,0.1) 50%, rgba(238,68,84,0.1) 75%, rgba(240,84,39,0.1) 100%)",
        }}
      />
      {/* Active fill */}
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, #3E86C6 0%, #A666AA 25%, #EC4492 50%, #EE4454 75%, #F05427 100%)",
          boxShadow:
            "inset -2px 2px 5px 0px white, inset 1px -1px 5px 0px white",
        }}
      />
    </div>
  );
}
