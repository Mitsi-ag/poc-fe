"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

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
    userName: string;
    email: string;
    locations: string[];
    specializations: string[];
    experience_level: number;
    goals: string[];
    preferredDashboardWidgets: string[];
    role: string;
    companyName: string;
  };
  updateUserData: (data: Partial<OnboardingContextType["userData"]>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  resetOnboarding: () => void;
}

const defaultUserData: OnboardingContextType["userData"] = {
  userName: "",
  email: "",
  locations: [],
  specializations: [],
  experience_level: 0,
  goals: [],
  preferredDashboardWidgets: [],
  role: "",
  companyName: "",
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [userData, setUserData] = useState(defaultUserData);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setUserData({
        ...defaultUserData,
        userName: user?.firstName + " " + user?.lastName,
        email: user.emailAddresses[0].emailAddress,
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.publicMetadata.isOnBoarded) {
      setIsOnboardingComplete(true);
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
        } catch (e) {
          console.error("Failed to parse stored user data", e);
        }
      }
    }
  }, [user]);

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

  const resetOnboarding = () => {
    setIsOnboardingComplete(false);
    setCurrentStep("welcome");
    setUserData(defaultUserData);
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
