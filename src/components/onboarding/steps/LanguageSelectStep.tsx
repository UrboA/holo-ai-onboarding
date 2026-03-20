"use client";

import { useState } from "react";
import { HoloSpeechBubble } from "../HoloSpeechBubble";
import { NavigationButtons } from "../NavigationButtons";
import { ProgressBar } from "../ProgressBar";

interface LanguageSelectStepProps {
  onContinue: (data: { languages: string[] }) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  defaultValue?: string[];
}

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "he", name: "עברית", flag: "🇮🇱" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
];

export function LanguageSelectStep({
  onContinue,
  onBack,
  currentStep,
  totalSteps,
  defaultValue = [],
}: LanguageSelectStepProps) {
  const [selected, setSelected] = useState<string[]>(defaultValue);

  function toggleLanguage(code: string) {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
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
      <div className="flex flex-col gap-5 items-center flex-1 overflow-hidden">
        <HoloSpeechBubble
          message={"What language should I use\nwhen creating content?"}
          pose="side"
          boldWords={["language"]}
          layout="left-aligned"
        />

        {/* Language grid */}
        <div className="w-full max-w-[800px] overflow-y-auto flex-1">
          <div className="grid grid-cols-6 gap-5">
            {LANGUAGES.map((lang) => {
              const isSelected = selected.includes(lang.code);
              return (
                <button
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-[20px] border cursor-pointer transition-all ${
                    isSelected
                      ? "border-holo-blue bg-white shadow-sm"
                      : "border-holo-gray bg-white hover:border-holo-dark-gray"
                  }`}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <span className="text-sm font-medium text-[#1D1D1F] truncate w-full text-center">
                    {lang.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <NavigationButtons
        onBack={onBack}
        onContinue={() => onContinue({ languages: selected })}
        canContinue={selected.length > 0}
        showBack
      />
    </>
  );
}
