"use client"

import { ModernLayout } from "@/components/modern-layout"
import { ModernDashboard } from "@/components/modern-dashboard"
import { Suspense } from "react"

export default function DashboardPage() {
  return (
    <ModernLayout>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <ModernDashboard />
      </Suspense>
    </ModernLayout>
  )
}
