"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, Edit, Trash2, Plus } from "lucide-react"

// Sample saved searches data
const savedSearches = [
  {
    id: 1,
    name: "Bondi Beach Apartments",
    criteria: [
      { label: "Location", value: "Bondi Beach" },
      { label: "Property Type", value: "Apartment" },
      { label: "Price", value: "$800k - $1.5M" },
      { label: "Bedrooms", value: "2+" },
    ],
    notificationsEnabled: true,
    lastUpdated: "2 days ago",
    matchCount: 12,
  },
  {
    id: 2,
    name: "Family Homes in Eastern Suburbs",
    criteria: [
      { label: "Location", value: "Eastern Suburbs" },
      { label: "Property Type", value: "House" },
      { label: "Price", value: "$2M - $3.5M" },
      { label: "Bedrooms", value: "4+" },
      { label: "Features", value: "Pool, Garden" },
    ],
    notificationsEnabled: false,
    lastUpdated: "1 week ago",
    matchCount: 8,
  },
  {
    id: 3,
    name: "Investment Properties",
    criteria: [
      { label: "Location", value: "Multiple Suburbs" },
      { label: "Property Type", value: "Any" },
      { label: "Price", value: "Up to $1M" },
      { label: "Yield", value: "4%+" },
    ],
    notificationsEnabled: true,
    lastUpdated: "3 days ago",
    matchCount: 15,
  },
]

// Sample saved properties data
const savedProperties = [
  {
    id: 1,
    address: "42 Harbour Street, Sydney NSW 2000",
    price: "$1,850,000",
    savedDate: "2 days ago",
  },
  {
    id: 2,
    address: "15 Wattle Avenue, Bondi NSW 2026",
    price: "$2,450,000",
    savedDate: "1 week ago",
  },
  {
    id: 3,
    address: "7/120 Crown Street, Surry Hills NSW 2010",
    price: "$1,295,000",
    savedDate: "3 days ago",
  },
  {
    id: 4,
    address: "Penthouse, 88 Elizabeth Bay Road, Elizabeth Bay NSW 2011",
    price: "$5,950,000",
    savedDate: "2 weeks ago",
  },
]

export function ListingsSavedSearches() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Saved Searches</CardTitle>
              <CardDescription>Get notified when new properties match your criteria</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Search
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {savedSearches.map((search) => (
              <Card key={search.id}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{search.name}</CardTitle>
                      <CardDescription>Last updated {search.lastUpdated}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Bell
                          className={`h-4 w-4 ${search.notificationsEnabled ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <Switch checked={search.notificationsEnabled} />
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {search.criteria.map((criterion, index) => (
                      <Badge key={index} variant="outline" className="px-2 py-1">
                        {criterion.label}: {criterion.value}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{search.matchCount}</span> properties match this search
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    View Matches
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Saved Properties</CardTitle>
            <CardDescription>Properties you've saved for later</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {savedProperties.map((property) => (
              <div key={property.id} className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0">
                <div>
                  <div className="font-medium">{property.address}</div>
                  <div className="text-sm text-muted-foreground">
                    {property.price} · Saved {property.savedDate}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Saved Properties
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
