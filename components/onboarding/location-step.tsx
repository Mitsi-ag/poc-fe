"use client"

import { useState } from "react"
import { useOnboarding } from "@/contexts/onboarding-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, X, PlusCircle } from "lucide-react"

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
]

export function LocationStep() {
  const { userData, updateUserData, nextStep, prevStep } = useOnboarding()
  const [locations, setLocations] = useState<string[]>(userData.locations || [])
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.length > 1) {
      const filtered = popularLocations.filter(
        (location) => location.toLowerCase().includes(term.toLowerCase()) && !locations.includes(location),
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const addLocation = (location: string) => {
    if (!locations.includes(location) && location.trim() !== "") {
      const newLocations = [...locations, location]
      setLocations(newLocations)
      setSearchTerm("")
      setSuggestions([])
    }
  }

  const removeLocation = (location: string) => {
    setLocations(locations.filter((l) => l !== location))
  }

  const handleContinue = () => {
    updateUserData({ locations })
    nextStep()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Where do you operate?</h1>
        <p className="text-gray-500">
          Select the suburbs or regions where you primarily work. This helps us tailor your dashboard and insights.
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
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-1 p-2 bg-white border rounded-md shadow-sm max-h-48 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="px-2 py-1.5 hover:bg-gray-100 rounded cursor-pointer flex items-center gap-2"
                  onClick={() => addLocation(suggestion)}
                >
                  <PlusCircle className="h-4 w-4 text-primary" />
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected locations */}
        <div className="space-y-2">
          <Label>Your selected locations</Label>
          <div className="min-h-24 p-3 border rounded-md bg-gray-50">
            {locations.length === 0 ? (
              <p className="text-gray-400 text-sm">No locations selected yet. Search and add locations above.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <Badge key={location} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                    {location}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-gray-200 rounded-full"
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

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={prevStep} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handleContinue} disabled={locations.length === 0} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
