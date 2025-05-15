import { ChatMessageItem } from "@/components/ai-assistant/chat-message-item";
import { Header } from "@/components/ai-assistant/header";
import { Sidebar } from "@/components/ai-assistant/sidebar";
import { ToolsBar } from "@/components/ai-assistant/toolsbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MessagesContextProvider,
  useMessagesContext,
} from "@/contexts/messages-context";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

export function FullPageAssistant() {
  return (
    <MessagesContextProvider>
      <div className="relative h-dvh bg-white dark:bg-gray-950">
        <Header />
        <div className="flex h-[calc(100%-5rem)]">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <MessageArea />
            <InputArea />
          </div>
          <ToolsBar />
        </div>
      </div>
    </MessagesContextProvider>
  );
}

function MessageArea() {
  const { isNewChat, messages, isLoading, messagesEndRef } =
    useMessagesContext();
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

function InputArea() {
  const { inputRef, input, setInput, handleSendMessage } = useMessagesContext();
  return (
    <div className="border-t bg-gray-50 p-4 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl">
        <div className="relative flex-1">
          <Textarea
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
            className="max-h-[300px] border-gray-200 bg-white pr-10 dark:border-gray-700 dark:bg-gray-800"
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:text-primary/80 absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 rounded-full"
            onClick={() => handleSendMessage()}
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
