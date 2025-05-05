import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface AgentCardProps {
  id: string;
  name: string;
  agency: string;
  photoUrl: string;
  listings: number;
  clearanceRate: number;
}

export function AgentCard({
  id,
  name,
  agency,
  photoUrl,
  listings,
  clearanceRate,
}: AgentCardProps) {
  return (
    <Link href={`/competitors/agents/${id}`} className="block no-underline">
      <Card className="overflow-hidden border-gray-200 transition-shadow duration-200 hover:shadow-md dark:border-gray-800">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={photoUrl || "/placeholder.svg"} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="truncate text-sm font-medium">{name}</h4>
                <ExternalLink className="text-muted-foreground h-3.5 w-3.5" />
              </div>
              <p className="text-muted-foreground truncate text-xs">{agency}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className="h-5 px-1.5 py-0 text-xs">
                  {listings} listings
                </Badge>
                <Badge variant="outline" className="h-5 px-1.5 py-0 text-xs">
                  {clearanceRate}% clearance
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
