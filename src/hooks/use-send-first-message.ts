import { initialMessageAtom } from "@/lib/atoms";
import { useSaveUserMessageMutation } from "@/modules/messages/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

export function useSendFirstMessage() {
  const setInitialMessage = useSetAtom(initialMessageAtom);
  const { mutateAsync } = useSaveUserMessageMutation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSendMessage = async (input: string) => {
    if (input.trim() === "") return;
    setInitialMessage(input);
    const data = await mutateAsync(
      { content: input },
      {
        onError: () => {
          setInitialMessage("");
        },
      },
    );

    router.push(`/ai-assistant/chat/${data.chat_id}`);
    queryClient.invalidateQueries({
      queryKey: ["all-chats"],
    });
  };

  return { handleSendMessage };
}
