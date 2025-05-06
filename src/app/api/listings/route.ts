import { listingsAPI } from "@/services/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const listings = await listingsAPI.getListings();
    return NextResponse.json({ data: listings, message: "" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: null, message: "Something went wrong!" });
  }
}

export async function POST(request: Request) {
  try {
    const listing = await request.json();

    // In a real backend, this would validate and save the listing
    // For now, just return success with the data that would be saved
    return NextResponse.json(
      {
        success: true,
        data: {
          ...listing,
          id: `l-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          listingDate: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
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
