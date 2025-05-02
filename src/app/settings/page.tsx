"use client";

import { DashboardWrapper } from "@/components/dashboard-wrapper";
import { SettingsView } from "@/components/settings/settings-view";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <DashboardWrapper>
      <Suspense fallback={<div>Loading settings...</div>}>
        <SettingsView />
      </Suspense>
    </DashboardWrapper>
  );
}
