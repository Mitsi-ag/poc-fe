import { NextResponse } from "next/server"
import { agencies } from "@/data/agencies"

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const id = params.id

  const agency = agencies.find((agency) => agency.id === id)

  if (!agency) {
    return NextResponse.json(
      {
        success: false,
        error: "Agency not found",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    data: agency,
  })
}
