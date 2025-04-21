"use client"

import { DashboardWrapper } from "@/components/dashboard-wrapper"
import { ListingsView } from "@/components/listings/listings-view"
import { Suspense } from "react"

export default function ListingsPage() {
  return (
    <DashboardWrapper>
      <Suspense fallback={<div>Loading listings...</div>}>
        <ListingsView />
      </Suspense>
    </DashboardWrapper>
  )
}
