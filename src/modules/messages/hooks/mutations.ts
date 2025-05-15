import { saveUserMessage } from "@/modules/messages/actions";
import { useMutation } from "@tanstack/react-query";

export function useSaveUserMessageMutation() {
  return useMutation({
    mutationKey: ["save-user-message"],
    mutationFn: async ({
      content,
      chatId,
    }: {
      content: string;
      chatId?: string;
    }) => await saveUserMessage(content, chatId),
    onError: (err) => {
      console.error(err);
    },
  });
}
