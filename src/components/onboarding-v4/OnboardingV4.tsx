"use client";

import { useConversationEngine } from "@/hooks/useConversationEngine";
import { ChatPanel } from "./ChatPanel";
import { CanvasPanel } from "./CanvasPanel";

export function OnboardingV4() {
  const engine = useConversationEngine();

  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* Left: Chat (55%) */}
      <div className="w-[55%] h-full">
        <ChatPanel
          messages={engine.messages}
          typing={engine.typing}
          activePills={engine.activePills}
          connected={engine.connected}
          phase={engine.phase}
          onSend={engine.userSend}
          onPill={engine.pillClick}
          onConnect={engine.connectAccount}
        />
      </div>

      {/* Right: Canvas (45%) */}
      <div className="w-[45%] h-full border-l border-[#E6E6E7]">
        <CanvasPanel
          canvas={engine.canvas}
          brandUrl={engine.brandUrl}
          connected={engine.connected}
        />
      </div>
    </div>
  );
}
