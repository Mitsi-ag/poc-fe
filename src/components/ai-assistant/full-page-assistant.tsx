import { ChatMessageItem } from "@/components/ai-assistant/chat-message-item";
import { Header } from "@/components/ai-assistant/header";
import { Sidebar } from "@/components/ai-assistant/sidebar";
import { ToolsBar } from "@/components/ai-assistant/toolsbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMessages } from "@/modules/messages/hooks/use-messages";
import { BarChart3, Home, Lightbulb, Send, Users } from "lucide-react";

export function FullPageAssistant() {
  const messagesProps = useMessages();

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white dark:bg-gray-950">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <MessageArea {...messagesProps} />
          <InputArea {...messagesProps} />
        </div>
        <ToolsBar {...messagesProps} />
      </div>
    </div>
  );
}

function MessageArea({
  isNewChat,
  messages,
  messagesEndRef,
  isLoading,
}: ReturnType<typeof useMessages>) {
  return (
    <div className="flex-1 overflow-y-auto p-4" id="chat-messages-container">
      <div
        className={cn("mx-auto h-full max-w-3xl", {
          "space-y-6": !isNewChat,
        })}
      >
        {!isNewChat ? (
          messages.map((msg) => <ChatMessageItem key={msg.id} message={msg} />)
        ) : (
          <div className="flex h-full items-center justify-center text-center text-3xl font-bold">
            What can I help you with?
          </div>
        )}

        {!isNewChat && isLoading && (
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
                  <div className="bg-primary h-2 w-2 rounded-full" />
                  <div className="bg-primary h-2 w-2 rounded-full" />
                  <div className="bg-primary h-2 w-2 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {!isNewChat && <div ref={messagesEndRef} className="pt-10" />}
      </div>
    </div>
  );
}

function InputArea({
  handleSuggestionClick,
  handleSendMessage,
  input,
  inputRef,
  setInput,
}: ReturnType<typeof useMessages>) {
  return (
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
              onClick={() => handleSuggestionClick("Market trends in Randwick")}
            >
              <BarChart3 className="h-3 w-3" />
              <span>Randwick market trends</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 rounded-full bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => handleSuggestionClick("Draft follow-up email")}
            >
              <Lightbulb className="h-3 w-3" />
              <span>Draft follow-up email</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
