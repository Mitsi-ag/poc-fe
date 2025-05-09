"use client";

import { FullPageAssistant } from "@/components/ai-assistant/full-page-assistant";
import { DashboardWrapper } from "@/components/dashboard-wrapper";
import { Suspense } from "react";

export default function ChatByIdPage() {
  return (
    <DashboardWrapper>
      <Suspense fallback={<div>Loading AI Assistant...</div>}>
        <FullPageAssistant />
      </Suspense>
    </DashboardWrapper>
  );
}
