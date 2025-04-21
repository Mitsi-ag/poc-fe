"use client"

import { DashboardWrapper } from "@/components/dashboard-wrapper"
import { CalendarView } from "@/components/calendar/calendar-view"
import { Suspense } from "react"

export default function CalendarPage() {
  return (
    <DashboardWrapper>
      <Suspense fallback={<div>Loading calendar...</div>}>
        <CalendarView />
      </Suspense>
    </DashboardWrapper>
  )
}
