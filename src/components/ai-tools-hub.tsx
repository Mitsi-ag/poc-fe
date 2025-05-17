"use client";

import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn, toCapitalCase } from "@/lib/utils";
import { useBookmarkToolMutation } from "@/modules/tools/hooks/mutations";
import {
  useBookmarkedToolsQuery,
  useToolsQuery,
} from "@/modules/tools/hooks/queries";
import { ArrowRight, Search, Sparkles, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AIToolsHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [featureRequest, setFeatureRequest] = useState("");
  const router = useRouter();
  const { data: tools } = useToolsQuery();

  const filteredTools =
    tools?.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" ||
        tool.category === activeCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    }) ?? [];

  const handleFeatureRequestSubmit = () => {
    // In a real app, this would send the request to a backend
    alert(
      "Thank you for your feature request! We'll review it and get back to you soon.",
    );
    setFeatureRequest("");
  };

  const handleToolLaunch = (toolId: number) => {
    router.push(`/ai-assistant?tool=${toolId}`);
  };

  return (
    <div className="container mx-auto max-w-7xl py-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">AI Tools Hub</h1>
          <p className="mt-1 text-sm text-gray-500 md:text-base">
            Specialized AI workflows to supercharge your real estate business
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 whitespace-nowrap hover:bg-blue-700">
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="text-sm">Custom Workflow</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request a Custom AI Workflow</DialogTitle>
              <DialogDescription>
                Tell us about the AI workflow you&apos;d like us to build for
                your real estate business.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Describe the AI workflow you need..."
                className="min-h-[150px]"
                value={featureRequest}
                onChange={(e) => setFeatureRequest(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleFeatureRequestSubmit}>
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full flex-1">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search AI tools..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="-mx-3 w-full overflow-x-auto px-3 pb-1 sm:w-auto">
          <Tabs
            defaultValue="all"
            className="w-auto"
            onValueChange={setActiveCategory}
          >
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="text-xs md:text-sm">
                All
              </TabsTrigger>
              <TabsTrigger value="marketing" className="text-xs md:text-sm">
                Marketing
              </TabsTrigger>
              <TabsTrigger value="sales" className="text-xs md:text-sm">
                Sales
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-xs md:text-sm">
                Analysis
              </TabsTrigger>
              <TabsTrigger value="international" className="text-xs md:text-sm">
                International
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <Card key={tool.id} className="overflow-hidden">
            <CardContent className="flex h-full flex-col p-4 md:p-6">
              <div className="mb-3 flex items-start md:mb-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-base font-semibold md:text-lg">
                      {tool.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className={cn("text-xs whitespace-nowrap", {
                        "bg-purple-100 text-purple-800":
                          tool.category === "marketing",
                        "bg-blue-100 text-blue-800": tool.category === "sales",
                        "bg-green-100 text-green-800":
                          tool.category === "analysis",
                        "bg-indigo-100 text-indigo-800":
                          tool.category === "international",
                      })}
                    >
                      {toCapitalCase(tool.category)}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 md:text-sm">
                    {tool.description}
                  </p>
                </div>
              </div>
              <p className="mb-3 line-clamp-3 flex-1 text-xs text-gray-700 md:mb-4 md:line-clamp-4 md:text-sm">
                {tool.prompt}
              </p>
              <div className="mt-3 flex items-center justify-between md:mt-4">
                <Button
                  variant="ghost"
                  className="h-auto px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 hover:text-blue-800 md:text-sm"
                  onClick={() => handleToolLaunch(tool.id)}
                >
                  Launch <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <BookmarkButton toolId={tool.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">
            No tools found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}

function BookmarkButton({ toolId }: { toolId: number }) {
  const { mutate, isPending: isBookmarking } = useBookmarkToolMutation();
  const { data: bookmarkedTools } = useBookmarkedToolsQuery();

  const handleBookmarkTool = (toolId: number) => {
    mutate(toolId);
  };

  return (
    <Button
      variant="ghost"
      disabled={isBookmarking}
      onClick={() => handleBookmarkTool(toolId)}
    >
      {isBookmarking ? (
        <Spinner className="size-6" />
      ) : (
        <Star
          className={cn("size-6 transition-colors", {
            "fill-yellow-300 stroke-yellow-300": bookmarkedTools?.some(
              (t) => t.id === toolId,
            ),
          })}
        />
      )}
    </Button>
  );
}
