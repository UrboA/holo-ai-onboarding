"use client";

import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingFlowV2 } from "@/hooks/useOnboardingFlowV2";
import { BrandUrlStep } from "./steps/BrandUrlStep";
import { GoalsStep } from "./steps/GoalsStep";
import { ContextStep } from "./steps/ContextStep";
import { AnalysisChatStep } from "./steps/AnalysisChatStep";
import { ResultsStep } from "./steps/ResultsStep";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function OnboardingWizardV2() {
  const flow = useOnboardingFlowV2();

  const handleAnalysisStart = useCallback(() => {
    flow.startChat();
  }, [flow.startChat]);

  useEffect(() => {
    if (flow.step === "analysis") {
      handleAnalysisStart();
    }
  }, [flow.step, handleAnalysisStart]);

  const isFullScreen = flow.step === "analysis";

  function renderStep() {
    switch (flow.step) {
      case "brand-url":
        return (
          <BrandUrlStep
            defaultValue={flow.data.brandUrl}
            onContinue={(url) => {
              flow.updateData({ brandUrl: url });
              flow.next();
            }}
          />
        );
      case "goals":
        return (
          <GoalsStep
            defaultGoals={flow.data.goals}
            defaultChallenge={flow.data.challenge}
            defaultCampaignMode={flow.data.campaignMode}
            onContinue={(goals, challenge, campaignMode) => {
              flow.updateData({ goals, challenge, campaignMode });
              flow.next();
            }}
            onBack={flow.back}
          />
        );
      case "context":
        return (
          <ContextStep
            campaignMode={flow.data.campaignMode}
            defaults={{
              targetAudience: flow.data.targetAudience,
              platforms: flow.data.platforms,
              contentVolume: flow.data.contentVolume,
              campaignObjective: flow.data.campaignObjective,
              adBudget: flow.data.adBudget,
              campaignTimeline: flow.data.campaignTimeline,
            }}
            onContinue={(d) => {
              flow.updateData(d);
              flow.next();
            }}
            onBack={flow.back}
          />
        );
      case "analysis":
        return (
          <AnalysisChatStep
            visibleMessages={flow.visibleMessages}
            isTyping={flow.isTyping}
            chatComplete={flow.chatComplete}
            completedLabels={flow.completedLabels}
            totalSteps={flow.totalChatSteps}
            campaignMode={flow.data.campaignMode}
            brandUrl={flow.data.brandUrl}
            data={{
              platforms: flow.data.platforms,
              campaignObjective: flow.data.campaignObjective,
              adBudget: flow.data.adBudget,
              campaignTimeline: flow.data.campaignTimeline,
              targetAudience: flow.data.targetAudience,
            }}
            onFinish={flow.next}
            onBack={flow.back}
          />
        );
      case "results":
        return (
          <ResultsStep
            campaignMode={flow.data.campaignMode}
            onBack={flow.back}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="bg-white flex items-start justify-center p-5 w-full h-screen">
      <div
        className={`bg-[#FBFBFB] flex flex-col w-full h-full overflow-hidden relative rounded-[20px] ${
          isFullScreen ? "" : "max-w-[1240px]"
        }`}
      >
        {/* Subtle decorative blobs (not on analysis/results) */}
        {!isFullScreen && flow.step !== "results" && (
          <>
            <div
              className="absolute -right-72 -top-56 w-[1100px] h-[680px] rotate-[102deg] opacity-60 pointer-events-none"
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/holo/bg-blob-right.svg" alt="" className="w-full h-full" />
            </div>
            <div
              className="absolute -left-28 -top-40 w-[624px] h-[673px] rotate-[105deg] opacity-60 pointer-events-none"
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/holo/bg-blob-left.svg" alt="" className="w-full h-full" />
            </div>
          </>
        )}

        {/* Step indicator dots (not on analysis) */}
        {!isFullScreen && flow.step !== "results" && (
          <div className="relative z-10 flex items-center justify-center gap-2 pt-6 pb-2">
            {["brand-url", "goals", "context"].map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i <= flow.stepIndex
                    ? "w-8"
                    : "w-1.5"
                }`}
                style={
                  i <= flow.stepIndex
                    ? { background: "var(--gradient-brand)" }
                    : { background: "#E6E6E7" }
                }
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={flow.direction}>
            <motion.div
              key={flow.step}
              custom={flow.direction}
              variants={isFullScreen ? undefined : slideVariants}
              initial={isFullScreen ? { opacity: 0 } : "enter"}
              animate={isFullScreen ? { opacity: 1 } : "center"}
              exit={isFullScreen ? { opacity: 0 } : "exit"}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                opacity: { duration: 0.2 },
              }}
              className="h-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
