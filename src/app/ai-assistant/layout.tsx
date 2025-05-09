import { ReactNode } from "react";
import { DashboardWrapper } from "@/components/dashboard-wrapper";
import { Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardWrapper>
      <Suspense fallback={<div>Loading AI Assistant...</div>}>
        {children}
      </Suspense>
    </DashboardWrapper>
  );
}
