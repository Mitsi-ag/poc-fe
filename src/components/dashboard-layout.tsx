"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  ChevronDown,
  Home,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  Users,
  X,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChatbotFloating } from "@/components/chatbot-floating";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header
            className={cn(
              "sticky top-0 z-30 flex h-16 items-center justify-between px-6 transition-all duration-200",
              scrolled
                ? "bg-white/80 backdrop-blur-md border-b shadow-sm dark:bg-gray-900/80"
                : "bg-transparent",
            )}
          >
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" />
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search listings, agents, suburbs..."
                  className="pl-8 bg-gray-100 border-0 focus-visible:ring-2 focus-visible:ring-primary dark:bg-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-gray-900"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="relative bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => setNotifications(0)}
              >
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    {notifications}
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                      <AvatarImage
                        src="/confident-agent-handshake.png"
                        alt="Agent"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">John Doe</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src="/confident-agent-handshake.png"
                          alt="Agent"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">John Doe</span>
                        <span className="text-xs text-gray-500">
                          john@realtymate.com
                        </span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
      <ChatbotFloating
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </SidebarProvider>
  );
}

// Update the AppSidebar function to use Next.js Link components for navigation

function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" className="border-0">
      <SidebarHeader className="flex items-center justify-center p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
            <Home className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            RealtyMate
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/"}
              className="group transition-all"
            >
              <Link href="/">
                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100 group-data-[active=true]:opacity-100" />
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/listings"}
              className="group transition-all"
            >
              <Link href="/listings">
                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100 group-data-[active=true]:opacity-100" />
                <MapPin className="h-5 w-5" />
                <span>Listings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/competitors"}
              className="group transition-all"
            >
              <Link href="/competitors">
                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100 group-data-[active=true]:opacity-100" />
                <Users className="h-5 w-5" />
                <span>Competitors</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/ai-assistant"}
              className="group transition-all"
            >
              <Link href="/ai-assistant">
                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100 group-data-[active=true]:opacity-100" />
                <MessageSquare className="h-5 w-5" />
                <span>AI Assistant</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/pitch-builder"}
              className="group transition-all"
            >
              <Link href="/pitch-builder">
                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100 group-data-[active=true]:opacity-100" />
                <PieChart className="h-5 w-5" />
                <span>Pitch Builder</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/crm"}
              className="group transition-all"
            >
              <Link href="/crm">
                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100 group-data-[active=true]:opacity-100" />
                <Users className="h-5 w-5" />
                <span>CRM</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/ai-tools"}
              className="group transition-all"
            >
              <Link href="/ai-tools">
                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100 group-data-[active=true]:opacity-100" />
                <Sparkles className="h-5 w-5" />
                <span>AI Tools</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/calendar"}
              className="group transition-all"
            >
              <Link href="/calendar">
                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100 group-data-[active=true]:opacity-100" />
                <Calendar className="h-5 w-5" />
                <span>Calendar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/settings"}
              className="group transition-all"
            >
              <Link href="/settings">
                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100 group-data-[active=true]:opacity-100" />
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
