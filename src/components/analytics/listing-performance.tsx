"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Heart, MessageSquare, Share2 } from "lucide-react";

interface ListingPerformanceProps {
  timeRange: string;
  region: string;
}

export function ListingPerformance({
  timeRange,
  region,
}: ListingPerformanceProps) {
  // Sample data - in a real app, this would come from an API
  const viewsData = [
    { day: "Mon", views: 120, inquiries: 8 },
    { day: "Tue", views: 145, inquiries: 10 },
    { day: "Wed", views: 132, inquiries: 9 },
    { day: "Thu", views: 158, inquiries: 12 },
    { day: "Fri", views: 165, inquiries: 14 },
    { day: "Sat", views: 190, inquiries: 18 },
    { day: "Sun", views: 175, inquiries: 15 },
  ];

  const topListings = [
    {
      address: "42 Ocean View Drive, Bondi",
      price: "$1,850,000",
      views: 1245,
      inquiries: 28,
      daysListed: 14,
      image: "/coastal-living.png",
    },
    {
      address: "18 Parkside Avenue, Surry Hills",
      price: "$1,250,000",
      views: 980,
      inquiries: 22,
      daysListed: 21,
      image: "/palm-lined-residence.png",
    },
    {
      address: "7 Harbour Street, Manly",
      price: "$2,400,000",
      views: 875,
      inquiries: 19,
      daysListed: 28,
      image: "/coastal-minimalism.png",
    },
    {
      address: "103 King Street, Newtown",
      price: "$1,150,000",
      views: 760,
      inquiries: 15,
      daysListed: 35,
      image: "/confident-agent.png",
    },
  ];

  const engagementData = [
    { type: "Views", count: 12500 },
    { type: "Saves", count: 2800 },
    { type: "Inquiries", count: 950 },
    { type: "Shares", count: 450 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Listing Views & Inquiries</CardTitle>
            <CardDescription>
              Daily performance for the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                views: {
                  label: "Views",
                  color: "hsl(var(--chart-1))",
                },
                inquiries: {
                  label: "Inquiries",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="views"
                    stroke="var(--color-views)"
                    activeDot={{ r: 8 }}
                    name="Views"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="inquiries"
                    stroke="var(--color-inquiries)"
                    activeDot={{ r: 8 }}
                    name="Inquiries"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>
              How users interact with your listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="count" fill="var(--color-count)" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Listings</CardTitle>
          <CardDescription>Properties with highest engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topListings.map((listing, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 border-b pb-4 last:border-0 last:pb-0 md:flex-row"
              >
                <div className="w-full md:w-1/4">
                  <Avatar className="h-24 w-full rounded-md">
                    <AvatarImage
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.address}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-md">IMG</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{listing.address}</h3>
                  <p className="text-primary font-bold">{listing.price}</p>
                  <p className="text-muted-foreground text-sm">
                    {listing.daysListed} days on market
                  </p>
                  <div className="mt-2 flex gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="text-muted-foreground h-4 w-4" />
                      <span className="text-sm">{listing.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="text-muted-foreground h-4 w-4" />
                      <span className="text-sm">{listing.inquiries}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="text-muted-foreground h-4 w-4" />
                      <span className="text-sm">
                        {Math.floor(listing.views * 0.15)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="text-muted-foreground h-4 w-4" />
                      <span className="text-sm">
                        {Math.floor(listing.views * 0.05)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-start gap-2 md:flex-col">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300">
                    High Performing
                  </Badge>
                  <Badge variant="outline">
                    {Math.floor((listing.inquiries / listing.views) * 100)}%
                    Inquiry Rate
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
