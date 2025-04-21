import { NextResponse } from "next/server"
import { agents } from "@/data/agents"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Parse query parameters
  const agencyId = searchParams.get("agencyId")
  const name = searchParams.get("name")
  const area = searchParams.get("area")
  const specialization = searchParams.get("specialization")
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
  const offset = searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : 0

  // Filter agents based on query parameters
  let filteredAgents = [...agents]

  if (agencyId) {
    filteredAgents = filteredAgents.filter((agent) => agent.agencyId === agencyId)
  }

  if (name) {
    filteredAgents = filteredAgents.filter((agent) => agent.name.toLowerCase().includes(name.toLowerCase()))
  }

  if (area) {
    filteredAgents = filteredAgents.filter((agent) =>
      agent.areas.some((a) => a.toLowerCase().includes(area.toLowerCase())),
    )
  }

  if (specialization) {
    filteredAgents = filteredAgents.filter((agent) =>
      agent.specializations.some((s) => s.toLowerCase().includes(specialization.toLowerCase())),
    )
  }

  // Get total count before pagination
  const total = filteredAgents.length

  // Apply pagination
  if (limit) {
    filteredAgents = filteredAgents.slice(offset, offset + limit)
  }

  // Return the filtered agents with metadata
  return NextResponse.json({
    data: filteredAgents,
    meta: {
      total,
      limit,
      offset,
      count: filteredAgents.length,
    },
  })
}
