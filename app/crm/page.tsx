"use client"

import { DashboardWrapper } from "@/components/dashboard-wrapper"
import { CRMView } from "@/components/crm/crm-view"
import { Suspense } from "react"

export default function CRMPage() {
  return (
    <DashboardWrapper>
      <Suspense fallback={<div>Loading CRM data...</div>}>
        <CRMView />
      </Suspense>
    </DashboardWrapper>
  )
}
