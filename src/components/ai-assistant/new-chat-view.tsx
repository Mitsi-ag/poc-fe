import { ChatMessageItem } from "@/components/ai-assistant/chat-message-item";
import { ToolsBar } from "@/components/ai-assistant/toolsbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSendFirstMessage } from "@/hooks/use-send-first-message";
import { initialMessageAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function NewChatView() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <MessageArea />
        <InputArea />
      </div>
      <ToolsBar />
    </>
  );
}

function MessageArea() {
  const initialMessage = useAtomValue(initialMessageAtom);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mx-auto h-full max-w-3xl">
        {initialMessage ? (
          <ChatMessageItem
            message={{
              id: "1",
              isUserMessage: true,
              content: initialMessage,
              createdAt: new Date(),
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-center text-3xl font-bold">
            What can I help you with?
          </div>
        )}
      </div>
    </div>
  );
}

function InputArea() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { handleSendMessage: sendMessage } = useSendFirstMessage();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

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
