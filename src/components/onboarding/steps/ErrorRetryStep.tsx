"use client";

import { HoloSpeechBubble } from "../HoloSpeechBubble";

interface ErrorRetryStepProps {
  onRetry: () => void;
  onSkip: () => void;
  message?: string;
}

export function ErrorRetryStep({
  onRetry,
  onSkip,
  message = "Sorry, didn't manage to get your info...",
}: ErrorRetryStepProps) {
  return (
    <>
      {/* Top spacer */}
      <div />

      {/* Center content */}
      <HoloSpeechBubble
        message={message}
        pose="sad"
        layout="centered"
      />

      {/* Bottom nav: Try again + Skip */}
      <div className="flex items-center justify-end w-full gap-2">
        <button
          onClick={onRetry}
          className="flex items-center gap-1 px-3 py-[7px] rounded-full text-[#1D1D1F] text-base font-medium hover:bg-white/50 transition-colors cursor-pointer"
        >
          Try again
        </button>
        <button
          onClick={onSkip}
          className="flex items-center gap-1 px-3 py-[7.5px] rounded-full text-white text-base font-bold cursor-pointer transition-opacity hover:opacity-90"
          style={{
            background:
              "linear-gradient(90deg, #3E86C6 0%, #A666AA 25%, #EC4492 50%, #EE4454 75%, #F05427 100%)",
            boxShadow:
              "0px 5px 10px 0px rgba(230, 230, 231, 0.25), inset -2px 2px 10px 0px white",
          }}
        >
          Skip
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
