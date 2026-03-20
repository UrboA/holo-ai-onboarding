"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage } from "@/hooks/useOnboardingFlowV2";

interface AnalysisChatStepProps {
  visibleMessages: ChatMessage[];
  isTyping: boolean;
  chatComplete: boolean;
  completedLabels: string[];
  totalSteps: number;
  campaignMode: boolean;
  brandUrl: string;
  data: {
    platforms: string[];
    campaignObjective: string;
    adBudget: string;
    campaignTimeline: string;
    targetAudience: string;
  };
  onFinish: () => void;
  onBack: () => void;
}

const BRAND_COLORS = ["#3E86C6", "#A666AA", "#EC4492", "#EE4454", "#F05427"];

function PreviewPanel({
  previewType,
  campaignMode,
  data,
}: {
  previewType: string | undefined;
  campaignMode: boolean;
  data: AnalysisChatStepProps["data"];
}) {
  switch (previewType) {
    case "website":
      return (
        <div className="rounded-xl border border-[#E6E6E7] overflow-hidden bg-white">
          <div className="h-8 bg-[#F7F7F7] flex items-center gap-1.5 px-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EE4454]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F05427]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#42A93E]" />
            <span className="flex-1 h-4 bg-white rounded mx-8" />
          </div>
          <div className="p-6 space-y-3">
            <div className="h-5 bg-[#F7F7F7] rounded w-3/4" />
            <div className="h-3 bg-[#F7F7F7] rounded w-full" />
            <div className="h-3 bg-[#F7F7F7] rounded w-5/6" />
            <div className="h-24 bg-[#F7F7F7] rounded mt-4" />
          </div>
        </div>
      );

    case "brand-identity":
      return (
        <div className="space-y-4">
          <div className="flex gap-2">
            {BRAND_COLORS.map((c, i) => (
              <motion.div
                key={c}
                className="w-12 h-12 rounded-xl"
                style={{ background: c }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.15, type: "spring" }}
              />
            ))}
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#E6E6E7]">
            <p className="text-xs text-[#6E6E73] mb-1">Primary Font</p>
            <p className="font-bold text-[#1D1D1F]">Satoshi Bold</p>
            <p className="text-xs text-[#6E6E73] mt-2 mb-1">Secondary</p>
            <p className="font-medium text-[#1D1D1F]">Inter Regular</p>
          </div>
        </div>
      );

    case "products":
      return (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="rounded-xl bg-white border border-[#E6E6E7] p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-16 bg-[#F7F7F7] rounded-lg mb-2" />
              <div className="h-3 bg-[#F7F7F7] rounded w-3/4 mb-1" />
              <div className="h-2 bg-[#F7F7F7] rounded w-1/2" />
            </motion.div>
          ))}
        </div>
      );

    case "competitors":
      return (
        <div className="space-y-2">
          {["Competitor A", "Competitor B", "Competitor C"].map((name, i) => (
            <motion.div
              key={name}
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#E6E6E7]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ background: BRAND_COLORS[i] }}
              >
                {name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1D1D1F]">{name}</p>
                <div className="h-2 bg-[#F7F7F7] rounded w-2/3 mt-1" />
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "ad-library":
      return (
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-lg overflow-hidden"
              style={{ background: BRAND_COLORS[i % 5] + "22" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, type: "spring" }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 rounded" style={{ background: BRAND_COLORS[i % 5] + "44" }} />
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "ad-platforms":
      return (
        <div className="space-y-2">
          {[
            { name: "Meta Ads", color: "#3E86C6" },
            { name: "Google Ads", color: "#42A93E" },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E6E6E7]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ background: p.color + "22" }}
                />
                <span className="text-sm font-medium text-[#1D1D1F]">{p.name}</span>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-[#3E86C6]/10 text-[#3E86C6] font-medium">
                Connect
              </span>
            </motion.div>
          ))}
        </div>
      );

    case "campaign-brief":
      return (
        <div className="p-4 rounded-xl bg-white border border-[#E6E6E7] space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: "var(--gradient-brand)" }}>
              {data.campaignObjective || "Growth"}
            </span>
          </div>
          <div className="text-xs text-[#6E6E73] space-y-1.5">
            <p><span className="font-medium text-[#1D1D1F]">Audience:</span> {data.targetAudience || "Target audience"}</p>
            <p><span className="font-medium text-[#1D1D1F]">Platforms:</span> {data.platforms.join(", ") || "Multi-platform"}</p>
            <p><span className="font-medium text-[#1D1D1F]">Budget:</span> {data.adBudget || "TBD"}</p>
            <p><span className="font-medium text-[#1D1D1F]">Timeline:</span> {data.campaignTimeline || "TBD"}</p>
          </div>
        </div>
      );

    case "funnel":
      return (
        <div className="space-y-2">
          {[
            { stage: "Awareness", desc: "Video ads + Reels", color: "#3E86C6", width: "100%" },
            { stage: "Consideration", desc: "Carousel + Stories", color: "#A666AA", width: "75%" },
            { stage: "Conversion", desc: "Static ads + Retarget", color: "#EC4492", width: "50%" },
          ].map((s, i) => (
            <motion.div
              key={s.stage}
              className="p-3 rounded-xl border border-[#E6E6E7] bg-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-[#1D1D1F]">{s.stage}</span>
                <span className="text-xs text-[#6E6E73]">{s.desc}</span>
              </div>
              <div className="h-1.5 bg-[#F7F7F7] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: s.color, width: s.width }}
                  initial={{ width: 0 }}
                  animate={{ width: s.width }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "calendar":
      return (
        <div className="space-y-2">
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, wi) => (
            <div key={week} className="flex items-center gap-2">
              <span className="text-xs text-[#6E6E73] w-12 shrink-0">{week}</span>
              <div className="flex-1 flex gap-1">
                {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                  <motion.div
                    key={d}
                    className="flex-1 h-4 rounded"
                    style={{
                      background: Math.random() > 0.4 ? BRAND_COLORS[(wi + d) % 5] + "33" : "#F7F7F7",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: wi * 0.1 + d * 0.03 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "generating":
      return (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[4/5] rounded-xl bg-[#F7F7F7] overflow-hidden relative">
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ))}
        </div>
      );

    case "creatives":
      return (
        <div className="grid grid-cols-2 gap-3">
          {(campaignMode
            ? [
                { label: "Awareness - Reel", color: "#3E86C6" },
                { label: "Awareness - Story", color: "#A666AA" },
                { label: "Consideration - Carousel", color: "#EC4492" },
                { label: "Conversion - Feed", color: "#F05427" },
              ]
            : [
                { label: "Instagram Story", color: "#3E86C6" },
                { label: "Facebook Feed", color: "#A666AA" },
                { label: "TikTok Video", color: "#EC4492" },
                { label: "Google Display", color: "#F05427" },
              ]
          ).map((c, i) => (
            <motion.div
              key={c.label}
              className="aspect-[4/5] rounded-xl overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, ${c.color}22, ${c.color}44)` }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, type: "spring" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                <div
                  className="w-12 h-12 rounded-xl mb-2"
                  style={{ background: c.color + "44" }}
                />
                <div className="w-2/3 h-2 rounded bg-white/40 mb-1" />
                <div className="w-1/2 h-2 rounded bg-white/30" />
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 text-[#1D1D1F] font-medium">
                  {c.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export function AnalysisChatStep({
  visibleMessages,
  isTyping,
  chatComplete,
  completedLabels,
  totalSteps,
  campaignMode,
  data,
  onFinish,
  onBack,
}: AnalysisChatStepProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const latestPreview = visibleMessages.length > 0
    ? visibleMessages[visibleMessages.length - 1].previewType
    : undefined;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleMessages, isTyping]);

  const progress =
    totalSteps > 0 ? (completedLabels.length / totalSteps) * 100 : 0;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left: Chat feed */}
      <div className="flex-[6] flex flex-col border-r border-[#E6E6E7]">
        {/* Header with back + progress */}
        <div className="px-6 pt-5 pb-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer -ml-1"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
            <span className="text-xs text-[#6E6E73]">
              {completedLabels.length}/{totalSteps} steps
            </span>
          </div>
          <div className="h-2 bg-[#F7F7F7] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gradient-brand)" }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pb-4 space-y-4">
          <AnimatePresence>
            {visibleMessages.map((msg) => (
              <motion.div
                key={msg.id}
                className="flex gap-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  H
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">
                    {msg.text}
                  </p>
                  {msg.progressLabel && (
                    <motion.div
                      className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#42A93E]/10 text-[#42A93E] text-xs font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.3 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {msg.progressLabel}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
                style={{ background: "var(--gradient-brand)" }}
              >
                H
              </div>
              <div className="flex items-center gap-1 py-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#6E6E73]"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Input placeholder (appears after chat completes) */}
        <AnimatePresence>
          {chatComplete && (
            <motion.div
              className="px-6 py-4 border-t border-[#E6E6E7]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 h-10 rounded-full bg-[#F7F7F7] border border-[#E6E6E7] px-4 flex items-center">
                  <span className="text-sm text-[#6E6E73]">
                    Ask me anything about your brand analysis...
                  </span>
                </div>
                <motion.button
                  onClick={onFinish}
                  className="h-10 px-6 rounded-full text-sm font-bold text-white cursor-pointer"
                  style={{
                    background: "var(--gradient-brand)",
                    boxShadow: "0px 5px 10px rgba(230,230,231,0.25), inset -2px 2px 10px white",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  See Results →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Live preview panel */}
      <div className="flex-[4] bg-[#FBFBFB] p-6 overflow-y-auto">
        <p className="text-xs font-bold text-[#6E6E73] uppercase tracking-wider mb-4">
          Live Preview
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={latestPreview || "empty"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {latestPreview ? (
              <PreviewPanel
                previewType={latestPreview}
                campaignMode={campaignMode}
                data={data}
              />
            ) : (
              <div className="flex items-center justify-center h-48 text-[#6E6E73] text-sm">
                Waiting for analysis to start...
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Completed stages list */}
        {completedLabels.length > 0 && (
          <div className="mt-6 space-y-1.5">
            {completedLabels.map((label, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-2 text-xs text-[#42A93E]"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="font-medium">{label}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
