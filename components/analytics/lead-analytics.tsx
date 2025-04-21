"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface LeadAnalyticsProps {
  timeRange: string
  region: string
}

export function LeadAnalytics({ timeRange, region }: LeadAnalyticsProps) {
  // Sample data - in a real app, this would come from an API
  const leadSourceData = [
    { name: "Website", value: 35 },
    { name: "Referrals", value: 25 },
    { name: "Social Media", value: 20 },
    { name: "Property Portals", value: 15 },
    { name: "Other", value: 5 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const conversionData = [
    { stage: "Inquiry", count: 120 },
    { stage: "Qualified", count: 85 },
    { stage: "Meeting", count: 60 },
    { stage: "Proposal", count: 40 },
    { stage: "Won", count: 25 },
  ]

  const leadTrendData = [
    { month: "Jan", leads: 42, conversions: 12 },
    { month: "Feb", leads: 48, conversions: 15 },
    { month: "Mar", leads: 45, conversions: 14 },
    { month: "Apr", leads: 52, conversions: 18 },
    { month: "May", leads: 58, conversions: 20 },
    { month: "Jun", leads: 63, conversions: 22 },
    { month: "Jul", leads: 68, conversions: 25 },
  ]

  const topLeads = [
    { name: "Sarah Johnson", source: "Website", status: "Qualified", value: "$1.2M" },
    { name: "Michael Chen", source: "Referral", status: "Meeting", value: "$950K" },
    { name: "Emma Williams", source: "Social", status: "Proposal", value: "$1.5M" },
    { name: "David Thompson", source: "Portal", status: "Inquiry", value: "$850K" },
    { name: "Jessica Brown", source: "Website", status: "Qualified", value: "$1.1M" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Inquiry":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Qualified":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Meeting":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "Proposal":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Won":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Where your leads are coming from</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full max-w-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {leadSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Funnel</CardTitle>
            <CardDescription>Progression through sales stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionData.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <span className="text-sm text-muted-foreground">{stage.count}</span>
                  </div>
                  <Progress value={(stage.count / conversionData[0].count) * 100} className="h-2" />
                </div>
              ))}
              <div className="pt-2 text-sm text-muted-foreground">
                Conversion rate: {((conversionData[4].count / conversionData[0].count) * 100).toFixed(1)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Trends</CardTitle>
            <CardDescription>New leads and conversions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                leads: {
                  label: "New Leads",
                  color: "hsl(var(--chart-1))",
                },
                conversions: {
                  label: "Conversions",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={leadTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="var(--color-leads)"
                    activeDot={{ r: 8 }}
                    name="New Leads"
                  />
                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke="var(--color-conversions)"
                    activeDot={{ r: 8 }}
                    name="Conversions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Leads</CardTitle>
            <CardDescription>Your most valuable prospects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLeads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {lead.source} • {lead.value}
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(lead.status)}`}>{lead.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
