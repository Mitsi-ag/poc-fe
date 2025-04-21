"use client"

import type { ReactNode } from "react"

interface ModernLayoutProps {
  children: ReactNode
}

export function ModernLayout({ children }: ModernLayoutProps) {
  return <div className="container mx-auto px-4 py-6 max-w-7xl">{children}</div>
}
