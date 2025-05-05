"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export function ListingsMap() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex h-[calc(100vh-180px)] min-h-[500px] flex-col overflow-hidden rounded-lg border md:flex-row">
      {/* Map View */}
      <div className="relative flex-1 bg-gray-100">
        <img
          src="/sydney-cityscape-map.png"
          alt="Sydney Map"
          className="h-full w-full object-cover"
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
        <div className="absolute right-1/3 bottom-1/3">
          <MapMarker price="$2.85M" type="terrace" />
        </div>
        <div className="absolute right-1/4 bottom-1/4">
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
          className="absolute top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-white shadow-md"
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
        <div className="bg-background h-[250px] w-full overflow-y-auto md:h-auto md:w-[400px]">
          <div className="p-3 md:p-4">
            <h3 className="mb-2 text-sm font-medium md:text-base">
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
    <div className="group relative">
      <div className="absolute mb-1 -translate-x-1/2 -translate-y-full opacity-0 transition-opacity group-hover:opacity-100">
        <div className="rounded bg-white px-2 py-1 text-xs font-medium shadow-md">
          {price} · {type}
        </div>
      </div>
      <div className="bg-primary cursor-pointer rounded-full p-1 text-white shadow-md">
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
          className="h-24 w-24 object-cover"
        />
        <CardContent className="flex-1 p-3">
          <h4 className="line-clamp-1 text-sm font-medium">{title}</h4>
          <p className="text-muted-foreground mb-1 line-clamp-1 text-xs">
            {address}
          </p>
          <div className="mb-1 text-sm font-bold">{price}</div>
          <div className="text-muted-foreground flex text-xs">
            <span className="mr-2">{beds} beds</span>
            <span>{baths} baths</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
