import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChatsQuery } from "@/modules/chats/hooks/queries";
import { PlusCircle, Search, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export function Sidebar() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: chatHistory,
    error,
    fetchNextPage,
    hasNextPage,
  } = useChatsQuery();

  const handleNewChat = () => {
    router.push("/ai-assistant");
  };

  const setActiveChat = (id: number) => {
    router.push(`/ai-assistant/chat/${id}`);
  };

  // Filter chat history based on search query
  const filteredChatHistory =
    (searchQuery
      ? chatHistory?.filter((chat) =>
          chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : chatHistory) ?? [];

  if (error) {
    console.error("Failed to load chat history!");
    console.error(error);
  }

  const activeChatId = id ? parseInt(id) : -1;

  return (
    <div className="flex w-64 flex-col border-r bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col gap-2 p-3">
        <Button
          onClick={handleNewChat}
          className="bg-primary hover:bg-primary/90 w-full gap-2 text-white"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Chat</span>
        </Button>

        <div className="relative">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div id="scrollableDiv" className="overflow-y-auto p-2">
        <InfiniteScroll
          dataLength={filteredChatHistory.length}
          hasMore={hasNextPage}
          next={fetchNextPage}
          scrollableTarget="scrollableDiv"
          loader={<p>Loading...</p>}
          className="space-y-2"
        >
          {filteredChatHistory.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "cursor-pointer rounded-lg p-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800/50",
                {
                  "bg-primary/10 text-primary dark:bg-primary/20":
                    activeChatId === chat.id,
                },
              )}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="flex items-center justify-between">
                <h4 className="line-clamp-1 font-medium">{chat.name}</h4>
                {chat.is_bookmarked && (
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                )}
              </div>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-muted-foreground text-xs">
                  {chat.created_at}
                </span>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
