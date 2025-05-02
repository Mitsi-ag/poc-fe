"use client";

import { DashboardWrapper } from "@/components/dashboard-wrapper";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <DashboardWrapper>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <DashboardView />
      </Suspense>
    </DashboardWrapper>
  );
}
