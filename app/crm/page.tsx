"use client"

import { ModernLayout } from "@/components/modern-layout"
import { CRMView } from "@/components/crm/crm-view"
import { Suspense } from "react"

export default function CRMPage() {
  return (
    <ModernLayout>
      <Suspense fallback={<div>Loading CRM data...</div>}>
        <CRMView />
      </Suspense>
    </ModernLayout>
  )
}
