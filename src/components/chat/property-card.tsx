import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square } from "lucide-react";

interface PropertyCardProps {
  id: string;
  address: string;
  suburb: string;
  price: string;
  imageUrl: string;
  beds: number;
  baths: number;
  carSpaces: number;
  sqm: number;
}

export function PropertyCard({
  id,
  address,
  suburb,
  price,
  imageUrl,
  beds,
  baths,
  carSpaces,
  sqm,
}: PropertyCardProps) {
  return (
    <Link href={`/listings/${id}`} className="block no-underline">
      <Card className="overflow-hidden border-gray-200 transition-shadow duration-200 hover:shadow-md dark:border-gray-800">
        <div className="relative h-32 w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={address}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="line-clamp-1 text-sm font-medium">{address}</h4>
              <div className="text-muted-foreground mt-0.5 flex items-center text-xs">
                <MapPin className="mr-1 h-3 w-3" />
                <span>{suburb}</span>
              </div>
            </div>
            <Badge className="shrink-0">{price}</Badge>
          </div>
          <div className="text-muted-foreground mt-2 flex items-center gap-3 text-xs">
            <div className="flex items-center">
              <Bed className="mr-1 h-3 w-3" />
              <span>{beds}</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-1 h-3 w-3" />
              <span>{baths}</span>
            </div>
            <div className="flex items-center">
              <Square className="mr-1 h-3 w-3" />
              <span>{sqm}m²</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
