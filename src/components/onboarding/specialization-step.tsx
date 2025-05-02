"use client";

import { useState } from "react";
import { useOnboarding } from "@/contexts/onboarding-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const specializations = [
  { id: "residential-sales", label: "Residential Sales", icon: "🏠" },
  { id: "residential-rentals", label: "Residential Rentals", icon: "🔑" },
  { id: "luxury-properties", label: "Luxury Properties", icon: "💎" },
  { id: "commercial", label: "Commercial", icon: "🏢" },
  { id: "development-sites", label: "Development Sites", icon: "🏗️" },
  { id: "rural-properties", label: "Rural Properties", icon: "🌾" },
  { id: "off-the-plan", label: "Off The Plan", icon: "📝" },
  { id: "first-home-buyers", label: "First Home Buyers", icon: "🔍" },
];

export function SpecializationStep() {
  const { userData, updateUserData, nextStep, prevStep } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(
    userData.specializations || [],
  );

  const toggleSpecialization = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = () => {
    updateUserData({ specializations: selected });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          What do you specialize in?
        </h1>
        <p className="text-gray-500">
          Select the property types you specialize in. This helps us customize
          your experience.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label>Select your specializations</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {specializations.map((spec) => (
              <div
                key={spec.id}
                className={cn(
                  "border rounded-lg p-4 cursor-pointer transition-all",
                  selected.includes(spec.id)
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:border-gray-300 hover:bg-gray-50",
                )}
                onClick={() => toggleSpecialization(spec.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{spec.icon}</div>
                  <div className="flex-1">{spec.label}</div>
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border flex items-center justify-center",
                      selected.includes(spec.id)
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300",
                    )}
                  >
                    {selected.includes(spec.id) && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
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
          disabled={selected.length === 0}
          className="gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
