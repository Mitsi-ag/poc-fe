import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  // Redirect back to home page upon closing the view
  const onClose = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary dark:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">RealtyMate AI</h2>
          <p className="text-muted-foreground text-sm">
            Your intelligent real estate companion
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="rounded-full"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
