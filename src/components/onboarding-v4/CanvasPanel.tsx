"use client";

import { motion, AnimatePresence } from "framer-motion";

const C = ["#3E86C6", "#A666AA", "#EC4492", "#EE4454", "#F05427"];

interface CanvasPanelProps {
  canvas: string;
  brandUrl: string;
  connected: string[];
}

/* ─── Scenes ─── */

function EmptyCanvas() {
  return (
    <div className="flex flex-col items-center justify-center h-full relative overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08]"
        style={{ background: "var(--gradient-brand)", filter: "blur(80px)" }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <p className="relative text-sm text-[#C7C7CC] font-medium">Your workspace will come alive here</p>
    </div>
  );
}

function ScanningCanvas({ url }: { url: string }) {
  return (
    <div className="p-6">
      <div className="rounded-xl border border-[#E6E6E7] overflow-hidden bg-white">
        <div className="h-8 bg-[#F7F7F7] flex items-center gap-1.5 px-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EE4454]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F05427]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#42A93E]" />
          <div className="flex-1 h-4 mx-6 bg-white rounded flex items-center px-2">
            <span className="text-[9px] text-[#6E6E73] truncate">{url}</span>
          </div>
        </div>
        <div className="p-6 space-y-3">
          {[0.7, 1, 0.85, 0.6].map((w, i) => (
            <motion.div
              key={i}
              className="h-3 bg-[#F7F7F7] rounded relative overflow-hidden"
              style={{ width: `${w * 100}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
              />
            </motion.div>
          ))}
          <motion.div className="h-24 bg-[#F7F7F7] rounded mt-4 relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <motion.div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }} animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function BrandCanvas() {
  return (
    <div className="p-6 space-y-4">
      <div className="p-5 rounded-2xl border border-[#E6E6E7] bg-white space-y-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold"
            style={{ background: "var(--gradient-brand)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            B
          </motion.div>
          <div>
            <p className="font-bold text-[#1D1D1F]">Your Brand</p>
            <p className="text-xs text-[#6E6E73]">Making something amazing</p>
          </div>
          <span className="ml-auto text-[10px] text-[#3E86C6] font-medium cursor-pointer hover:underline">Edit</span>
        </div>
        <div className="flex gap-2">
          {C.map((c, i) => (
            <motion.div key={c} className="w-10 h-10 rounded-xl" style={{ background: c }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.1, type: "spring" }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-[#F7F7F7]">
            <p className="text-[#6E6E73] text-[10px]">Primary Font</p>
            <p className="font-bold text-[#1D1D1F]">Satoshi Bold</p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#F7F7F7]">
            <p className="text-[#6E6E73] text-[10px]">Secondary</p>
            <p className="font-medium text-[#1D1D1F]">Inter Regular</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompetitorsCanvas() {
  const comps = [
    { name: "BrightAds Co", spend: "High", channel: "Instagram", ads: 24 },
    { name: "ViralReach", spend: "Medium", channel: "TikTok", ads: 18 },
    { name: "Adflow Studio", spend: "High", channel: "Facebook", ads: 31 },
  ];
  return (
    <div className="p-6 space-y-3">
      {comps.map((comp, i) => (
        <motion.div
          key={comp.name}
          className="p-4 rounded-xl border border-[#E6E6E7] bg-white flex items-center gap-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, type: "spring" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: C[i] }}>
            {comp.name[0]}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#1D1D1F]">{comp.name}</p>
            <p className="text-[10px] text-[#6E6E73]">{comp.ads} active ads · {comp.channel}</p>
          </div>
          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${comp.spend === "High" ? "bg-[#EE4454]/10 text-[#EE4454]" : "bg-[#F05427]/10 text-[#F05427]"}`}>
            {comp.spend} spend
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function AdLibraryCanvas() {
  const scores = [92, 87, 85, 78, 91, 83];
  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-3">
        {scores.map((s, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-xl relative overflow-hidden cursor-pointer group"
            style={{ background: `linear-gradient(135deg, ${C[i % 5]}15, ${C[i % 5]}35)` }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, type: "spring" }}
            whileHover={{ y: -3 }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-8 h-2 rounded bg-white/50 mb-1.5" />
              <div className="w-12 h-12 rounded-lg mb-1.5" style={{ background: C[i % 5] + "30" }} />
              <div className="w-10 h-2 rounded bg-white/40" />
            </div>
            <div className="absolute top-2 right-2">
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/90 font-bold text-[#1D1D1F]">{s}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ConnectCanvas({ connected }: { connected: string[] }) {
  const accounts = [
    { id: "meta", name: "Meta Ads", icon: "📘" },
    { id: "google", name: "Google Ads", icon: "🔍" },
    { id: "tiktok", name: "TikTok Ads", icon: "🎵" },
    { id: "instagram", name: "Instagram", icon: "📸" },
    { id: "linkedin", name: "LinkedIn", icon: "💼" },
  ];
  return (
    <div className="p-6 space-y-2">
      <p className="text-xs font-bold text-[#6E6E73] uppercase tracking-wider mb-3">Connections</p>
      {accounts.map((a) => {
        const done = connected.includes(a.id);
        return (
          <div key={a.id} className={`flex items-center gap-3 p-3 rounded-xl border ${done ? "border-[#42A93E]/30 bg-[#42A93E]/5" : "border-[#E6E6E7] bg-white"}`}>
            <span className="text-lg">{a.icon}</span>
            <span className="flex-1 text-sm font-medium text-[#1D1D1F]">{a.name}</span>
            <span className={`text-[10px] font-bold ${done ? "text-[#42A93E]" : "text-[#C7C7CC]"}`}>{done ? "✓ Connected" : "Not connected"}</span>
          </div>
        );
      })}
    </div>
  );
}

function GeneratingCanvas() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="aspect-[4/5] rounded-xl bg-[#F7F7F7] relative overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CreativesCanvas() {
  const creatives = [
    { label: "Instagram Story", format: "1080×1920", color: C[0], copy: "Elevate your brand" },
    { label: "Facebook Feed", format: "1200×628", color: C[1], copy: "Try it free today" },
    { label: "TikTok Video", format: "1080×1920", color: C[2], copy: "See the difference" },
    { label: "Google Display", format: "300×250", color: C[3], copy: "Get started now" },
  ];
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-3">
        {creatives.map((c, i) => (
          <motion.div
            key={c.label}
            className="aspect-[4/5] rounded-xl overflow-hidden relative group cursor-pointer"
            style={{ background: `linear-gradient(145deg, ${c.color}18, ${c.color}40)` }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, type: "spring" }}
            whileHover={{ y: -3 }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="text-[10px] font-bold text-[#1D1D1F]/60 mb-2 uppercase tracking-wider">{c.copy}</div>
              <div className="w-14 h-14 rounded-2xl mb-2" style={{ background: c.color + "35" }} />
              <div className="w-16 h-6 rounded-full" style={{ background: c.color + "50" }} />
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/85 font-medium text-[#1D1D1F]">{c.label}</span>
              <span className="text-[8px] text-[#6E6E73]">{c.format}</span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-white text-xs font-bold">Edit ✏️</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CampaignStrategyCanvas() {
  return (
    <div className="p-6 space-y-4">
      <motion.div className="p-5 rounded-2xl border border-[#E6E6E7] bg-white space-y-3" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <p className="font-bold text-[#1D1D1F]">Spring Growth Campaign</p>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-bold text-white" style={{ background: "var(--gradient-brand)" }}>Active</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-[#6E6E73]">
          <div className="p-2 rounded-lg bg-[#F7F7F7]">📊 Awareness → Traffic</div>
          <div className="p-2 rounded-lg bg-[#F7F7F7]">💰 $2k-$5k/mo</div>
          <div className="p-2 rounded-lg bg-[#F7F7F7]">📅 4-week sprint</div>
          <div className="p-2 rounded-lg bg-[#F7F7F7]">📱 Multi-platform</div>
        </div>
      </motion.div>
      <div className="flex items-center gap-2">
        {["Awareness", "Consideration", "Conversion"].map((s, i) => (
          <motion.div key={s} className="flex-1 p-2 rounded-lg text-center text-[10px] font-bold" style={{ background: C[i] + "15", color: C[i] }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
            {s}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CampaignGeneratingCanvas() {
  const stages = ["Awareness", "Consideration", "Conversion"];
  return (
    <div className="p-6 space-y-4">
      {stages.map((s, si) => (
        <div key={s}>
          <p className="text-[10px] font-bold text-[#6E6E73] uppercase tracking-wider mb-2">{s}</p>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, si < 2 ? 2 : -1].filter((x) => x >= 0).map((i) => (
              <div key={i} className="aspect-[4/5] rounded-lg bg-[#F7F7F7] relative overflow-hidden">
                <motion.div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }} animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: (si * 3 + i) * 0.1 }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CampaignCreativesCanvas() {
  const stages = [
    { name: "Awareness", creatives: ["Reel", "Video", "TikTok"], color: C[0] },
    { name: "Consideration", creatives: ["Carousel", "Story", "Email"], color: C[1] },
    { name: "Conversion", creatives: ["Product", "Retarget"], color: C[2] },
  ];
  return (
    <div className="p-6 space-y-4">
      {stages.map((s, si) => (
        <div key={s.name}>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: s.color }}>{s.name}</p>
          <div className="grid grid-cols-3 gap-2">
            {s.creatives.map((c, ci) => (
              <motion.div key={c} className="aspect-[4/5] rounded-lg relative overflow-hidden cursor-pointer group" style={{ background: `linear-gradient(135deg, ${s.color}12, ${s.color}35)` }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (si * 3 + ci) * 0.08, type: "spring" }} whileHover={{ y: -2 }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 rounded" style={{ background: s.color + "35" }} />
                </div>
                <span className="absolute bottom-1 left-1 text-[7px] px-1 py-0.5 rounded bg-white/80 font-medium">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DashboardCanvas() {
  const cards = [
    { title: "Brand Profile", sub: "5 colors · 2 fonts", color: C[0] },
    { title: "Market Intel", sub: "3 competitors mapped", color: C[1] },
    { title: "Ad Library", sub: "12 references saved", color: C[2] },
    { title: "Your Creatives", sub: "4+ creatives ready", color: C[3] },
  ];
  return (
    <div className="p-6 space-y-3 relative h-full">
      <p className="text-xs font-bold text-[#6E6E73] uppercase tracking-wider mb-2">Your Workspace</p>
      <div className="grid grid-cols-2 gap-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            className="p-4 rounded-xl border border-[#E6E6E7] bg-white cursor-pointer group hover:border-[#3E86C6]/30 transition-colors"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: "spring" }}
            whileHover={{ y: -2 }}
          >
            <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center" style={{ background: c.color + "18" }}>
              <div className="w-4 h-4 rounded" style={{ background: c.color + "40" }} />
            </div>
            <p className="text-sm font-bold text-[#1D1D1F]">{c.title}</p>
            <p className="text-[10px] text-[#6E6E73]">{c.sub}</p>
            <span className="text-[#C7C7CC] group-hover:text-[#3E86C6] text-xs mt-1 inline-block transition-colors">→</span>
          </motion.div>
        ))}
      </div>
      <motion.button
        className="absolute bottom-6 right-6 h-10 px-5 rounded-full text-xs font-bold text-white cursor-pointer"
        style={{ background: "var(--gradient-brand)", boxShadow: "0px 6px 16px rgba(62,134,198,0.3)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        Go to Dashboard →
      </motion.button>
    </div>
  );
}

/* ─── Main CanvasPanel ─── */

export function CanvasPanel({ canvas, brandUrl, connected }: CanvasPanelProps) {
  return (
    <div className="h-full bg-[#FBFBFB] overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={canvas}
          className="h-full"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {canvas === "empty" && <EmptyCanvas />}
          {canvas === "scanning" && <ScanningCanvas url={brandUrl} />}
          {canvas === "brand" && <BrandCanvas />}
          {canvas === "competitors" && <CompetitorsCanvas />}
          {canvas === "ad-library" && <AdLibraryCanvas />}
          {canvas === "connect" && <ConnectCanvas connected={connected} />}
          {canvas === "generating" && <GeneratingCanvas />}
          {canvas === "creatives" && <CreativesCanvas />}
          {canvas === "campaign-strategy" && <CampaignStrategyCanvas />}
          {canvas === "campaign-generating" && <CampaignGeneratingCanvas />}
          {canvas === "campaign-creatives" && <CampaignCreativesCanvas />}
          {canvas === "dashboard" && <DashboardCanvas />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
