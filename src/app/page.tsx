"use client";

import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import type { OnboardingData } from "@/hooks/useOnboardingFlow";

export default function Home() {
  function handleComplete(data: OnboardingData) {
    console.log("Onboarding complete!", data);
    alert(
      `Onboarding complete!\n\n${JSON.stringify(data, null, 2)}`
    );
  }

  return <OnboardingWizard onComplete={handleComplete} />;
}
