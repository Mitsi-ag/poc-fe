import { NextResponse } from "next/server";
import { calendarEvents } from "@/data/calendar";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Parse query parameters
  const userId = searchParams.get("userId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const listingId = searchParams.get("listingId");

  // Filter events based on query parameters
  let filteredEvents = [...calendarEvents];

  if (userId) {
    filteredEvents = filteredEvents.filter((event) => event.userId === userId);
  }

  if (startDate) {
    const start = new Date(startDate);
    filteredEvents = filteredEvents.filter(
      (event) => new Date(event.start) >= start,
    );
  }

  if (endDate) {
    const end = new Date(endDate);
    filteredEvents = filteredEvents.filter(
      (event) => new Date(event.start) <= end,
    );
  }

  if (type) {
    filteredEvents = filteredEvents.filter((event) => event.type === type);
  }

  if (status) {
    filteredEvents = filteredEvents.filter((event) => event.status === status);
  }

  if (listingId) {
    filteredEvents = filteredEvents.filter(
      (event) => event.listingId === listingId,
    );
  }

  // Return the filtered events
  return NextResponse.json({
    success: true,
    data: filteredEvents,
  });
}

export async function POST(request: Request) {
  try {
    const event = await request.json();

    // In a real backend, this would validate and save the event
    return NextResponse.json(
      {
        success: true,
        data: {
          ...event,
          id: `e-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request data",
      },
      { status: 400 },
    );
  }
}
