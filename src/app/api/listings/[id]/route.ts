import { NextResponse } from "next/server";
import { listings } from "@/data/listings";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const id = params.id;

  const listing = listings.find((listing) => listing.id === id);

  if (!listing) {
    return NextResponse.json(
      {
        success: false,
        error: "Listing not found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data: listing,
  });
}

export async function PUT(request: Request, { params }: Params) {
  const id = params.id;

  // Find the listing index
  const listingIndex = listings.findIndex((listing) => listing.id === id);

  if (listingIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "Listing not found",
      },
      { status: 404 },
    );
  }

  try {
    const updatedData = await request.json();

    // In a real backend, this would validate and update the listing in a database
    // For now, just return success with the data that would be saved
    return NextResponse.json({
      success: true,
      data: {
        ...listings[listingIndex],
        ...updatedData,
        lastUpdated: new Date().toISOString(),
      },
    });
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

export async function DELETE(request: Request, { params }: Params) {
  const id = params.id;

  // Find the listing index
  const listingIndex = listings.findIndex((listing) => listing.id === id);

  if (listingIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "Listing not found",
      },
      { status: 404 },
    );
  }

  // In a real backend, this would delete the listing from a database
  // For now, just return success
  return NextResponse.json({
    success: true,
    message: `Listing ${id} successfully deleted`,
  });
}
