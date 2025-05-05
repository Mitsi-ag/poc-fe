"use client";

import type React from "react";
import { useOnboarding } from "@/contexts/onboarding-context";
import { cn } from "@/lib/utils";

export function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const { currentStep } = useOnboarding();

  const steps = [
    { id: "welcome", label: "Welcome" },
    { id: "location", label: "Location" },
    { id: "specialization", label: "Specialization" },
    { id: "experience", label: "Experience" },
    { id: "goals", label: "Goals" },
    { id: "dashboard", label: "Dashboard" },
    { id: "complete", label: "Complete" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header with logo */}
      <header className="flex justify-center border-b bg-white/80 px-8 py-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-md">
            <span className="text-lg font-bold text-white">R</span>
          </div>
          <span className="from-primary bg-linear-to-r to-blue-500 bg-clip-text text-xl font-bold text-transparent">
            RealtyMate
          </span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left sidebar with progress */}
        <div className="w-full border-r bg-white p-6 md:w-80 md:p-8">
          <div className="sticky top-8">
            <h2 className="mb-6 text-lg font-semibold">Setup your account</h2>
            <div className="space-y-1">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                    currentStep === step.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-500",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                      currentStep === step.id
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500",
                    )}
                  >
                    {index + 1}
                  </div>
                  <span>{step.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-lg border border-blue-100 bg-blue-50 p-4">
              <h3 className="mb-2 text-sm font-medium text-blue-800">
                Need help?
              </h3>
              <p className="text-xs text-blue-700">
                Contact our support team at{" "}
                <span className="font-medium">support@realtymate.com</span> or
                call us at <span className="font-medium">1300 123 456</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-1 items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
