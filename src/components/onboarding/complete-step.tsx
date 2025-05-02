"use client";

import { useOnboarding } from "@/contexts/onboarding-context";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export function CompleteStep() {
  const { userData, completeOnboarding } = useOnboarding();

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          You're all set, {userData.name}!
        </h1>
        <p className="text-gray-500">
          Your RealtyMate account has been personalized based on your
          preferences. You're ready to start gaining a competitive edge in the
          real estate market.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-left">
        <h3 className="text-sm font-medium text-blue-800 mb-2">What's next?</h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-800 text-xs font-medium">1</span>
            </div>
            <span>
              Explore your personalized dashboard with insights for{" "}
              {userData.locations.length > 0
                ? userData.locations[0]
                : "your areas"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-800 text-xs font-medium">2</span>
            </div>
            <span>
              Try the AI Assistant to get answers about the market and
              competitor activity
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-800 text-xs font-medium">3</span>
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
