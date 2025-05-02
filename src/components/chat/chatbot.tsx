"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  FileText,
  ImageIcon,
  Send,
  Settings,
  X,
  Copy,
  Check,
  Users,
  BarChart3,
  Home,
  Map,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello John! I'm your RealtyMate AI assistant. How can I help you today? You can ask me about market trends, competitor activity, or request help with emails or pitches.",
      richContent: null,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

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

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: getRandomResponse(message),
          richContent: richContent,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    handleSendMessage();
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 w-[400px] transition-all duration-300 ease-in-out",
        isExpanded && "w-[600px] h-[80vh]",
      )}
    >
      <Card className="flex flex-col h-full shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">RealtyMate AI</h3>
              <p className="text-xs text-muted-foreground">
                Your real estate assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-full"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-minimize-2"
                      >
                        <polyline points="4 14 10 14 10 20" />
                        <polyline points="20 10 14 10 14 4" />
                        <line x1="14" x2="21" y1="10" y2="3" />
                        <line x1="3" x2="10" y1="21" y2="14" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-maximize-2"
                      >
                        <polyline points="15 3 21 3 21 9" />
                        <polyline points="9 21 3 21 3 15" />
                        <line x1="21" x2="14" y1="3" y2="10" />
                        <line x1="3" x2="10" y1="21" y2="14" />
                      </svg>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isExpanded ? "Minimize" : "Maximize"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-full"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Close</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="px-4 pt-2 bg-transparent justify-start border-b rounded-none gap-4">
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-2 py-1 h-auto dark:data-[state=active]:text-primary"
            >
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-2 py-1 h-auto dark:data-[state=active]:text-primary"
            >
              Tools
            </TabsTrigger>
            <div className="ml-auto flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Clear conversation</DropdownMenuItem>
                  <DropdownMenuItem>Save conversation</DropdownMenuItem>
                  <DropdownMenuItem>Configure assistant</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TabsList>

          <TabsContent
            value="chat"
            className="flex-1 flex flex-col mt-0 data-[state=inactive]:hidden"
          >
            <CardContent className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <ChatMessageItem
                    key={index}
                    message={msg}
                    isLastMessage={index === messages.length - 1}
                  />
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/helpful-ai-interface.png" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">RealtyMate AI</span>
                        <Badge
                          variant="secondary"
                          className="px-1 py-0 text-xs"
                        >
                          Assistant
                        </Badge>
                      </div>
                      <div className="rounded-lg rounded-tl-none bg-gray-100 p-3 text-sm dark:bg-gray-800 min-h-[40px] flex items-center">
                        <div className="flex space-x-2 animate-pulse">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t p-3 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex w-full flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Ask a question..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="rounded-full pr-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-primary hover:text-primary/80 rounded-full"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-xs bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full"
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
                    className="h-7 gap-1 text-xs bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full"
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
                    className="h-7 gap-1 text-xs bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full"
                    onClick={() =>
                      handleSuggestionClick("Market trends in Randwick")
                    }
                  >
                    <BarChart3 className="h-3 w-3" />
                    <span>Market trends</span>
                  </Button>
                </div>
              </div>
            </CardFooter>
          </TabsContent>

          <TabsContent
            value="tools"
            className="flex-1 flex flex-col mt-0 data-[state=inactive]:hidden"
          >
            <CardContent className="flex-1 overflow-auto p-4">
              <div className="grid grid-cols-2 gap-3">
                {quickTools.map((tool, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-colors dark:hover:border-primary/30 dark:hover:bg-primary/10"
                    onClick={() => {
                      setActiveTab("chat");
                      handleSuggestionClick(tool.prompt);
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                        {tool.icon}
                      </div>
                      <h4 className="font-medium">{tool.title}</h4>
                    </div>
                    <p className="text-xs text-gray-500">{tool.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
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
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
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
      <div className="flex flex-col gap-1 flex-1 group">
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
            "rounded-lg rounded-tl-none p-3 text-sm relative group",
            isUser
              ? "bg-primary text-white dark:bg-primary dark:text-white"
              : "bg-gray-100 dark:bg-gray-800",
          )}
        >
          <p className="whitespace-pre-line">{message.content}</p>

          {!isUser && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
      </div>
    </div>
  );
}

// Mock response generator
function getRandomResponse(question: string): string {
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
    return "Here's information about 22 Palm Street in Bondi Beach. This is a 3-bedroom, 2-bathroom property with ocean views. It last sold in 2018 for $2.1M and based on current market conditions, I estimate its value at approximately $2.8M. The property features open plan living and is 185 square meters in size.";
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

// Quick tools for the simplified sidebar
const quickTools = [
  {
    title: "Property Description",
    description: "Generate engaging property descriptions",
    icon: <FileText className="h-4 w-4" />,
    prompt:
      "Generate a professional property description for a 3-bedroom waterfront home in Bondi Beach",
  },
  {
    title: "Competitor Analysis",
    description: "Analyze competitor strengths and weaknesses",
    icon: <Users className="h-4 w-4" />,
    prompt:
      "Create a competitive analysis of Sarah Johnson from Ray White in Bondi Beach",
  },
  {
    title: "Market Report",
    description: "Generate comprehensive market reports",
    icon: <BarChart3 className="h-4 w-4" />,
    prompt:
      "Create a market report for Randwick showing price trends for the last quarter",
  },
  {
    title: "Email Templates",
    description: "Create personalized emails for leads and clients",
    icon: <FileText className="h-4 w-4" />,
    prompt:
      "Write a follow-up email to a potential seller who attended my open house last week",
  },
  {
    title: "Social Media",
    description: "Generate engaging social content for properties",
    icon: <ImageIcon className="h-4 w-4" />,
    prompt:
      "Create an Instagram post caption for a new luxury listing in Coogee",
  },
  {
    title: "Area Insights",
    description: "Get detailed insights for any suburb",
    icon: <Map className="h-4 w-4" />,
    prompt: "Show me market insights for Bondi Beach area",
  },
];
