"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type V3Step = "entry" | "workspace";

export interface ChatMsg {
  id: string;
  type: "ai" | "interactive" | "user";
  text: string;
  panel?: string;
  badge?: string;
  delay: number;
  pauseAfter?: boolean;
}

function buildSequence(url: string): ChatMsg[] {
  return [
    // Phase 1: instant acknowledgement
    {
      id: "start",
      type: "ai",
      text: `On it. Pulling up ${url}...`,
      panel: "website",
      delay: 2000,
    },
    {
      id: "brand",
      type: "ai",
      text: "Found your brand identity. Here are your colors, fonts, and logo:",
      panel: "brand",
      badge: "Brand Identity",
      delay: 3000,
    },
    {
      id: "competitors",
      type: "ai",
      text: "I checked who you're competing with:",
      panel: "competitors",
      badge: "Competitors",
      delay: 2800,
    },
    {
      id: "adlib",
      type: "ai",
      text: "And here are the top-performing ads in your space right now:",
      panel: "ad-library",
      badge: "Ad Library",
      delay: 2500,
    },

    // Phase 2: connect accounts (interactive pause)
    {
      id: "connect",
      type: "interactive",
      text: "Want to connect your ad accounts? I can tailor everything to your platforms. Totally optional.",
      panel: "connect",
      delay: 0,
      pauseAfter: true,
    },

    // Phase 3: generation
    {
      id: "generating",
      type: "ai",
      text: "Now generating your first creatives. This'll take a sec...",
      panel: "generating",
      delay: 4500,
    },
    {
      id: "creatives",
      type: "ai",
      text: "Done! Here's what I made for you 🎉",
      panel: "creatives",
      badge: "Creatives Ready",
      delay: 2000,
    },

    // Phase 4: what's next (final)
    {
      id: "ready",
      type: "ai",
      text: "Your workspace is ready. What do you want to make next?",
      panel: "results",
      badge: "All Done",
      delay: 0,
    },
  ];
}

export function useOnboardingFlowV3() {
  const [step, setStep] = useState<V3Step>("entry");
  const [brandUrl, setBrandUrl] = useState("");

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [visible, setVisible] = useState<ChatMsg[]>([]);
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [badges, setBadges] = useState<string[]>([]);
  const [connected, setConnected] = useState<string[]>([]);

  const started = useRef(false);

  const launch = useCallback(
    (url: string) => {
      setBrandUrl(url);
      const seq = buildSequence(url);
      setMessages(seq);
      setVisible([]);
      setIdx(0);
      setTyping(false);
      setDone(false);
      setPaused(false);
      setBadges([]);
      setConnected([]);
      started.current = false;
      setStep("workspace");
    },
    []
  );

  const back = useCallback(() => {
    setMessages([]);
    setVisible([]);
    setIdx(0);
    setTyping(false);
    setDone(false);
    setPaused(false);
    setBadges([]);
    setConnected([]);
    started.current = false;
    setStep("entry");
  }, []);

  const resume = useCallback(() => {
    setPaused(false);
    setIdx((i) => i + 1);
    setTyping(true);
  }, []);

  const connectAccount = useCallback((id: string) => {
    setConnected((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  // Kick off
  useEffect(() => {
    if (step !== "workspace" || messages.length === 0 || started.current) return;
    started.current = true;
    setIdx(0);
    setTyping(true);
  }, [step, messages]);

  // Queue processor
  useEffect(() => {
    if (step !== "workspace" || messages.length === 0 || paused) return;
    if (idx >= messages.length) {
      setTyping(false);
      setDone(true);
      return;
    }
    if (!typing) return;

    const msg = messages[idx];
    const typingDelay = 1000;

    const timer = setTimeout(() => {
      setVisible((prev) => [...prev, msg]);
      if (msg.badge) setBadges((prev) => [...prev, msg.badge!]);

      if (msg.pauseAfter) {
        setPaused(true);
        setTyping(false);
        return;
      }

      if (msg.delay > 0) {
        const next = setTimeout(() => setIdx((i) => i + 1), msg.delay - typingDelay);
        return () => clearTimeout(next);
      } else {
        setIdx((i) => i + 1);
      }
    }, typingDelay);

    return () => clearTimeout(timer);
  }, [step, idx, messages, typing, paused]);

  return {
    step,
    brandUrl,
    launch,
    back,
    messages,
    visible,
    typing,
    done,
    paused,
    badges,
    connected,
    connectAccount,
    resume,
    total: messages.length,
  };
}
