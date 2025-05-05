import { listingSchema } from "@/modules/listings/entites/listing.entity";
import { responseSchema } from "@/modules/shared/response-schema";
import { listingsAPI } from "@/services/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const { searchParams } = new URL(request.url);
    const result = await listingsAPI.getListings();
    const parseResult = responseSchema(listingSchema).safeParse(result);
    if (!parseResult.success) {
      return NextResponse.json({
        data: [],
        message: "Failed to parse server response as listing",
      });
    }

    const data = parseResult.data;
    return NextResponse.json({ data, message: "" });

    // // Parse query parameters
    // const suburb = searchParams.get("suburb");
    // const propertyType = searchParams.get("propertyType");
    // const minPrice = searchParams.get("minPrice")
    //   ? Number.parseInt(searchParams.get("minPrice")!)
    //   : undefined;
    // const maxPrice = searchParams.get("maxPrice")
    //   ? Number.parseInt(searchParams.get("maxPrice")!)
    //   : undefined;
    // const minBedrooms = searchParams.get("minBedrooms")
    //   ? Number.parseInt(searchParams.get("minBedrooms")!)
    //   : undefined;
    // const minBathrooms = searchParams.get("minBathrooms")
    //   ? Number.parseInt(searchParams.get("minBathrooms")!)
    //   : undefined;
    // const status = searchParams.get("status");
    // const agentId = searchParams.get("agentId");
    // const agencyId = searchParams.get("agencyId");
    // const limit = searchParams.get("limit")
    //   ? Number.parseInt(searchParams.get("limit")!)
    //   : undefined;
    // const offset = searchParams.get("offset")
    //   ? Number.parseInt(searchParams.get("offset")!)
    //   : 0;
    //
    // // Filter listings based on query parameters
    // let filteredListings = [...listings];
    //
    // if (suburb) {
    //   filteredListings = filteredListings.filter((listing) =>
    //     listing.suburb.toLowerCase().includes(suburb.toLowerCase()),
    //   );
    // }
    //
    // if (propertyType) {
    //   filteredListings = filteredListings.filter(
    //     (listing) => listing.propertyType === propertyType,
    //   );
    // }
    //
    // if (minPrice) {
    //   filteredListings = filteredListings.filter(
    //     (listing) => listing.price >= minPrice,
    //   );
    // }
    //
    // if (maxPrice) {
    //   filteredListings = filteredListings.filter(
    //     (listing) => listing.price <= maxPrice,
    //   );
    // }
    //
    // if (minBedrooms) {
    //   filteredListings = filteredListings.filter(
    //     (listing) => listing.bedrooms >= minBedrooms,
    //   );
    // }
    //
    // if (minBathrooms) {
    //   filteredListings = filteredListings.filter(
    //     (listing) => listing.bathrooms >= minBathrooms,
    //   );
    // }
    //
    // if (status) {
    //   filteredListings = filteredListings.filter(
    //     (listing) => listing.status === status,
    //   );
    // }
    //
    // if (agentId) {
    //   filteredListings = filteredListings.filter(
    //     (listing) => listing.agentId === agentId,
    //   );
    // }
    //
    // if (agencyId) {
    //   filteredListings = filteredListings.filter(
    //     (listing) => listing.agencyId === agencyId,
    //   );
    // }
    //
    // // Get total count before pagination
    // const total = filteredListings.length;
    //
    // // Apply pagination
    // if (limit) {
    //   filteredListings = filteredListings.slice(offset, offset + limit);
    // }
    //
    // // Return the filtered listings with metadata
    // return NextResponse.json({
    //   data: filteredListings,
    //   meta: {
    //     total,
    //     limit,
    //     offset,
    //     count: filteredListings.length,
    //   },
    // });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: [], message: "Something went wrong!" });
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
