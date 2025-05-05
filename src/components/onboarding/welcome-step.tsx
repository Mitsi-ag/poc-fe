"use client";

import { useState } from "react";
import { useOnboarding } from "@/contexts/onboarding-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

export function WelcomeStep() {
  const { userData, updateUserData, nextStep } = useOnboarding();
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [isValid, setIsValid] = useState(false);

  const handleContinue = () => {
    updateUserData({ name, email });
    nextStep();
  };

  // Validate form
  const validateForm = () => {
    const isNameValid = name.trim().length > 0;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValid(isNameValid && isEmailValid);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to RealtyMate
        </h1>
        <p className="text-gray-500">
          Let&apos;s set up your account to get the most out of your AI-powered
          real estate assistant.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            placeholder="John Smith"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateForm();
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@yourrealestate.com.au"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateForm();
            }}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleContinue} disabled={!isValid} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
