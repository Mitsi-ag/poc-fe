"use client"

import { DashboardWrapper } from "@/components/dashboard-wrapper"
import { CompetitorsView } from "@/components/competitors/competitors-view"
import { Suspense } from "react"

export default function CompetitorsPage() {
  return (
    <DashboardWrapper>
      <Suspense fallback={<div>Loading competitors data...</div>}>
        <CompetitorsView />
      </Suspense>
    </DashboardWrapper>
  )
}
