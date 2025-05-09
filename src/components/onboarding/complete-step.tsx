"use client";

import { useOnboarding } from "@/contexts/onboarding-context";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export function CompleteStep() {
  const { userData, completeOnboarding } = useOnboarding();

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          You&apos;re all set, {userData.name}!
        </h1>
        <p className="text-gray-500">
          Your RealtyMate account has been personalized based on your
          preferences. You&apos;re ready to start gaining a competitive edge in
          the real estate market.
        </p>
      </div>

      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-left">
        <h3 className="mb-2 text-sm font-medium text-blue-800">
          What&apos;s next?
        </h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-start gap-2">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-200">
              <span className="text-xs font-medium text-blue-800">1</span>
            </div>
            <span>
              Explore your personalized dashboard with insights for{" "}
              {userData.locations.length > 0
                ? userData.locations[0]
                : "your areas"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-200">
              <span className="text-xs font-medium text-blue-800">2</span>
            </div>
            <span>
              Try the AI Assistant to get answers about the market and
              competitor activity
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-200">
              <span className="text-xs font-medium text-blue-800">3</span>
            </div>
            <span>
              Generate your first AI-powered pitch to win more listings
            </span>
          </li>
        </ul>
      </div>

      <div className="pt-6">
        <Button onClick={completeOnboarding} className="gap-2 px-8" size="lg">
          Go to Dashboard <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
