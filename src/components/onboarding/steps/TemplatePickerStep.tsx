"use client";

import { useState } from "react";
import { HoloSpeechBubble } from "../HoloSpeechBubble";
import { NavigationButtons } from "../NavigationButtons";
import { ProgressBar } from "../ProgressBar";

interface TemplatePickerStepProps {
  onContinue: (data: { templates: string[] }) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  defaultValue?: string[];
}

const CATEGORIES = [
  "Automotive",
  "Home & Garden",
  "Supplements",
  "Toys",
  "Clothing",
  "Gym & Accessories",
  "Beauty",
  "Electronics",
  "Food & Drink",
];

const TEMPLATES = Array.from({ length: 15 }, (_, i) => ({
  id: `template-${i}`,
  name: i === 0 ? "Let AI Choose for me" : `Template ${i}`,
  isAiPick: i === 0,
}));

export function TemplatePickerStep({
  onContinue,
  onBack,
  currentStep,
  totalSteps,
  defaultValue = [],
}: TemplatePickerStepProps) {
  const [selected, setSelected] = useState<string[]>(defaultValue);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  function toggleTemplate(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((t) => t !== id);
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  }

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
      <div className="flex flex-col gap-4 items-center flex-1 overflow-hidden w-full">
        <HoloSpeechBubble
          message={
            "Great! Please pick up to 5 templates you like the most,\nand I'll recreate them in your brand's style & voice!"
          }
          pose="side"
          boldWords={["pick up to 5 templates"]}
          layout="left-aligned"
        />

        {/* Category pills */}
        <div className="flex items-center gap-2 w-full max-w-[800px] overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border cursor-pointer transition-all ${
                activeCategory === cat
                  ? "border-[#1D1D1F] bg-white text-[#1D1D1F]"
                  : "border-holo-gray bg-white text-holo-dark-gray hover:border-holo-dark-gray"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template grid */}
        <div className="w-full max-w-[800px] overflow-y-auto flex-1">
          <div className="grid grid-cols-5 gap-4">
            {TEMPLATES.map((tmpl) => {
              const isSelected = selected.includes(tmpl.id);
              return (
                <button
                  key={tmpl.id}
                  onClick={() => toggleTemplate(tmpl.id)}
                  className={`aspect-[3/4] rounded-[20px] border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-holo-blue bg-white shadow-sm"
                      : "border-holo-gray bg-holo-off-white hover:border-holo-dark-gray"
                  }`}
                >
                  {tmpl.isAiPick && (
                    <>
                      <span className="text-2xl">🤖</span>
                      <span className="text-xs font-medium text-[#1D1D1F] text-center px-2 leading-tight">
                        Let AI Choose
                        <br />
                        for me
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <NavigationButtons
        onBack={onBack}
        onContinue={() => onContinue({ templates: selected })}
        canContinue={selected.length > 0}
        showBack
      />
    </>
  );
}
