"use client";

import { useState } from "react";
import { useOnboarding } from "@/contexts/onboarding-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";

const goals = [
  {
    id: "more-listings",
    label: "Win more listings",
    description:
      "Get tools and insights to help you secure more property listings",
  },
  {
    id: "market-insights",
    label: "Get market insights",
    description:
      "Stay ahead with real-time data on property trends and competitor activity",
  },
  {
    id: "save-time",
    label: "Save time on admin",
    description: "Automate repetitive tasks and streamline your workflow",
  },
  {
    id: "better-pitches",
    label: "Create better pitches",
    description: "Generate compelling, data-driven pitches that win clients",
  },
  {
    id: "track-competitors",
    label: "Track competitor agents",
    description: "Monitor other agents' activities in your target areas",
  },
  {
    id: "grow-network",
    label: "Grow my network",
    description:
      "Find opportunities to connect with potential clients and partners",
  },
];

export function GoalsStep() {
  const { userData, updateUserData, nextStep, prevStep } = useOnboarding();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    userData.goals || [],
  );

  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter((goal) => goal !== id));
    } else {
      setSelectedGoals([...selectedGoals, id]);
    }
  };

  const handleContinue = () => {
    updateUserData({ goals: selectedGoals });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          What are your goals?
        </h1>
        <p className="text-gray-500">
          Select what you'd like to achieve with RealtyMate. We'll customize
          your experience accordingly.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label>Select your goals (choose at least one)</Label>
          <div className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-start space-x-2">
                <Checkbox
                  id={goal.id}
                  checked={selectedGoals.includes(goal.id)}
                  onCheckedChange={() => toggleGoal(goal.id)}
                  className="mt-1"
                />
                <div className="grid gap-1.5">
                  <Label htmlFor={goal.id} className="font-medium">
                    {goal.label}
                  </Label>
                  <p className="text-sm text-gray-500">{goal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={prevStep} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={selectedGoals.length === 0}
          className="gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
