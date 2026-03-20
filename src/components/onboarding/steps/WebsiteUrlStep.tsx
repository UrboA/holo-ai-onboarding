"use client";

import { useState } from "react";
import { HoloSpeechBubble } from "../HoloSpeechBubble";
import { NavigationButtons } from "../NavigationButtons";
import { ProgressBar } from "../ProgressBar";

interface WebsiteUrlStepProps {
  onContinue: (data: { websiteUrl: string }) => void;
  onBack: () => void;
  onSkipWebsite?: () => void;
  currentStep: number;
  totalSteps: number;
  defaultValue?: string;
}

export function WebsiteUrlStep({
  onContinue,
  onBack,
  onSkipWebsite,
  currentStep,
  totalSteps,
  defaultValue = "",
}: WebsiteUrlStepProps) {
  const [url, setUrl] = useState(defaultValue);

  return (
    <>
      {/* Progress bar */}
      <div className="w-full max-w-[800px] flex items-center gap-2.5">
        <button
          onClick={onBack}
          className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#1D1D1F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Center content */}
      <div className="flex flex-col gap-5 items-center">
        <HoloSpeechBubble
          message={"What's your website URL?\n(double-check for typos)"}
          pose="side"
          boldWords={["website URL"]}
          layout="left-aligned"
        />

        {/* URL Input */}
        <div className="w-[554px] bg-white border border-holo-gray rounded-[20px] flex items-center gap-[5px] p-2.5 overflow-hidden">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="shrink-0 text-holo-dark-gray"
          >
            <circle
              cx="9"
              cy="9"
              r="6"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M14 14L17 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="www.tryholo.ai"
            className="flex-1 text-base font-medium text-[#1D1D1F] placeholder:text-holo-dark-gray outline-none bg-transparent leading-6"
          />
        </div>

        {/* "Don't have website?" link */}
        {onSkipWebsite && (
          <button
            onClick={onSkipWebsite}
            className="text-holo-dark-gray text-sm font-medium hover:underline cursor-pointer"
          >
            Don&apos;t have website?
          </button>
        )}
      </div>

      {/* Bottom nav */}
      <NavigationButtons
        onBack={onBack}
        onContinue={() => onContinue({ websiteUrl: url })}
        canContinue={url.length > 0}
        showBack
      />
    </>
  );
}
