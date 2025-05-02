// This is a mock implementation - in a real app, this would fetch data from an API or database

interface LocationData {
  state: string;
  description: string;
  population: number;
  medianPrice: number;
  coordinates: { lat: number; lng: number };
}

interface SuburbData extends LocationData {
  postcode: string;
  localCouncil: string;
}

// Mock location data
const locationDatabase: Record<string, LocationData> = {
  sydney: {
    state: "NSW",
    description:
      "Sydney is Australia's largest and most iconic city, known for its harbour-front Opera House, Harbour Bridge, and beautiful beaches.",
    population: 5312000,
    medianPrice: 1250000,
    coordinates: { lat: -33.8688, lng: 151.2093 },
  },
  melbourne: {
    state: "VIC",
    description:
      "Melbourne is a stylish, cosmopolitan city with a vibrant cultural scene, renowned for its restaurants, art galleries, and sports events.",
    population: 5078000,
    medianPrice: 950000,
    coordinates: { lat: -37.8136, lng: 144.9631 },
  },
  brisbane: {
    state: "QLD",
    description:
      "Brisbane is a sunny, sophisticated city with a flourishing restaurant, bar, and cultural scene, set on the Brisbane River.",
    population: 2560000,
    medianPrice: 750000,
    coordinates: { lat: -27.4698, lng: 153.0251 },
  },
  perth: {
    state: "WA",
    description:
      "Perth combines urban cool with natural beauty, offering pristine beaches, parklands, and a laid-back lifestyle.",
    population: 2085000,
    medianPrice: 650000,
    coordinates: { lat: -31.9505, lng: 115.8605 },
  },
  adelaide: {
    state: "SA",
    description:
      "Adelaide is an elegant, cultural city known for its festivals, food and wine, and colonial architecture.",
    population: 1376000,
    medianPrice: 590000,
    coordinates: { lat: -34.9285, lng: 138.6007 },
  },
  "gold-coast": {
    state: "QLD",
    description:
      "The Gold Coast is famous for its surf beaches, high-rise skyline, theme parks, and vibrant nightlife.",
    population: 710000,
    medianPrice: 780000,
    coordinates: { lat: -28.0167, lng: 153.4 },
  },
  canberra: {
    state: "ACT",
    description:
      "Canberra, Australia's capital, is a planned city with national museums, galleries, and monuments.",
    population: 431000,
    medianPrice: 830000,
    coordinates: { lat: -35.2809, lng: 149.13 },
  },
};

// Mock suburb data
const suburbDatabase: Record<string, Record<string, SuburbData>> = {
  sydney: {
    bondi: {
      state: "NSW",
      description:
        "Bondi is a vibrant beachside suburb famous for its iconic Bondi Beach, coastal walks, and trendy café culture.",
      population: 11500,
      medianPrice: 2700000,
      coordinates: { lat: -33.8912, lng: 151.2744 },
      postcode: "2026",
      localCouncil: "Waverley Council",
    },
    manly: {
      state: "NSW",
      description:
        "Manly offers a perfect blend of beach lifestyle, outdoor activities, and dining options, with easy ferry access to the CBD.",
      population: 17000,
      medianPrice: 3200000,
      coordinates: { lat: -33.7969, lng: 151.2879 },
      postcode: "2095",
      localCouncil: "Northern Beaches Council",
    },
    parramatta: {
      state: "NSW",
      description:
        "Parramatta is a rapidly developing commercial hub with a rich history, diverse culture, and excellent transport links.",
      population: 28000,
      medianPrice: 950000,
      coordinates: { lat: -33.8148, lng: 151.0011 },
      postcode: "2150",
      localCouncil: "City of Parramatta",
    },
  },
  melbourne: {
    brunswick: {
      state: "VIC",
      description:
        "Brunswick is a trendy, multicultural suburb known for its arts scene, live music venues, and excellent dining options.",
      population: 24000,
      medianPrice: 1150000,
      coordinates: { lat: -37.7667, lng: 144.96 },
      postcode: "3056",
      localCouncil: "Moreland City Council",
    },
    "st-kilda": {
      state: "VIC",
      description:
        "St Kilda is a bustling beachside suburb with a famous esplanade, Luna Park, and a vibrant entertainment scene.",
      population: 21000,
      medianPrice: 1350000,
      coordinates: { lat: -37.8644, lng: 144.9733 },
      postcode: "3182",
      localCouncil: "Port Phillip City Council",
    },
  },
};

export async function getLocationData(location: string): Promise<LocationData> {
  // In a real app, this would fetch from an API or database

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Return mock data or fallback
  return (
    locationDatabase[location] || {
      state: "Australia",
      description: `${location.replace(/-/g, " ")} is a wonderful place to live and invest in property.`,
      population: 50000,
      medianPrice: 800000,
      coordinates: { lat: -25.2744, lng: 133.7751 }, // Center of Australia
    }
  );
}

export async function getSuburbData(
  suburb: string,
  location: string,
): Promise<SuburbData> {
  // In a real app, this would fetch from an API or database

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Get suburb data or create fallback
  const locationSuburbs = suburbDatabase[location] || {};
  const suburbData = locationSuburbs[suburb];

  if (suburbData) {
    return suburbData;
  }

  // Fallback suburb data
  const locationData = await getLocationData(location);
  const formattedSuburb = suburb
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    ...locationData,
    description: `${formattedSuburb} is a lovely area in ${location.replace(/-/g, " ")}.`,
    population: Math.round(locationData.population / 20),
    medianPrice: locationData.medianPrice * (0.8 + Math.random() * 0.4),
    coordinates: {
      lat: locationData.coordinates.lat + (Math.random() * 0.1 - 0.05),
      lng: locationData.coordinates.lng + (Math.random() * 0.1 - 0.05),
    },
    postcode: `2${Math.floor(Math.random() * 900) + 100}`,
    localCouncil: `${formattedSuburb} Council`,
  };
}

// Function to generate sitemap data for SEO
export async function generateSitemapData() {
  // Get all locations
  const locations = Object.keys(locationDatabase);

  // Get all suburbs
  const suburbs: Array<{ location: string; suburb: string }> = [];
  for (const location in suburbDatabase) {
    for (const suburb in suburbDatabase[location]) {
      suburbs.push({ location, suburb });
    }
  }

  return {
    locations,
    suburbs,
  };
}
