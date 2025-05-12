import { useMessagesByChatIdQuery } from "@/modules/messages/hooks/queries";
import { Message, useChat } from "@ai-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export function useMessages() {
  const { data: storedMessages, isLoading } = useMessagesByChatIdQuery();
  const { id } = useParams<{ id?: string }>();
  const queryClient = useQueryClient();

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
    body: {
      chat_id: id ?? null,
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const isNewChat = !id && messages.length === 0;

  // Send message function
  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    setInput("");
    await append({ role: "user", content: input });
    inputRef.current?.focus();
    queryClient.invalidateQueries({
      queryKey: ["all-chats"],
    });
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
    isNewChat,
    setInput,
    handleSendMessage,
    handleSuggestionClick,
  };
}
