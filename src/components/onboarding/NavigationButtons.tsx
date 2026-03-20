"use client";

interface NavigationButtonsProps {
  onBack?: () => void;
  onContinue?: () => void;
  onSkip?: () => void;
  canContinue?: boolean;
  showBack?: boolean;
  showSkip?: boolean;
  continueLabel?: string;
  skipLabel?: string;
}

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M7.5 15L12.5 10L7.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NavigationButtons({
  onBack,
  onContinue,
  onSkip,
  canContinue = true,
  showBack = false,
  showSkip = false,
  continueLabel = "Continue",
  skipLabel = "Skip",
}: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Left side: Back button */}
      <div className={showBack ? "" : "opacity-0 pointer-events-none"}>
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-3 py-[7px] rounded-full text-[#1D1D1F] text-base font-medium hover:bg-white/50 transition-colors cursor-pointer"
        >
          <ArrowLeft />
          Back
        </button>
      </div>

      {/* Right side: Skip + Continue */}
      <div className="flex items-center gap-2">
        {showSkip && (
          <button
            onClick={onSkip}
            className="flex items-center gap-1 px-3 py-[7px] rounded-full text-[#1D1D1F] text-base font-medium hover:bg-white/50 transition-colors cursor-pointer"
          >
            Try again
          </button>
        )}

        {canContinue ? (
          <button
            onClick={onContinue}
            className="flex items-center gap-1 px-3 py-[7.5px] rounded-full text-white text-base font-bold cursor-pointer transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(90deg, #3E86C6 0%, #A666AA 25%, #EC4492 50%, #EE4454 75%, #F05427 100%)",
              boxShadow:
                "0px 5px 10px 0px rgba(230, 230, 231, 0.25), inset -2px 2px 10px 0px white",
            }}
          >
            {showSkip ? skipLabel : continueLabel}
            <ArrowRight />
          </button>
        ) : (
          <div className="flex items-center gap-1 px-3 py-[7px] rounded-full border border-white bg-white text-holo-gray text-base font-medium">
            {continueLabel}
            <ArrowRight />
          </div>
        )}
      </div>
    </div>
  );
}
