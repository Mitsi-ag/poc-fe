import { MessagesController } from "@/modules/messages/controller";
import { openai } from "@ai-sdk/openai";
import { experimental_createMCPClient, Message, streamText } from "ai";
import { NextResponse } from "next/server";

type MessageRequest = {
  messages: Message[];
  chat_id: string;
};

export async function POST(req: Request) {
  const { messages, chat_id } = (await req.json()) as MessageRequest;

  const newMessage = messages.at(-1);
  if (!newMessage) {
    throw new Error("No new message found");
  }

  try {
    // Initialize an MCP client to connect to a `stdio` MCP server:
    const sseClient = await experimental_createMCPClient({
      transport: { type: "sse", url: process.env.PROPSCRAPER_SSE_MCP_URL! },
    });
    const tools = await sseClient.tools();

    const response = streamText({
      tools,
      messages,
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      onFinish: async ({ usage, toolCalls, text }) => {
        await sseClient.close();
        const input_tokens = usage.promptTokens;
        const output_tokens = usage.completionTokens;

        await MessagesController.create({
          chat_id: parseInt(chat_id),
          text,
          input_tokens,
          output_tokens,
          by_user: false,
          tool_calls: toolCalls.map((toolCall) => toolCall.toolName),
        });
      },
    });

    return response.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

const SYSTEM_PROMPT = `You are RealtyMate AI, a highly reliable assistant chatbot designed specifically to support real estate agents working at various agencies. Your primary objective is to provide accurate, up-to-date assistance on:
      - Market trends
      - Competitor activity
      - Email and pitch composition
      - Client engagement strategies

    1. Property performance insights: You are integrated with MCP (Market & Competitor Platform) tools, which you must use to fetch any required data before forming a response. You must never fabricate information or speculate. If the answer is unknown or data is unavailable, clearly state: “I don’t know that at the moment, but I can help you look it up or notify someone who can.”

    2. Behavioral Guidelines:
      - Do not hallucinate.
      - Do not guess.
      - Do not rely on assumptions unless explicitly backed by MCP data or provided context.
      - Use precise, fact-based responses only.

    Clarify ambiguous questions before responding.

    3. Tone & Style:
    - Professional but approachable
    - Clear, concise, and helpful
    - Tailored to realty professionals and their workflows

    Your role is to save agents time, enhance deal preparation, and improve market intelligence by delivering truth-bound, data-driven insights only.`;
