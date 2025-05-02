"use client";

import { useState } from "react";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Home,
  LayoutGrid,
  MapPin,
  MessageSquare,
  Settings,
  Users,
  Sparkles,
  BarChart3,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UpgradeModal } from "@/components/upgrade/upgrade-modal";
import { useRouter } from "next/navigation";

// Define sidebar navigation items
const navigationItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <LayoutGrid className="h-4 w-4" />,
  },
  {
    path: "/listings",
    label: "Listings",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    path: "/competitors",
    label: "Competitors",
    icon: <Users className="h-4 w-4" />,
  },
  {
    path: "/ai-assistant",
    label: "AI Assistant",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    path: "/ai-tools",
    label: "AI Tools",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    path: "/analytics",
    label: "Analytics",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  { path: "/crm", label: "CRM", icon: <Users className="h-4 w-4" /> },
  {
    path: "/calendar",
    label: "Calendar",
    icon: <Calendar className="h-4 w-4" />,
  },
];

export function CustomSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("onboardingComplete");
    localStorage.removeItem("userData");
    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="h-full w-64 max-w-[85vw] border-r border-gray-200 bg-white flex flex-col">
      <div className="flex items-center p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
            <Home className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-blue-500">RealtyMate</span>
        </Link>
      </div>

      <div className="px-3 py-2 flex-1">
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-blue-50 text-blue-500 rounded-md">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Pro Plan</span>
          </div>
        </div>

        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex w-full items-center gap-3 px-3 py-3 rounded-md transition-colors text-left",
                pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              {React.cloneElement(item.icon as React.ReactElement, {
                className: cn(
                  "h-5 w-5 flex-shrink-0",
                  pathname === item.path ? "text-blue-500" : "text-gray-500",
                ),
              })}
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-3">
        <Link
          href="/settings"
          className={cn(
            "flex w-full items-center gap-3 px-3 py-2 rounded-md transition-colors text-left",
            pathname === "/settings"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-100",
          )}
        >
          <Settings
            className={cn(
              "h-5 w-5",
              pathname === "/settings" ? "text-blue-500" : "text-gray-500",
            )}
          />
          <span>Settings</span>
        </Link>

        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-gray-800">Upgrade Now</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Get advanced features and increased limits with our Pro plan.
          </p>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => setIsUpgradeModalOpen(true)}
          >
            Upgrade to Pro
          </Button>
        </div>

        <Button
          variant="ghost"
          className="w-full mt-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 justify-start"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log out</span>
        </Button>
      </div>
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
}
