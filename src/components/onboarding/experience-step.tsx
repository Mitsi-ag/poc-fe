"use client";

import { useState } from "react";
import { useOnboarding } from "@/contexts/onboarding-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight } from "lucide-react";

const experienceLevels = [
  {
    id: "new",
    label: "New to real estate (0-2 years)",
    description: "Just starting your journey in real estate",
  },
  {
    id: "growing",
    label: "Growing my business (2-5 years)",
    description: "Established but looking to expand your client base",
  },
  {
    id: "established",
    label: "Established agent (5-10 years)",
    description: "Experienced with a solid reputation in your area",
  },
  {
    id: "veteran",
    label: "Veteran agent (10+ years)",
    description: "A seasoned professional with extensive market knowledge",
  },
];

export function ExperienceStep() {
  const { userData, updateUserData, nextStep, prevStep } = useOnboarding();
  const [experience, setExperience] = useState(userData.experience || "");

  const handleContinue = () => {
    updateUserData({ experience });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          What&apos;s your experience level?
        </h1>
        <p className="text-gray-500">
          This helps us tailor our AI assistant and tools to your specific
          needs.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label>Select your experience level</Label>
          <RadioGroup
            value={experience}
            onValueChange={setExperience}
            className="space-y-3"
          >
            {experienceLevels.map((level) => (
              <div key={level.id} className="flex items-start space-x-2">
                <RadioGroupItem
                  value={level.id}
                  id={level.id}
                  className="mt-1"
                />
                <div className="grid gap-1.5">
                  <Label htmlFor={level.id} className="font-medium">
                    {level.label}
                  </Label>
                  <p className="text-sm text-gray-500">{level.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!experience}
          className="gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
