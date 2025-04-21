"use client"

import { ModernLayout } from "@/components/modern-layout"
import { AIAssistantView } from "@/components/ai-assistant/ai-assistant-view"
import { Suspense } from "react"

export default function AIAssistantPage() {
  return (
    <ModernLayout>
      <Suspense fallback={<div>Loading AI Assistant...</div>}>
        <AIAssistantView />
      </Suspense>
    </ModernLayout>
  )
}
