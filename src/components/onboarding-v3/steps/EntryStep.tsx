"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EntryStepProps {
  onGo: (url: string) => void;
}

function isValidUrl(str: string): boolean {
  if (!str) return false;
  try {
    const u = new URL(str.match(/^https?:\/\//) ? str : `https://${str}`);
    return !!u.hostname && u.hostname.includes(".");
  } catch {
    return false;
  }
}

export function EntryStep({ onGo }: EntryStepProps) {
  const [url, setUrl] = useState("");
  const [launching, setLaunching] = useState(false);
  const valid = isValidUrl(url);

  function handleGo() {
    if (!valid || launching) return;
    setLaunching(true);
    setTimeout(() => onGo(url), 1200);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden">
      {/* Ambient gradient glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: "var(--gradient-brand)", filter: "blur(120px)" }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="relative z-10 w-full max-w-xl flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo mark */}
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8 text-white text-lg font-bold"
          style={{ background: "var(--gradient-brand)" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          H
        </motion.div>

        <h1 className="text-4xl font-bold text-[#1D1D1F] mb-3 tracking-tight">
          What brand are we creating for?
        </h1>
        <p className="text-lg text-[#6E6E73] mb-12">
          Paste your URL — I&apos;ll handle the rest
        </p>

        <AnimatePresence mode="wait">
          {launching ? (
            <motion.div
              key="launching"
              className="w-full flex flex-col items-center gap-5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-full h-16 rounded-2xl bg-white border border-[#E6E6E7] flex items-center px-6 gap-3">
                <span className="text-[#1D1D1F] font-medium truncate flex-1">
                  {url}
                </span>
                <motion.div
                  className="w-5 h-5 rounded-full border-2 border-[#3E86C6] border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <motion.p
                className="text-sm text-[#6E6E73]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Launching workspace...
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="relative mb-4">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGo()}
                  placeholder="yourbrand.com"
                  autoFocus
                  className="w-full h-16 px-6 rounded-2xl bg-white border border-[#E6E6E7] text-lg text-[#1D1D1F] placeholder:text-[#C7C7CC] outline-none transition-all focus:border-[#3E86C6] focus:ring-4 focus:ring-[#3E86C6]/10 font-medium"
                />
              </div>
              <motion.button
                onClick={handleGo}
                disabled={!valid}
                className="w-full h-14 rounded-full text-base font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
                style={
                  valid
                    ? {
                        background: "var(--gradient-brand)",
                        color: "white",
                        boxShadow:
                          "0px 8px 20px rgba(62,134,198,0.25), inset -2px 2px 10px rgba(255,255,255,0.3)",
                      }
                    : {
                        background: "#F7F7F7",
                        color: "#C7C7CC",
                      }
                }
                whileHover={valid ? { scale: 1.02, y: -1 } : {}}
                whileTap={valid ? { scale: 0.98 } : {}}
              >
                Go →
              </motion.button>
              <p className="text-xs text-[#C7C7CC] mt-4">
                No signup required. See results in under 60 seconds.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
