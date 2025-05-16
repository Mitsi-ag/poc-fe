import { useMessages } from "@/modules/messages/hooks/use-messages";
import { createContext, ReactNode, useContext } from "react";

type ProviderData = ReturnType<typeof useMessages>;
const MessagesContext = createContext<ProviderData | null>(null);

export function MessagesContextProvider({ children }: { children: ReactNode }) {
  const props = useMessages();
  return (
    <MessagesContext.Provider value={props}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessagesContext() {
  const context = useContext(MessagesContext);
  if (!context) {
    return {
      handleSuggestionClick: () => {},
    } as unknown as ProviderData;
  }

  return context;
}
