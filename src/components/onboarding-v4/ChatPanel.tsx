"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Msg } from "@/hooks/useConversationEngine";

const COLORS = ["#3E86C6", "#A666AA", "#EC4492", "#EE4454", "#F05427"];

const ACCOUNTS = [
  { id: "meta", name: "Meta Ads", icon: "📘", color: "#1877F2" },
  { id: "google", name: "Google Ads", icon: "🔍", color: "#4285F4" },
  { id: "tiktok", name: "TikTok Ads", icon: "🎵", color: "#010101" },
  { id: "instagram", name: "Instagram", icon: "📸", color: "#E1306C" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", color: "#0A66C2" },
];

/* ─── Inline Widgets ─── */

function BrandCardInline() {
  return (
    <div className="mt-2 p-3 rounded-xl border border-[#E6E6E7] bg-white/80 space-y-2 max-w-sm">
      <div className="flex items-center gap-2">
        {COLORS.map((c) => (
          <div key={c} className="w-5 h-5 rounded-md" style={{ background: c }} />
        ))}
      </div>
      <div className="text-[10px] text-[#6E6E73]">
        <span className="font-bold text-[#1D1D1F]">Satoshi Bold</span> · Inter Regular
      </div>
    </div>
  );
}

function CompetitorSummaryInline() {
  const comps = [
    { name: "BrightAds Co", ads: 24, channel: "Instagram" },
    { name: "ViralReach", ads: 18, channel: "TikTok" },
    { name: "Adflow Studio", ads: 31, channel: "Facebook" },
  ];
  return (
    <div className="mt-2 flex gap-2 max-w-md">
      {comps.map((c, i) => (
        <div key={c.name} className="flex-1 p-2 rounded-lg border border-[#E6E6E7] bg-white/80 text-[10px]">
          <div className="w-5 h-5 rounded-full text-white text-[8px] font-bold flex items-center justify-center mb-1" style={{ background: COLORS[i] }}>
            {c.name[0]}
          </div>
          <p className="font-bold text-[#1D1D1F] text-[11px]">{c.name}</p>
          <p className="text-[#6E6E73]">{c.ads} ads · {c.channel}</p>
        </div>
      ))}
    </div>
  );
}

function AdThumbsInline() {
  const scores = [92, 87, 85, 78, 91, 83];
  return (
    <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 max-w-md">
      {scores.map((s, i) => (
        <div key={i} className="shrink-0 w-14 h-14 rounded-lg relative" style={{ background: COLORS[i % 5] + "22" }}>
          <span className="absolute top-0.5 right-0.5 text-[7px] px-1 py-0.5 rounded bg-white/90 font-bold text-[#1D1D1F]">{s}</span>
        </div>
      ))}
    </div>
  );
}

function ConnectAccountsInline({
  connected,
  onConnect,
}: {
  connected: string[];
  onConnect: (id: string) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5 max-w-md">
      {ACCOUNTS.map((acc) => {
        const done = connected.includes(acc.id);
        return (
          <ConnectChip key={acc.id} acc={acc} done={done} onConnect={() => onConnect(acc.id)} />
        );
      })}
    </div>
  );
}

function ConnectChip({
  acc,
  done,
  onConnect,
}: {
  acc: (typeof ACCOUNTS)[0];
  done: boolean;
  onConnect: () => void;
}) {
  const [loading, setLoading] = useState(false);
  function handle() {
    if (done || loading) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onConnect(); }, 800);
  }
  return (
    <button
      onClick={handle}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all cursor-pointer ${
        done ? "border-[#42A93E]/40 bg-[#42A93E]/5 text-[#42A93E]" : "border-[#E6E6E7] bg-white text-[#1D1D1F] hover:border-[#3E86C6]/40"
      }`}
    >
      <span>{acc.icon}</span>
      {acc.name}
      {loading && (
        <motion.div className="w-3 h-3 rounded-full border-[1.5px] border-[#3E86C6] border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} />
      )}
      {done && !loading && <span className="text-[9px]">✓</span>}
    </button>
  );
}

function CreativeThumbsInline() {
  const labels = ["Story", "Feed", "TikTok", "Display"];
  return (
    <div className="mt-2 flex gap-1.5 max-w-sm">
      {labels.map((l, i) => (
        <div key={l} className="w-12 h-16 rounded-lg flex flex-col items-center justify-center" style={{ background: COLORS[i] + "20" }}>
          <div className="w-5 h-5 rounded mb-0.5" style={{ background: COLORS[i] + "40" }} />
          <span className="text-[7px] font-medium text-[#6E6E73]">{l}</span>
        </div>
      ))}
    </div>
  );
}

function CampaignSummaryInline() {
  return (
    <div className="mt-2 p-3 rounded-xl border border-[#E6E6E7] bg-white/80 max-w-sm text-[10px] text-[#6E6E73] space-y-1">
      <p className="font-bold text-[#1D1D1F] text-xs">Spring Growth Campaign</p>
      <p>📊 Awareness → Traffic · 4-week sprint</p>
      <p>8 creatives · 3 stages · $2k-$5k/mo</p>
    </div>
  );
}

function InlineWidget({
  widget,
  connected,
  onConnect,
}: {
  widget: Msg["widget"];
  connected: string[];
  onConnect: (id: string) => void;
}) {
  switch (widget) {
    case "brand-card": return <BrandCardInline />;
    case "competitor-summary": return <CompetitorSummaryInline />;
    case "ad-thumbs": return <AdThumbsInline />;
    case "connect-accounts": return <ConnectAccountsInline connected={connected} onConnect={onConnect} />;
    case "creative-thumbs": return <CreativeThumbsInline />;
    case "campaign-summary": return <CampaignSummaryInline />;
    default: return null;
  }
}

/* ─── Main ChatPanel ─── */

interface ChatPanelProps {
  messages: Msg[];
  typing: boolean;
  activePills: string[];
  connected: string[];
  onSend: (text: string) => void;
  onPill: (pill: string) => void;
  onConnect: (id: string) => void;
}

export function ChatPanel({
  messages,
  typing,
  activePills,
  connected,
  onSend,
  onPill,
  onConnect,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, activePills]);

  function handleSubmit() {
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft("");
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="shrink-0 px-5 pt-4 pb-3 border-b border-[#F7F7F7] flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "var(--gradient-brand)" }}>
          H
        </div>
        <span className="text-sm font-bold text-[#1D1D1F]">Holo AI</span>
      </div>

      {/* Thread */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" ? (
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] font-bold mt-0.5" style={{ background: "var(--gradient-brand)" }}>
                    H
                  </div>
                  <div>
                    <p className="text-[13px] text-[#1D1D1F] leading-relaxed">{msg.text}</p>
                    {msg.widget && (
                      <InlineWidget widget={msg.widget} connected={connected} onConnect={onConnect} />
                    )}
                  </div>
                </div>
              ) : (
                <div className="px-4 py-2 rounded-2xl text-[13px] text-white font-medium max-w-[75%]" style={{ background: "var(--gradient-brand)" }}>
                  {msg.text}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {typing && (
          <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] font-bold" style={{ background: "var(--gradient-brand)" }}>H</div>
            <div className="flex items-center gap-1 py-1">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6E6E73]" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.45, repeat: Infinity, delay: i * 0.12 }} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick-reply pills */}
        <AnimatePresence>
          {activePills.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-1.5 pl-8"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {activePills.map((pill, i) => (
                <motion.button
                  key={pill}
                  onClick={() => onPill(pill)}
                  className="px-3 py-1.5 rounded-full border border-[#E6E6E7] bg-white text-[11px] font-medium text-[#1D1D1F] hover:border-[#3E86C6] hover:bg-[#3E86C6]/5 hover:text-[#3E86C6] transition-all cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {pill}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className="shrink-0 px-4 py-3 border-t border-[#F7F7F7]">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type a message or paste a URL..."
            autoFocus
            className="flex-1 h-10 px-4 rounded-full bg-[#F7F7F7] border border-[#E6E6E7] text-[13px] text-[#1D1D1F] placeholder:text-[#C7C7CC] outline-none focus:border-[#3E86C6] focus:ring-2 focus:ring-[#3E86C6]/10 transition-all"
          />
          <motion.button
            onClick={handleSubmit}
            disabled={!draft.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer disabled:opacity-30 disabled:cursor-default"
            style={{ background: "var(--gradient-brand)" }}
            whileTap={draft.trim() ? { scale: 0.92 } : {}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
