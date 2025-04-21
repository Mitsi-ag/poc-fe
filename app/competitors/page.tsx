"use client"

import { ModernLayout } from "@/components/modern-layout"
import { CompetitorsView } from "@/components/competitors/competitors-view"
import { Suspense } from "react"

export default function CompetitorsPage() {
  return (
    <ModernLayout>
      <Suspense fallback={<div>Loading competitors data...</div>}>
        <CompetitorsView />
      </Suspense>
    </ModernLayout>
  )
}
