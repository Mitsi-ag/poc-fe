import { NextResponse } from "next/server";
import { calendarEvents } from "@/data/calendar";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const id = params.id;

  const event = calendarEvents.find((event) => event.id === id);

  if (!event) {
    return NextResponse.json(
      {
        success: false,
        error: "Event not found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data: event,
  });
}

export async function PUT(request: Request, { params }: Params) {
  const id = params.id;

  // Find the event index
  const eventIndex = calendarEvents.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "Event not found",
      },
      { status: 404 },
    );
  }

  try {
    const updatedData = await request.json();

    // In a real backend, this would validate and update the event in a database
    return NextResponse.json({
      success: true,
      data: {
        ...calendarEvents[eventIndex],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request data",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const id = params.id;

  // Find the event index
  const eventIndex = calendarEvents.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "Event not found",
      },
      { status: 404 },
    );
  }

  // In a real backend, this would delete the event from a database
  return NextResponse.json({
    success: true,
    message: `Event ${id} successfully deleted`,
  });
}
