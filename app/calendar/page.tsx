"use client"

import { ModernLayout } from "@/components/modern-layout"
import { CalendarView } from "@/components/calendar/calendar-view"
import { Suspense } from "react"

export default function CalendarPage() {
  return (
    <ModernLayout>
      <Suspense fallback={<div>Loading calendar...</div>}>
        <CalendarView />
      </Suspense>
    </ModernLayout>
  )
}
