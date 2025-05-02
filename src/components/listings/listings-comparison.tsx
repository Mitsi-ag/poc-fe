"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample comparison data
const comparisonProperties = [
  {
    id: 1,
    title: "Modern Waterfront Apartment",
    address: "42 Harbour Street, Sydney NSW 2000",
    price: "$1,850,000",
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    area: "142m²",
    type: "Apartment",
    yearBuilt: 2018,
    features: ["Air Conditioning", "Balcony", "City Views", "Gym", "Pool"],
    image: "/sleek-city-view.png",
  },
  {
    id: 2,
    title: "Charming Family Home with Garden",
    address: "15 Wattle Avenue, Bondi NSW 2026",
    price: "$2,450,000",
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 2,
    area: "280m²",
    type: "House",
    yearBuilt: 2005,
    features: [
      "Garden",
      "Outdoor Entertainment",
      "Renovated Kitchen",
      "Solar Panels",
    ],
    image: "/charming-garden-cottage.png",
  },
  {
    id: 3,
    title: "Stylish Urban Loft with City Views",
    address: "7/120 Crown Street, Surry Hills NSW 2010",
    price: "$1,295,000",
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    area: "115m²",
    type: "Apartment",
    yearBuilt: 2015,
    features: [
      "Air Conditioning",
      "Balcony",
      "City Views",
      "Security Building",
    ],
    image: "/urban-loft-vista.png",
  },
];

export function ListingsComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Comparison</CardTitle>
        <CardDescription>
          Compare properties side by side to make informed decisions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full" orientation="horizontal">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-4 gap-4">
              {/* Header column */}
              <div className="space-y-6 pt-[180px]">
                <div className="font-medium">Price</div>
                <div className="font-medium">Property Type</div>
                <div className="font-medium">Bedrooms</div>
                <div className="font-medium">Bathrooms</div>
                <div className="font-medium">Car Spaces</div>
                <div className="font-medium">Area</div>
                <div className="font-medium">Year Built</div>
                <Separator className="my-4" />
                <div className="font-medium">Features</div>
                <div className="pl-4">Air Conditioning</div>
                <div className="pl-4">Balcony</div>
                <div className="pl-4">City Views</div>
                <div className="pl-4">Garden</div>
                <div className="pl-4">Gym</div>
                <div className="pl-4">Outdoor Entertainment</div>
                <div className="pl-4">Pool</div>
                <div className="pl-4">Renovated Kitchen</div>
                <div className="pl-4">Security Building</div>
                <div className="pl-4">Solar Panels</div>
              </div>

              {/* Property columns */}
              {comparisonProperties.map((property) => (
                <div key={property.id} className="space-y-6">
                  <div className="relative">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-semibold line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {property.address}
                    </p>
                  </div>
                  <div className="font-bold">{property.price}</div>
                  <div>{property.type}</div>
                  <div>{property.bedrooms}</div>
                  <div>{property.bathrooms}</div>
                  <div>{property.carSpaces}</div>
                  <div>{property.area}</div>
                  <div>{property.yearBuilt}</div>
                  <Separator className="my-4" />
                  <div className="font-medium">Features</div>
                  <div>
                    {property.features.includes("Air Conditioning") ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    {property.features.includes("Balcony") ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    {property.features.includes("City Views") ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    {property.features.includes("Garden") ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    {property.features.includes("Gym") ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    {property.features.includes("Outdoor Entertainment") ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    {property.features.includes("Pool") ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    {property.features.includes("Renovated Kitchen") ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    {property.features.includes("Security Building") ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    {property.features.includes("Solar Panels") ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}

              {/* Add property column */}
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6">
                <div className="mb-4 p-4 bg-muted rounded-full">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Add Property</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Add another property to compare
                </p>
                <Button>Add Property</Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
