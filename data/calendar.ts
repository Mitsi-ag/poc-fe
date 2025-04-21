export interface CalendarEvent {
  id: string
  title: string
  description: string
  start: string
  end: string
  allDay: boolean
  location?: string
  type: "inspection" | "appointment" | "meeting" | "personal" | "deadline" | "other"
  status: "confirmed" | "tentative" | "cancelled"
  color: string // CSS color
  userId: string
  listingId?: string
  contactIds?: string[]
  recurrence?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly"
    interval: number
    endDate?: string
    count?: number
    weekDays?: number[] // 0 = Sunday, 6 = Saturday
  }
  reminders: {
    time: number // minutes before event
    type: "email" | "notification" | "sms"
  }[]
  notes?: string
  private: boolean
  externalCalendarId?: string
  createdAt: string
  updatedAt: string
}

export const calendarEvents: CalendarEvent[] = [
  {
    id: "e-001",
    title: "Open House - 42 Ocean View Drive",
    description: "Open inspection for the beachfront apartment",
    start: "2023-12-10T10:00:00Z",
    end: "2023-12-10T10:30:00Z",
    allDay: false,
    location: "42 Ocean View Drive, Bondi NSW 2026",
    type: "inspection",
    status: "confirmed",
    color: "#4CAF50",
    userId: "u-001",
    listingId: "l-001",
    reminders: [
      {
        time: 60,
        type: "notification",
      },
      {
        time: 120,
        type: "email",
      },
    ],
    notes: "Expecting 12-15 groups. Have brochures ready.",
    private: false,
    createdAt: "2023-11-25T09:00:00Z",
    updatedAt: "2023-11-25T09:00:00Z",
  },
  {
    id: "e-002",
    title: "Meeting with John Buyer",
    description: "Discuss property requirements and budget",
    start: "2023-12-11T14:00:00Z",
    end: "2023-12-11T15:00:00Z",
    allDay: false,
    location: "Sydney Premier Properties Office",
    type: "appointment",
    status: "confirmed",
    color: "#2196F3",
    userId: "u-001",
    contactIds: ["c-007"],
    reminders: [
      {
        time: 30,
        type: "notification",
      },
    ],
    notes: "First-home buyer looking in Eastern Suburbs. Budget $1.5M.",
    private: true,
    createdAt: "2023-12-05T11:30:00Z",
    updatedAt: "2023-12-05T11:30:00Z",
  },
  {
    id: "e-003",
    title: "Property Photoshoot",
    description: "Professional photos for new listing",
    start: "2023-12-12T09:00:00Z",
    end: "2023-12-12T10:30:00Z",
    allDay: false,
    location: "15 Harbour Street, Darling Point NSW 2027",
    type: "appointment",
    status: "confirmed",
    color: "#9C27B0",
    userId: "u-002",
    listingId: "l-002",
    reminders: [
      {
        time: 60,
        type: "notification",
      },
      {
        time: 1440,
        type: "email",
      },
    ],
    notes: "Photographer: Sydney Property Photography. Call owner to confirm.",
    private: false,
    createdAt: "2023-12-01T15:45:00Z",
    updatedAt: "2023-12-04T09:15:00Z",
  },
  {
    id: "e-004",
    title: "Team Meeting",
    description: "Weekly sales meeting",
    start: "2023-12-13T09:00:00Z",
    end: "2023-12-13T10:00:00Z",
    allDay: false,
    location: "Conference Room",
    type: "meeting",
    status: "confirmed",
    color: "#FF9800",
    userId: "u-002",
    recurrence: {
      frequency: "weekly",
      interval: 1,
      weekDays: [3], // Wednesday
    },
    reminders: [
      {
        time: 15,
        type: "notification",
      },
    ],
    notes: "Discuss current sales pipeline and marketing initiatives.",
    private: false,
    createdAt: "2023-10-20T14:00:00Z",
    updatedAt: "2023-10-20T14:00:00Z",
  },
  {
    id: "e-005",
    title: "Property Valuation",
    description: "Market appraisal for potential vendor",
    start: "2023-12-14T11:00:00Z",
    end: "2023-12-14T12:00:00Z",
    allDay: false,
    location: "22 Park Avenue, Double Bay NSW 2028",
    type: "appointment",
    status: "tentative",
    color: "#F44336",
    userId: "u-001",
    contactIds: ["c-012"],
    reminders: [
      {
        time: 60,
        type: "notification",
      },
      {
        time: 1440,
        type: "email",
      },
    ],
    notes: "Owner considering selling in the new year. Prepare comparable sales.",
    private: true,
    createdAt: "2023-12-07T10:30:00Z",
    updatedAt: "2023-12-07T10:30:00Z",
  },
]
