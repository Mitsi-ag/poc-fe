"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle,
  FileText,
  ImageIcon,
  Lightbulb,
  LinkIcon,
  Maximize2,
  Minimize2,
  Paperclip,
  Send,
  Settings,
  Sparkles,
  X,
  Copy,
  Check,
  Users,
  BarChart3,
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

interface ChatbotFloatingProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatbotFloating({ isOpen, onClose }: ChatbotFloatingProps) {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello John! I'm your RealtyMate AI assistant. How can I help you today? You can ask me about market trends, competitor activity, or request help with emails or pitches.",
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
    setMessages([...messages, { role: "user", content: message }]);
    setIsLoading(true);
    setMessage("");

    // Simulate AI response after delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: getRandomResponse(message),
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
        "fixed right-4 bottom-4 z-50 w-[400px] transition-all duration-300 ease-in-out",
        isExpanded && "h-[80vh] w-[600px]",
      )}
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/50 bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/95">
        <CardHeader className="flex flex-row items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary dark:bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">RealtyMate AI</h3>
              <p className="text-muted-foreground text-xs">
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
                    className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
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
                    className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
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
          className="flex flex-1 flex-col"
        >
          <TabsList className="justify-start gap-4 rounded-none border-b bg-transparent px-4 pt-2">
            <TabsTrigger
              value="chat"
              className="data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:text-primary h-auto rounded-none px-2 py-1 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:text-primary h-auto rounded-none px-2 py-1 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:text-primary h-auto rounded-none px-2 py-1 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
            className="mt-0 flex flex-1 flex-col data-[state=inactive]:hidden"
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
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">RealtyMate AI</span>
                        <Badge
                          variant="secondary"
                          className="px-1 py-0 text-xs"
                        >
                          Assistant
                        </Badge>
                      </div>
                      <div className="flex min-h-[40px] items-center rounded-lg rounded-tl-none bg-gray-100 p-3 text-sm dark:bg-gray-800">
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
            </CardContent>
            <CardFooter className="border-t bg-gray-50 p-3 dark:bg-gray-800/50">
              <div className="flex w-full flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 rounded-full bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                              >
                                <Paperclip className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem className="cursor-pointer">
                                <FileText className="mr-2 h-4 w-4" /> Attach
                                document
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <ImageIcon className="mr-2 h-4 w-4" /> Attach
                                image
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <LinkIcon className="mr-2 h-4 w-4" /> Attach
                                link
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                <div className="flex w-full flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 rounded-full bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() =>
                      handleSuggestionClick("Create pitch for 22 Palm St")
                    }
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Create pitch for 22 Palm St</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 rounded-full bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() =>
                      handleSuggestionClick("Market trends in Randwick")
                    }
                  >
                    <Lightbulb className="h-3 w-3" />
                    <span>Market trends in Randwick</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 rounded-full bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() =>
                      handleSuggestionClick("Draft follow-up email")
                    }
                  >
                    <Lightbulb className="h-3 w-3" />
                    <span>Draft follow-up email</span>
                  </Button>
                </div>
              </div>
            </CardFooter>
          </TabsContent>

          <TabsContent
            value="history"
            className="mt-0 flex flex-1 flex-col data-[state=inactive]:hidden"
          >
            <CardContent className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className="hover:border-primary/20 hover:bg-primary/5 dark:hover:border-primary/30 dark:hover:bg-primary/10 cursor-pointer rounded-lg border border-gray-200 p-3 transition-colors dark:border-gray-800"
                    onClick={() => setActiveTab("chat")}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{chat.title}</h4>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {chat.preview}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      {chat.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="bg-gray-100 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent
            value="tools"
            className="mt-0 flex flex-1 flex-col data-[state=inactive]:hidden"
          >
            <CardContent className="flex-1 overflow-auto p-4">
              <div className="grid grid-cols-2 gap-3">
                {aiTools.map((tool, index) => (
                  <div
                    key={index}
                    className="hover:border-primary/20 hover:bg-primary/5 dark:hover:border-primary/30 dark:hover:bg-primary/10 cursor-pointer rounded-lg border border-gray-200 p-3 transition-colors dark:border-gray-800"
                    onClick={() => {
                      setActiveTab("chat");
                      handleSuggestionClick(tool.prompt);
                    }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-md">
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
            "group relative rounded-lg rounded-tl-none p-3 text-sm",
            isUser
              ? "bg-primary dark:bg-primary text-white dark:text-white"
              : "bg-gray-100 dark:bg-gray-800",
          )}
        >
          <p>{message.content}</p>

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

        {!isUser && isLastMessage && message.content.includes("analysis") && (
          <div className="mt-1 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1 bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span>Generate detailed report</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1 bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span>Compare with previous month</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1 bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span>Share with clients</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
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

  if (question.toLowerCase().includes("pitch")) {
    return "I've created a competitive pitch structure for you:\n\n1. Market Position: Highlight your 82% clearance rate vs. the local average of 68%\n\n2. Digital Reach: Showcase your social media presence and digital marketing strategy\n\n3. Testimonials: Feature your recent success stories in the area\n\n4. Pricing Strategy: Explain your data-driven approach to pricing properties\n\nWould you like me to expand on any of these sections?";
  }

  if (question.toLowerCase().includes("market trend")) {
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
    title: "Bondi Beach Market Analysis",
    time: "Today, 10:23 AM",
    preview:
      "I analyzed the current market trends in Bondi Beach, including price movements, days on market, and clearance rates...",
    tags: ["Market Analysis", "Bondi"],
  },
  {
    title: "Pitch Against Sarah Johnson",
    time: "Yesterday",
    preview:
      "Here's a competitive analysis and pitch strategy to use against Sarah Johnson from Ray White in Bondi Beach...",
    tags: ["Pitch", "Competitor"],
  },
  {
    title: "Email Draft for 45 Ocean View",
    time: "Apr 17, 2025",
    preview:
      "I've drafted a follow-up email for the potential sellers at 45 Ocean View, Coogee, highlighting your recent sales...",
    tags: ["Email", "Lead"],
  },
  {
    title: "Randwick Price Trends Q1 2025",
    time: "Apr 15, 2025",
    preview:
      "Analysis of price trends in Randwick for Q1 2025 shows a 3.2% increase in median prices compared to previous quarter...",
    tags: ["Market Analysis", "Randwick"],
  },
];

const aiTools = [
  {
    title: "Property Description",
    description: "Generate engaging property descriptions for your listings",
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
    description: "Generate comprehensive market reports for any suburb",
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
    title: "Client FAQs",
    description: "Answer common client questions with authority",
    icon: <CheckCircle className="h-4 w-4" />,
    prompt:
      "What are the top 5 questions sellers ask and how should I answer them?",
  },
];
