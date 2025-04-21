"use client"

import { ModernLayout } from "@/components/modern-layout"
import { ListingsView } from "@/components/listings/listings-view"
import { Suspense } from "react"

export default function ListingsPage() {
  return (
    <ModernLayout>
      <Suspense fallback={<div>Loading listings...</div>}>
        <ListingsView />
      </Suspense>
    </ModernLayout>
  )
}
