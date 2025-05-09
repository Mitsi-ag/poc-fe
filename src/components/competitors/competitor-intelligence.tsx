"use client";

import { useEffect, useState } from "react";
import {
  Download,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import CompetitorGrid from "./competitors-grid";
import { useQueryClient } from "@tanstack/react-query";

export function CompetitorIntelligence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSuburb, setSelectedSuburb] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries({
        queryKey: ["all-competitors"],
      });
    } finally {
      setPage(1);
      setSearchQuery("");
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      setPage(1);
    }
  }, [searchQuery]);

  return (
    <Card className="overflow-hidden border bg-white/80 shadow-sm backdrop-blur-sm transition-all hover:shadow-md dark:bg-gray-900/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Competitor Intelligence</CardTitle>
            <CardDescription>
              Track agent activity in your target suburbs
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => {}}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => {}}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={handleRefresh}
            >
              <RefreshCw
                className={cn("h-4 w-4", isRefreshing && "animate-spin")}
              />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  Refresh data
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Save view
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Configure alerts
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  View tracked agents only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search agents or agencies..."
                className="focus-visible:ring-primary border-0 bg-gray-100 pl-8 focus-visible:ring-2 dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedSuburb} onValueChange={setSelectedSuburb}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select suburb" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suburbs</SelectItem>
                  <SelectItem value="bondi">Bondi Beach</SelectItem>
                  <SelectItem value="randwick">Randwick</SelectItem>
                  <SelectItem value="coogee">Coogee</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedTimeframe}
                onValueChange={setSelectedTimeframe}
              >
                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CompetitorGrid
            searchQuery={searchQuery}
            isRefreshing={isRefreshing}
            page={page}
            setPage={setPage}
          />
        </div>
      </CardContent>
    </Card>
  );
}
