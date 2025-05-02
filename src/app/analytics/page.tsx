"use client";

import { DashboardWrapper } from "@/components/dashboard-wrapper";
import { AnalyticsView } from "@/components/analytics/analytics-view";
import { Suspense } from "react";

export default function AnalyticsPage() {
  return (
    <DashboardWrapper>
      <Suspense fallback={<div>Loading analytics...</div>}>
        <AnalyticsView />
      </Suspense>
    </DashboardWrapper>
  );
}
