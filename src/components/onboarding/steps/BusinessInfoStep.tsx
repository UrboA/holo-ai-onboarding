"use client";

import { useState } from "react";
import { HoloSpeechBubble } from "../HoloSpeechBubble";
import { NavigationButtons } from "../NavigationButtons";
import { ProgressBar } from "../ProgressBar";

interface BusinessInfoStepProps {
  onContinue: (data: {
    businessName: string;
    industry: string;
    productType: string;
  }) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  defaultValue?: { businessName: string; industry: string; productType: string };
}

const industries = [
  "Technology",
  "E-commerce",
  "Healthcare",
  "Education",
  "Finance",
  "Real Estate",
  "Food & Beverage",
  "Fashion",
  "Travel",
  "Entertainment",
  "Other",
];

const productTypes = [
  "Physical products",
  "Digital products",
  "Services",
  "SaaS",
  "Subscriptions",
  "Courses",
  "Consulting",
  "Other",
];

function ChevronDown() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="text-holo-dark-gray shrink-0"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BusinessInfoStep({
  onContinue,
  onBack,
  currentStep,
  totalSteps,
  defaultValue,
}: BusinessInfoStepProps) {
  const [businessName, setBusinessName] = useState(
    defaultValue?.businessName ?? ""
  );
  const [industry, setIndustry] = useState(defaultValue?.industry ?? "");
  const [productType, setProductType] = useState(
    defaultValue?.productType ?? ""
  );

  const canProceed =
    businessName.trim().length > 0 &&
    industry.length > 0 &&
    productType.length > 0;

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
          message={"What's your business called,\nand what industry are you in?"}
          pose="side"
          boldWords={["business called", "industry"]}
          layout="left-aligned"
        />

        {/* Three inputs in a row */}
        <div className="flex gap-5 w-full max-w-[554px]">
          <div className="flex-1">
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Business name"
              className="w-full bg-white border border-holo-gray rounded-[20px] p-2.5 text-base font-medium text-[#1D1D1F] placeholder:text-holo-dark-gray outline-none leading-6"
            />
          </div>

          <div className="flex-1 relative">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-white border border-holo-gray rounded-[20px] p-2.5 pr-8 text-base font-medium text-[#1D1D1F] outline-none appearance-none leading-6 cursor-pointer"
              style={{ color: industry ? "#1D1D1F" : "#6E6E73" }}
            >
              <option value="" disabled>
                Industry
              </option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown />
            </div>
          </div>

          <div className="flex-1 relative">
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full bg-white border border-holo-gray rounded-[20px] p-2.5 pr-8 text-base font-medium text-[#1D1D1F] outline-none appearance-none leading-6 cursor-pointer"
              style={{ color: productType ? "#1D1D1F" : "#6E6E73" }}
            >
              <option value="" disabled>
                What you sell
              </option>
              {productTypes.map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <NavigationButtons
        onBack={onBack}
        onContinue={() => onContinue({ businessName, industry, productType })}
        canContinue={canProceed}
        showBack
      />
    </>
  );
}
