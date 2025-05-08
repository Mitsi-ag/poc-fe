import { useCompetitorsQuery } from "@/modules/competitors/hooks/queries";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function CompetitorGrid() {
  const [trackedAgents, setTrackedAgents] = useState<number[]>([]);
  const { data, isLoading, error } = useCompetitorsQuery();

  // Toggle tracking an agent
  const toggleTrackedAgent = (agentId: number) => {
    if (trackedAgents.includes(agentId)) {
      setTrackedAgents(trackedAgents.filter((id) => id !== agentId));
    } else {
      setTrackedAgents([...trackedAgents, agentId]);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="mb-4 h-6 w-1/2" />
              <div className="mb-4 flex gap-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-center font-bold">No results found</div>;
  }

  const competitorsData = data.results;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {competitorsData.map((competitor) => {
        return (
          <Card
            key={competitor.id}
            className={cn(
              "overflow-hidden transition-all hover:shadow-md",
              trackedAgents.includes(competitor.id) &&
                "border-blue-200 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-900/10",
            )}
          >
            <CardHeader className="pt-4 pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                    <AvatarImage
                      src={competitor.url || "/placeholder.svg"}
                      alt={competitor.name}
                    />
                    <AvatarFallback>
                      {competitor.name.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-medium">{competitor.name}</h3>
                      {trackedAgents.includes(competitor.id) && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Tracked agent</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1 text-xs">
                      <span>{competitor.agency.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md border p-2">
                  <div className="text-lg font-semibold">0</div>
                  <div className="text-xs text-gray-500">Listings</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="text-lg font-semibold">0</div>
                  <div className="text-xs text-gray-500">Avg. DOM</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="text-lg font-semibold">0</div>
                  <div className="text-xs text-gray-500">Clearance</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0 pb-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:bg-yellow-50 hover:text-yellow-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-yellow-400"
                onClick={() => toggleTrackedAgent(competitor.id)}
              >
                {trackedAgents.includes(competitor.id) ? (
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                ) : (
                  <Star className="mr-1 h-4 w-4" />
                )}
                <span>
                  {trackedAgents.includes(competitor.id) ? "Untrack" : "Track"}
                </span>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default CompetitorGrid;
