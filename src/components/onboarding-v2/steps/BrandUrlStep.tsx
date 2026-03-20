"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BrandUrlStepProps {
  defaultValue: string;
  onContinue: (url: string) => void;
}

function isValidUrl(str: string): boolean {
  if (!str) return false;
  try {
    const withProtocol = str.match(/^https?:\/\//) ? str : `https://${str}`;
    const url = new URL(withProtocol);
    return !!url.hostname && url.hostname.includes(".");
  } catch {
    return false;
  }
}

export function BrandUrlStep({ defaultValue, onContinue }: BrandUrlStepProps) {
  const [url, setUrl] = useState(defaultValue);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const valid = isValidUrl(url);

  function handleSubmit() {
    if (!valid) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      onContinue(url);
      setIsAnalyzing(false);
    }, 1800);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <motion.div
        className="w-full max-w-lg flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center"
          style={{ background: "var(--gradient-brand)" }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </motion.div>

        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-3">
          Let&apos;s get to know your brand
        </h1>
        <p className="text-lg text-[#6E6E73] mb-10">
          Paste your website URL and we&apos;ll do the rest
        </p>

        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div
              key="analyzing"
              className="w-full flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-full h-14 rounded-2xl bg-[#FBFBFB] border border-[#E6E6E7] flex items-center px-5 gap-3">
                <span className="text-[#6E6E73] truncate flex-1">{url}</span>
                <motion.div
                  className="w-5 h-5 rounded-full border-2 border-t-transparent"
                  style={{ borderColor: "#3E86C6", borderTopColor: "transparent" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <motion.p
                className="text-sm text-[#6E6E73]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Analyzing your brand...
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              className="w-full flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="www.yourbrand.com"
                  className="w-full h-14 pl-12 pr-5 rounded-2xl bg-white border border-[#E6E6E7] text-base text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none transition-all focus:border-[#3E86C6] focus:ring-2 focus:ring-[#3E86C6]/20"
                />
              </div>

              <motion.button
                onClick={handleSubmit}
                disabled={!valid}
                className="w-full h-14 rounded-full text-base font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
                style={
                  valid
                    ? {
                        background: "var(--gradient-brand)",
                        color: "white",
                        boxShadow:
                          "0px 5px 10px rgba(230,230,231,0.25), inset -2px 2px 10px white",
                      }
                    : {
                        background: "white",
                        color: "#E6E6E7",
                        border: "1px solid #E6E6E7",
                      }
                }
                whileHover={valid ? { scale: 1.02 } : {}}
                whileTap={valid ? { scale: 0.98 } : {}}
              >
                Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
