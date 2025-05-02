"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type OnboardingStep =
  | "welcome"
  | "location"
  | "specialization"
  | "experience"
  | "goals"
  | "dashboard"
  | "complete";

interface OnboardingContextType {
  currentStep: OnboardingStep;
  isOnboardingComplete: boolean;
  userData: {
    name: string;
    email: string;
    locations: string[];
    specializations: string[];
    experience: string;
    goals: string[];
    preferredDashboardWidgets: string[];
  };
  updateUserData: (data: Partial<OnboardingContextType["userData"]>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const defaultUserData = {
  name: "",
  email: "",
  locations: [],
  specializations: [],
  experience: "",
  goals: [],
  preferredDashboardWidgets: [],
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [userData, setUserData] = useState(defaultUserData);

  // Check if onboarding is complete from localStorage on initial load
  useEffect(() => {
    const storedOnboardingStatus = localStorage.getItem("onboardingComplete");
    if (storedOnboardingStatus === "true") {
      setIsOnboardingComplete(true);
    }

    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (e) {
        console.error("Failed to parse stored user data", e);
      }
    }
  }, []);

  const updateUserData = (data: Partial<typeof userData>) => {
    const updatedData = { ...userData, ...data };
    setUserData(updatedData);
    localStorage.setItem("userData", JSON.stringify(updatedData));
  };

  const nextStep = () => {
    const steps: OnboardingStep[] = [
      "welcome",
      "location",
      "specialization",
      "experience",
      "goals",
      "dashboard",
      "complete",
    ];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: OnboardingStep[] = [
      "welcome",
      "location",
      "specialization",
      "experience",
      "goals",
      "dashboard",
      "complete",
    ];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    localStorage.setItem("onboardingComplete", "true");
    router.push("/");
  };

  const resetOnboarding = () => {
    setIsOnboardingComplete(false);
    setCurrentStep("welcome");
    setUserData(defaultUserData);
    localStorage.removeItem("onboardingComplete");
    localStorage.removeItem("userData");
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        isOnboardingComplete,
        userData,
        updateUserData,
        nextStep,
        prevStep,
        goToStep,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
