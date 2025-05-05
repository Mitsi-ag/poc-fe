"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  MessageSquare,
  Moon,
  Plus,
  Search,
  Sun,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Chatbot } from "@/components/chat/chatbot";
import { cn } from "@/lib/utils";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Check authentication on initial load and when pathname changes
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("onboardingComplete") === "true";
      setIsAuthenticated(isLoggedIn);

      // Only redirect to login if not authenticated and not already on login, signup, or onboarding pages
      const authExemptPaths = ["/login", "/signup", "/onboarding"];
      if (
        !isLoggedIn &&
        !authExemptPaths.some((path) => pathname?.startsWith(path))
      ) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle theme toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-linear-to-br from-gray-50 to-gray-100 transition-colors duration-300 dark:from-gray-950 dark:to-gray-900">
        <AppSidebar isAuthenticated={isAuthenticated} />
        <div className="flex w-full flex-1 flex-col">
          <header
            className={cn(
              "sticky top-0 z-30 flex h-16 w-full items-center justify-between px-3 transition-all duration-200 sm:px-6",
              scrolled
                ? "bg-white/90 shadow-sm backdrop-blur-md dark:bg-gray-900/90"
                : "bg-transparent",
            )}
          >
            <div className="flex items-center gap-2 md:gap-4">
              <SidebarTrigger className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" />
              <div className="relative w-full max-w-[180px] sm:max-w-[240px] md:max-w-[320px]">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="focus-visible:ring-primary rounded-full border-0 bg-gray-100/80 pr-4 pl-10 text-sm focus-visible:ring-2 dark:bg-gray-800/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-1 md:flex">
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-primary"
                />
                <Label htmlFor="dark-mode" className="sr-only">
                  Dark Mode
                </Label>
                {isDarkMode ? (
                  <Moon className="h-4 w-4 text-gray-400" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-500" />
                )}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="relative rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800"
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
                className="rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>

              <UserMenu />

              <Button
                className="hidden items-center gap-2 bg-blue-500 text-white shadow-md transition-all duration-300 hover:bg-blue-600 md:flex"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                <span>New Lead</span>
              </Button>
            </div>
          </header>
          <main className="w-full flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-full overflow-hidden">{children}</div>
          </main>
        </div>
      </div>
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </SidebarProvider>
  );
}

function UserMenu() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("onboardingComplete");
    localStorage.removeItem("userData");
    // Redirect to login page
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-full p-1 pr-3 hover:bg-white/50 dark:hover:bg-gray-800/50"
        >
          <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
            <AvatarImage src="/confident-agent-handshake.png" alt="Agent" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="hidden font-medium md:inline">John Doe</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1 w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/confident-agent-handshake.png" alt="Agent" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-gray-500">john@realtymate.com</span>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/settings")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/settings")}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/settings/subscription")}
        >
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
