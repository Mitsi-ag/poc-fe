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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-50 dark:to-gray-400">
                AI Assistant
              </h1>
              <p className="text-muted-foreground mt-1">
                Your intelligent real estate assistant and conversation history
              </p>
            </div>
            <Button
              onClick={() => setShowFullPage(true)}
              className="gap-2 bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-500 text-white shadow-md transition-all duration-300"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Chat</span>
            </Button>
          </div>

          <ChatHistory
            onChatSelect={(chatId) => {
              setShowFullPage(true);
            }}
          />
        </div>
      )}
    </>
  );
}
