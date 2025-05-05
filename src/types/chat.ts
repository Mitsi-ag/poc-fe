import type React from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  richContent?: {
    type: "agent" | "property" | "marketInsight" | null;
    data: unknown;
  } | null;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  time: string;
  preview: string;
  tags: string[];
  isSaved?: boolean;
}

export interface AITool {
  title: string;
  description: string;
  icon: React.ReactNode;
  prompt: string;
}
