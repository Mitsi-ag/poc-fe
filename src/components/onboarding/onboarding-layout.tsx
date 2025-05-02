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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header with logo */}
      <header className="py-6 px-8 flex justify-center border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            RealtyMate
          </span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left sidebar with progress */}
        <div className="w-full md:w-80 bg-white border-r p-6 md:p-8">
          <div className="sticky top-8">
            <h2 className="text-lg font-semibold mb-6">Setup your account</h2>
            <div className="space-y-1">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 py-2 px-3 rounded-md transition-colors",
                    currentStep === step.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-500",
                  )}
                >
                  <div
                    className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium",
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

            <div className="mt-12 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
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
        <div className="flex-1 p-6 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
