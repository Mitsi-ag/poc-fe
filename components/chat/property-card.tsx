import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square } from "lucide-react"

interface PropertyCardProps {
  id: string
  address: string
  suburb: string
  price: string
  imageUrl: string
  beds: number
  baths: number
  carSpaces: number
  sqm: number
}

export function PropertyCard({ id, address, suburb, price, imageUrl, beds, baths, carSpaces, sqm }: PropertyCardProps) {
  return (
    <Link href={`/listings/${id}`} className="block no-underline">
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 border-gray-200 dark:border-gray-800">
        <div className="relative h-32 w-full">
          <Image src={imageUrl || "/placeholder.svg"} alt={address} fill className="object-cover" />
        </div>
        <CardContent className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-medium text-sm line-clamp-1">{address}</h4>
              <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{suburb}</span>
              </div>
            </div>
            <Badge className="shrink-0">{price}</Badge>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Bed className="h-3 w-3 mr-1" />
              <span>{beds}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-3 w-3 mr-1" />
              <span>{baths}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-3 w-3 mr-1" />
              <span>{sqm}m²</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
