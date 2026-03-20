"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface GoalsStepProps {
  defaultGoals: string[];
  defaultChallenge: string;
  defaultCampaignMode: boolean;
  onContinue: (goals: string[], challenge: string, campaignMode: boolean) => void;
  onBack: () => void;
}

const GOALS = [
  {
    id: "social-ads",
    label: "Social media ads",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
    desc: "Scroll-stopping creatives for social",
  },
  {
    id: "email",
    label: "Email campaigns",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
    desc: "Beautiful emails that convert",
  },
  {
    id: "product-photos",
    label: "Product photos",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
    desc: "Studio-quality product shots",
  },
  {
    id: "brand-content",
    label: "Brand content",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    desc: "On-brand visuals for every channel",
  },
  {
    id: "landing-pages",
    label: "Landing page assets",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    desc: "High-converting page graphics",
  },
  {
    id: "video-ads",
    label: "Video ads",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
    desc: "Attention-grabbing video content",
  },
];

const CHALLENGES = [
  "Creating content fast enough",
  "Maintaining brand consistency",
  "Standing out from competitors",
  "Scaling across channels",
  "Reducing creative costs",
];

export function GoalsStep({
  defaultGoals,
  defaultChallenge,
  defaultCampaignMode,
  onContinue,
  onBack,
}: GoalsStepProps) {
  const [selected, setSelected] = useState<string[]>(defaultGoals);
  const [challenge, setChallenge] = useState(defaultChallenge);
  const [campaignMode, setCampaignMode] = useState(defaultCampaignMode);

  function toggleGoal(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  const canContinue = selected.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable form content */}
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-4">
        <motion.div
          className="w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
            What are you hoping to create with Holo?
          </h1>
          <p className="text-[#6E6E73] mb-8">Select all that apply</p>

          {/* Goal cards grid */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {GOALS.map((goal, i) => {
              const active = selected.includes(goal.id);
              return (
                <motion.button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex flex-col items-start gap-2 p-4 rounded-2xl border-2 text-left transition-colors cursor-pointer ${
                    active
                      ? "border-[#3E86C6] bg-[#3E86C6]/5"
                      : "border-[#E6E6E7] bg-white hover:border-[#6E6E73]/30"
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div
                    className={`transition-colors ${active ? "text-[#3E86C6]" : "text-[#6E6E73]"}`}
                  >
                    {goal.icon}
                  </div>
                  <span className="text-sm font-bold text-[#1D1D1F]">
                    {goal.label}
                  </span>
                  <span className="text-xs text-[#6E6E73]">{goal.desc}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Challenge pills */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-[#1D1D1F] mb-3">
              What&apos;s your biggest marketing challenge right now?
            </h2>
            <div className="flex flex-wrap gap-2">
              {CHALLENGES.map((c) => (
                <button
                  key={c}
                  onClick={() => setChallenge(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                    challenge === c
                      ? "border-[#3E86C6] bg-[#3E86C6]/5 text-[#3E86C6]"
                      : "border-[#E6E6E7] bg-white text-[#6E6E73] hover:border-[#6E6E73]/30"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Campaign mode toggle */}
          <motion.button
            onClick={() => setCampaignMode(!campaignMode)}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden cursor-pointer ${
              campaignMode
                ? "border-[#3E86C6]"
                : "border-[#E6E6E7] hover:border-[#6E6E73]/30"
            }`}
            whileTap={{ scale: 0.99 }}
          >
            {campaignMode && (
              <motion.div
                className="absolute inset-0 opacity-5"
                style={{ background: "var(--gradient-brand)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
              />
            )}
            <div className="relative flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  campaignMode ? "bg-[#3E86C6] text-white" : "bg-[#F7F7F7] text-[#6E6E73]"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1D1D1F]">
                    I want to launch a full campaign
                  </span>
                  {campaignMode && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-[#3E86C6] flex items-center justify-center"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </motion.span>
                  )}
                </div>
                <p className="text-sm text-[#6E6E73] mt-1">
                  Let Holo plan, create, and manage an entire ad campaign for you
                  — from strategy to creatives to launch.
                </p>
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Sticky bottom navigation */}
      <div className="shrink-0 border-t border-[#E6E6E7]/50 bg-[#FBFBFB] px-6 py-4">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-3 py-2 text-[#1D1D1F] font-medium rounded-full hover:bg-[#F7F7F7] transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
          <motion.button
            onClick={() => onContinue(selected, challenge, campaignMode)}
            disabled={!canContinue}
            className="px-8 h-12 rounded-full text-base font-bold cursor-pointer disabled:cursor-not-allowed transition-all"
            style={
              canContinue
                ? {
                    background: "var(--gradient-brand)",
                    color: "white",
                    boxShadow:
                      "0px 5px 10px rgba(230,230,231,0.25), inset -2px 2px 10px white",
                  }
                : {
                    background: "white",
                    color: "#E6E6E7",
                    border: "1px solid #E6E6E7",
                  }
            }
            whileHover={canContinue ? { scale: 1.02 } : {}}
            whileTap={canContinue ? { scale: 0.98 } : {}}
          >
            Continue
          </motion.button>
        </div>
      </div>
    </div>
  );
}
