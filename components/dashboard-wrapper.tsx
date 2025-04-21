"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { ModernLayout } from "@/components/modern-layout"
import type { ReactNode } from "react"

interface DashboardWrapperProps {
  children: ReactNode
}

export function DashboardWrapper({ children }: DashboardWrapperProps) {
  return (
    <AppLayout>
      <ModernLayout>{children}</ModernLayout>
    </AppLayout>
  )
}
