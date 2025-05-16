import { PropertyDescriptionGeneratorForm } from "@/components/ai-assistant/property-description-generator/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToolsQuery } from "@/modules/tools/hooks/queries";
import { FileText } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PropertyDescriptionGeneratorModal() {
  const { data: tools } = useToolsQuery();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (tools) {
      const toolParam = searchParams.get("tool");
      const initialOpen = tools.find(
        (tool) => tool.id.toString() === toolParam,
      );
      if (initialOpen) {
        setOpen(true);
      }
    }
  }, [tools]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-9 justify-start px-2.5 text-xs">
          <div className="bg-primary/10 text-primary mr-2 flex h-6 w-6 items-center justify-center rounded-md">
            <FileText className="h-4 w-4" />
          </div>
          <span>Property Description</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle className="text-2xl">
            Property Description Generator
          </DialogTitle>
          <DialogDescription>
            Please provide the following details to generate your property
            description
          </DialogDescription>
        </DialogHeader>
        <PropertyDescriptionGeneratorForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
