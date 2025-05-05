import { NextResponse } from "next/server";
import { contacts } from "@/data/contacts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Parse query parameters
  const assignedTo = searchParams.get("assignedTo");
  const agencyId = searchParams.get("agencyId");
  const type = searchParams.get("type");
  const stage = searchParams.get("stage");
  const search = searchParams.get("search");
  const tag = searchParams.get("tag");
  const limit = searchParams.get("limit")
    ? Number.parseInt(searchParams.get("limit")!)
    : undefined;
  const offset = searchParams.get("offset")
    ? Number.parseInt(searchParams.get("offset")!)
    : 0;

  // Filter contacts based on query parameters
  let filteredContacts = [...contacts];

  if (assignedTo) {
    filteredContacts = filteredContacts.filter(
      (contact) => contact.assignedTo === assignedTo,
    );
  }

  if (agencyId) {
    filteredContacts = filteredContacts.filter(
      (contact) => contact.agencyId === agencyId,
    );
  }

  if (type) {
    filteredContacts = filteredContacts.filter(
      (contact) => contact.type === type,
    );
  }

  if (stage) {
    filteredContacts = filteredContacts.filter(
      (contact) => contact.stage === stage,
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredContacts = filteredContacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(searchLower) ||
        contact.lastName.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        (contact.phone && contact.phone.includes(search)),
    );
  }

  if (tag) {
    filteredContacts = filteredContacts.filter((contact) =>
      contact.tags.some((t) => t === tag),
    );
  }

  // Get total count before pagination
  const total = filteredContacts.length;

  // Apply pagination
  if (limit) {
    filteredContacts = filteredContacts.slice(offset, offset + limit);
  }

  // Return the filtered contacts with metadata
  return NextResponse.json({
    data: filteredContacts,
    meta: {
      total,
      limit,
      offset,
      count: filteredContacts.length,
    },
  });
}

export async function POST(request: Request) {
  try {
    const contact = await request.json();

    // In a real backend, this would validate and save the contact
    return NextResponse.json(
      {
        success: true,
        data: {
          ...contact,
          id: `c-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          history: contact.history || [],
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
