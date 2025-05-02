export interface Agency {
  id: string;
  name: string;
  logo: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  establishedYear: number;
  areas: string[];
  specializations: string[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const agencies: Agency[] = [
  {
    id: "ag-001",
    name: "Sydney Premier Properties",
    logo: "/modern-real-estate-logo.png",
    address: "125 Elizabeth Street",
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    phone: "02 9123 4567",
    email: "info@sydneypremier.com.au",
    website: "https://sydneypremier.com.au",
    description:
      "Sydney Premier Properties is a leading luxury real estate agency serving Sydney's most prestigious suburbs.",
    establishedYear: 1998,
    areas: ["Eastern Suburbs", "Lower North Shore", "Sydney CBD"],
    specializations: [
      "Luxury Properties",
      "Waterfront Homes",
      "Prestige Apartments",
    ],
    socialMedia: {
      facebook: "https://facebook.com/sydneypremier",
      instagram: "https://instagram.com/sydneypremierproperties",
      linkedin: "https://linkedin.com/company/sydney-premier-properties",
    },
  },
  {
    id: "ag-002",
    name: "Urban Living Real Estate",
    logo: "/sleek-geometric-real-estate.png",
    address: "78 Crown Street",
    suburb: "Surry Hills",
    state: "NSW",
    postcode: "2010",
    phone: "02 9234 5678",
    email: "hello@urbanliving.com.au",
    website: "https://urbanliving.com.au",
    description:
      "Urban Living specializes in inner-city apartments and terraces, with a focus on Sydney's vibrant urban lifestyle.",
    establishedYear: 2005,
    areas: ["Inner West", "Inner City", "South Sydney"],
    specializations: ["Apartments", "Terraces", "Investment Properties"],
    socialMedia: {
      facebook: "https://facebook.com/urbanlivingrealestate",
      instagram: "https://instagram.com/urbanlivingre",
      twitter: "https://twitter.com/urbanlivingre",
    },
  },
  {
    id: "ag-003",
    name: "Northern Beaches Realty",
    logo: "/placeholder.svg?height=80&width=200&query=beach+real+estate+logo",
    address: "45 The Corso",
    suburb: "Manly",
    state: "NSW",
    postcode: "2095",
    phone: "02 9345 6789",
    email: "enquiries@northernbeachesrealty.com.au",
    website: "https://northernbeachesrealty.com.au",
    description:
      "Northern Beaches Realty is the go-to agency for beachside properties along Sydney's stunning Northern Beaches.",
    establishedYear: 2001,
    areas: ["Northern Beaches", "North Shore", "Peninsula"],
    specializations: [
      "Beachfront Properties",
      "Family Homes",
      "Luxury Residences",
    ],
    socialMedia: {
      facebook: "https://facebook.com/northernbeachesrealty",
      instagram: "https://instagram.com/northernbeachesrealty",
      linkedin: "https://linkedin.com/company/northern-beaches-realty",
    },
  },
];
