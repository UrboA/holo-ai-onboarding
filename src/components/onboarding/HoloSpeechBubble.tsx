"use client";

import Image from "next/image";

export type HoloPose = "waving" | "standing" | "sad" | "excited" | "side";

const poseImageMap: Record<HoloPose, string> = {
  waving: "/images/holo/holo-waving.gif",
  standing: "/images/holo/holo-standing.gif",
  sad: "/images/holo/holo-sad.gif",
  excited: "/images/holo/holo-excited.gif",
  side: "/images/holo/holo-side.gif",
};

interface HoloSpeechBubbleProps {
  message: string;
  pose?: HoloPose;
  /** Words in the message to render in bold */
  boldWords?: string[];
  layout?: "centered" | "left-aligned";
  mascotSize?: number;
  priority?: boolean;
}

function renderMessageWithBold(message: string, boldWords: string[]) {
  if (boldWords.length === 0) return message;

  const pattern = new RegExp(
    `(${boldWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );
  const parts = message.split(pattern);

  return parts.map((part, i) => {
    const isBold = boldWords.some(
      (w) => w.toLowerCase() === part.toLowerCase()
    );
    return isBold ? (
      <span key={i} className="font-bold">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    );
  });
}

export function HoloSpeechBubble({
  message,
  pose = "standing",
  boldWords = [],
  layout = "centered",
  mascotSize = 296,
  priority = false,
}: HoloSpeechBubbleProps) {
  const isCentered = layout === "centered";

  return (
    <div
      className={`flex flex-col items-center ${isCentered ? "justify-center" : ""}`}
    >
      {isCentered ? (
        <>
          <div className="relative inline-flex flex-col items-center">
            <div className="bg-white border border-holo-gray rounded-[20px] px-4 py-2.5 text-center">
              <p className="text-[#1D1D1F] text-base font-medium leading-normal whitespace-pre-line">
                {renderMessageWithBold(message, boldWords)}
              </p>
            </div>
            {/* Triangle pointer */}
            <svg
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              className="-mt-px"
            >
              <path
                d="M9 15L0.339745 0L17.6603 0L9 15Z"
                fill="white"
                stroke="#E6E6E7"
                strokeWidth="1"
              />
              <rect x="1" y="0" width="16" height="2" fill="white" />
            </svg>
          </div>
          <Image
            src={poseImageMap[pose]}
            alt="Holo AI mascot"
            width={mascotSize}
            height={mascotSize}
            className="object-contain"
            unoptimized
            priority={priority}
          />
        </>
      ) : (
        <div className="flex items-start gap-0">
          <Image
            src={poseImageMap[pose]}
            alt="Holo AI mascot"
            width={200}
            height={200}
            className="object-contain shrink-0 -mr-8"
            unoptimized
          />
          <div className="flex items-center mt-6">
            <svg
              width="15"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              className="-mr-px shrink-0"
            >
              <path
                d="M0 9L15 0.339746L15 17.6603L0 9Z"
                fill="white"
                stroke="#E6E6E7"
                strokeWidth="1"
              />
              <rect x="14" y="1" width="2" height="16" fill="white" />
            </svg>
            <div className="bg-white border border-holo-gray rounded-[20px] px-4 py-2.5">
              <p className="text-[#1D1D1F] text-base font-medium leading-normal whitespace-pre-line">
                {renderMessageWithBold(message, boldWords)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
