"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export function ListingsMap() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-180px)] min-h-[500px] border rounded-lg overflow-hidden">
      {/* Map View */}
      <div className="relative flex-1 bg-gray-100">
        <img
          src="/sydney-cityscape-map.png"
          alt="Sydney Map"
          className="w-full h-full object-cover"
        />

        {/* Map Markers */}
        <div className="absolute top-1/4 left-1/3">
          <MapMarker price="$1.85M" type="apartment" />
        </div>
        <div className="absolute top-1/3 left-1/2">
          <MapMarker price="$2.45M" type="house" />
        </div>
        <div className="absolute top-1/2 left-1/4">
          <MapMarker price="$1.29M" type="apartment" />
        </div>
        <div className="absolute bottom-1/3 right-1/3">
          <MapMarker price="$2.85M" type="terrace" />
        </div>
        <div className="absolute bottom-1/4 right-1/4">
          <MapMarker price="$5.95M" type="penthouse" />
        </div>
        <div className="absolute top-2/3 right-1/2">
          <MapMarker price="$1.75M" type="apartment" />
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white shadow-md"
          >
            <span className="text-lg font-bold">+</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white shadow-md"
          >
            <span className="text-lg font-bold">-</span>
          </Button>
        </div>

        {/* Sidebar Toggle */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white shadow-md"
          style={{
            [showSidebar ? "right" : "left"]: showSidebar ? "-12px" : "8px",
          }}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar with Listings */}
      {showSidebar && (
        <div className="w-full h-[250px] md:h-auto md:w-[400px] bg-background overflow-y-auto">
          <div className="p-3 md:p-4">
            <h3 className="font-medium mb-2 text-sm md:text-base">
              6 Properties Found
            </h3>
            <div className="space-y-3 md:space-y-4">
              {/* Simplified listing cards for the sidebar */}
              <ListingSidebarCard
                title="Modern Waterfront Apartment"
                address="42 Harbour Street, Sydney NSW 2000"
                price="$1,850,000"
                beds={3}
                baths={2}
                image="/sleek-city-view.png"
              />
              <ListingSidebarCard
                title="Charming Family Home with Garden"
                address="15 Wattle Avenue, Bondi NSW 2026"
                price="$2,450,000"
                beds={4}
                baths={3}
                image="/charming-garden-cottage.png"
              />
              <ListingSidebarCard
                title="Stylish Urban Loft with City Views"
                address="7/120 Crown Street, Surry Hills NSW 2010"
                price="$1,295,000"
                beds={2}
                baths={2}
                image="/urban-loft-vista.png"
              />
              <ListingSidebarCard
                title="Renovated Victorian Terrace"
                address="42 Oxford Street, Paddington NSW 2021"
                price="$2,850,000"
                beds={3}
                baths={2}
                image="/charming-garden-cottage.png"
              />
              <ListingSidebarCard
                title="Luxury Penthouse with Harbour Views"
                address="Penthouse, 88 Elizabeth Bay Road, Elizabeth Bay NSW 2011"
                price="$5,950,000"
                beds={4}
                baths={3}
                image="/sleek-city-view.png"
              />
              <ListingSidebarCard
                title="Contemporary Beachside Apartment"
                address="5/24 Campbell Parade, Bondi Beach NSW 2026"
                price="$1,750,000"
                beds={2}
                baths={2}
                image="/urban-loft-vista.png"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface MapMarkerProps {
  price: string;
  type: string;
}

function MapMarker({ price, type }: MapMarkerProps) {
  return (
    <div className="relative group">
      <div className="absolute -translate-x-1/2 -translate-y-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white px-2 py-1 rounded shadow-md text-xs font-medium">
          {price} · {type}
        </div>
      </div>
      <div className="bg-primary text-white rounded-full p-1 shadow-md cursor-pointer">
        <MapPin className="h-4 w-4" />
      </div>
    </div>
  );
}

interface ListingSidebarCardProps {
  title: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  image: string;
}

function ListingSidebarCard({
  title,
  address,
  price,
  beds,
  baths,
  image,
}: ListingSidebarCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-24 h-24 object-cover"
        />
        <CardContent className="p-3 flex-1">
          <h4 className="font-medium text-sm line-clamp-1">{title}</h4>
          <p className="text-muted-foreground text-xs line-clamp-1 mb-1">
            {address}
          </p>
          <div className="font-bold text-sm mb-1">{price}</div>
          <div className="flex text-xs text-muted-foreground">
            <span className="mr-2">{beds} beds</span>
            <span>{baths} baths</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
