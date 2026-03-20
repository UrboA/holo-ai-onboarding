"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingFlowV3 } from "@/hooks/useOnboardingFlowV3";
import { EntryStep } from "./steps/EntryStep";
import { WorkspaceStep } from "./steps/WorkspaceStep";
import { StudioStep } from "./steps/StudioStep";

export function OnboardingV3() {
  const flow = useOnboardingFlowV3();

  return (
    <div className="bg-white flex items-start justify-center p-5 w-full h-screen">
      <AnimatePresence mode="wait">
        {flow.step === "entry" && (
          <motion.div
            key="entry"
            className="bg-[#FBFBFB] flex flex-col w-full h-full max-w-[1240px] overflow-hidden relative rounded-[20px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute -right-72 -top-56 w-[1100px] h-[680px] rotate-[102deg] opacity-60 pointer-events-none" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/holo/bg-blob-right.svg" alt="" className="w-full h-full" />
            </div>
            <div className="absolute -left-28 -top-40 w-[624px] h-[673px] rotate-[105deg] opacity-60 pointer-events-none" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/holo/bg-blob-left.svg" alt="" className="w-full h-full" />
            </div>
            <div className="relative z-10 flex-1">
              <EntryStep onGo={flow.launch} />
            </div>
          </motion.div>
        )}

        {flow.step === "workspace" && (
          <motion.div
            key="workspace"
            className="w-full h-full overflow-hidden rounded-[20px]"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <WorkspaceStep
              brandUrl={flow.brandUrl}
              visible={flow.visible}
              typing={flow.typing}
              done={flow.done}
              paused={flow.paused}
              badges={flow.badges}
              connected={flow.connected}
              total={flow.total}
              onConnect={flow.connectAccount}
              onResume={flow.resume}
              onBack={flow.back}
              onStartStudio={flow.startStudio}
            />
          </motion.div>
        )}

        {flow.step === "studio" && (
          <motion.div
            key="studio"
            className="w-full h-full overflow-hidden rounded-[20px]"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <StudioStep
              action={flow.studioAction}
              creatives={flow.creatives}
              inspo={flow.inspo}
              generating={flow.generating}
              onBack={flow.back}
              onCloneInspo={flow.cloneInspo}
              onGenerateMore={flow.generateMore}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
