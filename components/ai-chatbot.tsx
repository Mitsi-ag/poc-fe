"use client"

import { useState } from "react"
import { ArrowRight, ChevronDown, Lightbulb, Paperclip, Send, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AIChatbot() {
  const [message, setMessage] = useState("")

  return (
    <Card className="flex h-[400px] flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Ask questions or request actions</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Clear conversation</DropdownMenuItem>
              <DropdownMenuItem>Save conversation</DropdownMenuItem>
              <DropdownMenuItem>Configure assistant</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="space-y-4">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32&query=AI assistant" alt="AI" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">RealtyMate AI</span>
                <Badge variant="secondary" className="px-1 py-0 text-xs">
                  Assistant
                </Badge>
              </div>
              <div className="rounded-lg rounded-tl-none bg-muted p-3 text-sm">
                Hello John! How can I help you today? You can ask me about market trends, competitor activity, or
                request help with emails or pitches.
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/confident-agent-handshake.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">You</span>
              </div>
              <div className="rounded-lg rounded-tl-none bg-primary p-3 text-sm text-primary-foreground">
                Who are the top agents in Bondi Beach this month?
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32&query=AI assistant" alt="AI" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">RealtyMate AI</span>
                <Badge variant="secondary" className="px-1 py-0 text-xs">
                  Assistant
                </Badge>
              </div>
              <div className="rounded-lg rounded-tl-none bg-muted p-3 text-sm">
                <p>Based on the last 30 days of data, the top agents in Bondi Beach are:</p>
                <ol className="ml-4 mt-2 list-decimal">
                  <li>Sarah Johnson (Ray White) - 8 new listings, 76% clearance rate</li>
                  <li>David Thompson (LJ Hooker) - 5 new listings, 64% clearance rate</li>
                  <li>James Wilson (McGrath) - 4 new listings, 70% clearance rate</li>
                </ol>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm" className="h-7 gap-1 text-xs">
                    <span>View full report</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                  <Button variant="secondary" size="sm" className="h-7 gap-1 text-xs">
                    <span>Compare with your stats</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-card pt-3">
        <div className="flex w-full items-center gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="relative flex-1">
            <Input
              placeholder="Ask a question or request an action..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pr-10"
            />
            <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2 flex w-full flex-wrap gap-2">
          <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
            <Sparkles className="h-3 w-3" />
            <span>Create pitch for 22 Palm St</span>
          </Button>
          <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
            <Lightbulb className="h-3 w-3" />
            <span>Market trends in Randwick</span>
          </Button>
          <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
            <Lightbulb className="h-3 w-3" />
            <span>Draft follow-up email</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
