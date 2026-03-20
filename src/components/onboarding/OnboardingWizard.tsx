"use client";

import { useCallback } from "react";
import {
  useOnboardingFlow,
  type StepId,
  type OnboardingData,
} from "@/hooks/useOnboardingFlow";
import { OnboardingCard } from "./OnboardingCard";
import { WelcomeStep } from "./steps/WelcomeStep";
import { WebsiteUrlStep } from "./steps/WebsiteUrlStep";
import { BusinessInfoStep } from "./steps/BusinessInfoStep";
import { LanguageSelectStep } from "./steps/LanguageSelectStep";
import { AnalyzingBrandStep } from "./steps/AnalyzingBrandStep";
import { TemplatePickerStep } from "./steps/TemplatePickerStep";
import { CompletionStep } from "./steps/CompletionStep";
import { ErrorRetryStep } from "./steps/ErrorRetryStep";

const DEFAULT_STEPS: StepId[] = [
  "welcome",
  "website-url",
  "business-info",
  "language",
  "analyzing",
  "template-picker",
  "completion",
];

interface OnboardingWizardProps {
  steps?: StepId[];
  onComplete?: (data: OnboardingData) => void;
}

export function OnboardingWizard({
  steps = DEFAULT_STEPS,
  onComplete,
}: OnboardingWizardProps) {
  const flow = useOnboardingFlow({
    steps,
    onComplete,
  });

  const handleAnalyzingComplete = useCallback(() => {
    flow.next();
  }, [flow]);

  const handleAnalyzingError = useCallback(() => {
    flow.triggerError();
  }, [flow]);

  function renderStep() {
    switch (flow.currentStep) {
      case "welcome":
        return <WelcomeStep onContinue={flow.next} />;

      case "website-url":
        return (
          <WebsiteUrlStep
            onContinue={(d) => {
              flow.updateData({ websiteUrl: d.websiteUrl });
              flow.next();
            }}
            onBack={flow.back}
            onSkipWebsite={flow.next}
            currentStep={flow.progressStep}
            totalSteps={flow.totalInputSteps}
            defaultValue={flow.data.websiteUrl}
          />
        );

      case "business-info":
        return (
          <BusinessInfoStep
            onContinue={(d) => {
              flow.updateData(d);
              flow.next();
            }}
            onBack={flow.back}
            currentStep={flow.progressStep}
            totalSteps={flow.totalInputSteps}
            defaultValue={
              flow.data.businessName
                ? {
                    businessName: flow.data.businessName,
                    industry: flow.data.industry ?? "",
                    productType: flow.data.productType ?? "",
                  }
                : undefined
            }
          />
        );

      case "language":
        return (
          <LanguageSelectStep
            onContinue={(d) => {
              flow.updateData({ languages: d.languages });
              flow.next();
            }}
            onBack={flow.back}
            currentStep={flow.progressStep}
            totalSteps={flow.totalInputSteps}
            defaultValue={flow.data.languages}
          />
        );

      case "analyzing":
        return (
          <AnalyzingBrandStep
            onComplete={handleAnalyzingComplete}
            onError={handleAnalyzingError}
          />
        );

      case "template-picker":
        return (
          <TemplatePickerStep
            onContinue={(d) => {
              flow.updateData({ templates: d.templates });
              flow.next();
            }}
            onBack={flow.back}
            currentStep={flow.progressStep}
            totalSteps={flow.totalInputSteps}
            defaultValue={flow.data.templates}
          />
        );

      case "completion":
        return <CompletionStep onContinue={flow.complete} />;

      case "error":
        return (
          <ErrorRetryStep
            onRetry={flow.retry}
            onSkip={flow.next}
          />
        );

      default:
        return null;
    }
  }

  return (
    <OnboardingCard>
      <div
        key={flow.currentStep}
        className="flex flex-col items-center justify-between w-full h-full flex-1 animate-fadeIn"
      >
        {renderStep()}
      </div>
    </OnboardingCard>
  );
}
