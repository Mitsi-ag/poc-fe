import { cn } from "@/lib/utils";
import { useMessages } from "@/modules/messages/hooks/use-messages";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface MessageItemProps {
  message: ReturnType<typeof useMessages>["messages"][number];
}

export function ChatMessageItem({ message }: MessageItemProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.isUserMessage;

  return (
    <div className={cn("flex gap-4", { "justify-end": isUser })}>
      <Avatar className={cn("order-1 size-10", { "order-2": isUser })}>
        {isUser ? (
          <>
            <AvatarImage
              src="/confident-agent-handshake.png"
              alt="User"
              className="object-cover"
            />
            <AvatarFallback>JD</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage
              src="/helpful-ai-interface.png"
              alt="AI"
              className="object-cover"
            />
            <AvatarFallback>AI</AvatarFallback>
          </>
        )}
      </Avatar>
      <div
        className={cn("group order-2 flex max-w-1/2 flex-col gap-1", {
          "order-1": isUser,
        })}
      >
        <div
          className={cn("flex w-fit items-center gap-2", {
            "justify-end": isUser,
          })}
        >
          <span className="font-medium">
            {isUser ? "You" : "RealtyMate AI"}
          </span>
          {!isUser && (
            <Badge variant="secondary" className="px-1 py-0 text-xs">
              Assistant
            </Badge>
          )}
        </div>
        <div
          className={cn(
            "group relative w-fit space-y-2 rounded-lg p-4 text-sm",
            isUser
              ? "bg-primary dark:bg-primary rounded-tr-none text-white dark:text-white"
              : "rounded-tl-none bg-gray-100 dark:bg-gray-800",
          )}
        >
          <Markdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-xl font-bold">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold">{children}</h2>
              ),
              p: ({ children }) => (
                <p className="whitespace-pre-line">{children}</p>
              ),
              a: ({ href, children }) => (
                <Link
                  href={new URL(href ?? "")}
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                >
                  {children}
                </Link>
              ),
              ol: ({ children }) => (
                <ul className="list-disc space-y-2 pl-5">{children}</ul>
              ),
              ul: ({ children }) => (
                <ul className="list-disc space-y-2 pl-5">{children}</ul>
              ),
              li: ({ children }) => <li>{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-400 pl-4 text-gray-600 italic">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-white">
                  {children}
                </pre>
              ),
            }}
          >
            {message.content}
          </Markdown>

          {!isUser && (
            <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full bg-gray-200/50 hover:bg-gray-200 dark:bg-gray-700/50 dark:hover:bg-gray-700"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
