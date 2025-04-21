"use client"

import { DashboardWrapper } from "@/components/dashboard-wrapper"
import { AIAssistantView } from "@/components/ai-assistant/ai-assistant-view"
import { Suspense } from "react"

export default function AIAssistantPage() {
  return (
    <DashboardWrapper>
      <Suspense fallback={<div>Loading AI Assistant...</div>}>
        <AIAssistantView />
      </Suspense>
    </DashboardWrapper>
  )
}
