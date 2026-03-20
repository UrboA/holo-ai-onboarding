"use client";

import { useCallback, useState } from "react";

export type StepId =
  | "welcome"
  | "website-url"
  | "business-info"
  | "language"
  | "analyzing"
  | "template-picker"
  | "completion"
  | "error";

export interface OnboardingData {
  websiteUrl?: string;
  businessName?: string;
  industry?: string;
  productType?: string;
  languages?: string[];
  templates?: string[];
}

interface UseOnboardingFlowOptions {
  steps: StepId[];
  onComplete?: (data: OnboardingData) => void;
}

export function useOnboardingFlow({ steps, onComplete }: UseOnboardingFlowOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<OnboardingData>({});
  const [hasError, setHasError] = useState(false);

  const currentStep = hasError ? ("error" as StepId) : steps[currentIndex];

  const inputSteps = steps.filter(
    (s) => !["welcome", "analyzing", "completion", "error"].includes(s)
  );
  const totalInputSteps = inputSteps.length;

  const currentInputIndex = inputSteps.indexOf(currentStep);
  const progressStep = currentInputIndex >= 0 ? currentInputIndex + 1 : 0;

  const next = useCallback(() => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex((i) => i + 1);
      setHasError(false);
    }
  }, [currentIndex, steps.length]);

  const back = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setHasError(false);
    }
  }, [currentIndex]);

  const skip = useCallback(() => {
    next();
  }, [next]);

  const goToStep = useCallback(
    (stepId: StepId) => {
      const idx = steps.indexOf(stepId);
      if (idx >= 0) {
        setCurrentIndex(idx);
        setHasError(false);
      }
    },
    [steps]
  );

  const updateData = useCallback(
    (partial: Partial<OnboardingData>) => {
      setData((prev) => {
        const updated = { ...prev, ...partial };
        return updated;
      });
    },
    []
  );

  const triggerError = useCallback(() => {
    setHasError(true);
  }, []);

  const retry = useCallback(() => {
    setHasError(false);
  }, []);

  const complete = useCallback(() => {
    onComplete?.(data);
  }, [onComplete, data]);

  return {
    currentStep,
    currentIndex,
    data,
    totalInputSteps,
    progressStep,
    next,
    back,
    skip,
    goToStep,
    updateData,
    triggerError,
    retry,
    complete,
    hasError,
  };
}
