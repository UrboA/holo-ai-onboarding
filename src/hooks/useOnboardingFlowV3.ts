"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type V3Step = "entry" | "workspace" | "studio";

export interface ChatMsg {
  id: string;
  type: "ai" | "interactive" | "user";
  text: string;
  panel?: string;
  badge?: string;
  delay: number;
  pauseAfter?: boolean;
}

export interface Creative {
  id: string;
  label: string;
  format: string;
  color: string;
  /** Which funnel stage or category */
  tag: string;
}

export interface InspoAd {
  id: string;
  brand: string;
  format: string;
  color: string;
  performance: string;
}

const MOCK_INSPO: InspoAd[] = [
  { id: "i1", brand: "Competitor A", format: "Instagram Reel", color: "#3E86C6", performance: "High CTR" },
  { id: "i2", brand: "Competitor B", format: "Facebook Carousel", color: "#A666AA", performance: "Top engagement" },
  { id: "i3", brand: "Competitor A", format: "TikTok Video", color: "#EC4492", performance: "Viral" },
  { id: "i4", brand: "Competitor C", format: "Google Display", color: "#F05427", performance: "High conversions" },
  { id: "i5", brand: "Competitor B", format: "Instagram Story", color: "#EE4454", performance: "High reach" },
  { id: "i6", brand: "Competitor C", format: "Facebook Feed", color: "#3E86C6", performance: "Low CPA" },
];

function generateCreatives(action: string): Creative[] {
  const configs: Record<string, Creative[]> = {
    "Create social ads": [
      { id: "c1", label: "Instagram Story", format: "1080×1920", color: "#3E86C6", tag: "Social" },
      { id: "c2", label: "Facebook Feed Post", format: "1200×628", color: "#A666AA", tag: "Social" },
      { id: "c3", label: "TikTok Video Ad", format: "1080×1920", color: "#EC4492", tag: "Social" },
      { id: "c4", label: "Instagram Carousel", format: "1080×1080", color: "#EE4454", tag: "Social" },
      { id: "c5", label: "X/Twitter Banner", format: "1500×500", color: "#F05427", tag: "Social" },
      { id: "c6", label: "LinkedIn Post", format: "1200×627", color: "#3E86C6", tag: "Social" },
    ],
    "Launch a campaign": [
      { id: "c1", label: "Awareness - Video Reel", format: "1080×1920", color: "#3E86C6", tag: "Awareness" },
      { id: "c2", label: "Awareness - Story Ad", format: "1080×1920", color: "#3E86C6", tag: "Awareness" },
      { id: "c3", label: "Consideration - Carousel", format: "1080×1080", color: "#A666AA", tag: "Consideration" },
      { id: "c4", label: "Consideration - Feed Post", format: "1200×628", color: "#A666AA", tag: "Consideration" },
      { id: "c5", label: "Conversion - Product Ad", format: "1080×1080", color: "#EC4492", tag: "Conversion" },
      { id: "c6", label: "Conversion - Retarget", format: "300×250", color: "#EC4492", tag: "Conversion" },
    ],
    "Generate product photos": [
      { id: "c1", label: "Hero Shot - White BG", format: "2000×2000", color: "#3E86C6", tag: "Product" },
      { id: "c2", label: "Lifestyle Context", format: "1200×1200", color: "#A666AA", tag: "Product" },
      { id: "c3", label: "Detail Close-up", format: "1080×1080", color: "#EC4492", tag: "Product" },
      { id: "c4", label: "Multi-angle Pack", format: "2000×2000", color: "#F05427", tag: "Product" },
      { id: "c5", label: "In-use Scene", format: "1200×800", color: "#EE4454", tag: "Product" },
      { id: "c6", label: "Flat Lay", format: "1080×1080", color: "#3E86C6", tag: "Product" },
    ],
    default: [
      { id: "c1", label: "Instagram Story", format: "1080×1920", color: "#3E86C6", tag: "General" },
      { id: "c2", label: "Facebook Feed", format: "1200×628", color: "#A666AA", tag: "General" },
      { id: "c3", label: "Email Header", format: "600×200", color: "#EC4492", tag: "General" },
      { id: "c4", label: "Google Display", format: "300×250", color: "#F05427", tag: "General" },
      { id: "c5", label: "TikTok Video", format: "1080×1920", color: "#EE4454", tag: "General" },
      { id: "c6", label: "Landing Page Hero", format: "1440×600", color: "#3E86C6", tag: "General" },
    ],
  };
  return configs[action] || configs.default;
}

function buildSequence(url: string): ChatMsg[] {
  return [
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
    {
      id: "connect",
      type: "interactive",
      text: "Want to connect your ad accounts? I can tailor everything to your platforms. Totally optional.",
      panel: "connect",
      delay: 0,
      pauseAfter: true,
    },
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

  // Chat state
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [visible, setVisible] = useState<ChatMsg[]>([]);
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [badges, setBadges] = useState<string[]>([]);
  const [connected, setConnected] = useState<string[]>([]);

  // Studio state
  const [studioAction, setStudioAction] = useState("");
  const [creatives, setCreatives] = useState<Creative[]>([]);
  const [inspo] = useState<InspoAd[]>(MOCK_INSPO);
  const [generating, setGenerating] = useState(false);

  const started = useRef(false);

  const launch = useCallback((url: string) => {
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
  }, []);

  const back = useCallback(() => {
    if (step === "studio") {
      setStep("workspace");
      return;
    }
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
  }, [step]);

  const resume = useCallback(() => {
    setPaused(false);
    setIdx((i) => i + 1);
    setTyping(true);
  }, []);

  const connectAccount = useCallback((id: string) => {
    setConnected((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  /** User picks a quick action → generate creatives → go to studio */
  const startStudio = useCallback((action: string) => {
    setStudioAction(action);
    setGenerating(true);
    setCreatives([]);
    setStep("studio");
    setTimeout(() => {
      setCreatives(generateCreatives(action));
      setGenerating(false);
    }, 2500);
  }, []);

  /** Clone an inspiration ad into the creatives list */
  const cloneInspo = useCallback((inspoId: string) => {
    const ad = MOCK_INSPO.find((a) => a.id === inspoId);
    if (!ad) return;
    const newCreative: Creative = {
      id: `cloned-${ad.id}-${Date.now()}`,
      label: `${ad.format} (remixed)`,
      format: "1080×1080",
      color: ad.color,
      tag: "Remixed",
    };
    setCreatives((prev) => [newCreative, ...prev]);
  }, []);

  /** Generate more creatives in the studio */
  const generateMore = useCallback(() => {
    setGenerating(true);
    setTimeout(() => {
      const extra: Creative[] = [
        { id: `extra-${Date.now()}-1`, label: "Variation A", format: "1080×1080", color: "#A666AA", tag: "New" },
        { id: `extra-${Date.now()}-2`, label: "Variation B", format: "1200×628", color: "#EC4492", tag: "New" },
      ];
      setCreatives((prev) => [...prev, ...extra]);
      setGenerating(false);
    }, 2000);
  }, []);

  // Kick off chat
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
    // Studio
    startStudio,
    studioAction,
    creatives,
    inspo,
    generating,
    cloneInspo,
    generateMore,
  };
}
