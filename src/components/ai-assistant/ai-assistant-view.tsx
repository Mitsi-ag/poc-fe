"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FullPageAssistant } from "@/components/ai-assistant/full-page-assistant";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ChatHistory } from "@/components/chat-history";

export function AIAssistantView() {
  const router = useRouter();
  const [showFullPage, setShowFullPage] = useState(true);

  // Handle closing the full-page assistant
  const handleClose = () => {
    router.push("/");
  };

  return (
    <>
      {showFullPage ? (
        <FullPageAssistant onClose={handleClose} />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-50 dark:to-gray-400">
                AI Assistant
              </h1>
              <p className="mt-1 text-muted-foreground">
                Your intelligent real estate assistant and conversation history
              </p>
            </div>
            <Button
              onClick={() => setShowFullPage(true)}
              className="gap-2 text-white bg-gradient-to-r to-blue-400 shadow-md transition-all duration-300 hover:to-blue-500 from-primary hover:from-primary/90"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Chat</span>
            </Button>
          </div>

          <ChatHistory
            onChatSelect={(chatId) => {
              console.log(chatId);
              setShowFullPage(true);
            }}
          />
        </div>
      )}
    </>
  );
}
