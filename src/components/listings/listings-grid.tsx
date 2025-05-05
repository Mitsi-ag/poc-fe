"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, toCapitalCase } from "@/lib/utils";
import { useListingsQuery } from "@/modules/listings/hooks/queries";
import { Bath, Bed, Car, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ListingsGridProps {
  isManagement?: boolean;
  filters?: Record<string, unknown>;
}

export function ListingsGrid({ isManagement = false }: ListingsGridProps) {
  const { data: listings, isLoading } = useListingsQuery();
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="mb-4 h-6 w-1/2" />
              <div className="mb-4 flex gap-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {listings?.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <div className="relative">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={listing.images[0] || "/placeholder.svg"}
                alt={listing.address.display_name}
                className="object-cover"
                fill
              />
            </AspectRatio>
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                onClick={() => toggleFavorite(listing.id)}
              >
                <Heart
                  className={`h-4 w-4 ${favorites.includes(listing.id) ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
              {!isManagement && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-primary text-white">{listing.type_of}</Badge>
            </div>
          </div>
          <CardContent className="p-4 pb-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="line-clamp-1 text-lg font-semibold">
                  {listing.address.display_name}
                </h3>
                <p className="text-muted-foreground line-clamp-1 text-sm">
                  {toCapitalCase(listing.address.suburb)}
                </p>
              </div>
            </div>
          </CardContent>
          <CardContent className="p-4">
            <div className="mb-2 text-xl font-bold">{listing.price}</div>
            <div className="mb-2 flex justify-between text-xs md:text-sm">
              <div className="flex items-center gap-1">
                <Bed className="size-4" />
                <span className="font-medium">{listing.bedrooms} bed(s)</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="size-4" />
                <span className="font-medium">{listing.bathrooms} bath(s)</span>
              </div>
              <div className="flex items-center gap-1">
                <Car className="size-4" />
                <span className="font-medium">{listing.parking} car(s)</span>
              </div>
              {/* <div className="hidden gap-1 items-center sm:flex"> */}
              {/*   <span className="font-medium">{listing.area}</span> */}
              {/* </div> */}
            </div>
            <div className="text-muted-foreground flex justify-between text-xs">
              <div>Listed: {formatDate(listing.updated_on)}</div>
              {/* <div>Agent: {listing.agent}</div> */}
            </div>
            {/* {isManagement && ( */}
            {/*   <div className="flex justify-between pt-2 mt-2 text-xs border-t"> */}
            {/*     <div className="flex gap-1 items-center"> */}
            {/*       <span>{listing.views} views</span> */}
            {/*     </div> */}
            {/*     <div>{listing.inquiries} inquiries</div> */}
            {/*   </div> */}
            {/* )} */}
          </CardContent>
          <CardFooter className="p-3 pt-0 md:p-4 md:pt-0">
            <Button className="h-9 w-full text-sm md:h-10" variant="outline">
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
