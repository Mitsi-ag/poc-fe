import { ChatMessageItem } from "@/components/ai-assistant/chat-message-item";
import { ToolsBar } from "@/components/ai-assistant/toolsbar";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MessagesContextProvider,
  useMessagesContext,
} from "@/contexts/messages-context";
import { Send } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

export function ExistingChatView() {
  return (
    <MessagesContextProvider>
      <div className="flex flex-1 flex-col">
        <MessageArea />
        <InputArea />
      </div>
      <ToolsBar />
    </MessagesContextProvider>
  );
}

function MessageArea() {
  const { messages, isLoading, messagesEndRef, hasNextPage, fetchNextPage } =
    useMessagesContext();
  return (
    <div id="scrollableDiv" className="flex-1 overflow-y-auto p-4">
      <div className="mx-auto flex h-full max-w-3xl flex-col gap-6">
        <InfiniteScroll
          dataLength={messages.length}
          hasMore={hasNextPage}
          next={fetchNextPage}
          loader={<Spinner className="size-6" />}
          scrollableTarget="scrollableDiv"
          inverse={true}
          className="w-full space-y-4 !overflow-hidden"
        >
          {messages.map((msg) => (
            <ChatMessageItem key={msg.id} message={msg} />
          ))}
        </InfiniteScroll>

        <div className="flex flex-1 items-center justify-center">
          {isLoading && <Spinner />}
        </div>

        {<div ref={messagesEndRef} className="pt-10" />}
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
