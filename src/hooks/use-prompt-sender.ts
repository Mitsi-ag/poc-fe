import { useMessagesContext } from "@/contexts/messages-context";
import { useSendFirstMessage } from "@/hooks/use-send-first-message";
import { useParams, usePathname } from "next/navigation";

export function usePromptSender() {
  const { handleSuggestionClick } = useMessagesContext();
  const { handleSendMessage } = useSendFirstMessage();
  const { id } = useParams<{ id?: string }>();
  const pathname = usePathname();

  const sendPrompt = async (prompt: string) => {
    if (id && pathname.includes("ai-assistant/chat")) {
      await handleSuggestionClick(prompt);
    } else {
      await handleSendMessage(prompt);
    }
  };

  return { sendPrompt };
}
