"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface OnboardingV2Data {
  brandUrl: string;
  goals: string[];
  challenge: string;
  campaignMode: boolean;
  targetAudience: string;
  platforms: string[];
  contentVolume: string;
  campaignObjective: string;
  adBudget: string;
  campaignTimeline: string;
}

const INITIAL_DATA: OnboardingV2Data = {
  brandUrl: "",
  goals: [],
  challenge: "",
  campaignMode: false,
  targetAudience: "",
  platforms: [],
  contentVolume: "",
  campaignObjective: "",
  adBudget: "",
  campaignTimeline: "",
};

export type V2StepId =
  | "brand-url"
  | "goals"
  | "context"
  | "analysis"
  | "results";

export interface ChatMessage {
  id: string;
  type: "ai" | "system";
  text: string;
  previewType?: string;
  progressLabel?: string;
  delay: number;
}

function buildChatSequence(
  data: OnboardingV2Data
): ChatMessage[] {
  const url = data.brandUrl || "your website";
  const msgs: ChatMessage[] = [
    {
      id: "analyze",
      type: "ai",
      text: `Got it! Analyzing ${url}...`,
      previewType: "website",
      delay: 2000,
    },
    {
      id: "brand",
      type: "ai",
      text: "Extracting brand colors, fonts, and visual identity...",
      previewType: "brand-identity",
      progressLabel: "Brand Identity",
      delay: 3000,
    },
    {
      id: "products",
      type: "ai",
      text: "Scanning your product catalog and key messaging...",
      previewType: "products",
      progressLabel: "Products & Messaging",
      delay: 2500,
    },
    {
      id: "market",
      type: "ai",
      text: "Now researching your market and competitors...",
      previewType: "competitors",
      progressLabel: "Market Research",
      delay: 3000,
    },
    {
      id: "ads",
      type: "ai",
      text: "Analyzing top-performing ads in your industry...",
      previewType: "ad-library",
      progressLabel: "Ad Library Analysis",
      delay: 2500,
    },
    {
      id: "platforms",
      type: "ai",
      text: "Checking your connected ad accounts...",
      previewType: "ad-platforms",
      progressLabel: "Ad Platforms",
      delay: 2000,
    },
  ];

  if (data.campaignMode) {
    const objective = data.campaignObjective || "growth";
    msgs.push(
      {
        id: "campaign-strategy",
        type: "ai",
        text: `Building your campaign strategy based on your ${objective} goal...`,
        previewType: "campaign-brief",
        progressLabel: "Campaign Strategy",
        delay: 3000,
      },
      {
        id: "campaign-funnel",
        type: "ai",
        text: "Mapping out your ad funnel: awareness → consideration → conversion...",
        previewType: "funnel",
        progressLabel: "Ad Funnel",
        delay: 2500,
      },
      {
        id: "campaign-calendar",
        type: "ai",
        text: "Planning your content calendar for the next 4 weeks...",
        previewType: "calendar",
        progressLabel: "Content Calendar",
        delay: 3000,
      }
    );
  }

  msgs.push(
    {
      id: "generating",
      type: "ai",
      text: "Almost there! Generating your first ad creatives...",
      previewType: "generating",
      delay: 3500,
    },
    {
      id: "done",
      type: "ai",
      text: "Here are your first creatives! 🎉",
      previewType: "creatives",
      progressLabel: "Creatives Generated",
      delay: 2000,
    }
  );

  return msgs;
}

export function useOnboardingFlowV2() {
  const [step, setStep] = useState<V2StepId>("brand-url");
  const [data, setData] = useState<OnboardingV2Data>(INITIAL_DATA);
  const [direction, setDirection] = useState(1);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [chatIndex, setChatIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [chatComplete, setChatComplete] = useState(false);
  const [completedLabels, setCompletedLabels] = useState<string[]>([]);

  const chatStarted = useRef(false);

  const STEP_ORDER: V2StepId[] = [
    "brand-url",
    "goals",
    "context",
    "analysis",
    "results",
  ];

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
      if (step === "analysis") {
        setChatMessages([]);
        setVisibleMessages([]);
        setChatIndex(0);
        setIsTyping(false);
        setChatComplete(false);
        setCompletedLabels([]);
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
    setCompletedLabels([]);
    chatStarted.current = false;
  }, [data]);

  useEffect(() => {
    if (step !== "analysis") return;
    if (chatMessages.length === 0) return;
    if (chatStarted.current) return;
    chatStarted.current = true;
    setChatIndex(0);
    setIsTyping(true);
  }, [step, chatMessages]);

  useEffect(() => {
    if (step !== "analysis") return;
    if (chatMessages.length === 0) return;
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

      const nextTimer = setTimeout(() => {
        setChatIndex((i) => i + 1);
      }, msg.delay - typingDelay);

      return () => clearTimeout(nextTimer);
    }, typingDelay);

    return () => clearTimeout(typingTimer);
  }, [step, chatIndex, chatMessages, isTyping]);

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
    completedLabels,
    totalChatSteps: chatMessages.length,
  };
}
