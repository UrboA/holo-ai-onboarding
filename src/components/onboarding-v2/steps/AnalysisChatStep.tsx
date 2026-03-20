"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage, Intent } from "@/hooks/useOnboardingFlowV2";

interface AnalysisChatStepProps {
  visibleMessages: ChatMessage[];
  isTyping: boolean;
  chatComplete: boolean;
  chatPaused: boolean;
  completedLabels: string[];
  totalSteps: number;
  intent: Intent | null;
  brandUrl: string;
  connectedAccounts: string[];
  onConnectAccount: (id: string) => void;
  onResumeChat: () => void;
  onBack: () => void;
}

const BRAND_COLORS = ["#3E86C6", "#A666AA", "#EC4492", "#EE4454", "#F05427"];

const AD_ACCOUNTS = [
  { id: "meta", name: "Meta Ads", icon: "📘" },
  { id: "google", name: "Google Ads", icon: "🔍" },
  { id: "tiktok", name: "TikTok Ads", icon: "🎵" },
  { id: "instagram", name: "Instagram", icon: "📸" },
  { id: "linkedin", name: "LinkedIn", icon: "💼" },
];

function ConnectButton({
  account,
  connected,
  onConnect,
}: {
  account: (typeof AD_ACCOUNTS)[0];
  connected: boolean;
  onConnect: () => void;
}) {
  const [connecting, setConnecting] = useState(false);

  function handleClick() {
    if (connected || connecting) return;
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      onConnect();
    }, 800);
  }

  return (
    <button
      onClick={handleClick}
      disabled={connected}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all cursor-pointer disabled:cursor-default ${
        connected
          ? "border-[#42A93E]/30 bg-[#42A93E]/5"
          : "border-[#E6E6E7] bg-white hover:border-[#3E86C6]/40"
      }`}
    >
      <span className="text-lg">{account.icon}</span>
      <span className="font-medium text-[#1D1D1F] flex-1 text-left">
        {account.name}
      </span>
      {connecting ? (
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-[#3E86C6] border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
        />
      ) : connected ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-5 h-5 rounded-full bg-[#42A93E] flex items-center justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>
      ) : (
        <span className="text-xs font-medium text-[#3E86C6]">Connect</span>
      )}
    </button>
  );
}

function PreviewPanel({
  previewType,
  intent,
}: {
  previewType: string | undefined;
  intent: Intent | null;
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
                transition={{ delay: i * 0.12, type: "spring" }}
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

    case "competitors":
      return (
        <div className="space-y-2">
          {["Competitor A", "Competitor B", "Competitor C"].map((name, i) => (
            <motion.div
              key={name}
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#E6E6E7]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
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
              transition={{ delay: i * 0.06, type: "spring" }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 rounded" style={{ background: BRAND_COLORS[i % 5] + "44" }} />
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "connect-accounts":
      return (
        <div className="p-4 rounded-xl bg-white border border-[#E6E6E7] text-center">
          <p className="text-sm text-[#6E6E73]">
            Connect platforms on the left to unlock tailored creatives
          </p>
        </div>
      );

    case "campaign-brief":
      return (
        <div className="p-4 rounded-xl bg-white border border-[#E6E6E7] space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
              style={{ background: "var(--gradient-brand)" }}
            >
              Campaign
            </span>
          </div>
          <div className="text-xs text-[#6E6E73] space-y-1.5">
            <p><span className="font-medium text-[#1D1D1F]">Objective:</span> Brand growth</p>
            <p><span className="font-medium text-[#1D1D1F]">Platforms:</span> Multi-platform</p>
            <p><span className="font-medium text-[#1D1D1F]">Timeline:</span> 4 weeks</p>
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
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-[#1D1D1F]">{s.stage}</span>
                <span className="text-xs text-[#6E6E73]">{s.desc}</span>
              </div>
              <div className="h-1.5 bg-[#F7F7F7] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: s.color }}
                  initial={{ width: 0 }}
                  animate={{ width: s.width }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
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
                      background:
                        (wi + d) % 3 !== 0 ? BRAND_COLORS[(wi + d) % 5] + "33" : "#F7F7F7",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: wi * 0.08 + d * 0.02 }}
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

    case "creatives": {
      const cards =
        intent === "campaign"
          ? [
              { label: "Awareness - Reel", color: "#3E86C6" },
              { label: "Consideration - Carousel", color: "#A666AA" },
              { label: "Conversion - Feed", color: "#EC4492" },
              { label: "Retarget - Banner", color: "#F05427" },
            ]
          : [
              { label: "Instagram Story", color: "#3E86C6" },
              { label: "Facebook Feed", color: "#A666AA" },
              { label: "TikTok Video", color: "#EC4492" },
              { label: "Google Display", color: "#F05427" },
            ];
      return (
        <div className="grid grid-cols-2 gap-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              className="aspect-[4/5] rounded-xl overflow-hidden relative group cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${c.color}18, ${c.color}40)` }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12, type: "spring" }}
              whileHover={{ y: -3 }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                <div className="w-10 h-10 rounded-xl mb-2" style={{ background: c.color + "40" }} />
                <div className="w-2/3 h-1.5 rounded bg-white/40 mb-1" />
                <div className="w-1/2 h-1.5 rounded bg-white/30" />
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
    }

    case "results": {
      const isCampaign = intent === "campaign";
      return (
        <div className="space-y-4">
          {/* Stats */}
          <div className="p-4 rounded-xl bg-white border border-[#E6E6E7] space-y-2">
            <p className="text-xs font-bold text-[#6E6E73] uppercase tracking-wider">Summary</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#6E6E73]">
              <span>✨ {isCampaign ? "12" : "4"} creatives</span>
              <span>🔍 3 competitors</span>
              {isCampaign && <span>📊 3 funnel stages</span>}
              {isCampaign && <span>📅 4-week plan</span>}
              <span>📚 12 ad refs</span>
            </div>
          </div>
          {/* CTA buttons */}
          <motion.button
            className="w-full h-12 rounded-full text-sm font-bold text-white cursor-pointer"
            style={{
              background: "var(--gradient-brand)",
              boxShadow: "0px 5px 10px rgba(230,230,231,0.25), inset -2px 2px 10px white",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCampaign ? "Review & Launch Campaign" : "Go to Dashboard"}
          </motion.button>
          <button className="w-full text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer py-2">
            Generate more creatives
          </button>
        </div>
      );
    }

    default:
      return null;
  }
}

export function AnalysisChatStep({
  visibleMessages,
  isTyping,
  chatComplete,
  chatPaused,
  completedLabels,
  totalSteps,
  intent,
  connectedAccounts,
  onConnectAccount,
  onResumeChat,
  onBack,
}: AnalysisChatStepProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const latestPreview =
    visibleMessages.length > 0
      ? visibleMessages[visibleMessages.length - 1].previewType
      : undefined;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleMessages, isTyping]);

  const progress = totalSteps > 0 ? (completedLabels.length / totalSteps) * 100 : 0;

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
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold mt-0.5"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  H
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">
                    {msg.text}
                  </p>
                  {msg.progressLabel && (
                    <motion.div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#42A93E]/10 text-[#42A93E] text-xs font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {msg.progressLabel}
                    </motion.div>
                  )}

                  {/* Inline account connection cards */}
                  {msg.id === "connect-prompt" && (
                    <AccountConnectionCards
                      connectedAccounts={connectedAccounts}
                      onConnect={onConnectAccount}
                      onSkip={onResumeChat}
                      paused={chatPaused}
                    />
                  )}

                  {/* Inline results CTA (final message) */}
                  {msg.id === "results" && (
                    <ResultsInlineCards intent={intent} />
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
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Chat input placeholder (after complete) */}
        <AnimatePresence>
          {chatComplete && (
            <motion.div
              className="px-6 py-4 border-t border-[#E6E6E7]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="h-10 rounded-full bg-[#F7F7F7] border border-[#E6E6E7] px-4 flex items-center">
                <span className="text-sm text-[#6E6E73]">
                  Ask me anything about your brand...
                </span>
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
              <PreviewPanel previewType={latestPreview} intent={intent} />
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
                transition={{ delay: i * 0.03 }}
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

/** Inline account connection cards rendered inside the chat feed */
function AccountConnectionCards({
  connectedAccounts,
  onConnect,
  onSkip,
  paused,
}: {
  connectedAccounts: string[];
  onConnect: (id: string) => void;
  onSkip: () => void;
  paused: boolean;
}) {
  const [skipped, setSkipped] = useState(false);
  const hasInteracted = connectedAccounts.length > 0 || skipped;

  useEffect(() => {
    if (!hasInteracted || !paused) return;
    const timer = setTimeout(() => onSkip(), 1000);
    return () => clearTimeout(timer);
  }, [hasInteracted, paused, onSkip]);

  return (
    <motion.div
      className="space-y-2 mt-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="grid grid-cols-2 gap-2">
        {AD_ACCOUNTS.map((acc) => (
          <ConnectButton
            key={acc.id}
            account={acc}
            connected={connectedAccounts.includes(acc.id)}
            onConnect={() => onConnect(acc.id)}
          />
        ))}
      </div>
      {!hasInteracted && (
        <button
          onClick={() => {
            setSkipped(true);
          }}
          className="text-xs text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer mt-1"
        >
          Skip for now →
        </button>
      )}
    </motion.div>
  );
}

/** Inline results buttons rendered after the final chat message */
function ResultsInlineCards({ intent }: { intent: Intent | null }) {
  const isCampaign = intent === "campaign";
  return (
    <motion.div
      className="space-y-3 mt-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.button
        className="w-full h-12 rounded-full text-sm font-bold text-white cursor-pointer"
        style={{
          background: "var(--gradient-brand)",
          boxShadow: "0px 5px 10px rgba(230,230,231,0.25), inset -2px 2px 10px white",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isCampaign ? "Review & Launch Campaign" : "Go to Dashboard"}
      </motion.button>
      <div className="flex justify-center gap-4">
        <button className="text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer">
          Generate more creatives
        </button>
        {isCampaign && (
          <>
            <span className="text-[#E6E6E7]">·</span>
            <button className="text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer">
              Edit strategy
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
