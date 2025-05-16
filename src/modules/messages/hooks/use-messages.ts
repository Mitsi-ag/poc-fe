import { initialMessageAtom } from "@/lib/atoms";
import { useMessagesByChatIdQuery } from "@/modules/messages/hooks/queries";
import { Message, useChat } from "@ai-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export function useMessages() {
  const {
    data: storedMessages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useMessagesByChatIdQuery();

  const isNewChatSent =
    storedMessages?.length === 1 && storedMessages[0].by_user;

  const { id } = useParams<{ id?: string }>();
  const queryClient = useQueryClient();
  const setInitialMessageOnNewChatPage = useSetAtom(initialMessageAtom);

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
      is_new_chat: isNewChatSent,
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    if (isNewChatSent) {
      setInitialMessageOnNewChatPage("");
      const getAIResponse = async () => {
        await append({ role: "user", content: storedMessages[0].text });
        queryClient.invalidateQueries({
          queryKey: ["all-messages"],
        });
      };

      getAIResponse();
    }
  }, [isNewChatSent]);

  // Send message function
  const handleSendMessage = async (message?: string) => {
    const content = message ?? input;
    if (content.trim() === "") return;
    setInput("");
    await append({ role: "user", content });
  };

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion: string) => {
    await handleSendMessage(suggestion);
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
    hasNextPage,
    setInput,
    handleSendMessage,
    handleSuggestionClick,
    fetchNextPage,
  };
}
