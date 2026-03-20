"use client";

import { useEffect } from "react";
import { HoloSpeechBubble } from "../HoloSpeechBubble";

interface AnalyzingBrandStepProps {
  onComplete: () => void;
  onError: () => void;
  /** Simulated delay in ms before auto-advancing */
  simulatedDelay?: number;
}

export function AnalyzingBrandStep({
  onComplete,
  onError,
  simulatedDelay = 3000,
}: AnalyzingBrandStepProps) {
  void onError;
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, simulatedDelay);
    return () => clearTimeout(timer);
  }, [onComplete, simulatedDelay]);

  return (
    <>
      {/* Top spacer */}
      <div />

      {/* Center content */}
      <HoloSpeechBubble
        message="Give me a moment to analyze your brand..."
        pose="standing"
        layout="centered"
      />

      {/* Bottom (disabled continue) */}
      <div className="flex items-center justify-end w-full">
        <div className="flex items-center gap-1 px-3 py-[7px] rounded-full border border-white bg-white text-holo-gray text-base font-medium">
          Continue
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
