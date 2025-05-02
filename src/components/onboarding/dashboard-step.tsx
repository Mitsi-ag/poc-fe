"use client";

import { useState } from "react";
import { useOnboarding } from "@/contexts/onboarding-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const dashboardWidgets = [
  {
    id: "market-opportunities",
    label: "Market Opportunities",
    description: "Potential listings and market gaps in your areas",
    default: true,
  },
  {
    id: "competitor-activity",
    label: "Competitor Activity",
    description: "Recent listings and sales by other agents in your areas",
    default: true,
  },
  {
    id: "property-insights",
    label: "Property Insights",
    description: "Price trends and property statistics for your areas",
    default: true,
  },
  {
    id: "lead-suggestions",
    label: "Lead Suggestions",
    description: "AI-generated potential leads based on market activity",
    default: true,
  },
  {
    id: "upcoming-auctions",
    label: "Upcoming Auctions",
    description: "Calendar of upcoming auctions in your areas",
    default: false,
  },
  {
    id: "recent-sales",
    label: "Recent Sales",
    description: "Latest sales data for your areas of interest",
    default: false,
  },
  {
    id: "pitch-templates",
    label: "Pitch Templates",
    description: "Quick access to customizable pitch templates",
    default: false,
  },
  {
    id: "market-news",
    label: "Market News",
    description: "Latest real estate news relevant to your areas",
    default: false,
  },
];

export function DashboardStep() {
  const { userData, updateUserData, nextStep, prevStep } = useOnboarding();
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>(
    userData.preferredDashboardWidgets?.length
      ? userData.preferredDashboardWidgets
      : dashboardWidgets.filter((w) => w.default).map((w) => w.id),
  );

  const toggleWidget = (id: string) => {
    if (selectedWidgets.includes(id)) {
      setSelectedWidgets(selectedWidgets.filter((widget) => widget !== id));
    } else {
      setSelectedWidgets([...selectedWidgets, id]);
    }
  };

  const handleContinue = () => {
    updateUserData({ preferredDashboardWidgets: selectedWidgets });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Customize your dashboard
        </h1>
        <p className="text-gray-500">
          Select which widgets you'd like to see on your dashboard. You can
          always change this later.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label>Select dashboard widgets</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dashboardWidgets.map((widget) => (
              <div
                key={widget.id}
                className={cn(
                  "border rounded-lg p-4 cursor-pointer transition-all",
                  selectedWidgets.includes(widget.id)
                    ? "border-primary bg-primary/5"
                    : "hover:border-gray-300 hover:bg-gray-50",
                )}
                onClick={() => toggleWidget(widget.id)}
              >
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id={widget.id}
                    checked={selectedWidgets.includes(widget.id)}
                    onCheckedChange={() => toggleWidget(widget.id)}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor={widget.id} className="font-medium">
                      {widget.label}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {widget.description}
                    </p>
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
          disabled={selectedWidgets.length === 0}
          className="gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
