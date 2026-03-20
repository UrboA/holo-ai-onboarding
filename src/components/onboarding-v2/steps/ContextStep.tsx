"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContextStepProps {
  campaignMode: boolean;
  defaults: {
    targetAudience: string;
    platforms: string[];
    contentVolume: string;
    campaignObjective: string;
    adBudget: string;
    campaignTimeline: string;
  };
  onContinue: (d: {
    targetAudience: string;
    platforms: string[];
    contentVolume: string;
    campaignObjective: string;
    adBudget: string;
    campaignTimeline: string;
  }) => void;
  onBack: () => void;
}

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "facebook", label: "Facebook", icon: "📘" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
  { id: "linkedin", label: "LinkedIn", icon: "💼" },
  { id: "google", label: "Google Ads", icon: "🔍" },
  { id: "email", label: "Email", icon: "✉️" },
  { id: "twitter", label: "X / Twitter", icon: "𝕏" },
];

const VOLUMES = ["Just starting", "10-50 pieces", "50-200 pieces", "200+"];

const OBJECTIVES = [
  { id: "awareness", label: "Brand awareness", icon: "👁️" },
  { id: "traffic", label: "Drive traffic", icon: "🔗" },
  { id: "leads", label: "Generate leads", icon: "📋" },
  { id: "sales", label: "Increase sales", icon: "💰" },
  { id: "installs", label: "App installs", icon: "📱" },
  { id: "retarget", label: "Retarget visitors", icon: "🎯" },
];

const BUDGETS = ["Under $1k", "$1k-$5k", "$5k-$20k", "$20k+"];
const TIMELINES = ["Launch ASAP", "This month", "Next month", "Just exploring"];

export function ContextStep({
  campaignMode,
  defaults,
  onContinue,
  onBack,
}: ContextStepProps) {
  const [targetAudience, setTargetAudience] = useState(defaults.targetAudience);
  const [platforms, setPlatforms] = useState<string[]>(defaults.platforms);
  const [volume, setVolume] = useState(defaults.contentVolume);
  const [objective, setObjective] = useState(defaults.campaignObjective);
  const [budget, setBudget] = useState(defaults.adBudget);
  const [timeline, setTimeline] = useState(defaults.campaignTimeline);

  function togglePlatform(id: string) {
    setPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  const canContinue = platforms.length > 0 && volume !== "";

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
            A few quick details
          </h1>
          <p className="text-[#6E6E73] mb-8">
            Help us tailor the experience for you
          </p>

          {/* Target audience */}
          <div className="mb-8">
            <label className="text-sm font-bold text-[#1D1D1F] mb-2 block">
              Who is your ideal customer?
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Small business owners aged 25-45 interested in fitness"
              className="w-full h-12 px-4 rounded-2xl bg-white border border-[#E6E6E7] text-sm text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:border-[#3E86C6] focus:ring-2 focus:ring-[#3E86C6]/20 transition-all"
            />
          </div>

          {/* Platforms */}
          <div className="mb-8">
            <label className="text-sm font-bold text-[#1D1D1F] mb-3 block">
              Which platforms do you focus on?
            </label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => {
                const active = platforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                      active
                        ? "border-[#3E86C6] bg-[#3E86C6]/5 text-[#3E86C6]"
                        : "border-[#E6E6E7] bg-white text-[#6E6E73] hover:border-[#6E6E73]/30"
                    }`}
                  >
                    <span>{p.icon}</span>
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content volume */}
          <div className="mb-8">
            <label className="text-sm font-bold text-[#1D1D1F] mb-3 block">
              What&apos;s your monthly content volume?
            </label>
            <div className="flex gap-2">
              {VOLUMES.map((v) => (
                <button
                  key={v}
                  onClick={() => setVolume(v)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                    volume === v
                      ? "border-[#3E86C6] bg-[#3E86C6]/5 text-[#3E86C6]"
                      : "border-[#E6E6E7] bg-white text-[#6E6E73] hover:border-[#6E6E73]/30"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Campaign-specific fields */}
          <AnimatePresence>
            {campaignMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-[#E6E6E7] pt-8 mt-2 mb-4">
                  <p className="text-xs font-bold text-[#6E6E73] uppercase tracking-wider mb-6">
                    Campaign Details
                  </p>

                  {/* Campaign objective */}
                  <div className="mb-8">
                    <label className="text-sm font-bold text-[#1D1D1F] mb-3 block">
                      Campaign objective
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {OBJECTIVES.map((o) => (
                        <button
                          key={o.id}
                          onClick={() => setObjective(o.id)}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                            objective === o.id
                              ? "border-[#3E86C6] bg-[#3E86C6]/5 text-[#3E86C6]"
                              : "border-[#E6E6E7] bg-white text-[#6E6E73] hover:border-[#6E6E73]/30"
                          }`}
                        >
                          <span>{o.icon}</span>
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="mb-8">
                    <label className="text-sm font-bold text-[#1D1D1F] mb-3 block">
                      Estimated monthly ad budget
                    </label>
                    <div className="flex gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b}
                          onClick={() => setBudget(b)}
                          className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                            budget === b
                              ? "border-[#3E86C6] bg-[#3E86C6]/5 text-[#3E86C6]"
                              : "border-[#E6E6E7] bg-white text-[#6E6E73] hover:border-[#6E6E73]/30"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-4">
                    <label className="text-sm font-bold text-[#1D1D1F] mb-3 block">
                      Campaign timeline
                    </label>
                    <div className="flex gap-2">
                      {TIMELINES.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTimeline(t)}
                          className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                            timeline === t
                              ? "border-[#3E86C6] bg-[#3E86C6]/5 text-[#3E86C6]"
                              : "border-[#E6E6E7] bg-white text-[#6E6E73] hover:border-[#6E6E73]/30"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <motion.button
            onClick={() =>
              onContinue({
                targetAudience,
                platforms,
                contentVolume: volume,
                campaignObjective: objective,
                adBudget: budget,
                campaignTimeline: timeline,
              })
            }
            disabled={!canContinue}
            className="px-8 h-12 rounded-full text-base font-bold cursor-pointer disabled:cursor-not-allowed transition-all"
            style={
              canContinue
                ? {
                    background: "var(--gradient-brand)",
                    color: "white",
                    boxShadow: "0px 5px 10px rgba(230,230,231,0.25), inset -2px 2px 10px white",
                  }
                : { background: "white", color: "#E6E6E7", border: "1px solid #E6E6E7" }
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
