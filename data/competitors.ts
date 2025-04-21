export interface Competitor {
  id: string
  name: string
  agencyId: string
  logo?: string
  location: string
  website?: string
  phone?: string
  email?: string
  establishedYear?: number
  size: "small" | "medium" | "large" | "enterprise"
  marketShare?: number
  areas: string[]
  specializations: string[]
  strength: "low" | "medium" | "high"
  topAgents: {
    name: string
    photo?: string
    specialization?: string
    recentSales?: number
    averageSalePrice?: number
  }[]
  recentListings: {
    address: string
    price?: number
    listedDate: string
    status: "active" | "under-offer" | "sold" | "withdrawn"
    soldDate?: string
    soldPrice?: number
    daysOnMarket?: number
    link?: string
  }[]
  marketingStrategies: string[]
  notes?: string
}

export const competitors: Competitor[] = [
  {
    id: "comp-001",
    name: "Elite Property Group",
    agencyId: "ag-001",
    logo: "/placeholder.svg?height=80&width=200&query=luxury+real+estate+logo",
    location: "Double Bay, NSW",
    website: "https://elitepropertygroup.com.au",
    phone: "02 9123 4567",
    email: "info@elitepropertygroup.com.au",
    establishedYear: 1985,
    size: "large",
    marketShare: 22.5,
    areas: ["Eastern Suburbs", "CBD", "Lower North Shore"],
    specializations: ["Luxury Properties", "Waterfront Homes", "Prestige Apartments"],
    strength: "high",
    topAgents: [
      {
        name: "James Wilson",
        photo: "/placeholder.svg?height=100&width=100&query=real+estate+agent+professional",
        specialization: "Luxury Homes",
        recentSales: 18,
        averageSalePrice: 4850000,
      },
      {
        name: "Alexandra Brown",
        photo: "/placeholder.svg?height=100&width=100&query=female+real+estate+agent+professional",
        specialization: "Waterfront Properties",
        recentSales: 12,
        averageSalePrice: 6200000,
      },
    ],
    recentListings: [
      {
        address: "25 Victoria Road, Bellevue Hill",
        price: 12500000,
        listedDate: "2023-10-10T00:00:00Z",
        status: "active",
        daysOnMarket: 58,
        link: "https://domain.com.au/property/123456",
      },
      {
        address: "8 Wolseley Road, Point Piper",
        price: 18500000,
        listedDate: "2023-09-15T00:00:00Z",
        status: "sold",
        soldDate: "2023-11-20T00:00:00Z",
        soldPrice: 17800000,
        daysOnMarket: 66,
        link: "https://domain.com.au/property/123457",
      },
      {
        address: "42 Ocean Avenue, Double Bay",
        price: 7250000,
        listedDate: "2023-11-05T00:00:00Z",
        status: "under-offer",
        daysOnMarket: 32,
        link: "https://domain.com.au/property/123458",
      },
    ],
    marketingStrategies: [
      "Luxury magazine advertising",
      "High-end property videos",
      "International marketing network",
      "Exclusive client events",
    ],
    notes:
      "Known for their strong presence in the luxury market and international connections. Recently expanded their team with two top-performing agents from other agencies.",
  },
  {
    id: "comp-002",
    name: "Metro Realty",
    agencyId: "ag-002",
    logo: "/placeholder.svg?height=80&width=200&query=modern+city+real+estate+logo",
    location: "Surry Hills, NSW",
    website: "https://metrorealty.com.au",
    phone: "02 9234 5678",
    email: "hello@metrorealty.com.au",
    establishedYear: 2010,
    size: "medium",
    marketShare: 15.8,
    areas: ["Inner City", "Inner West", "Eastern Suburbs"],
    specializations: ["Apartments", "Terraces", "Development Sites"],
    strength: "medium",
    topAgents: [
      {
        name: "Olivia Chen",
        photo: "/placeholder.svg?height=100&width=100&query=asian+female+real+estate+agent",
        specialization: "Inner City Apartments",
        recentSales: 22,
        averageSalePrice: 1350000,
      },
    ],
    recentListings: [
      {
        address: "12/56 Crown Street, Surry Hills",
        price: 1250000,
        listedDate: "2023-11-12T00:00:00Z",
        status: "active",
        daysOnMarket: 25,
        link: "https://domain.com.au/property/123459",
      },
      {
        address: "88 Abercrombie Street, Chippendale",
        price: 2850000,
        listedDate: "2023-10-28T00:00:00Z",
        status: "sold",
        soldDate: "2023-11-25T00:00:00Z",
        soldPrice: 2750000,
        daysOnMarket: 28,
        link: "https://domain.com.au/property/123460",
      },
    ],
    marketingStrategies: [
      "Strong social media presence",
      "Urban lifestyle blog",
      "First-home buyer seminars",
      "Local community sponsorships",
    ],
    notes:
      "Rapidly growing agency with a strong digital presence. Popular with younger buyers and investors. Recently opened a second office in Newtown.",
  },
  {
    id: "comp-003",
    name: "Northern Shores Real Estate",
    agencyId: "ag-003",
    logo: "/placeholder.svg?height=80&width=200&query=beach+property+logo",
    location: "Manly, NSW",
    website: "https://northernshores.com.au",
    phone: "02 9345 6789",
    email: "sales@northernshores.com.au",
    establishedYear: 1998,
    size: "medium",
    marketShare: 18.2,
    areas: ["Northern Beaches", "Lower North Shore"],
    specializations: ["Beachfront Properties", "Family Homes", "Downsizer Apartments"],
    strength: "high",
    topAgents: [
      {
        name: "David Thompson",
        photo: "/placeholder.svg?height=100&width=100&query=male+beach+real+estate+agent",
        specialization: "Beachfront Homes",
        recentSales: 15,
        averageSalePrice: 3250000,
      },
      {
        name: "Sarah Miller",
        photo: "/placeholder.svg?height=100&width=100&query=professional+female+beach+real+estate+agent",
        specialization: "Family Homes",
        recentSales: 19,
        averageSalePrice: 2450000,
      },
    ],
    recentListings: [
      {
        address: "15 Marine Parade, Manly",
        price: 5750000,
        listedDate: "2023-11-02T00:00:00Z",
        status: "active",
        daysOnMarket: 35,
        link: "https://domain.com.au/property/123461",
      },
      {
        address: "42 Bower Street, Manly",
        price: 4250000,
        listedDate: "2023-10-15T00:00:00Z",
        status: "under-offer",
        daysOnMarket: 53,
        link: "https://domain.com.au/property/123462",
      },
      {
        address: "8 Beach Road, Collaroy",
        price: 3850000,
        listedDate: "2023-09-20T00:00:00Z",
        status: "sold",
        soldDate: "2023-11-15T00:00:00Z",
        soldPrice: 3950000,
        daysOnMarket: 56,
        link: "https://domain.com.au/property/123463",
      },
    ],
    marketingStrategies: [
      "Local newspaper advertising",
      "Beach lifestyle focus",
      "Community events",
      "Sports team sponsorships",
    ],
    notes:
      "Well-established agency with deep local connections. Strong reputation for knowledge of the Northern Beaches market. Recently invested in new property management software.",
  },
]
