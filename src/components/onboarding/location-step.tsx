"use client";

import { useState } from "react";
import { useOnboarding } from "@/contexts/onboarding-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, X, PlusCircle } from "lucide-react";
import { toast } from "sonner";

// Australian suburbs/regions for demonstration
const popularLocations = [
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Gold Coast",
  "Bondi",
  "Manly",
  "St Kilda",
  "Surfers Paradise",
  "Byron Bay",
  "Noosa",
  "Hobart",
  "Darwin",
  "Canberra",
];

export function LocationStep() {
  const { userData, updateUserData, nextStep, prevStep } = useOnboarding();
  const [locations, setLocations] = useState<string[]>(
    userData.locations || [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 1) {
      const filtered = popularLocations.filter(
        (location) =>
          location.toLowerCase().includes(term.toLowerCase()) &&
          !locations.includes(location),
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addLocation = (location: string) => {
    if (!locations.includes(location) && location.trim() !== "") {
      const newLocations = [...locations, location];
      setLocations(newLocations);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const removeLocation = (location: string) => {
    setLocations(locations.filter((l) => l !== location));
  };

  const handleContinue = () => {
    if (locations.length === 0)
      return toast.error("Please select atleast one location");
    updateUserData({ locations });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Where do you operate?
        </h1>
        <p className="text-gray-500">
          Select the suburbs or regions where you primarily work. This helps us
          tailor your dashboard and insights.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="location-search">Search locations</Label>
          <div className="relative">
            <Input
              id="location-search"
              placeholder="Type a suburb or region..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-1 max-h-48 overflow-y-auto rounded-md border bg-white p-2 shadow-sm">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-100"
                  onClick={() => addLocation(suggestion)}
                >
                  <PlusCircle className="text-primary h-4 w-4" />
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected locations */}
        <div className="space-y-2">
          <Label>Your selected locations</Label>
          <div className="min-h-24 rounded-md border bg-gray-50 p-3">
            {locations.length === 0 ? (
              <p className="text-sm text-gray-400">
                No locations selected yet. Search and add locations above.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <Badge
                    key={location}
                    variant="secondary"
                    className="flex items-center gap-1 py-1 pr-1 pl-2"
                  >
                    {location}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-1 h-4 w-4 rounded-full hover:bg-gray-200"
                      onClick={() => removeLocation(location)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handleContinue} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
