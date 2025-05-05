"use client";

import React from "react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UpgradeModal } from "@/components/upgrade/upgrade-modal";

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

interface AppSidebarProps {
  isAuthenticated?: boolean;
}

export function AppSidebar({ isAuthenticated = false }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Inside the AppSidebar component, add state for the upgrade modal
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("onboardingComplete");
    localStorage.removeItem("userData");
    // Redirect to login page
    router.push("/login");
  };

  // Handle navigation
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Sidebar className="z-50 w-64 max-w-[85vw] border-r border-gray-200 bg-white">
      <SidebarHeader className="flex items-center p-4">
        <button
          onClick={() => handleNavigation("/dashboard")}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
            <Home className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-blue-500">RealtyMate</span>
        </button>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <div className="mb-4">
          <div className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-blue-500">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Pro Plan</span>
          </div>
        </div>

        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition-colors",
                  pathname === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100",
                )}
              >
                {React.cloneElement(item.icon as React.ReactElement, {
                  className: cn(
                    "h-5 w-5 shrink-0",
                    pathname === item.path ? "text-blue-500" : "text-gray-500",
                  ),
                })}
                <span className="truncate">{item.label}</span>
              </button>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mt-auto p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <button
              onClick={() => handleNavigation("/settings")}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors",
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
            </button>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-4 rounded-md bg-gray-50 p-3">
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-gray-800">Upgrade Now</span>
          </div>
          <p className="mb-3 text-xs text-gray-500">
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
          className="mt-3 w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </Button>
      </SidebarFooter>
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </Sidebar>
  );
}
