"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Creative, InspoAd } from "@/hooks/useOnboardingFlowV3";

interface StudioStepProps {
  action: string;
  creatives: Creative[];
  inspo: InspoAd[];
  generating: boolean;
  onBack: () => void;
  onCloneInspo: (id: string) => void;
  onGenerateMore: () => void;
}

type Tab = "creatives" | "inspiration";

/* ─── Creative Card ─── */

function CreativeCard({ creative, index }: { creative: Creative; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ background: `linear-gradient(145deg, ${creative.color}12, ${creative.color}35)` }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 250, damping: 22 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Mock creative preview */}
      <div className="aspect-[4/5] flex flex-col items-center justify-center p-4 relative">
        <div className="w-16 h-16 rounded-2xl mb-3" style={{ background: creative.color + "30" }} />
        <div className="w-3/4 h-2 rounded-full bg-white/40 mb-1.5" />
        <div className="w-1/2 h-2 rounded-full bg-white/25 mb-1" />
        <div className="w-2/3 h-2 rounded-full bg-white/15" />

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[9px] px-2 py-0.5 rounded-full font-bold text-white"
            style={{ background: creative.color }}
          >
            {creative.tag}
          </span>
        </div>
      </div>

      {/* Info bar */}
      <div className="px-3 pb-3">
        <p className="text-xs font-bold text-[#1D1D1F] truncate">{creative.label}</p>
        <p className="text-[10px] text-[#6E6E73]">{creative.format}</p>
      </div>

      {/* Hover action overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.button
              className="w-full h-9 rounded-full bg-white text-xs font-bold text-[#1D1D1F] cursor-pointer"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0 }}
              whileTap={{ scale: 0.95 }}
            >
              ✏️ Edit
            </motion.button>
            <motion.button
              className="w-full h-9 rounded-full text-xs font-bold text-white cursor-pointer"
              style={{ background: "var(--gradient-brand)" }}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Launch
            </motion.button>
            <motion.button
              className="w-full h-9 rounded-full bg-white/20 text-xs font-bold text-white cursor-pointer border border-white/30"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              📋 Clone & Remix
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Inspiration Card ─── */

function InspoCard({
  ad,
  index,
  onClone,
}: {
  ad: InspoAd;
  index: number;
  onClone: () => void;
}) {
  const [cloning, setCloning] = useState(false);
  const [cloned, setCloned] = useState(false);

  function handleClone() {
    if (cloned) return;
    setCloning(true);
    setTimeout(() => {
      setCloning(false);
      setCloned(true);
      onClone();
    }, 600);
  }

  return (
    <motion.div
      className="rounded-2xl overflow-hidden border border-[#E6E6E7] bg-white group"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring" }}
    >
      {/* Mock ad preview */}
      <div
        className="aspect-[4/5] flex flex-col items-center justify-center relative"
        style={{ background: `linear-gradient(135deg, ${ad.color}10, ${ad.color}28)` }}
      >
        <div className="w-12 h-12 rounded-xl mb-2" style={{ background: ad.color + "35" }} />
        <div className="w-1/2 h-1.5 rounded bg-white/40 mb-1" />
        <div className="w-1/3 h-1.5 rounded bg-white/25" />

        {/* Performance badge */}
        <div className="absolute top-2.5 right-2.5">
          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#42A93E]/10 text-[#42A93E] font-bold">
            {ad.performance}
          </span>
        </div>

        {/* Brand badge */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className="text-[8px] px-1.5 py-0.5 rounded-full text-white font-bold"
            style={{ background: ad.color + "CC" }}
          >
            {ad.brand}
          </span>
        </div>
      </div>

      {/* Info + clone button */}
      <div className="p-3 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-[#1D1D1F] truncate">{ad.format}</p>
          <p className="text-[10px] text-[#6E6E73]">{ad.brand}</p>
        </div>
        <motion.button
          onClick={handleClone}
          disabled={cloned}
          className={`shrink-0 h-7 px-3 rounded-full text-[10px] font-bold cursor-pointer disabled:cursor-default transition-all ${
            cloned
              ? "bg-[#42A93E]/10 text-[#42A93E]"
              : "bg-[#F7F7F7] text-[#1D1D1F] hover:bg-[#3E86C6]/10 hover:text-[#3E86C6]"
          }`}
          whileTap={!cloned ? { scale: 0.93 } : {}}
        >
          {cloning ? (
            <motion.div
              className="w-3 h-3 rounded-full border-2 border-[#3E86C6] border-t-transparent mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            />
          ) : cloned ? (
            "✓ Cloned"
          ) : (
            "Clone & Remix"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Shimmer Skeleton ─── */

function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div
      className="rounded-2xl bg-[#F7F7F7] overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="aspect-[4/5]" />
      <div className="p-3 space-y-1.5">
        <div className="h-3 bg-[#E6E6E7] rounded w-3/4" />
        <div className="h-2 bg-[#E6E6E7] rounded w-1/2" />
      </div>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: index * 0.15 }}
      />
    </motion.div>
  );
}

/* ─── Main Studio ─── */

export function StudioStep({
  action,
  creatives,
  inspo,
  generating,
  onBack,
  onCloneInspo,
  onGenerateMore,
}: StudioStepProps) {
  const [tab, setTab] = useState<Tab>("creatives");

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top bar */}
      <div className="shrink-0 px-6 py-4 border-b border-[#F7F7F7] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#1D1D1F]">{action}</h1>
            <p className="text-xs text-[#6E6E73]">
              {generating
                ? "Generating..."
                : `${creatives.length} creative${creatives.length !== 1 ? "s" : ""} ready`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={onGenerateMore}
            disabled={generating}
            className="h-9 px-4 rounded-full border border-[#E6E6E7] text-xs font-bold text-[#1D1D1F] hover:border-[#3E86C6]/40 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.96 }}
          >
            + Generate more
          </motion.button>
          <motion.button
            className="h-9 px-5 rounded-full text-xs font-bold text-white cursor-pointer"
            style={{
              background: "var(--gradient-brand)",
              boxShadow: "0px 4px 12px rgba(62,134,198,0.2), inset -2px 2px 8px rgba(255,255,255,0.3)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            🚀 Launch All
          </motion.button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="shrink-0 px-6 pt-3 pb-0 flex gap-1">
        {(["creatives", "inspiration"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold transition-colors cursor-pointer border-b-2 ${
              tab === t
                ? "text-[#1D1D1F] border-[#3E86C6] bg-[#3E86C6]/5"
                : "text-[#6E6E73] border-transparent hover:text-[#1D1D1F]"
            }`}
          >
            {t === "creatives"
              ? `Your Creatives (${creatives.length})`
              : `Inspiration (${inspo.length})`}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <AnimatePresence mode="wait">
          {tab === "creatives" ? (
            <motion.div
              key="creatives"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {generating && creatives.length === 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <SkeletonCard key={i} index={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {/* Show generating skeletons at the end when adding more */}
                  {creatives.map((c, i) => (
                    <CreativeCard key={c.id} creative={c} index={i} />
                  ))}
                  {generating &&
                    [0, 1].map((i) => (
                      <SkeletonCard key={`gen-${i}`} index={creatives.length + i} />
                    ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="inspo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-[#6E6E73] mb-4">
                Top-performing ads from your competitors. Clone any to remix with
                your brand.
              </p>
              <div className="grid grid-cols-4 gap-4">
                {inspo.map((ad, i) => (
                  <InspoCard
                    key={ad.id}
                    ad={ad}
                    index={i}
                    onClone={() => onCloneInspo(ad.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
