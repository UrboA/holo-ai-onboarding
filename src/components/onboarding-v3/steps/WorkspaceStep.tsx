"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMsg } from "@/hooks/useOnboardingFlowV3";

/* ─── Types ─── */

interface WorkspaceStepProps {
  brandUrl: string;
  visible: ChatMsg[];
  typing: boolean;
  done: boolean;
  paused: boolean;
  badges: string[];
  connected: string[];
  total: number;
  onConnect: (id: string) => void;
  onResume: () => void;
  onBack: () => void;
}

/* ─── Constants ─── */

const COLORS = ["#3E86C6", "#A666AA", "#EC4492", "#EE4454", "#F05427"];

const ACCOUNTS = [
  { id: "meta", name: "Meta Ads", icon: "📘" },
  { id: "google", name: "Google Ads", icon: "🔍" },
  { id: "tiktok", name: "TikTok Ads", icon: "🎵" },
  { id: "instagram", name: "Instagram", icon: "📸" },
  { id: "linkedin", name: "LinkedIn", icon: "💼" },
];

const CREATIVES = [
  { label: "Instagram Story", color: "#3E86C6" },
  { label: "Facebook Feed", color: "#A666AA" },
  { label: "TikTok Video", color: "#EC4492" },
  { label: "Google Display", color: "#F05427" },
];

const QUICK_ACTIONS = [
  { label: "Create social ads", icon: "📸" },
  { label: "Launch a campaign", icon: "🚀" },
  { label: "Generate product photos", icon: "🖼️" },
  { label: "Design email templates", icon: "✉️" },
  { label: "Make video ads", icon: "🎬" },
  { label: "Create landing page assets", icon: "🌐" },
];

/* ─── Small inline components ─── */

function ConnectBtn({
  acc,
  isConnected,
  onConnect,
}: {
  acc: (typeof ACCOUNTS)[0];
  isConnected: boolean;
  onConnect: () => void;
}) {
  const [loading, setLoading] = useState(false);

  function handle() {
    if (isConnected || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConnect();
    }, 800);
  }

  return (
    <button
      onClick={handle}
      disabled={isConnected}
      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm transition-all cursor-pointer disabled:cursor-default ${
        isConnected
          ? "border-[#42A93E]/30 bg-[#42A93E]/5"
          : "border-[#E6E6E7] bg-white hover:border-[#3E86C6]/40"
      }`}
    >
      <span className="text-base">{acc.icon}</span>
      <span className="font-medium text-[#1D1D1F] flex-1 text-left text-xs">
        {acc.name}
      </span>
      {loading ? (
        <motion.div
          className="w-3.5 h-3.5 rounded-full border-2 border-[#3E86C6] border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
        />
      ) : isConnected ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-4 h-4 rounded-full bg-[#42A93E] flex items-center justify-center"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>
      ) : (
        <span className="text-[10px] font-bold text-[#3E86C6]">Connect</span>
      )}
    </button>
  );
}

/* ─── Preview Panel ─── */

function Preview({ panel }: { panel: string | undefined }) {
  switch (panel) {
    case "website":
      return (
        <div className="rounded-xl border border-[#E6E6E7] overflow-hidden bg-white">
          <div className="h-7 bg-[#F7F7F7] flex items-center gap-1.5 px-3">
            <span className="w-2 h-2 rounded-full bg-[#EE4454]" />
            <span className="w-2 h-2 rounded-full bg-[#F05427]" />
            <span className="w-2 h-2 rounded-full bg-[#42A93E]" />
            <span className="flex-1 h-3 bg-white rounded mx-6" />
          </div>
          <div className="p-5 space-y-2.5">
            <div className="h-4 bg-[#F7F7F7] rounded w-2/3" />
            <div className="h-2.5 bg-[#F7F7F7] rounded w-full" />
            <div className="h-2.5 bg-[#F7F7F7] rounded w-5/6" />
            <div className="h-20 bg-[#F7F7F7] rounded mt-3" />
          </div>
        </div>
      );

    case "brand":
      return (
        <div className="space-y-3">
          <div className="flex gap-2">
            {COLORS.map((c, i) => (
              <motion.div
                key={c}
                className="w-11 h-11 rounded-xl"
                style={{ background: c }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring" }}
              />
            ))}
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#E6E6E7] text-xs">
            <p className="text-[#6E6E73] mb-0.5">Primary</p>
            <p className="font-bold text-[#1D1D1F] text-sm">Satoshi Bold</p>
            <p className="text-[#6E6E73] mt-1.5 mb-0.5">Secondary</p>
            <p className="font-medium text-[#1D1D1F] text-sm">Inter Regular</p>
          </div>
        </div>
      );

    case "competitors":
      return (
        <div className="space-y-2">
          {["Competitor A", "Competitor B", "Competitor C"].map((n, i) => (
            <motion.div
              key={n}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#E6E6E7]"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="w-7 h-7 rounded-lg text-white text-[10px] font-bold flex items-center justify-center" style={{ background: COLORS[i] }}>
                {n[0]}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-[#1D1D1F]">{n}</p>
                <div className="h-1.5 bg-[#F7F7F7] rounded w-3/5 mt-1" />
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "ad-library":
      return (
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-lg"
              style={{ background: COLORS[i % 5] + "20" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring" }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-6 rounded" style={{ background: COLORS[i % 5] + "40" }} />
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "connect":
      return (
        <div className="p-3 rounded-xl bg-white border border-[#E6E6E7] text-center text-xs text-[#6E6E73]">
          Connect your platforms to unlock tailored creatives
        </div>
      );

    case "generating":
      return (
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="aspect-[4/5] rounded-xl bg-[#F7F7F7] overflow-hidden relative">
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
              />
            </div>
          ))}
        </div>
      );

    case "creatives":
      return (
        <div className="grid grid-cols-2 gap-2">
          {CREATIVES.map((c, i) => (
            <motion.div
              key={c.label}
              className="aspect-[4/5] rounded-xl overflow-hidden relative group cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${c.color}15, ${c.color}38)` }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              whileHover={{ y: -2 }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-9 h-9 rounded-lg mb-1.5" style={{ background: c.color + "40" }} />
                <div className="w-1/2 h-1.5 rounded bg-white/40 mb-0.5" />
                <div className="w-1/3 h-1.5 rounded bg-white/25" />
              </div>
              <div className="absolute bottom-1.5 left-1.5 right-1.5">
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/80 text-[#1D1D1F] font-medium">{c.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "results":
      return (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-white border border-[#E6E6E7] text-xs text-[#6E6E73] space-y-1">
            <p className="font-bold text-[#1D1D1F] text-sm mb-1.5">Summary</p>
            <p>✨ 4 creatives generated</p>
            <p>🔍 3 competitors analyzed</p>
            <p>📚 12 ad references found</p>
          </div>
          <motion.button
            className="w-full h-10 rounded-full text-xs font-bold text-white cursor-pointer"
            style={{ background: "var(--gradient-brand)", boxShadow: "0px 5px 10px rgba(62,134,198,0.2), inset -2px 2px 10px rgba(255,255,255,0.3)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Open Dashboard
          </motion.button>
        </div>
      );

    default:
      return <div className="flex items-center justify-center h-32 text-xs text-[#C7C7CC]">Waiting...</div>;
  }
}

/* ─── Main Workspace ─── */

export function WorkspaceStep({
  brandUrl,
  visible,
  typing,
  done,
  paused,
  badges,
  connected,
  total,
  onConnect,
  onResume,
  onBack,
}: WorkspaceStepProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const latestPanel = visible.length > 0 ? visible[visible.length - 1].panel : undefined;
  const progress = total > 0 ? (badges.length / total) * 100 : 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [visible, typing]);

  return (
    <div className="flex h-full overflow-hidden bg-[#FBFBFB]">
      {/* ─── Left: Chat ─── */}
      <div className="flex-[6] flex flex-col border-r border-[#E6E6E7] bg-white">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-[#F7F7F7]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "var(--gradient-brand)" }}>
                H
              </div>
              <span className="text-sm font-bold text-[#1D1D1F]">Holo</span>
              <span className="text-xs text-[#6E6E73]">· analyzing {brandUrl}</span>
            </div>
            <span className="text-[10px] text-[#6E6E73]">{badges.length}/{total}</span>
          </div>
          <div className="h-1 bg-[#F7F7F7] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gradient-brand)" }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 18 }}
            />
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <AnimatePresence>
            {visible.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
              >
                {/* AI bubble */}
                <div className="flex gap-2.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] font-bold mt-0.5" style={{ background: "var(--gradient-brand)" }}>
                    H
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <p className="text-sm text-[#1D1D1F] leading-relaxed">{msg.text}</p>
                    {msg.badge && (
                      <motion.span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#42A93E]/10 text-[#42A93E] text-[10px] font-medium"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.15 }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                        {msg.badge}
                      </motion.span>
                    )}

                    {/* Inline: account connect cards */}
                    {msg.id === "connect" && (
                      <InlineConnect
                        connected={connected}
                        paused={paused}
                        onConnect={onConnect}
                        onSkip={onResume}
                      />
                    )}

                    {/* Inline: quick actions after final message */}
                    {msg.id === "ready" && <QuickActions />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing dots */}
          {typing && (
            <motion.div className="flex gap-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] font-bold" style={{ background: "var(--gradient-brand)" }}>H</div>
              <div className="flex items-center gap-1 py-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#6E6E73]"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.45, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom input (appears when done) */}
        <AnimatePresence>
          {done && (
            <motion.div
              className="px-5 py-3 border-t border-[#F7F7F7]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="h-10 rounded-full bg-[#F7F7F7] border border-[#E6E6E7] px-4 flex items-center">
                <span className="text-sm text-[#C7C7CC]">Tell Holo what to create next...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Right: Preview ─── */}
      <div className="flex-[4] p-5 overflow-y-auto">
        <p className="text-[10px] font-bold text-[#6E6E73] uppercase tracking-wider mb-3">
          Preview
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={latestPanel || "empty"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Preview panel={latestPanel} />
          </motion.div>
        </AnimatePresence>

        {badges.length > 0 && (
          <div className="mt-5 space-y-1">
            {badges.map((b, i) => (
              <motion.div
                key={b}
                className="flex items-center gap-1.5 text-[10px] text-[#42A93E] font-medium"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                {b}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Inline Connect Cards ─── */

function InlineConnect({
  connected,
  paused,
  onConnect,
  onSkip,
}: {
  connected: string[];
  paused: boolean;
  onConnect: (id: string) => void;
  onSkip: () => void;
}) {
  const [skipped, setSkipped] = useState(false);
  const acted = connected.length > 0 || skipped;

  useEffect(() => {
    if (!acted || !paused) return;
    const t = setTimeout(onSkip, 1000);
    return () => clearTimeout(t);
  }, [acted, paused, onSkip]);

  return (
    <motion.div
      className="space-y-2 mt-1.5"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <div className="grid grid-cols-2 gap-1.5">
        {ACCOUNTS.map((a) => (
          <ConnectBtn
            key={a.id}
            acc={a}
            isConnected={connected.includes(a.id)}
            onConnect={() => onConnect(a.id)}
          />
        ))}
      </div>
      {!acted && (
        <button
          onClick={() => setSkipped(true)}
          className="text-[11px] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer"
        >
          Skip for now →
        </button>
      )}
    </motion.div>
  );
}

/* ─── Quick Actions (after chat completes) ─── */

function QuickActions() {
  return (
    <motion.div
      className="mt-3 space-y-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <p className="text-xs text-[#6E6E73] font-medium">Quick start:</p>
      <div className="grid grid-cols-2 gap-1.5">
        {QUICK_ACTIONS.map((a) => (
          <motion.button
            key={a.label}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-[#E6E6E7] bg-white text-xs font-medium text-[#1D1D1F] hover:border-[#3E86C6]/40 hover:bg-[#3E86C6]/[0.02] transition-all cursor-pointer text-left"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{a.icon}</span>
            {a.label}
          </motion.button>
        ))}
      </div>
      <motion.button
        className="w-full h-11 rounded-full text-sm font-bold text-white cursor-pointer mt-2"
        style={{ background: "var(--gradient-brand)", boxShadow: "0px 5px 15px rgba(62,134,198,0.2), inset -2px 2px 10px rgba(255,255,255,0.3)" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Go to Dashboard →
      </motion.button>
    </motion.div>
  );
}
