import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useBookmarkedToolsQuery,
  useToolsQuery,
} from "@/modules/tools/hooks/queries";
import { useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";

export function ToolsBar() {
  const { data: tools } = useToolsQuery();
  const { data: bookmarkedTools } = useBookmarkedToolsQuery();
  const searchParams = useSearchParams();
  const toolParam = searchParams.get("tool");

  const filteredTools = tools?.filter((tool) =>
    bookmarkedTools?.every((t) => t.id !== tool.id),
  );

  return (
    <div className="flex w-64 flex-col border-l bg-gray-50 dark:bg-gray-900">
      <div className="border-b p-3">
        <h3 className="font-medium">Quick Tools</h3>
      </div>

      <div className="max-h-1/2 overflow-y-auto p-3">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <h4 className="text-muted-foreground text-xs font-medium">
              Bookmarked
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {bookmarkedTools && bookmarkedTools.length > 0 ? (
                bookmarkedTools.map((tool) => (
                  <Modal
                    key={tool.id}
                    initialOpen={toolParam === tool.id.toString()}
                    title={tool.name}
                    description={tool.description}
                    icon={""}
                  />
                ))
              ) : (
                <p className="text-muted pt-2 text-center text-xs">
                  No bookmarked tools
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <h4 className="text-muted-foreground text-xs font-medium">
              All tools
            </h4>
            <div className="space-y-1.5">
              {filteredTools?.map((tool) => (
                <Modal
                  key={tool.id}
                  initialOpen={toolParam === tool.id.toString()}
                  title={tool.name}
                  description={tool.description}
                  icon={""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({
  initialOpen,
  title,
  description,
  icon,
}: {
  initialOpen: boolean;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  const [open, setOpen] = useState(initialOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-9 w-full justify-start px-2.5 text-xs"
        >
          <div className="bg-primary/10 text-primary mr-2 flex h-6 w-6 items-center justify-center rounded-md">
            {icon}
          </div>
          <span className="truncate">{title}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
