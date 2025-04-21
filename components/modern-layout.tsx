"use client"
import type { ReactNode } from "react"
import { useState, useEffect, memo } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Bell, MessageSquare, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModernChatbot } from "@/components/modern-chatbot"
import { CustomSidebar } from "@/components/custom-sidebar"
import { cn } from "@/lib/utils"

// Memoize the CustomSidebar to prevent unnecessary re-renders
const MemoizedSidebar = memo(CustomSidebar)

export function ModernLayout({ children }: { children: ReactNode }) {
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
        <MemoizedSidebar />
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
            "sticky top-0 z-30 flex h-14 md:h-16 items-center justify-between px-3 sm:px-6 transition-all duration-200",
            scrolled ? "bg-white/90 backdrop-blur-md dark:bg-gray-900/90 shadow-sm" : "bg-transparent",
          )}
        >
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 h-8 w-8 md:h-9 md:w-9"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            <div className="relative w-full max-w-[180px] sm:max-w-[240px] md:max-w-[320px]">
              <Search className="absolute left-3 top-1/2 h-3 w-3 md:h-4 md:w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search..."
                className="rounded-full h-8 md:h-9 pl-8 md:pl-10 pr-4 bg-gray-100/80 border-0 focus-visible:ring-2 focus-visible:ring-primary dark:bg-gray-800/50 text-xs md:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-2 w-2 md:h-3 md:w-3" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="outline"
              size="icon"
              className="relative bg-white/80 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800 rounded-full h-8 w-8 md:h-9 md:w-9"
              onClick={() => setNotifications(0)}
            >
              <Bell className="h-3 w-3 md:h-4 md:w-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {notifications}
                </span>
              )}
            </Button>

            <Button
              variant="outline"
              className="bg-white/80 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800 rounded-full gap-1 md:gap-2 h-8 md:h-9 px-2 md:px-3 text-xs md:text-sm"
              onClick={handleAIAssistantClick}
            >
              <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-3 sm:p-6 md:p-8 overflow-x-hidden">
          <div className="w-full">{children}</div>
        </main>
      </div>
      <ModernChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
