import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Users } from "lucide-react";

export function TopAgentsCard() {
  return (
    <Card className="overflow-hidden border shadow-sm hover:shadow transition-all dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Top Agents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topAgents.map((agent, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                <AvatarImage
                  src={agent.avatar || "/placeholder.svg"}
                  alt={agent.name}
                />
                <AvatarFallback>{agent.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <p className="font-medium group-hover:text-primary transition-colors">
                  {agent.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {agent.agency}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {agent.listings} listings
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Agents
        </Button>
      </CardFooter>
    </Card>
  );
}

const topAgents = [
  {
    name: "Sarah Johnson",
    initials: "SJ",
    avatar: "/confident-agent.png",
    agency: "Ray White",
    listings: 14,
  },
  {
    name: "Michael Chen",
    initials: "MC",
    avatar: "/confident-agent.png",
    agency: "McGrath",
    listings: 9,
  },
  {
    name: "Emma Wilson",
    initials: "EW",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional woman portrait",
    agency: "Belle Property",
    listings: 11,
  },
];
