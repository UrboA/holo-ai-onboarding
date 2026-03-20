"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Intent = "create" | "campaign" | "explore";

export interface OnboardingV2Data {
  brandUrl: string;
  intent: Intent | null;
}

const INITIAL_DATA: OnboardingV2Data = {
  brandUrl: "",
  intent: null,
};

export type V2StepId = "brand-url" | "intent" | "chat";

export interface ChatMessage {
  id: string;
  type: "ai" | "interactive";
  text: string;
  previewType?: string;
  progressLabel?: string;
  /** ms to wait after this message before showing the next typing indicator */
  delay: number;
  /** If true, the queue pauses until resumeChat() is called */
  pauseAfter?: boolean;
}

function buildChatSequence(data: OnboardingV2Data): ChatMessage[] {
  const url = data.brandUrl || "your website";
  const intent = data.intent || "explore";

  const msgs: ChatMessage[] = [
    // Phase 1: Brand Analysis
    {
      id: "analyze",
      type: "ai",
      text: `Got it! Analyzing ${url}...`,
      previewType: "website",
      delay: 2500,
    },
    {
      id: "brand",
      type: "ai",
      text: "Found your brand! Here's what I picked up:",
      previewType: "brand-identity",
      progressLabel: "Brand Identity",
      delay: 3000,
    },
    {
      id: "competitors",
      type: "ai",
      text: "Scanning your competitors...",
      previewType: "competitors",
      progressLabel: "Market Research",
      delay: 2800,
    },
    {
      id: "ads",
      type: "ai",
      text: "Checked top-performing ads in your space:",
      previewType: "ad-library",
      progressLabel: "Ad Library",
      delay: 2500,
    },

    // Phase 2: Account Connections (interactive pause)
    {
      id: "connect-prompt",
      type: "interactive",
      text: "Want to connect your ad accounts? This helps me tailor creatives to your platforms. Totally optional.",
      previewType: "connect-accounts",
      delay: 0,
      pauseAfter: true,
    },
  ];

  // Phase 3: Campaign-specific (only for "campaign" intent)
  if (intent === "campaign") {
    msgs.push(
      {
        id: "campaign-strategy",
        type: "ai",
        text: "Building your campaign strategy...",
        previewType: "campaign-brief",
        progressLabel: "Campaign Strategy",
        delay: 3000,
      },
      {
        id: "campaign-funnel",
        type: "ai",
        text: "Mapping your ad funnel: awareness → consideration → conversion...",
        previewType: "funnel",
        progressLabel: "Ad Funnel",
        delay: 2800,
      },
      {
        id: "campaign-calendar",
        type: "ai",
        text: "Planning your 4-week content calendar...",
        previewType: "calendar",
        progressLabel: "Content Calendar",
        delay: 3000,
      }
    );
  }

  // Phase 4: Generation
  msgs.push(
    {
      id: "generating",
      type: "ai",
      text: "Generating your first creatives...",
      previewType: "generating",
      delay: 4000,
    },
    {
      id: "creatives",
      type: "ai",
      text: "Here are your first creatives! 🎉",
      previewType: "creatives",
      progressLabel: "Creatives Ready",
      delay: 2000,
    },
    // Phase 5: Results summary (final message)
    {
      id: "results",
      type: "ai",
      text:
        intent === "campaign"
          ? "Your campaign workspace is ready. You can review your strategy, edit creatives, or launch right away."
          : "Your brand workspace is ready. Start creating, or let me generate more.",
      previewType: "results",
      progressLabel: "All Done",
      delay: 0,
    }
  );

  return msgs;
}

export function useOnboardingFlowV2() {
  const [step, setStep] = useState<V2StepId>("brand-url");
  const [data, setData] = useState<OnboardingV2Data>(INITIAL_DATA);
  const [direction, setDirection] = useState(1);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [chatIndex, setChatIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [chatComplete, setChatComplete] = useState(false);
  const [chatPaused, setChatPaused] = useState(false);
  const [completedLabels, setCompletedLabels] = useState<string[]>([]);
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  const chatStarted = useRef(false);

  const STEP_ORDER: V2StepId[] = ["brand-url", "intent", "chat"];
  const stepIndex = STEP_ORDER.indexOf(step);

  const updateData = useCallback((partial: Partial<OnboardingV2Data>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const next = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) {
      setDirection(1);
      setStep(STEP_ORDER[idx + 1]);
    }
  }, [step]);

  const back = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) {
      if (step === "chat") {
        setChatMessages([]);
        setVisibleMessages([]);
        setChatIndex(0);
        setIsTyping(false);
        setChatComplete(false);
        setChatPaused(false);
        setCompletedLabels([]);
        setConnectedAccounts([]);
        chatStarted.current = false;
      }
      setDirection(-1);
      setStep(STEP_ORDER[idx - 1]);
    }
  }, [step]);

  const startChat = useCallback(() => {
    const msgs = buildChatSequence(data);
    setChatMessages(msgs);
    setVisibleMessages([]);
    setChatIndex(0);
    setIsTyping(false);
    setChatComplete(false);
    setChatPaused(false);
    setCompletedLabels([]);
    setConnectedAccounts([]);
    chatStarted.current = false;
  }, [data]);

  /** Resume the chat after an interactive pause (e.g. account connections) */
  const resumeChat = useCallback(() => {
    setChatPaused(false);
    setChatIndex((i) => i + 1);
    setIsTyping(true);
  }, []);

  const connectAccount = useCallback((accountId: string) => {
    setConnectedAccounts((prev) =>
      prev.includes(accountId) ? prev : [...prev, accountId]
    );
  }, []);

  // Kick off the chat when entering the chat step
  useEffect(() => {
    if (step !== "chat") return;
    if (chatMessages.length === 0) return;
    if (chatStarted.current) return;
    chatStarted.current = true;
    setChatIndex(0);
    setIsTyping(true);
  }, [step, chatMessages]);

  // Chat message queue processor
  useEffect(() => {
    if (step !== "chat") return;
    if (chatMessages.length === 0) return;
    if (chatPaused) return;
    if (chatIndex >= chatMessages.length) {
      setIsTyping(false);
      setChatComplete(true);
      return;
    }
    if (!isTyping) return;

    const msg = chatMessages[chatIndex];
    const typingDelay = 1200;

    const typingTimer = setTimeout(() => {
      setVisibleMessages((prev) => [...prev, msg]);
      if (msg.progressLabel) {
        setCompletedLabels((prev) => [...prev, msg.progressLabel!]);
      }

      if (msg.pauseAfter) {
        setChatPaused(true);
        setIsTyping(false);
        return;
      }

      if (msg.delay > 0) {
        const nextTimer = setTimeout(() => {
          setChatIndex((i) => i + 1);
        }, msg.delay - typingDelay);
        return () => clearTimeout(nextTimer);
      } else {
        setChatIndex((i) => i + 1);
      }
    }, typingDelay);

    return () => clearTimeout(typingTimer);
  }, [step, chatIndex, chatMessages, isTyping, chatPaused]);

  return {
    step,
    stepIndex,
    data,
    direction,
    updateData,
    next,
    back,
    startChat,
    chatMessages,
    visibleMessages,
    chatIndex,
    isTyping,
    chatComplete,
    chatPaused,
    completedLabels,
    connectedAccounts,
    connectAccount,
    resumeChat,
    totalChatSteps: chatMessages.length,
  };
}
