"use client";

import type React from "react";

import { useState, useEffect, createContext, useContext } from "react";

interface TrialContextType {
  isTrialActive: boolean;
  trialStartDate: Date | null;
  trialEndDate: Date | null;
  daysLeft: number;
  progress: number;
  hasTrialEnded: boolean;
  isTrialEnding: boolean;
}

const TrialContext = createContext<TrialContextType | undefined>(undefined);

export function TrialProvider({ children }: { children: React.ReactNode }) {
  // In a real app, this would fetch from your backend
  const [trialData, setTrialData] = useState({
    isTrialActive: true,
    trialStartDate: new Date("2023-04-24"),
    trialEndDate: new Date("2023-05-01"),
    daysLeft: 0,
    progress: 0,
    hasTrialEnded: false,
    isTrialEnding: false,
  });

  useEffect(() => {
    // Calculate trial status
    const now = new Date();
    const startDate = trialData.trialStartDate;
    const endDate = trialData.trialEndDate;

    if (startDate && endDate) {
      const totalDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      const daysElapsed = Math.ceil(
        (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      const remaining = Math.max(0, totalDays - daysElapsed);

      setTrialData((prev) => ({
        ...prev,
        daysLeft: remaining,
        progress: Math.min(100, (daysElapsed / totalDays) * 100),
        hasTrialEnded: now > endDate,
        isTrialEnding: remaining <= 2 && remaining > 0,
      }));
    }
  }, [trialData.trialStartDate, trialData.trialEndDate]);

  return (
    <TrialContext.Provider value={trialData}>{children}</TrialContext.Provider>
  );
}

export function useTrial() {
  const context = useContext(TrialContext);
  if (context === undefined) {
    throw new Error("useTrial must be used within a TrialProvider");
  }
  return context;
}
