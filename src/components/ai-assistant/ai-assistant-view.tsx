"use client";

import { FullPageAssistant } from "@/components/ai-assistant/full-page-assistant";
import { ChatHistory } from "@/components/chat-history";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export function AIAssistantView() {
  const [showFullPage, setShowFullPage] = useState(true);

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
            <Button
              onClick={() => setShowFullPage(true)}
              className="from-primary hover:from-primary/90 gap-2 bg-linear-to-r to-blue-400 text-white shadow-md transition-all duration-300 hover:to-blue-500"
            >
              <PlusCircle className="h-4 w-4" />
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
