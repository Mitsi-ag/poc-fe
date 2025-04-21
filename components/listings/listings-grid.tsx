"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"

// Mock data for now - this would come from an API
const mockListings = [
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
    status: "For Sale",
    listedDate: "2 days ago",
    agent: "Sarah Johnson",
    views: 245,
    inquiries: 12,
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
    status: "For Sale",
    listedDate: "5 days ago",
    agent: "Michael Chen",
    views: 189,
    inquiries: 8,
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
    status: "For Sale",
    listedDate: "1 week ago",
    agent: "Emma Wilson",
    views: 312,
    inquiries: 15,
    image: "/urban-loft-vista.png",
  },
  {
    id: 4,
    title: "Renovated Victorian Terrace",
    address: "42 Oxford Street, Paddington NSW 2021",
    price: "$2,850,000",
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    area: "165m²",
    type: "Terrace",
    status: "For Sale",
    listedDate: "3 days ago",
    agent: "James Taylor",
    views: 178,
    inquiries: 7,
    image: "/charming-garden-cottage.png",
  },
  {
    id: 5,
    title: "Luxury Penthouse with Harbour Views",
    address: "Penthouse, 88 Elizabeth Bay Road, Elizabeth Bay NSW 2011",
    price: "$5,950,000",
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 3,
    area: "320m²",
    type: "Penthouse",
    status: "For Sale",
    listedDate: "2 weeks ago",
    agent: "Sarah Johnson",
    views: 425,
    inquiries: 18,
    image: "/sleek-city-view.png",
  },
  {
    id: 6,
    title: "Contemporary Beachside Apartment",
    address: "5/24 Campbell Parade, Bondi Beach NSW 2026",
    price: "$1,750,000",
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    area: "98m²",
    type: "Apartment",
    status: "For Sale",
    listedDate: "4 days ago",
    agent: "Michael Chen",
    views: 267,
    inquiries: 14,
    image: "/urban-loft-vista.png",
  },
]

interface ListingsGridProps {
  isManagement?: boolean
  filters?: Record<string, any>
}

export function ListingsGrid({ isManagement = false, filters = {} }: ListingsGridProps) {
  const [listings, setListings] = useState(mockListings)
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  // Memoize the filters object to prevent infinite re-renders
  const stableFilters = JSON.stringify(filters)

  const fetchListings = useCallback(async () => {
    // This simulates an API call with the filters
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Apply filters (in a real app, this would be done on the server)
    let filteredListings = [...mockListings]

    // Simple filtering logic for demonstration
    if (filters.minPrice) {
      filteredListings = filteredListings.filter(
        (listing) => Number.parseInt(listing.price.replace(/\D/g, "")) >= filters.minPrice,
      )
    }

    if (filters.maxPrice) {
      filteredListings = filteredListings.filter(
        (listing) => Number.parseInt(listing.price.replace(/\D/g, "")) <= filters.maxPrice,
      )
    }

    if (filters.bedrooms) {
      filteredListings = filteredListings.filter((listing) => listing.bedrooms >= filters.bedrooms)
    }

    if (filters.propertyType && filters.propertyType !== "all") {
      filteredListings = filteredListings.filter(
        (listing) => listing.type.toLowerCase() === filters.propertyType.toLowerCase(),
      )
    }

    setListings(filteredListings)
    setLoading(false)
  }, [stableFilters])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {listings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <div className="relative">
            <img src={listing.image || "/placeholder.svg"} alt={listing.title} className="w-full h-48 object-cover" />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                onClick={() => toggleFavorite(listing.id)}
              >
                <Heart className={`h-4 w-4 ${favorites.includes(listing.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              {!isManagement && (
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-primary text-white">{listing.status}</Badge>
            </div>
          </div>
          <CardContent className="p-4 pb-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-1">{listing.address}</p>
              </div>
            </div>
          </CardContent>
          <CardContent className="p-4">
            <div className="text-xl font-bold mb-2">{listing.price}</div>
            <div className="flex justify-between text-xs md:text-sm mb-2">
              <div className="flex items-center gap-1">
                <span className="font-medium">{listing.bedrooms}</span> beds
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{listing.bathrooms}</span> baths
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{listing.carSpaces}</span> cars
              </div>
              <div className="flex items-center gap-1 hidden sm:flex">
                <span className="font-medium">{listing.area}</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <div>Listed {listing.listedDate}</div>
              <div>Agent: {listing.agent}</div>
            </div>
            {isManagement && (
              <div className="mt-2 pt-2 border-t flex justify-between text-xs">
                <div className="flex items-center gap-1">
                  <span>{listing.views} views</span>
                </div>
                <div>{listing.inquiries} inquiries</div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-3 pt-0 md:p-4 md:pt-0">
            <Button className="w-full h-9 md:h-10 text-sm" variant="outline">
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
