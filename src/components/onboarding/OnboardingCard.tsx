"use client";

interface OnboardingCardProps {
  children: React.ReactNode;
}

export function OnboardingCard({ children }: OnboardingCardProps) {
  return (
    <div className="bg-white flex items-start justify-center p-5 w-full h-full min-h-screen">
      <div className="bg-holo-card flex flex-col h-full min-h-[calc(100vh-40px)] w-full max-w-[1240px] items-center justify-between overflow-hidden p-10 rounded-[20px] relative">
        {/* Decorative background blobs */}
        <div
          className="absolute -right-72 -top-56 w-[1100px] h-[680px] rotate-[102deg] opacity-80 pointer-events-none"
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/holo/bg-blob-right.svg"
            alt=""
            className="w-full h-full"
          />
        </div>
        <div
          className="absolute -left-28 -top-40 w-[624px] h-[673px] rotate-[105deg] opacity-80 pointer-events-none"
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/holo/bg-blob-left.svg"
            alt=""
            className="w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full w-full items-center justify-between flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
