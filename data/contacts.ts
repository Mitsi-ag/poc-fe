export interface Contact {
  id: string
  type: "buyer" | "seller" | "landlord" | "tenant" | "business" | "other"
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  suburb?: string
  state?: string
  postcode?: string
  notes?: string
  source: "website" | "social-media" | "referral" | "direct" | "portal" | "other"
  stage: "lead" | "prospect" | "client" | "past-client" | "lost"
  assignedTo: string // userId
  agencyId: string
  tags: string[]
  preferences?: {
    propertyTypes?: string[]
    minPrice?: number
    maxPrice?: number
    minBedrooms?: number
    minBathrooms?: number
    locations?: string[]
    features?: string[]
  }
  history: {
    id: string
    date: string
    type: "note" | "email" | "call" | "meeting" | "sms" | "property-view"
    description: string
    listingId?: string
  }[]
  created: string
  updated: string
  lastContact?: string
  nextFollowUp?: string
}

export const contacts: Contact[] = [
  {
    id: "c-001",
    type: "buyer",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "0412 345 678",
    address: "12 Station Street",
    suburb: "Newtown",
    state: "NSW",
    postcode: "2042",
    notes: "Looking for a 3-bedroom family home with a garden in the Inner West.",
    source: "website",
    stage: "lead",
    assignedTo: "u-001",
    agencyId: "ag-001",
    tags: ["first-home-buyer", "pre-approved", "inner-west"],
    preferences: {
      propertyTypes: ["house", "townhouse"],
      minPrice: 1200000,
      maxPrice: 1500000,
      minBedrooms: 3,
      minBathrooms: 2,
      locations: ["Newtown", "Erskineville", "Stanmore", "Petersham"],
      features: ["garden", "parking"],
    },
    history: [
      {
        id: "h-001-1",
        date: "2023-11-25T14:30:00Z",
        type: "note",
        description: "Initial inquiry through website contact form.",
      },
      {
        id: "h-001-2",
        date: "2023-11-26T10:15:00Z",
        type: "call",
        description: "Called to discuss requirements. Confirmed budget and location preferences.",
      },
      {
        id: "h-001-3",
        date: "2023-12-02T11:00:00Z",
        type: "property-view",
        description: "Showed property at 42 Oxford Street, Newtown. Liked the layout but concerned about road noise.",
        listingId: "l-012",
      },
    ],
    created: "2023-11-25T14:30:00Z",
    updated: "2023-12-02T12:30:00Z",
    lastContact: "2023-12-02T11:00:00Z",
    nextFollowUp: "2023-12-09T10:00:00Z",
  },
  {
    id: "c-002",
    type: "seller",
    firstName: "Emma",
    lastName: "Wilson",
    email: "emma.wilson@example.com",
    phone: "0413 456 789",
    address: "45 Beach Road",
    suburb: "Bondi",
    state: "NSW",
    postcode: "2026",
    notes: "Considering selling her apartment in early 2024. Looking for a quick sale with minimal hassle.",
    source: "referral",
    stage: "prospect",
    assignedTo: "u-002",
    agencyId: "ag-001",
    tags: ["downsizer", "motivated", "referral"],
    history: [
      {
        id: "h-002-1",
        date: "2023-11-10T09:45:00Z",
        type: "note",
        description: "Referred by past client Mark Thompson.",
      },
      {
        id: "h-002-2",
        date: "2023-11-15T13:00:00Z",
        type: "meeting",
        description: "Initial meeting at her property. Apartment is in good condition, 2-bed with ocean views.",
      },
      {
        id: "h-002-3",
        date: "2023-11-22T16:30:00Z",
        type: "email",
        description: "Sent market appraisal and selling strategy proposal.",
      },
    ],
    created: "2023-11-10T09:45:00Z",
    updated: "2023-11-22T16:30:00Z",
    lastContact: "2023-11-22T16:30:00Z",
    nextFollowUp: "2023-12-06T10:00:00Z",
  },
  {
    id: "c-003",
    type: "landlord",
    firstName: "Robert",
    lastName: "Chen",
    email: "robert.chen@example.com",
    phone: "0414 567 890",
    address: "8 Investor Avenue",
    suburb: "Chatswood",
    state: "NSW",
    postcode: "2067",
    notes: "Property investor with multiple apartments in North Sydney area. Looking for property management services.",
    source: "direct",
    stage: "client",
    assignedTo: "u-003",
    agencyId: "ag-002",
    tags: ["investor", "multiple-properties", "premium-client"],
    history: [
      {
        id: "h-003-1",
        date: "2023-09-05T10:30:00Z",
        type: "call",
        description: "Initial inquiry about property management services.",
      },
      {
        id: "h-003-2",
        date: "2023-09-12T14:00:00Z",
        type: "meeting",
        description: "Met to discuss portfolio of 3 investment properties.",
      },
      {
        id: "h-003-3",
        date: "2023-09-20T11:15:00Z",
        type: "note",
        description: "Signed property management agreement for 2 properties in North Sydney.",
      },
      {
        id: "h-003-4",
        date: "2023-11-14T15:30:00Z",
        type: "email",
        description: "Sent monthly performance report for managed properties.",
      },
    ],
    created: "2023-09-05T10:30:00Z",
    updated: "2023-11-14T15:30:00Z",
    lastContact: "2023-11-14T15:30:00Z",
    nextFollowUp: "2023-12-14T15:00:00Z",
  },
  {
    id: "c-004",
    type: "buyer",
    firstName: "Lisa",
    lastName: "Taylor",
    email: "lisa.taylor@example.com",
    phone: "0415 678 901",
    suburb: "Rose Bay",
    state: "NSW",
    postcode: "2029",
    notes: "Looking for a high-end apartment with water views. Budget not an issue for the right property.",
    source: "social-media",
    stage: "prospect",
    assignedTo: "u-004",
    agencyId: "ag-002",
    tags: ["premium-buyer", "water-views", "apartment"],
    preferences: {
      propertyTypes: ["apartment"],
      minPrice: 3000000,
      maxPrice: 7000000,
      minBedrooms: 3,
      minBathrooms: 2,
      locations: ["Point Piper", "Rose Bay", "Double Bay", "Vaucluse"],
      features: ["water-views", "security", "parking"],
    },
    history: [
      {
        id: "h-004-1",
        date: "2023-11-18T16:45:00Z",
        type: "note",
        description: "Inquiry through Instagram about premium listings.",
      },
      {
        id: "h-004-2",
        date: "2023-11-20T11:30:00Z",
        type: "call",
        description: "Discussed requirements and arranged to show off-market listings.",
      },
      {
        id: "h-004-3",
        date: "2023-11-28T14:00:00Z",
        type: "property-view",
        description: "Showed 3 properties in Point Piper. Particularly interested in the penthouse on Wolseley Road.",
        listingId: "l-037",
      },
    ],
    created: "2023-11-18T16:45:00Z",
    updated: "2023-11-28T15:30:00Z",
    lastContact: "2023-11-28T14:00:00Z",
    nextFollowUp: "2023-12-05T11:00:00Z",
  },
  {
    id: "c-005",
    type: "tenant",
    firstName: "Michael",
    lastName: "Jones",
    email: "michael.jones@example.com",
    phone: "0416 789 012",
    notes: "Looking for a 2-bedroom apartment to rent in Surry Hills or Darlinghurst. Budget $750-850 per week.",
    source: "portal",
    stage: "lead",
    assignedTo: "u-005",
    agencyId: "ag-003",
    tags: ["apartment", "inner-city", "professional"],
    preferences: {
      propertyTypes: ["apartment"],
      minPrice: 750,
      maxPrice: 850,
      minBedrooms: 2,
      minBathrooms: 1,
      locations: ["Surry Hills", "Darlinghurst"],
      features: ["air-conditioning", "balcony"],
    },
    history: [
      {
        id: "h-005-1",
        date: "2023-12-01T09:15:00Z",
        type: "note",
        description: "Inquiry through Domain.com.au for apartment listings.",
      },
      {
        id: "h-005-2",
        date: "2023-12-02T13:45:00Z",
        type: "call",
        description: "Discussed requirements and available properties. Will send suitable listings.",
      },
    ],
    created: "2023-12-01T09:15:00Z",
    updated: "2023-12-02T13:45:00Z",
    lastContact: "2023-12-02T13:45:00Z",
    nextFollowUp: "2023-12-04T10:00:00Z",
  },
]
