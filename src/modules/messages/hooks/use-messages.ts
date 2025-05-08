import { useMessagesQuery } from "@/modules/messages/hooks/queries";
import { Message, useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";

export function useMessages() {
  const { data: storedMessages, isLoading } = useMessagesQuery();

  const initialMessages: Message[] =
    storedMessages?.map((msg) => ({
      content: msg.text,
      id: String(msg.id),
      role: msg.by_user ? "user" : "assistant",
    })) ?? [];

  const { messages, input, setInput, append, status } = useChat({
    maxSteps: 3,
    api: "/api/chat",
    initialMessages,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message function
  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    setInput("");
    await append({ role: "user", content: input });
    inputRef.current?.focus();
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSendMessage();
  };

  const renderedMessages = messages.map((message) => ({
    id: message.id,
    content: message.content,
    isUserMessage: message.role === "user",
    createdAt: message.createdAt,
  }));

  return {
    messages: renderedMessages,
    isLoading,
    status,
    messagesEndRef,
    inputRef,
    input,
    setInput,
    handleSendMessage,
    handleSuggestionClick,
  };
}
