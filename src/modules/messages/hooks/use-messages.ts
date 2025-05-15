import { useSaveUserMessageMutation } from "@/modules/messages/hooks/mutations";
import { useMessagesByChatIdQuery } from "@/modules/messages/hooks/queries";
import { Message, useChat } from "@ai-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function useMessages() {
  const { data: storedMessages, isLoading } = useMessagesByChatIdQuery();
  const { mutateAsync } = useSaveUserMessageMutation();
  const queryClient = useQueryClient();

  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isNewChat = !id && messages.length === 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Send message function
  const handleSendMessage = async (message?: string) => {
    const content = message ?? input;
    if (content.trim() === "") return;
    setInput("");

    const result = await mutateAsync({ content, chatId: id });

    if (!isNewChat) {
      await append(
        { role: "user", content },
        { body: { chat_id: result.chat_id } },
      );
    } else {
      router.push(`/ai-assistant/chat/${result.chat_id}`);
    }

    inputRef.current?.focus();
    queryClient.invalidateQueries({
      queryKey: ["all-chats"],
    });
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
    isNewChat,
    setInput,
    handleSendMessage,
    handleSuggestionClick,
  };
}
