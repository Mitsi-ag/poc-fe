"use client";

import { useState } from "react";
import {
  Search,
  MessageSquare,
  Calendar,
  Clock,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHistoryProps {
  onChatSelect?: (chatId: string) => void;
}

export function ChatHistory({ onChatSelect }: ChatHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter chats based on search query and active tab
  const filteredChats = chatHistory.filter((chat) => {
    const matchesSearch =
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "market")
      return matchesSearch && chat.tags.includes("Market Analysis");
    if (activeTab === "pitch")
      return matchesSearch && chat.tags.includes("Pitch");
    if (activeTab === "email")
      return matchesSearch && chat.tags.includes("Email");
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => onChatSelect?.(`new-chat-${Date.now()}`)}
        >
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline">New Chat</span>
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="pitch">Pitch</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No conversations found</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                {searchQuery
                  ? `No conversations match "${searchQuery}". Try a different search term.`
                  : "Start a new conversation with the AI assistant."}
              </p>
              <Button
                className="mt-4 gap-2"
                onClick={() => onChatSelect?.(`new-chat-${Date.now()}`)}
              >
                <PlusCircle className="h-4 w-4" />
                <span>New Chat</span>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChats.map((chat, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onChatSelect?.(`chat-${index}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">
                          {chat.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{chat.time}</span>
                          <Clock className="h-3 w-3 ml-1" />
                          <span>{chat.duration}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Continue chat</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {chat.preview}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start pt-0">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {chat.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-3 w-full">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/helpful-ai-interface.png" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="h-1 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                          className="h-1 rounded-full bg-primary"
                          style={{ width: `${chat.completionPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {chat.messageCount} messages
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sample data
const chatHistory = [
  {
    title: "Bondi Beach Market Analysis",
    time: "Today, 10:23 AM",
    duration: "15 min",
    preview:
      "I analyzed the current market trends in Bondi Beach, including price movements, days on market, and clearance rates. The median house price has increased by 5.2% over the last quarter.",
    tags: ["Market Analysis", "Bondi"],
    completionPercentage: 100,
    messageCount: 12,
  },
  {
    title: "Pitch Against Sarah Johnson",
    time: "Yesterday",
    duration: "8 min",
    preview:
      "Here's a competitive analysis and pitch strategy to use against Sarah Johnson from Ray White in Bondi Beach. Focus on your higher clearance rate and digital marketing strategy.",
    tags: ["Pitch", "Competitor"],
    completionPercentage: 100,
    messageCount: 8,
  },
  {
    title: "Email Draft for 45 Ocean View",
    time: "Apr 17, 2025",
    duration: "5 min",
    preview:
      "I've drafted a follow-up email for the potential sellers at 45 Ocean View, Coogee, highlighting your recent sales in the area and your unique approach to marketing luxury properties.",
    tags: ["Email", "Lead"],
    completionPercentage: 100,
    messageCount: 6,
  },
  {
    title: "Randwick Price Trends Q1 2025",
    time: "Apr 15, 2025",
    duration: "12 min",
    preview:
      "Analysis of price trends in Randwick for Q1 2025 shows a 3.2% increase in median prices compared to previous quarter. Three-bedroom houses have shown the strongest growth at 4.5%.",
    tags: ["Market Analysis", "Randwick"],
    completionPercentage: 100,
    messageCount: 10,
  },
  {
    title: "Listing Presentation for 22 Palm St",
    time: "Apr 12, 2025",
    duration: "20 min",
    preview:
      "I've prepared a comprehensive listing presentation for 22 Palm St, including comparable sales, marketing strategy, and pricing recommendations based on current market conditions.",
    tags: ["Pitch", "Listing"],
    completionPercentage: 100,
    messageCount: 15,
  },
  {
    title: "Coogee Market Report",
    time: "Apr 10, 2025",
    duration: "10 min",
    preview:
      "Detailed market report for Coogee showing trends in pricing, days on market, and auction clearance rates. The report highlights a 2.8% increase in median unit prices and a slight decrease in days on market.",
    tags: ["Market Analysis", "Coogee"],
    completionPercentage: 100,
    messageCount: 9,
  },
];
