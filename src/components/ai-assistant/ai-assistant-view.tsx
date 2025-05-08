"use client";

import { FullPageAssistant } from "@/components/ai-assistant/full-page-assistant";
import { ChatHistory } from "@/components/chat-history";
import { useState } from "react";

export function AIAssistantView() {
  const [showFullPage, setShowFullPage] = useState(false);

  return (
    <>
      {showFullPage ? (
        <FullPageAssistant />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-gray-50 dark:to-gray-400">
                AI Assistant
              </h1>
              <p className="text-muted-foreground mt-1">
                Your intelligent real estate assistant and conversation history
              </p>
            </div>
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
