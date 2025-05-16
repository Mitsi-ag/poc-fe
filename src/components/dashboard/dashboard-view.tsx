"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building,
  Calendar,
  Clock,
  Eye,
  Home,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Sparkles,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MetricCard } from "@/components/dashboard/metric-card";
import { MarketOpportunityCard } from "@/components/dashboard/market-opportunity-card";
import { PropertiesTrackingCard } from "@/components/dashboard/properties-tracking-card";
import { TopAgentsCard } from "@/components/dashboard/top-agents-card";
import { ChatbotFloating } from "@/components/chatbot-floating";
import { UpgradeModal } from "@/components/upgrade/upgrade-modal";

export function DashboardView() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isFullPageAssistantOpen, setIsFullPageAssistantOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Simulate refresh action
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  // Open the full page assistant and close the floating chatbot if it's open
  const openFullPageAssistant = () => {
    setIsFullPageAssistantOpen(true);
    setIsChatbotOpen(false);
  };

  return (
    <div className="relative w-full space-y-8">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end md:gap-4">
        <div>
          <h1 className="bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-3xl dark:from-gray-50 dark:to-gray-400">
            Welcome back, John
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Here&apos;s what&apos;s happening in your market today - April 19,
            2025
          </p>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 md:mt-0 md:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1 bg-white/80 backdrop-blur-sm transition-all hover:bg-white md:h-9 dark:bg-gray-900/50 dark:hover:bg-gray-900/80"
            onClick={handleRefresh}
          >
            <RefreshCw
              className={cn(
                "h-3 w-3 md:h-4 md:w-4",
                isRefreshing && "animate-spin",
              )}
            />
            <span className="hidden text-xs sm:inline md:text-sm">Refresh</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1 bg-white/80 backdrop-blur-sm transition-all hover:bg-white md:h-9 dark:bg-gray-900/50 dark:hover:bg-gray-900/80"
            onClick={openFullPageAssistant}
          >
            <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden text-xs sm:inline md:text-sm">
              AI Assistant
            </span>
          </Button>
          <Button
            size="sm"
            className="from-primary hover:from-primary/90 h-8 gap-1 bg-linear-to-r to-blue-400 text-white shadow-md transition-all duration-300 hover:to-blue-500 md:h-9"
          >
            <Plus className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Add Widget</span>
          </Button>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
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

      <Tabs defaultValue="insights" className="w-full">
        <div className="-mx-2 mb-4 flex items-center justify-between overflow-x-auto px-2 pb-1">
          <TabsList className="bg-white/80 p-1 backdrop-blur-sm dark:bg-gray-900/50">
            <TabsTrigger
              value="insights"
              className="data-[state=active]:bg-primary rounded-md px-2 py-1 text-xs data-[state=active]:text-white md:px-3 md:text-sm"
            >
              AI Insights
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-primary rounded-md px-2 py-1 text-xs data-[state=active]:text-white md:px-3 md:text-sm"
            >
              Recent Activity
            </TabsTrigger>
            <TabsTrigger
              value="meetings"
              className="data-[state=active]:bg-primary rounded-md px-2 py-1 text-xs data-[state=active]:text-white md:px-3 md:text-sm"
            >
              Upcoming
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="insights" className="space-y-6">
          <Card className="w-full overflow-hidden border bg-white shadow-sm backdrop-blur-md transition-all hover:shadow dark:border-gray-800 dark:bg-gray-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="text-primary h-5 w-5" />
                AI Daily Insights
              </CardTitle>
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
                      "flex items-start gap-3 rounded-xl border p-4 transition-all",
                      "hover:border-primary/30 hover:bg-primary/5 dark:hover:border-primary/20 dark:hover:bg-primary/10",
                      expandedInsight === index &&
                        "border-primary/30 bg-primary/5 dark:border-primary/20 dark:bg-primary/10",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        insight.type === "alert"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-primary/20 text-primary dark:bg-primary/30",
                      )}
                    >
                      {insight.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <p className="font-medium">{insight.title}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="-mt-1 -mr-1 h-7 w-7 rounded-full text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300"
                          onClick={() =>
                            setExpandedInsight(
                              expandedInsight === index ? null : index,
                            )
                          }
                        >
                          {expandedInsight === index ? (
                            <MoreHorizontal className="h-4 w-4 rotate-90" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {insight.description}
                      </p>

                      {expandedInsight === index && (
                        <div className="animate-in fade-in slide-in-from-top-2 space-y-3 pt-3 duration-300">
                          <p className="text-sm">{insight.details}</p>
                          <div className="flex flex-wrap gap-2">
                            {insight.actions.map((action, actionIndex) => (
                              <Button
                                key={actionIndex}
                                variant="outline"
                                size="sm"
                                className="h-8 gap-1 bg-white text-xs hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
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
                          className="text-primary dark:text-primary dark:hover:text-primary/80 hover:text-primary/80 -ml-3 h-auto p-0"
                          onClick={() => setExpandedInsight(index)}
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

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <MarketOpportunityCard />
            <PropertiesTrackingCard />
            <TopAgentsCard />
          </div>
        </TabsContent>

        <TabsContent value="activity" className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-6">
                  {activities.map((activity, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="relative mt-1">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full",
                            activity.type === "listing"
                              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                              : activity.type === "lead"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                          )}
                        >
                          {activity.icon}
                        </div>
                        {i < activities.length - 1 && (
                          <div className="absolute top-8 bottom-0 left-1/2 w-px -translate-x-1/2 bg-gray-200 dark:bg-gray-800" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{activity.title}</p>
                          <Badge variant="outline" className="text-xs">
                            {activity.time}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {activity.description}
                        </p>
                        {activity.actions && (
                          <div className="mt-3 flex gap-2">
                            {activity.actions.map((action, i) => (
                              <Button key={i} variant="outline" size="sm">
                                {action}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>
                Your schedule for the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {meetings.map((meeting, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="min-w-24 text-center">
                      <div className="rounded-t-lg bg-gray-100 px-2 py-1 dark:bg-gray-800">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {meeting.month}
                        </p>
                      </div>
                      <div className="rounded-b-lg border border-gray-200 bg-white px-2 py-2 dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xl font-bold">{meeting.day}</p>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {meeting.time}
                      </p>
                    </div>
                    <div className="flex-1 rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full",
                              meeting.type === "listing"
                                ? "bg-green-500"
                                : meeting.type === "lead"
                                  ? "bg-blue-500"
                                  : meeting.type === "inspection"
                                    ? "bg-amber-500"
                                    : "bg-gray-500",
                            )}
                          />
                          <span className="font-medium">{meeting.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {meeting.description}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {meeting.participants.map((participant, p) => (
                            <Avatar
                              key={p}
                              className="h-6 w-6 border-2 border-white dark:border-gray-900"
                            >
                              <AvatarImage
                                src={participant.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {participant.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {meeting.participants.length} participant
                          {meeting.participants.length !== 1 ? "s" : ""}
                        </p>
                        <div className="ml-auto flex items-center gap-1">
                          <MapPin className="text-muted-foreground h-3 w-3" />
                          <p className="text-muted-foreground text-xs">
                            {meeting.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next Week</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating AI Chatbot */}
      {isChatbotOpen && (
        <ChatbotFloating
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
        />
      )}

      {/* Floating AI Assistant Button */}
      {!isChatbotOpen && !isFullPageAssistantOpen && (
        <Button
          onClick={() => setIsChatbotOpen(true)}
          className="bg-primary hover:bg-primary/90 fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
}

// Sample data for insights
const insights = [
  {
    type: "insight",
    icon: <Sparkles className="h-5 w-5" />,
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
    icon: <BarChart3 className="h-5 w-5" />,
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
    icon: <Home className="h-5 w-5" />,
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

// Sample data for activities
const activities = [
  {
    type: "listing",
    icon: <Home className="h-4 w-4" />,
    title: "New Listing Added",
    description: "42 Beach Rd, Bondi Beach has been added to your listings",
    time: "2 hours ago",
    actions: ["View listing", "Share"],
  },
  {
    type: "lead",
    icon: <User className="h-4 w-4" />,
    title: "New Lead Created",
    description: "Robert Smith was added as a potential seller lead",
    time: "Yesterday",
    actions: ["View lead", "Send email"],
  },
  {
    type: "note",
    icon: <MessageSquare className="h-4 w-4" />,
    title: "Note Added",
    description: "You added a note about market conditions in Randwick",
    time: "Apr 18, 2025",
  },
];

// Sample data for meetings
const meetings = [
  {
    title: "Listing Presentation",
    type: "listing",
    description: "42 Beach Rd, Bondi Beach with the Wilsons",
    month: "APR",
    day: "20",
    time: "10:30 AM - 11:30 AM",
    location: "On-site",
    participants: [
      { avatar: "/contemplative-artist.png", initials: "JW" },
      { avatar: "/thoughtful-urbanite.png", initials: "TW" },
    ],
  },
  {
    title: "Buyer Lead Meeting",
    type: "lead",
    description: "First-time buyers looking in Coogee area",
    month: "APR",
    day: "21",
    time: "2:00 PM - 3:00 PM",
    location: "Office",
    participants: [
      { avatar: "/confident-city-woman.png", initials: "AL" },
      { avatar: "/confident-urban-professional.png", initials: "JS" },
    ],
  },
  {
    title: "Open Home Inspection",
    type: "inspection",
    description: "18 Palm St, Coogee",
    month: "APR",
    day: "22",
    time: "11:00 AM - 12:00 PM",
    location: "On-site",
    participants: [{ avatar: "/confident-agent-greeting.png", initials: "JD" }],
  },
];
