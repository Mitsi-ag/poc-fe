"use client"

import { ModernLayout } from "@/components/modern-layout"
import { SettingsView } from "@/components/settings/settings-view"
import { Suspense } from "react"

export default function SettingsPage() {
  return (
    <ModernLayout>
      <Suspense fallback={<div>Loading settings...</div>}>
        <SettingsView />
      </Suspense>
    </ModernLayout>
  )
}
