import { NextResponse } from "next/server"
import { agents } from "@/data/agents"

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const id = params.id

  const agent = agents.find((agent) => agent.id === id)

  if (!agent) {
    return NextResponse.json(
      {
        success: false,
        error: "Agent not found",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    data: agent,
  })
}
