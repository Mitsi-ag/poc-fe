import { NextResponse } from "next/server";
import { agencies } from "@/data/agencies";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Parse query parameters
  const name = searchParams.get("name");
  const area = searchParams.get("area");
  const specialization = searchParams.get("specialization");
  const limit = searchParams.get("limit")
    ? Number.parseInt(searchParams.get("limit")!)
    : undefined;
  const offset = searchParams.get("offset")
    ? Number.parseInt(searchParams.get("offset")!)
    : 0;

  // Filter agencies based on query parameters
  let filteredAgencies = [...agencies];

  if (name) {
    filteredAgencies = filteredAgencies.filter((agency) =>
      agency.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (area) {
    filteredAgencies = filteredAgencies.filter((agency) =>
      agency.areas.some((a) => a.toLowerCase().includes(area.toLowerCase())),
    );
  }

  if (specialization) {
    filteredAgencies = filteredAgencies.filter((agency) =>
      agency.specializations.some((s) =>
        s.toLowerCase().includes(specialization.toLowerCase()),
      ),
    );
  }

  // Get total count before pagination
  const total = filteredAgencies.length;

  // Apply pagination
  if (limit) {
    filteredAgencies = filteredAgencies.slice(offset, offset + limit);
  }

  // Return the filtered agencies with metadata
  return NextResponse.json({
    data: filteredAgencies,
    meta: {
      total,
      limit,
      offset,
      count: filteredAgencies.length,
    },
  });
}
