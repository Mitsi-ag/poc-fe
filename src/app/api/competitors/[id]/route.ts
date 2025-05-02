import { NextResponse } from "next/server";
import { competitors } from "@/data/competitors";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const id = params.id;

  const competitor = competitors.find((competitor) => competitor.id === id);

  if (!competitor) {
    return NextResponse.json(
      {
        success: false,
        error: "Competitor not found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data: competitor,
  });
}
