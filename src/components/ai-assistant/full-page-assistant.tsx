import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMessages } from "@/modules/messages/hooks/use-messages";
import {
  BarChart3,
  Bot,
  Check,
  Copy,
  FileText,
  Home,
  ImageIcon,
  Lightbulb,
  Map,
  PlusCircle,
  Search,
  Send,
  Star,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

export function FullPageAssistant() {
  const router = useRouter();
  const [activeChatId, setActiveChatId] = useState<string>("new");
  const [searchQuery, setSearchQuery] = useState("");
  const {
    messages,
    messagesEndRef,
    inputRef,
    isLoading,
    input,
    setInput,
    handleSendMessage,
    handleSuggestionClick,
  } = useMessages();

  // Create a new chat
  const handleNewChat = () => {};

  // Redirect back to home page upon closing the view
  const onClose = () => {
    router.push("/");
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
              {messages.map((msg) => (
                <ChatMessageItem key={msg.id} message={msg} />
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
                  {/* <div className="flex items-center gap-1"> */}
                  {/*   <TooltipProvider> */}
                  {/*     <Tooltip> */}
                  {/*       <TooltipTrigger asChild> */}
                  {/*         <Button */}
                  {/*           variant="outline" */}
                  {/*           size="icon" */}
                  {/*           className="h-9 w-9 shrink-0 rounded-full bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700" */}
                  {/*         > */}
                  {/*           <Paperclip className="h-4 w-4" /> */}
                  {/*         </Button> */}
                  {/*       </TooltipTrigger> */}
                  {/*       <TooltipContent> */}
                  {/*         <p>Attach files</p> */}
                  {/*       </TooltipContent> */}
                  {/*     </Tooltip> */}
                  {/*   </TooltipProvider> */}
                  {/* </div> */}
                  <div className="relative flex-1">
                    <Input
                      ref={inputRef}
                      placeholder="Ask a question or request an action..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
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
                      disabled={!input.trim()}
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

interface MessageItemProps {
  message: ReturnType<typeof useMessages>["messages"][number];
}

function ChatMessageItem({ message }: MessageItemProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.isUserMessage;

  return (
    <div className={cn("flex gap-4", { "justify-end": isUser })}>
      <Avatar className={cn("order-1 size-10", { "order-2": isUser })}>
        {isUser ? (
          <>
            <AvatarImage
              src="/confident-agent-handshake.png"
              alt="User"
              className="object-cover"
            />
            <AvatarFallback>JD</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage
              src="/helpful-ai-interface.png"
              alt="AI"
              className="object-cover"
            />
            <AvatarFallback>AI</AvatarFallback>
          </>
        )}
      </Avatar>
      <div
        className={cn("group order-2 flex max-w-1/2 flex-col gap-1", {
          "order-1": isUser,
        })}
      >
        <div
          className={cn("flex w-fit items-center gap-2", {
            "justify-end": isUser,
          })}
        >
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
            "group relative w-fit space-y-2 rounded-lg p-4 text-sm",
            isUser
              ? "bg-primary dark:bg-primary rounded-tr-none text-white dark:text-white"
              : "rounded-tl-none bg-gray-100 dark:bg-gray-800",
          )}
        >
          <Markdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-xl font-bold">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold">{children}</h2>
              ),
              p: ({ children }) => (
                <p className="whitespace-pre-line">{children}</p>
              ),
              a: ({ href, children }) => (
                <Link
                  href={new URL(href ?? "")}
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                >
                  {children}
                </Link>
              ),
              ol: ({ children }) => (
                <ul className="list-disc space-y-2 pl-5">{children}</ul>
              ),
              ul: ({ children }) => (
                <ul className="list-disc space-y-2 pl-5">{children}</ul>
              ),
              li: ({ children }) => <li>{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-400 pl-4 text-gray-600 italic">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-white">
                  {children}
                </pre>
              ),
            }}
          >
            {message.content}
          </Markdown>

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
        {/* {!isUser && message.richContent && ( */}
        {/*   <div className="mt-2"> */}
        {/*     {message.richContent.type === "agent" && ( */}
        {/*       <AgentCard */}
        {/*         id={message.richContent.data.id} */}
        {/*         name={message.richContent.data.name} */}
        {/*         agency={message.richContent.data.agency} */}
        {/*         photoUrl={message.richContent.data.photoUrl} */}
        {/*         listings={message.richContent.data.listings} */}
        {/*         clearanceRate={message.richContent.data.clearanceRate} */}
        {/*       /> */}
        {/*     )} */}
        {/*     {message.richContent.type === "property" && ( */}
        {/*       <PropertyCard */}
        {/*         id={message.richContent.data.id} */}
        {/*         address={message.richContent.data.address} */}
        {/*         suburb={message.richContent.data.suburb} */}
        {/*         price={message.richContent.data.price} */}
        {/*         imageUrl={message.richContent.data.imageUrl} */}
        {/*         beds={message.richContent.data.beds} */}
        {/*         baths={message.richContent.data.baths} */}
        {/*         carSpaces={message.richContent.data.carSpaces} */}
        {/*         sqm={message.richContent.data.sqm} */}
        {/*       /> */}
        {/*     )} */}
        {/*     {message.richContent.type === "marketInsight" && ( */}
        {/*       <MarketInsightCard */}
        {/*         suburb={message.richContent.data.suburb} */}
        {/*         medianPrice={message.richContent.data.medianPrice} */}
        {/*         priceChange={message.richContent.data.priceChange} */}
        {/*         daysOnMarket={message.richContent.data.daysOnMarket} */}
        {/*         daysChange={message.richContent.data.daysChange} */}
        {/*         clearanceRate={message.richContent.data.clearanceRate} */}
        {/*         clearanceChange={message.richContent.data.clearanceChange} */}
        {/*       /> */}
        {/*     )} */}
        {/*   </div> */}
        {/* )} */}

        {/* {!isUser && */}
        {/*   isLastMessage && */}
        {/*   message.text.includes("analysis") && */}
        {/*   !message.richContent && ( */}
        {/*     <div className="mt-2 flex flex-wrap gap-2"> */}
        {/*       <Button */}
        {/*         variant="outline" */}
        {/*         size="sm" */}
        {/*         className="h-8 gap-1 bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700" */}
        {/*       > */}
        {/*         <span>Generate detailed report</span> */}
        {/*         <ArrowRight className="h-3 w-3" /> */}
        {/*       </Button> */}
        {/*       <Button */}
        {/*         variant="outline" */}
        {/*         size="sm" */}
        {/*         className="h-8 gap-1 bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700" */}
        {/*       > */}
        {/*         <span>Compare with previous month</span> */}
        {/*         <ArrowRight className="h-3 w-3" /> */}
        {/*       </Button> */}
        {/*     </div> */}
        {/*   )} */}
      </div>
    </div>
  );
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
