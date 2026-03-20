"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ═══════════════ Types ═══════════════ */

export interface Msg {
  id: string;
  role: "ai" | "user";
  text: string;
  /** Inline widget to render inside this message bubble */
  widget?: "brand-card" | "competitor-summary" | "ad-thumbs" | "connect-accounts" | "creative-thumbs" | "campaign-summary";
  /** What the right-side canvas should show when this message is the latest AI msg */
  canvas?: string;
  pills?: string[];
  /** If true the queue pauses until userSend() or pillClick() */
  pauseAfter?: boolean;
  /** Auto-dismiss pills after N ms (0 = never auto-dismiss) */
  pillTimeout?: number;
}

type Phase =
  | "greeting"
  | "waiting-url"
  | "scanning"
  | "brand-found"
  | "competitors"
  | "ad-library"
  | "connect"
  | "creative-choice"
  | "generating-ads"
  | "generating-campaign"
  | "done";

/* ═══════════════ Sequence builder ═══════════════ */

function greetingMsg(): Msg {
  return {
    id: "greeting",
    role: "ai",
    text: "Hey! I'm your Holo AI marketing agent. Drop your website URL and I'll start building your brand workspace. Or just tell me what you need.",
    canvas: "empty",
    pills: ["I have a website", "I'll describe my brand"],
    pauseAfter: true,
    pillTimeout: 0,
  };
}

function buildScanSequence(url: string): Msg[] {
  return [
    {
      id: "scan-start",
      role: "ai",
      text: `On it. Scanning ${url}...`,
      canvas: "scanning",
    },
    {
      id: "brand-found",
      role: "ai",
      text: "Found your brand. Here's what I pulled:",
      canvas: "brand",
      widget: "brand-card",
      pills: ["Looks great, keep going", "Make some changes"],
      pauseAfter: true,
      pillTimeout: 4000,
    },
    {
      id: "competitors-intro",
      role: "ai",
      text: "Interesting. Found 3 competitors in your space:",
      canvas: "competitors",
      widget: "competitor-summary",
    },
    {
      id: "ad-library",
      role: "ai",
      text: "Also pulled the top-performing ad styles in your industry. Some clear patterns here:",
      canvas: "ad-library",
      widget: "ad-thumbs",
    },
    {
      id: "ad-insight",
      role: "ai",
      text: "Your competitors are heavy on video and carousel formats. I'll keep that in mind when I create yours.",
    },
    {
      id: "connect-prompt",
      role: "ai",
      text: "Quick one — want to connect any ad accounts? Helps me tailor your creatives to real audience data. Totally optional, you can always do this later.",
      canvas: "connect",
      widget: "connect-accounts",
      pills: ["Skip for now"],
      pauseAfter: true,
      pillTimeout: 0,
    },
    {
      id: "creative-choice",
      role: "ai",
      text: "Now the fun part. What should I make first?",
      canvas: "connect",
      pills: ["Create ads for my brand", "Plan & launch a full campaign", "Surprise me"],
      pauseAfter: true,
      pillTimeout: 0,
    },
  ];
}

function buildAdsSequence(): Msg[] {
  return [
    {
      id: "gen-ads-start",
      role: "ai",
      text: "Let me cook. Generating creatives based on your brand, competitors, and what's working in your space...",
      canvas: "generating",
    },
    {
      id: "gen-ads-done",
      role: "ai",
      text: "Here's your first batch! 4 creatives ready to go.",
      canvas: "creatives",
      widget: "creative-thumbs",
      pills: ["Generate more", "Try different styles", "Plan a full campaign", "Open dashboard"],
      pauseAfter: true,
      pillTimeout: 0,
    },
  ];
}

function buildCampaignSequence(): Msg[] {
  return [
    {
      id: "campaign-start",
      role: "ai",
      text: "Love it. Building a campaign strategy based on everything I've learned about your brand and market...",
      canvas: "campaign-strategy",
    },
    {
      id: "campaign-strategy",
      role: "ai",
      text: "Here's my recommended strategy:",
      canvas: "campaign-strategy",
      widget: "campaign-summary",
    },
    {
      id: "campaign-creatives-start",
      role: "ai",
      text: "Now let me create the creatives for each stage...",
      canvas: "campaign-generating",
    },
    {
      id: "campaign-done",
      role: "ai",
      text: "Your campaign is ready. 8 creatives across 3 funnel stages, plus a 4-week content plan.",
      canvas: "campaign-creatives",
      widget: "campaign-summary",
      pills: ["Review & launch", "Refine strategy", "Open dashboard"],
      pauseAfter: true,
      pillTimeout: 0,
    },
  ];
}

function doneMsg(): Msg {
  return {
    id: "done",
    role: "ai",
    text: "Your workspace is live. Everything I built is saved and editable anytime. Talk soon! 🎉",
    canvas: "dashboard",
  };
}

/* ═══════════════ Delays per message ═══════════════ */

function getDelay(id: string): number {
  const map: Record<string, number> = {
    "scan-start": 2500,
    "brand-found": 3000,
    "competitors-intro": 3000,
    "ad-library": 2800,
    "ad-insight": 2000,
    "connect-prompt": 1500,
    "gen-ads-start": 3500,
    "gen-ads-done": 2000,
    "campaign-start": 3500,
    "campaign-strategy": 2500,
    "campaign-creatives-start": 4000,
    "campaign-done": 2000,
    done: 0,
  };
  return map[id] ?? 2000;
}

/* ═══════════════ Hook ═══════════════ */

export function useConversationEngine() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [queue, setQueue] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState<Phase>("greeting");
  const [brandUrl, setBrandUrl] = useState("");
  const [connected, setConnected] = useState<string[]>([]);
  const [activePills, setActivePills] = useState<string[]>([]);

  const processing = useRef(false);
  const started = useRef(false);

  /* ── Helpers ── */

  const enqueue = useCallback((msgs: Msg[]) => {
    setQueue((prev) => [...prev, ...msgs]);
  }, []);

  const addUserMsg = useCallback((text: string) => {
    const msg: Msg = { id: `user-${Date.now()}`, role: "user", text };
    setMessages((prev) => [...prev, msg]);
    setActivePills([]);
  }, []);

  const connectAccount = useCallback((id: string) => {
    setConnected((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  /* ── Queue processor ── */

  useEffect(() => {
    if (queue.length === 0 || paused || processing.current) return;
    processing.current = true;

    const next = queue[0];
    setTyping(true);

    const typingDuration = Math.min(getDelay(next.id), 1200);

    const timer = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, next]);
      setQueue((prev) => prev.slice(1));
      if (next.pills) setActivePills(next.pills);
      else setActivePills([]);

      if (next.pauseAfter) {
        setPaused(true);
        // Auto-dismiss pills if timeout is set
        if (next.pillTimeout && next.pillTimeout > 0) {
          setTimeout(() => {
            setPaused(false);
            setActivePills([]);
          }, next.pillTimeout);
        }
      } else {
        // Schedule next message
        const gap = Math.max(getDelay(next.id) - typingDuration, 800);
        setTimeout(() => {
          processing.current = false;
        }, gap);
        return;
      }
      processing.current = false;
    }, typingDuration);

    return () => clearTimeout(timer);
  }, [queue, paused]);

  /* ── Kick off greeting ── */

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const timer = setTimeout(() => {
      enqueue([greetingMsg()]);
    }, 500);
    return () => clearTimeout(timer);
  }, [enqueue]);

  /* ── Resume helper ── */

  const resume = useCallback(() => {
    setPaused(false);
    setActivePills([]);
    processing.current = false;
  }, []);

  /* ── URL detection ── */

  function looksLikeUrl(text: string): boolean {
    return /^(https?:\/\/)?[\w.-]+\.\w{2,}/.test(text.trim());
  }

  /* ── Handle user input ── */

  const userSend = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      addUserMsg(trimmed);

      // URL detection at any point
      if (looksLikeUrl(trimmed)) {
        const url = trimmed.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "");
        setBrandUrl(url);
        setPhase("scanning");
        enqueue(buildScanSequence(url));
        resume();
        return;
      }

      // Phase-specific handling
      switch (phase) {
        case "greeting":
        case "waiting-url":
          if (trimmed.toLowerCase().includes("describe") || trimmed.toLowerCase().includes("no website")) {
            enqueue([
              {
                id: "describe-prompt",
                role: "ai",
                text: "Cool! What's your brand name and what do you sell?",
                pauseAfter: true,
                pillTimeout: 0,
              },
            ]);
            setPhase("waiting-url");
          } else {
            enqueue([
              {
                id: "guide-back",
                role: "ai",
                text: "Sounds great! Got a website I can scan? That's the fastest way to get started. Just paste the URL.",
                pauseAfter: true,
                pillTimeout: 0,
              },
            ]);
            setPhase("waiting-url");
          }
          resume();
          break;

        case "brand-found":
          resume();
          break;

        case "connect":
          resume();
          break;

        case "creative-choice": {
          const lower = trimmed.toLowerCase();
          if (lower.includes("campaign") || lower.includes("launch") || lower.includes("plan")) {
            setPhase("generating-campaign");
            enqueue(buildCampaignSequence());
          } else {
            setPhase("generating-ads");
            enqueue(buildAdsSequence());
          }
          resume();
          break;
        }

        case "generating-ads":
        case "generating-campaign":
        case "done":
          if (trimmed.toLowerCase().includes("campaign") || trimmed.toLowerCase().includes("launch")) {
            enqueue(buildCampaignSequence());
          } else if (
            trimmed.toLowerCase().includes("generat") ||
            trimmed.toLowerCase().includes("more") ||
            trimmed.toLowerCase().includes("create") ||
            trimmed.toLowerCase().includes("ad")
          ) {
            enqueue(buildAdsSequence());
          } else if (trimmed.toLowerCase().includes("dashboard") || trimmed.toLowerCase().includes("open")) {
            enqueue([doneMsg()]);
          } else {
            enqueue([doneMsg()]);
          }
          resume();
          break;

        default:
          resume();
      }
    },
    [phase, addUserMsg, enqueue, resume]
  );

  /* ── Pill click ── */

  const pillClick = useCallback(
    (pill: string) => {
      addUserMsg(pill);
      setActivePills([]);

      const lower = pill.toLowerCase();

      if (lower === "i have a website") {
        setPhase("waiting-url");
        resume();
        return;
      }

      if (lower === "i'll describe my brand") {
        enqueue([
          {
            id: "describe-prompt",
            role: "ai",
            text: "Cool! What's your brand name and what do you sell?",
            pauseAfter: true,
            pillTimeout: 0,
          },
        ]);
        setPhase("waiting-url");
        resume();
        return;
      }

      if (lower.includes("looks great") || lower.includes("keep going")) {
        setPhase("competitors");
        resume();
        return;
      }

      if (lower === "make some changes") {
        enqueue([
          {
            id: "edit-ack",
            role: "ai",
            text: "No problem! You can edit everything later. Let me keep going for now...",
          },
        ]);
        setPhase("competitors");
        resume();
        return;
      }

      if (lower === "skip for now") {
        setPhase("creative-choice");
        resume();
        return;
      }

      if (lower.includes("create ads") || lower === "surprise me") {
        setPhase("generating-ads");
        enqueue(buildAdsSequence());
        resume();
        return;
      }

      if (lower.includes("campaign") || lower.includes("launch") || lower.includes("plan")) {
        setPhase("generating-campaign");
        enqueue(buildCampaignSequence());
        resume();
        return;
      }

      if (lower.includes("different style") || lower.includes("generate more")) {
        enqueue(buildAdsSequence());
        resume();
        return;
      }

      if (lower.includes("dashboard") || lower.includes("open") || lower.includes("review")) {
        enqueue([doneMsg()]);
        setPhase("done");
        resume();
        return;
      }

      if (lower.includes("refine")) {
        enqueue([
          { id: "refine-ack", role: "ai", text: "Sure! What would you like to change about the strategy? You can edit everything in the dashboard too." },
          doneMsg(),
        ]);
        setPhase("done");
        resume();
        return;
      }

      resume();
    },
    [addUserMsg, enqueue, resume]
  );

  /* ── Current canvas (from latest AI message with a canvas property) ── */

  const latestAiWithCanvas = [...messages].reverse().find((m) => m.role === "ai" && m.canvas);
  const canvas = latestAiWithCanvas?.canvas ?? "empty";

  return {
    messages,
    typing,
    activePills,
    canvas,
    brandUrl,
    connected,
    connectAccount,
    userSend,
    pillClick,
    resume,
    phase,
  };
}
