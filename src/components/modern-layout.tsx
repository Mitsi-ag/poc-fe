"use client";

import type { ReactNode } from "react";

interface ModernLayoutProps {
  children: ReactNode;
}

export function ModernLayout({ children }: ModernLayoutProps) {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">{children}</div>
  );
}
