"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Bell, ChevronDown, LogOut, MessageSquare, Moon, Plus, Search, Sun, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModernChatbot } from "@/components/modern-chatbot"
import { CustomSidebar } from "@/components/custom-sidebar"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const pathname = usePathname()

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle theme toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Handle AI Assistant button click
  const handleAIAssistantClick = () => {
    // If we're already on the AI Assistant page, just open the chatbot
    if (pathname === "/ai-assistant") {
      setIsChatOpen(true)
    } else {
      // Otherwise, navigate to the AI Assistant page
      router.push("/ai-assistant")
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Fixed Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full z-40 transition-all duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <CustomSidebar />
      </div>

      {/* Main Content - Add left padding when sidebar is open */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-0", // Adjust the ml-64 to match your sidebar width
        )}
      >
        <header
          className={cn(
            "sticky top-0 z-30 flex h-16 items-center justify-between px-6 transition-all duration-200",
            scrolled ? "bg-white/90 backdrop-blur-md dark:bg-gray-900/90 shadow-sm" : "bg-transparent",
          )}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
            <div className="relative w-80 max-w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search listings, agents, suburbs..."
                className="rounded-full pl-10 pr-10 bg-gray-100/80 border-0 focus-visible:ring-2 focus-visible:ring-primary dark:bg-gray-800/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1">
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-primary"
              />
              <Label htmlFor="dark-mode" className="sr-only">
                Dark Mode
              </Label>
              {isDarkMode ? <Moon className="h-4 w-4 text-gray-400" /> : <Sun className="h-4 w-4 text-amber-500" />}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="relative bg-white/80 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800 rounded-full"
              onClick={() => setNotifications(0)}
            >
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {notifications}
                </span>
              )}
            </Button>

            {/* AI Assistant Button */}
            <Button
              variant="outline"
              className="bg-white/80 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800 rounded-full gap-2"
              onClick={handleAIAssistantClick}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden md:inline">AI Assistant</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full p-1 pr-3"
                >
                  <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                    <AvatarImage src="/confident-agent-handshake.png" alt="Agent" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="font-medium hidden md:inline">John Doe</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
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
                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-500 text-white shadow-md transition-all duration-300"
              size="sm"
            >
              <Plus className="h-4 w-4" />
              <span>New Lead</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <div className="container max-w-7xl mx-auto">
            <Suspense fallback={<>Loading...</>}>{children}</Suspense>
          </div>
        </main>
      </div>
      <ModernChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
