import { NextResponse } from "next/server";
import { contacts } from "@/data/contacts";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const id = params.id;

  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    return NextResponse.json(
      {
        success: false,
        error: "Contact not found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data: contact,
  });
}

export async function PUT(request: Request, { params }: Params) {
  const id = params.id;

  // Find the contact index
  const contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "Contact not found",
      },
      { status: 404 },
    );
  }

  try {
    const updatedData = await request.json();

    // In a real backend, this would validate and update the contact in a database
    return NextResponse.json({
      success: true,
      data: {
        ...contacts[contactIndex],
        ...updatedData,
        updated: new Date().toISOString(),
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

  // Find the contact index
  const contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "Contact not found",
      },
      { status: 404 },
    );
  }

  // In a real backend, this would delete the contact from a database
  return NextResponse.json({
    success: true,
    message: `Contact ${id} successfully deleted`,
  });
}
