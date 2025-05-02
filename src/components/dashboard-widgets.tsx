"use client";

import type React from "react";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building,
  Calendar,
  Clock,
  Edit3,
  Home,
  MoreHorizontal,
  Plus,
  Sparkles,
  User,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Users,
  PieChart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function DashboardWidgets() {
  const [activeTab, setActiveTab] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  const [showAddWidgetDialog, setShowAddWidgetDialog] = useState(false);

  // Simulate refresh action
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400">
            Welcome back, John
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening in your market today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="gap-2 bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
            onClick={() => {}}
          >
            <Calendar className="h-4 w-4" />
            <span>April 19, 2025</span>
          </Button>
          <Dialog
            open={showAddWidgetDialog}
            onOpenChange={setShowAddWidgetDialog}
          >
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <Plus className="h-4 w-4" />
                <span>Add Widget</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add Widget to Dashboard</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                {widgetOptions.map((widget, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-4 border rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all dark:hover:bg-gray-800"
                    onClick={() => setShowAddWidgetDialog(false)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400">
                        {widget.icon}
                      </div>
                      <h3 className="font-medium">{widget.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      {widget.description}
                    </p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        className="space-y-4"
        onValueChange={setActiveTab}
      >
        <div className="flex items-center justify-between">
          <TabsList className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
            >
              All Insights
            </TabsTrigger>
            <TabsTrigger
              value="listings"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
            >
              Listings
            </TabsTrigger>
            <TabsTrigger
              value="agents"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
            >
              Agents
            </TabsTrigger>
            <TabsTrigger
              value="crm"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
            >
              CRM
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              onClick={handleRefresh}
            >
              <RefreshCw
                className={cn("h-4 w-4", isRefreshing && "animate-spin")}
              />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              onClick={() => {}}
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit Layout</span>
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4 mt-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="New Listings"
              value="24"
              change="+8"
              trend="up"
              description="in your target suburbs"
              icon={<Home className="h-4 w-4" />}
              onClick={() => {}}
            />
            <MetricCard
              title="Competitor Activity"
              value="12"
              change="+3"
              trend="up"
              description="new listings by competitors"
              icon={<User className="h-4 w-4" />}
              onClick={() => {}}
            />
            <MetricCard
              title="Avg. Days on Market"
              value="32"
              change="-5"
              trend="down"
              description="across all suburbs"
              icon={<Clock className="h-4 w-4" />}
              onClick={() => {}}
            />
            <MetricCard
              title="Active Agencies"
              value="8"
              change="+1"
              trend="up"
              description="in Bondi Beach"
              icon={<Building className="h-4 w-4" />}
              onClick={() => {}}
            />
          </div>

          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all dark:bg-gray-900/80">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">
                  AI Daily Insights
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                    onClick={handleRefresh}
                  >
                    <RefreshCw
                      className={cn("h-4 w-4", isRefreshing && "animate-spin")}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                Personalized insights based on your market activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border p-3 transition-all",
                      "hover:border-blue-200 hover:bg-blue-50 dark:hover:border-blue-900 dark:hover:bg-gray-800",
                      expandedInsight === index &&
                        "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-gray-800",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        insight.type === "alert"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-500",
                      )}
                    >
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-start justify-between">
                        <p className="font-medium">{insight.title}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 -mt-1 -mr-1 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300"
                          onClick={() =>
                            setExpandedInsight(
                              expandedInsight === index ? null : index,
                            )
                          }
                        >
                          {expandedInsight === index ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {insight.description}
                      </p>

                      {expandedInsight === index && (
                        <div className="pt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                          <p className="text-sm">{insight.details}</p>
                          <div className="flex flex-wrap gap-2">
                            {insight.actions.map((action, actionIndex) => (
                              <Button
                                key={actionIndex}
                                variant="outline"
                                size="sm"
                                className="h-7 gap-1 text-xs bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                                onClick={() => {}}
                              >
                                <span>{action}</span>
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {expandedInsight !== index && (
                        <Button
                          variant="link"
                          className="h-auto p-0 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={() => {}}
                        >
                          <span>View details</span>
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="space-y-4 mt-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="New Listings"
              value="24"
              change="+8"
              trend="up"
              description="in your target suburbs"
              icon={<Home className="h-4 w-4" />}
              onClick={() => {}}
            />
            <MetricCard
              title="Avg. Days on Market"
              value="32"
              change="-5"
              trend="down"
              description="across all suburbs"
              icon={<Clock className="h-4 w-4" />}
              onClick={() => {}}
            />
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4 mt-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Competitor Activity"
              value="12"
              change="+3"
              trend="up"
              description="new listings by competitors"
              icon={<User className="h-4 w-4" />}
              onClick={() => {}}
            />
            <MetricCard
              title="Active Agencies"
              value="8"
              change="+1"
              trend="up"
              description="in Bondi Beach"
              icon={<Building className="h-4 w-4" />}
              onClick={() => {}}
            />
          </div>
        </TabsContent>

        <TabsContent value="crm" className="space-y-4 mt-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Active Leads"
              value="18"
              change="+2"
              trend="up"
              description="in your pipeline"
              icon={<User className="h-4 w-4" />}
              onClick={() => {}}
            />
            <MetricCard
              title="Follow-ups Due"
              value="7"
              change="+3"
              trend="up"
              description="in the next 48 hours"
              icon={<Clock className="h-4 w-4" />}
              onClick={() => {}}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function MetricCard({
  title,
  value,
  change,
  trend,
  description,
  icon,
  onClick,
}: MetricCardProps) {
  return (
    <Card
      className="overflow-hidden bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all cursor-pointer group dark:bg-gray-900/80"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-full bg-gray-100 p-1 group-hover:bg-blue-100 transition-colors dark:bg-gray-800 dark:group-hover:bg-gray-700">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs">
          <Badge
            variant={trend === "up" ? "default" : "destructive"}
            className={cn(
              "px-1 py-0",
              trend === "up"
                ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-500"
                : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-500",
            )}
          >
            {change}
            {trend === "up" ? (
              <ArrowUpRight className="ml-0.5 h-3 w-3" />
            ) : (
              <ArrowUpRight className="ml-0.5 h-3 w-3 rotate-180" />
            )}
          </Badge>
          <span className="text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}

const insights = [
  {
    type: "insight",
    title: "3 new agents listed in Bondi Beach this week",
    description:
      "This is 30% higher than the monthly average. Consider increasing your presence in this area.",
    details:
      "The new agents are from Ray White, McGrath, and LJ Hooker. They've listed a total of 7 properties, primarily in the $1.5-2M range. This could indicate increased competition in this price bracket.",
    actions: [
      "View competitor analysis",
      "Create targeted campaign",
      "Schedule area inspection",
    ],
  },
  {
    type: "alert",
    title: "Price drops detected in Randwick",
    description:
      "5 properties reduced their price by an average of 4.2% in the last 7 days.",
    details:
      "These properties have been on the market for an average of 45 days, which is 13 days longer than the suburb average. The price reductions might indicate a softening market or overpricing initially.",
    actions: [
      "View affected listings",
      "Analyze price trends",
      "Notify relevant clients",
    ],
  },
  {
    type: "insight",
    title: "Opportunity: 3 expired listings in Coogee",
    description: "These listings expired in the last 14 days without selling.",
    details:
      "The properties were listed with competitors and didn't sell within their contract period. This presents an opportunity for you to approach these owners with a fresh marketing strategy.",
    actions: [
      "Generate pitch deck",
      "View property details",
      "Draft outreach email",
    ],
  },
];

const widgetOptions = [
  {
    title: "Market Trends",
    description:
      "Track price movements and time on market in your target suburbs",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Competitor Tracker",
    description: "Monitor other agents' activities in your area",
    icon: <User className="h-4 w-4" />,
  },
  {
    title: "Lead Pipeline",
    description: "View and manage your active leads",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Recent Listings",
    description: "See the latest properties on the market",
    icon: <Building className="h-4 w-4" />,
  },
  {
    title: "Calendar Events",
    description: "Upcoming appointments and open houses",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Performance Metrics",
    description: "Your key performance indicators and goals",
    icon: <PieChart className="h-4 w-4" />,
  },
];
