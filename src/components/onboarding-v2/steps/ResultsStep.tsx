"use client";

import { motion } from "framer-motion";

interface ResultsStepProps {
  campaignMode: boolean;
  onBack: () => void;
}

const BRAND_COLORS = ["#3E86C6", "#A666AA", "#EC4492", "#EE4454", "#F05427"];

const STANDARD_CREATIVES = [
  { label: "Instagram Story", format: "1080×1920", color: "#3E86C6" },
  { label: "Facebook Feed", format: "1200×628", color: "#A666AA" },
  { label: "TikTok Video", format: "1080×1920", color: "#EC4492" },
  { label: "Google Display", format: "300×250", color: "#F05427" },
];

const CAMPAIGN_CREATIVES = {
  awareness: [
    { label: "Instagram Reel", format: "1080×1920", color: "#3E86C6" },
    { label: "Facebook Video", format: "1200×628", color: "#3E86C6" },
    { label: "TikTok Ad", format: "1080×1920", color: "#3E86C6" },
    { label: "YouTube Short", format: "1080×1920", color: "#3E86C6" },
  ],
  consideration: [
    { label: "Carousel Ad", format: "1080×1080", color: "#A666AA" },
    { label: "Story Sequence", format: "1080×1920", color: "#A666AA" },
    { label: "Blog Banner", format: "1200×628", color: "#A666AA" },
    { label: "Email Header", format: "600×200", color: "#A666AA" },
  ],
  conversion: [
    { label: "Product Showcase", format: "1080×1080", color: "#EC4492" },
    { label: "Retarget Banner", format: "300×250", color: "#EC4492" },
    { label: "Promo Static", format: "1200×628", color: "#EC4492" },
    { label: "CTA Card", format: "1080×1080", color: "#EC4492" },
  ],
};

function CreativeCard({
  label,
  format,
  color,
  index,
}: {
  label: string;
  format: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      className="group aspect-[4/5] rounded-2xl overflow-hidden relative cursor-pointer"
      style={{ background: `linear-gradient(135deg, ${color}15, ${color}35)` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <div className="w-14 h-14 rounded-2xl mb-3" style={{ background: color + "33" }} />
        <div className="w-3/4 h-2 rounded bg-white/40 mb-1.5" />
        <div className="w-1/2 h-2 rounded bg-white/30" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white/80 to-transparent">
        <p className="text-xs font-bold text-[#1D1D1F]">{label}</p>
        <p className="text-[10px] text-[#6E6E73]">{format}</p>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-2xl" />
    </motion.div>
  );
}

export function ResultsStep({ campaignMode, onBack }: ResultsStepProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-4">
        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back link */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to analysis
            </button>
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
              style={{ background: "var(--gradient-brand)" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <span className="text-2xl">🎉</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
              {campaignMode
                ? "Your campaign is ready to launch"
                : "Your brand workspace is ready"}
            </h1>
          </motion.div>

          {/* Campaign overview card (campaign mode only) */}
          {campaignMode && (
            <motion.div
              className="mb-8 p-6 rounded-2xl border border-[#E6E6E7] bg-white"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-[#6E6E73] mb-1">Campaign</p>
                  <p className="text-lg font-bold text-[#1D1D1F]">
                    Spring Growth Campaign
                  </p>
                </div>
                <div className="flex gap-1.5">
                  {BRAND_COLORS.slice(0, 3).map((c) => (
                    <span
                      key={c}
                      className="w-6 h-6 rounded-full"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-6 text-xs text-[#6E6E73]">
                <span>📊 Brand awareness</span>
                <span>💰 $1k-$5k/mo</span>
                <span>⏱ Launch ASAP</span>
                <span>📱 Multi-platform</span>
              </div>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            className="flex items-center justify-center gap-6 mb-8 text-sm text-[#6E6E73]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {campaignMode ? (
              <>
                <span>✨ 12 creatives generated</span>
                <span className="w-1 h-1 rounded-full bg-[#E6E6E7]" />
                <span>📊 3 funnel stages</span>
                <span className="w-1 h-1 rounded-full bg-[#E6E6E7]" />
                <span>📅 4-week content plan</span>
                <span className="w-1 h-1 rounded-full bg-[#E6E6E7]" />
                <span>🔍 3 competitors analyzed</span>
              </>
            ) : (
              <>
                <span>✨ 4 creatives generated</span>
                <span className="w-1 h-1 rounded-full bg-[#E6E6E7]" />
                <span>🔍 3 competitors analyzed</span>
                <span className="w-1 h-1 rounded-full bg-[#E6E6E7]" />
                <span>📚 12 ad references found</span>
              </>
            )}
          </motion.div>

          {/* Creatives grid */}
          {campaignMode ? (
            <div className="space-y-8">
              {(
                Object.entries(CAMPAIGN_CREATIVES) as [
                  string,
                  typeof STANDARD_CREATIVES,
                ][]
              ).map(([stage, creatives], si) => (
                <div key={stage}>
                  <h3 className="text-sm font-bold text-[#1D1D1F] capitalize mb-3">
                    {stage}
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    {creatives.map((c, ci) => (
                      <CreativeCard
                        key={c.label}
                        {...c}
                        index={si * 4 + ci}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 mb-8">
              {STANDARD_CREATIVES.map((c, i) => (
                <CreativeCard key={c.label} {...c} index={i} />
              ))}
            </div>
          )}

          {/* CTAs */}
          <motion.div
            className="flex flex-col items-center gap-3 mt-10 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="px-10 h-14 rounded-full text-base font-bold text-white cursor-pointer"
              style={{
                background: "var(--gradient-brand)",
                boxShadow:
                  "0px 5px 10px rgba(230,230,231,0.25), inset -2px 2px 10px white",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {campaignMode ? "Review & Launch Campaign" : "Go to Dashboard"}
            </motion.button>

            <div className="flex gap-4">
              {campaignMode ? (
                <>
                  <button className="text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer">
                    Edit Strategy
                  </button>
                  <span className="text-[#E6E6E7]">·</span>
                  <button className="text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer">
                    Generate More Creatives
                  </button>
                </>
              ) : (
                <button className="text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer">
                  Generate more
                </button>
              )}
            </div>

            {campaignMode && (
              <button className="text-xs text-[#6E6E73] hover:underline mt-2 cursor-pointer">
                Just take me to the dashboard
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
