import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { ListingsController } from "@/modules/listings/controller";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const controller = new ListingsController();
    const data = await controller.fetchAll(searchParams);
    return NextResponse.json({ data, message: null });
  } catch (error) {
    let message = DEFAULT_ERROR_MESSAGE;
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ data: null, message });
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
