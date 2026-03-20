"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Intent } from "@/hooks/useOnboardingFlowV2";

interface IntentPickStepProps {
  onSelect: (intent: Intent) => void;
  onBack: () => void;
}

const INTENTS: { id: Intent; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: "create",
    label: "Create ads & content",
    desc: "Generate on-brand creatives on demand",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    id: "campaign",
    label: "Launch a full campaign",
    desc: "Let Holo plan, create, and launch everything",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    id: "explore",
    label: "Just exploring",
    desc: "Show me what Holo can do",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
];

export function IntentPickStep({ onSelect, onBack }: IntentPickStepProps) {
  const [picked, setPicked] = useState<Intent | null>(null);

  function handlePick(intent: Intent) {
    if (picked) return;
    setPicked(intent);
    setTimeout(() => onSelect(intent), 600);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-[#1D1D1F] text-center mb-2">
            What do you want Holo to help with?
          </h1>
          <p className="text-[#6E6E73] text-center mb-10">
            Pick one to get started
          </p>

          <div className="flex flex-col gap-3">
            {INTENTS.map((intent, i) => {
              const isSelected = picked === intent.id;
              const isOther = picked !== null && !isSelected;
              return (
                <motion.button
                  key={intent.id}
                  onClick={() => handlePick(intent.id)}
                  disabled={picked !== null}
                  className={`flex items-center gap-5 p-6 rounded-2xl border-2 text-left transition-all cursor-pointer disabled:cursor-default ${
                    isSelected
                      ? "border-[#3E86C6] bg-[#3E86C6]/5 scale-[1.02]"
                      : isOther
                        ? "border-[#E6E6E7] bg-white opacity-40 scale-[0.98]"
                        : "border-[#E6E6E7] bg-white hover:border-[#6E6E73]/40 hover:shadow-sm"
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: isOther ? 0.4 : 1, y: 0 }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 25 }}
                  whileTap={!picked ? { scale: 0.98 } : {}}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#3E86C6] text-white"
                        : "bg-[#F7F7F7] text-[#6E6E73]"
                    }`}
                  >
                    {intent.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-[#1D1D1F]">
                      {intent.label}
                    </p>
                    <p className="text-sm text-[#6E6E73] mt-0.5">
                      {intent.desc}
                    </p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "var(--gradient-brand)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Back button */}
      <div className="shrink-0 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-3 py-2 text-[#1D1D1F] font-medium rounded-full hover:bg-[#F7F7F7] transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
