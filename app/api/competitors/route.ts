import { NextResponse } from "next/server"
import { competitors } from "@/data/competitors"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Parse query parameters
  const agencyId = searchParams.get("agencyId")
  const area = searchParams.get("area")
  const specialization = searchParams.get("specialization")
  const strength = searchParams.get("strength")

  // Filter competitors based on query parameters
  let filteredCompetitors = [...competitors]

  if (agencyId) {
    filteredCompetitors = filteredCompetitors.filter((competitor) => competitor.agencyId === agencyId)
  }

  if (area) {
    filteredCompetitors = filteredCompetitors.filter((competitor) =>
      competitor.areas.some((a) => a.toLowerCase().includes(area.toLowerCase())),
    )
  }

  if (specialization) {
    filteredCompetitors = filteredCompetitors.filter((competitor) =>
      competitor.specializations.some((s) => s.toLowerCase().includes(specialization.toLowerCase())),
    )
  }

  if (strength) {
    filteredCompetitors = filteredCompetitors.filter((competitor) => competitor.strength === strength)
  }

  // Return the filtered competitors
  return NextResponse.json({
    success: true,
    data: filteredCompetitors,
  })
}
