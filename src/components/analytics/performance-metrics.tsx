"use client";

import type React from "react";

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
import {
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Home,
  Calendar,
  MessageSquare,
} from "lucide-react";

interface PerformanceMetricsProps {
  timeRange: string;
  region: string;
}

export function PerformanceMetrics({
  timeRange,
  region,
}: PerformanceMetricsProps) {
  // Sample data - simplified for a new agent
  const performanceData = [
    { month: "Jan", views: 120, listings: 2, inquiries: 8 },
    { month: "Feb", views: 145, listings: 3, inquiries: 12 },
    { month: "Mar", views: 132, listings: 2, inquiries: 10 },
    { month: "Apr", views: 158, listings: 4, inquiries: 15 },
    { month: "May", views: 165, listings: 3, inquiries: 18 },
    { month: "Jun", views: 190, listings: 5, inquiries: 22 },
    { month: "Jul", views: 175, listings: 4, inquiries: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Profile Views"
          value="1,085"
          change="+12.5%"
          trend="up"
          description="vs. previous period"
          icon={<Eye className="text-muted-foreground h-4 w-4" />}
        />
        <MetricCard
          title="Active Listings"
          value="23"
          change="+8.2%"
          trend="up"
          description="vs. previous period"
          icon={<Home className="text-muted-foreground h-4 w-4" />}
        />
        <MetricCard
          title="Inquiries"
          value="105"
          change="+15.3%"
          trend="up"
          description="vs. previous period"
          icon={<MessageSquare className="text-muted-foreground h-4 w-4" />}
        />
        <MetricCard
          title="Appointments"
          value="42"
          change="-2.4%"
          trend="down"
          description="vs. previous period"
          icon={<Calendar className="text-muted-foreground h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Views</CardTitle>
            <CardDescription>Monthly profile views over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                views: {
                  label: "Views",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="var(--color-views)"
                    activeDot={{ r: 8 }}
                    name="Profile Views"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Metrics</CardTitle>
            <CardDescription>Listings and inquiries by month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                listings: {
                  label: "Listings",
                  color: "hsl(var(--chart-2))",
                },
                inquiries: {
                  label: "Inquiries",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    dataKey="listings"
                    fill="var(--color-listings)"
                    name="Listings"
                  />
                  <Bar
                    dataKey="inquiries"
                    fill="var(--color-inquiries)"
                    name="Inquiries"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
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
}

function MetricCard({
  title,
  value,
  change,
  trend,
  description,
  icon,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-muted-foreground mt-1 flex items-center text-xs">
          {trend === "up" ? (
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
          )}
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
            {change}
          </span>
          <span className="ml-1">{description}</span>
        </p>
      </CardContent>
    </Card>
  );
}
