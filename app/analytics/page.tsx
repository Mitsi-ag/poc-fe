"use client"

import { ModernLayout } from "@/components/modern-layout"
import { AnalyticsView } from "@/components/analytics/analytics-view"
import { Suspense } from "react"

export default function AnalyticsPage() {
  return (
    <ModernLayout>
      <Suspense fallback={<div>Loading analytics...</div>}>
        <AnalyticsView />
      </Suspense>
    </ModernLayout>
  )
}
