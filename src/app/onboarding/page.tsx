"use client";

import { useOnboarding } from "@/contexts/onboarding-context";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { WelcomeStep } from "@/components/onboarding/welcome-step";
import { LocationStep } from "@/components/onboarding/location-step";
import { SpecializationStep } from "@/components/onboarding/specialization-step";
import { ExperienceStep } from "@/components/onboarding/experience-step";
import { GoalsStep } from "@/components/onboarding/goals-step";
import { DashboardStep } from "@/components/onboarding/dashboard-step";
import { CompleteStep } from "@/components/onboarding/complete-step";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function OnboardingPage() {
  const { currentStep } = useOnboarding();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user && user.publicMetadata.isOnBoarded) {
      router.push("/dashboard");
    }
  }, [router, user]);

  const renderStep = () => {
    switch (currentStep) {
      case "welcome":
        return <WelcomeStep />;
      case "location":
        return <LocationStep />;
      case "specialization":
        return <SpecializationStep />;
      case "experience":
        return <ExperienceStep />;
      case "goals":
        return <GoalsStep />;
      case "dashboard":
        return <DashboardStep />;
      case "complete":
        return <CompleteStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return <OnboardingLayout>{renderStep()}</OnboardingLayout>;
}
