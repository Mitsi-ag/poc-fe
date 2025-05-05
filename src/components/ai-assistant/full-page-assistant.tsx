"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  Bot,
  FileText,
  ImageIcon,
  Lightbulb,
  Paperclip,
  Send,
  X,
  Copy,
  Check,
  Users,
  BarChart3,
  Search,
  PlusCircle,
  Star,
  Home,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";
import { AgentCard } from "@/components/chat/agent-card";
import { PropertyCard } from "@/components/chat/property-card";
import { MarketInsightCard } from "@/components/chat/market-insight-card";

interface FullPageAssistantProps {
  onClose: () => void;
}

export function FullPageAssistant({ onClose }: FullPageAssistantProps) {
  const [message, setMessage] = useState("");
  // const [activeTab, setActiveTab] = useState("chat");
  const [activeChatId, setActiveChatId] = useState<string>("new");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello John! I'm your RealtyMate AI assistant. How can I help you today? You can ask me about market trends, competitor activity, or request help with emails or pitches.",
      richContent: null,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mock send message function
  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setMessages([
      ...messages,
      { role: "user", content: message, richContent: null },
    ]);
    setIsLoading(true);
    setMessage("");

    // Simulate AI response after delay
    setTimeout(() => {
      const userMessage = message.toLowerCase();
      let richContent = null;

      // Generate rich content based on user query
      if (
        userMessage.includes("sarah johnson") ||
        userMessage.includes("competitor")
      ) {
        richContent = {
          type: "agent",
          data: {
            id: "agent123",
            name: "Sarah Johnson",
            agency: "Ray White Bondi Beach",
            photoUrl: "/confident-urban-professional.png",
            listings: 8,
            clearanceRate: 76,
          },
        };
      } else if (
        userMessage.includes("22 palm st") ||
        userMessage.includes("property")
      ) {
        richContent = {
          type: "property",
          data: {
            id: "prop456",
            address: "22 Palm Street",
            suburb: "Bondi Beach",
            price: "$2.8M",
            imageUrl: "/coastal-living.png",
            beds: 3,
            baths: 2,
            carSpaces: 1,
            sqm: 185,
          },
        };
      } else if (
        userMessage.includes("market") ||
        userMessage.includes("trends") ||
        userMessage.includes("randwick")
      ) {
        richContent = {
          type: "marketInsight",
          data: {
            suburb: "Randwick",
            medianPrice: "$2.8M",
            priceChange: 3.2,
            daysOnMarket: 27,
            daysChange: -5,
            clearanceRate: 71,
            clearanceChange: 2,
          },
        };
      }

      console.log("richContent:", richContent);

      // setMessages((prev) => [
      //   ...prev,
      //   {
      //     role: "assistant",
      //     content: getRandomResponse(message),
      //     richContent: richContent,
      //   },
      // ]);
      setIsLoading(false);
    }, 1000);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    handleSendMessage();
  };

  // Create a new chat
  const handleNewChat = () => {
    setActiveChatId("new");
    setMessages([
      {
        role: "assistant",
        content:
          "Hello John! I'm your RealtyMate AI assistant. How can I help you today? You can ask me about market trends, competitor activity, or request help with emails or pitches.",
        richContent: null,
      },
    ]);
  };

  // Filter chat history based on search query
  const filteredChatHistory = searchQuery
    ? chatHistory.filter(
        (chat) =>
          chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    : chatHistory;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary dark:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">RealtyMate AI</h2>
            <p className="text-muted-foreground text-sm">
              Your intelligent real estate companion
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex w-64 flex-col border-r bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col gap-2 p-3">
            <Button
              onClick={handleNewChat}
              className="bg-primary hover:bg-primary/90 w-full gap-2 text-white"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Chat</span>
            </Button>

            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="h-9 pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 space-y-1.5 overflow-auto p-2">
            {filteredChatHistory.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "cursor-pointer rounded-lg p-2 text-sm transition-all",
                  activeChatId === chat.id
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800/50",
                )}
                onClick={() => setActiveChatId(chat.id)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="line-clamp-1 font-medium">{chat.title}</h4>
                  {chat.isSaved && (
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  )}
                </div>
                <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                  {chat.preview}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-muted-foreground text-xs">
                    {chat.time}
                  </span>
                  {chat.tags.slice(0, 1).map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="h-4 px-1.5 py-0 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col">
          <div
            className="flex-1 overflow-y-auto p-4"
            id="chat-messages-container"
          >
            <div className="mx-auto min-h-full max-w-3xl space-y-6 pb-10">
              {messages.map((msg, index) => (
                <ChatMessageItem
                  key={index}
                  message={msg}
                  isLastMessage={index === messages.length - 1}
                />
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/helpful-ai-interface.png" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">RealtyMate AI</span>
                      <Badge variant="secondary" className="px-1 py-0 text-xs">
                        Assistant
                      </Badge>
                    </div>
                    <div className="flex min-h-[40px] items-center rounded-lg rounded-tl-none bg-gray-100 p-4 text-sm dark:bg-gray-800">
                      <div className="flex animate-pulse space-x-2">
                        <div className="bg-primary h-2 w-2 rounded-full"></div>
                        <div className="bg-primary h-2 w-2 rounded-full"></div>
                        <div className="bg-primary h-2 w-2 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t bg-gray-50 p-4 dark:bg-gray-900">
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 shrink-0 rounded-full bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                          >
                            <Paperclip className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Attach files</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="relative flex-1">
                    <Input
                      placeholder="Ask a question or request an action..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="rounded-full border-gray-200 bg-white pr-10 dark:border-gray-700 dark:bg-gray-800"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary hover:text-primary/80 absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 rounded-full"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 rounded-full bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() =>
                      handleSuggestionClick(
                        "Tell me about Sarah Johnson from Ray White",
                      )
                    }
                  >
                    <Users className="h-3 w-3" />
                    <span>Agent: Sarah Johnson</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 rounded-full bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() =>
                      handleSuggestionClick("Show me 22 Palm St property")
                    }
                  >
                    <Home className="h-3 w-3" />
                    <span>Property: 22 Palm St</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 rounded-full bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() =>
                      handleSuggestionClick("Market trends in Randwick")
                    }
                  >
                    <BarChart3 className="h-3 w-3" />
                    <span>Randwick market trends</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 rounded-full bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() =>
                      handleSuggestionClick("Draft follow-up email")
                    }
                  >
                    <Lightbulb className="h-3 w-3" />
                    <span>Draft follow-up email</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Sidebar - Simplified */}
        <div className="flex w-64 flex-col border-l bg-gray-50 dark:bg-gray-900">
          <div className="border-b p-3">
            <h3 className="font-medium">Quick Tools</h3>
          </div>

          <div className="flex-1 overflow-auto p-3">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <h4 className="text-muted-foreground text-xs font-medium">
                  Content
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {quickTools.slice(0, 3).map((tool) => (
                    <Button
                      key={tool.title}
                      variant="outline"
                      className="h-9 justify-start px-2.5 text-xs"
                      onClick={() => handleSuggestionClick(tool.prompt)}
                    >
                      <div className="bg-primary/10 text-primary mr-2 flex h-6 w-6 items-center justify-center rounded-md">
                        {tool.icon}
                      </div>
                      <span>{tool.title}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-muted-foreground text-xs font-medium">
                  Analysis
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {quickTools.slice(3, 6).map((tool) => (
                    <Button
                      key={tool.title}
                      variant="outline"
                      className="h-9 justify-start px-2.5 text-xs"
                      onClick={() => handleSuggestionClick(tool.prompt)}
                    >
                      <div className="bg-primary/10 text-primary mr-2 flex h-6 w-6 items-center justify-center rounded-md">
                        {tool.icon}
                      </div>
                      <span>{tool.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ChatMessageItemProps {
  message: ChatMessage;
  isLastMessage: boolean;
}

function ChatMessageItem({ message, isLastMessage }: ChatMessageItemProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.role === "user";

  return (
    <div className="flex gap-4">
      <Avatar className="h-10 w-10">
        {isUser ? (
          <>
            <AvatarImage src="/confident-agent-handshake.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/helpful-ai-interface.png" alt="AI" />
            <AvatarFallback>AI</AvatarFallback>
          </>
        )}
      </Avatar>
      <div className="group flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {isUser ? "You" : "RealtyMate AI"}
          </span>
          {!isUser && (
            <Badge variant="secondary" className="px-1 py-0 text-xs">
              Assistant
            </Badge>
          )}
        </div>
        <div
          className={cn(
            "group relative rounded-lg rounded-tl-none p-4 text-sm",
            isUser
              ? "bg-primary dark:bg-primary text-white dark:text-white"
              : "bg-gray-100 dark:bg-gray-800",
          )}
        >
          <p className="whitespace-pre-line">{message.content}</p>

          {!isUser && (
            <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full bg-gray-200/50 hover:bg-gray-200 dark:bg-gray-700/50 dark:hover:bg-gray-700"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Render rich content if available */}
        {!isUser && message.richContent && (
          <div className="mt-2">
            {message.richContent.type === "agent" && (
              <AgentCard
                id={message.richContent.data.id}
                name={message.richContent.data.name}
                agency={message.richContent.data.agency}
                photoUrl={message.richContent.data.photoUrl}
                listings={message.richContent.data.listings}
                clearanceRate={message.richContent.data.clearanceRate}
              />
            )}
            {message.richContent.type === "property" && (
              <PropertyCard
                id={message.richContent.data.id}
                address={message.richContent.data.address}
                suburb={message.richContent.data.suburb}
                price={message.richContent.data.price}
                imageUrl={message.richContent.data.imageUrl}
                beds={message.richContent.data.beds}
                baths={message.richContent.data.baths}
                carSpaces={message.richContent.data.carSpaces}
                sqm={message.richContent.data.sqm}
              />
            )}
            {message.richContent.type === "marketInsight" && (
              <MarketInsightCard
                suburb={message.richContent.data.suburb}
                medianPrice={message.richContent.data.medianPrice}
                priceChange={message.richContent.data.priceChange}
                daysOnMarket={message.richContent.data.daysOnMarket}
                daysChange={message.richContent.data.daysChange}
                clearanceRate={message.richContent.data.clearanceRate}
                clearanceChange={message.richContent.data.clearanceChange}
              />
            )}
          </div>
        )}

        {!isUser &&
          isLastMessage &&
          message.content.includes("analysis") &&
          !message.richContent && (
            <div className="mt-2 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <span>Generate detailed report</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <span>Compare with previous month</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          )}
      </div>
    </div>
  );
}

// Mock response generator
export function getRandomResponse(question: string): string {
  const responses = [
    "Based on the latest data, Bondi Beach has shown a 5.2% increase in median house prices over the last quarter. The average time on market is now 24 days, down from 28 days in the previous quarter. Would you like me to prepare a more comprehensive analysis?",

    "I've analyzed Sarah Johnson's recent performance at Ray White Bondi Beach. She's currently listing an average of 8 properties per month with a 76% clearance rate. Your clearance rate is 82%, which gives you a competitive advantage to highlight in your pitch.",

    "Here's a draft email for your follow-up:\n\nSubject: Next Steps for Your Bondi Beach Property\n\nHi [Name],\n\nThank you for taking the time to discuss your property at [Address] yesterday. Based on our conversation, I've prepared some initial thoughts on positioning your home in the current market to maximize your return.\n\nWould you be available for a 15-minute call tomorrow to discuss the next steps?\n\nBest regards,\nJohn",

    "The top agents in Randwick this quarter are:\n1. Michael Chen (McGrath) - 12 listings, 74% clearance rate\n2. Emma Wilson (Belle Property) - 9 listings, 71% clearance rate\n3. David Thompson (LJ Hooker) - 8 listings, 68% clearance rate\n\nWould you like more details on any of these competitors?",
  ];

  if (
    question.toLowerCase().includes("sarah johnson") ||
    question.toLowerCase().includes("competitor")
  ) {
    return "Here's information about Sarah Johnson from Ray White Bondi Beach. She's currently one of your main competitors in the area with 8 active listings and a 76% clearance rate. Her average days on market is 25 days, which is slightly higher than your 22 days. She specializes in waterfront properties and has a strong social media presence.";
  }

  if (
    question.toLowerCase().includes("22 palm st") ||
    question.toLowerCase().includes("property")
  ) {
    return "I've found details for 22 Palm Street in Bondi Beach. This is a 3-bedroom, 2-bathroom property with ocean views. It last sold in 2018 for $2.1M and based on current market conditions, I estimate its value at approximately $2.8M. The property features open plan living and is 185 square meters in size.";
  }

  if (
    question.toLowerCase().includes("market trend") ||
    question.toLowerCase().includes("randwick")
  ) {
    return "Randwick market trends for Q1 2025:\n\n• Median house price: $2.8M (↑3.2% QoQ)\n• Median unit price: $1.2M (↑1.8% QoQ)\n• Average days on market: 27 days (↓5 days from Q4 2024)\n• Auction clearance rate: 71% (↑2% from Q4 2024)\n• New listings: 87 properties (↑12% YoY)\n\nThe most significant growth is in 3-bedroom houses, which have increased 4.5% in the quarter.";
  }

  if (question.toLowerCase().includes("email")) {
    return "Here's your follow-up email draft:\n\nSubject: Next Steps After Our Meeting\n\nHi [Client Name],\n\nThank you for taking the time to discuss your property goals yesterday. I've been thinking about your situation and have some ideas I'd like to share about maximizing your property's potential in the current market.\n\nBased on recent comparable sales in [Suburb], properties with similar features to yours have been achieving strong results, particularly when presented with the right marketing strategy.\n\nI'd love to continue our conversation and show you my detailed proposal. Are you available for a quick call tomorrow at 2 PM?\n\nLooking forward to helping you achieve an exceptional result.\n\nBest regards,\nJohn";
  }

  return responses[Math.floor(Math.random() * responses.length)];
}

// Sample data
const chatHistory = [
  {
    id: "chat1",
    title: "Bondi Beach Market Analysis",
    time: "Today, 10:23 AM",
    preview:
      "I analyzed the current market trends in Bondi Beach, including price movements, days on market, and clearance rates...",
    tags: ["Market Analysis", "Bondi"],
    isSaved: true,
  },
  {
    id: "chat2",
    title: "Pitch Against Sarah Johnson",
    time: "Yesterday",
    preview:
      "Here's a competitive analysis and pitch strategy to use against Sarah Johnson from Ray White in Bondi Beach...",
    tags: ["Pitch", "Competitor"],
    isSaved: false,
  },
  {
    id: "chat3",
    title: "Email Draft for 45 Ocean View",
    time: "Apr 17, 2025",
    preview:
      "I've drafted a follow-up email for the potential sellers at 45 Ocean View, Coogee, highlighting your recent sales...",
    tags: ["Email", "Lead"],
    isSaved: true,
  },
  {
    id: "chat4",
    title: "Randwick Price Trends Q1 2025",
    time: "Apr 15, 2025",
    preview:
      "Analysis of price trends in Randwick for Q1 2025 shows a 3.2% increase in median prices compared to previous quarter...",
    tags: ["Market Analysis", "Randwick"],
    isSaved: false,
  },
];

// Quick tools for the simplified sidebar
const quickTools = [
  {
    title: "Property Description",
    icon: <FileText className="h-4 w-4" />,
    prompt:
      "Generate a professional property description for a 3-bedroom waterfront home in Bondi Beach",
  },
  {
    title: "Email Templates",
    icon: <FileText className="h-4 w-4" />,
    prompt:
      "Write a follow-up email to a potential seller who attended my open house last week",
  },
  {
    title: "Social Media",
    icon: <ImageIcon className="h-4 w-4" />,
    prompt:
      "Create an Instagram post caption for a new luxury listing in Coogee",
  },
  {
    title: "Competitor Analysis",
    icon: <Users className="h-4 w-4" />,
    prompt:
      "Create a competitive analysis of Sarah Johnson from Ray White in Bondi Beach",
  },
  {
    title: "Market Report",
    icon: <BarChart3 className="h-4 w-4" />,
    prompt:
      "Create a market report for Randwick showing price trends for the last quarter",
  },
  {
    title: "Area Insights",
    icon: <Map className="h-4 w-4" />,
    prompt: "Show me market insights for Bondi Beach area",
  },
];
