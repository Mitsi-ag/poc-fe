"use client";

import { DashboardWrapper } from "@/components/dashboard-wrapper";
import { AIToolsHub } from "@/components/ai-tools-hub";
import { Suspense } from "react";

export default function AIToolsPage() {
  return (
    <DashboardWrapper>
      <Suspense fallback={<div>Loading AI Tools...</div>}>
        <AIToolsHub />
      </Suspense>
    </DashboardWrapper>
  );
}
