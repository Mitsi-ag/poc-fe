"use client";

import { Header } from "@/components/ai-assistant/header";
import { Sidebar } from "@/components/ai-assistant/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-dvh bg-white dark:bg-gray-950">
      <Header />
      <div className="flex h-[calc(100%-5rem)]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
