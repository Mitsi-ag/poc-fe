import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { HTMLAttributes } from "react";

export function Spinner({
  className,
  ...props
}: HTMLAttributes<SVGSVGElement>) {
  return (
    <div className="mx-auto">
      <LoaderCircle
        className={cn("stroke-primary size-12 animate-spin", className)}
        {...props}
      />
    </div>
  );
}
