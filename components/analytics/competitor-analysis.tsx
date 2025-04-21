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
  Bar,
  BarChart,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface CompetitorAnalysisProps {
  timeRange: string
  region: string
}

export function CompetitorAnalysis({ timeRange, region }: CompetitorAnalysisProps) {
  // Sample data - in a real app, this would come from an API
  const marketShareData = [
    { name: "Your Agency", value: 22 },
    { name: "Ray White", value: 28 },
    { name: "LJ Hooker", value: 18 },
    { name: "McGrath", value: 15 },
    { name: "Belle Property", value: 12 },
    { name: "Others", value: 5 },
  ]

  const competitorListingsData = [
    { month: "Jan", you: 12, competitor1: 15, competitor2: 10 },
    { month: "Feb", you: 15, competitor1: 16, competitor2: 11 },
    { month: "Mar", you: 14, competitor1: 14, competitor2: 12 },
    { month: "Apr", you: 18, competitor1: 15, competitor2: 13 },
    { month: "May", you: 16, competitor1: 17, competitor2: 14 },
    { month: "Jun", you: 20, competitor1: 18, competitor2: 15 },
    { month: "Jul", you: 22, competitor1: 19, competitor2: 16 },
  ]

  const topCompetitors = [
    {
      name: "Sarah Williams",
      agency: "Ray White",
      listings: 28,
      sales: 22,
      avgDays: 24,
      image: "/confident-agent-greeting.png",
    },
    {
      name: "Michael Chen",
      agency: "LJ Hooker",
      listings: 24,
      sales: 18,
      avgDays: 28,
      image: "/confident-urban-professional.png",
    },
    {
      name: "Emma Thompson",
      agency: "McGrath",
      listings: 22,
      sales: 16,
      avgDays: 32,
      image: "/confident-city-woman.png",
    },
    {
      name: "David Johnson",
      agency: "Belle Property",
      listings: 20,
      sales: 15,
      avgDays: 30,
      image: "/thoughtful-urbanite.png",
    },
  ]

  const competitiveAnalysisData = [
    {
      subject: "Listings",
      you: 8,
      competitor1: 9,
      competitor2: 7,
      fullMark: 10,
    },
    {
      subject: "Avg. Price",
      you: 7,
      competitor1: 8,
      competitor2: 6,
      fullMark: 10,
    },
    {
      subject: "Days on Market",
      you: 9,
      competitor1: 7,
      competitor2: 8,
      fullMark: 10,
    },
    {
      subject: "Online Presence",
      you: 8,
      competitor1: 9,
      competitor2: 6,
      fullMark: 10,
    },
    {
      subject: "Reviews",
      you: 9,
      competitor1: 8,
      competitor2: 7,
      fullMark: 10,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Market Share</CardTitle>
            <CardDescription>Listings by agency in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Market Share",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketShareData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="value" fill="var(--color-value)" name="Market Share (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitive Analysis</CardTitle>
            <CardDescription>Performance comparison with top competitors</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full max-w-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competitiveAnalysisData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Radar name="Your Agency" dataKey="you" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Competitor 1" dataKey="competitor1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Radar name="Competitor 2" dataKey="competitor2" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listing Activity Comparison</CardTitle>
          <CardDescription>New listings by month compared to competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              you: {
                label: "Your Agency",
                color: "hsl(var(--chart-1))",
              },
              competitor1: {
                label: "Ray White",
                color: "hsl(var(--chart-2))",
              },
              competitor2: {
                label: "LJ Hooker",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={competitorListingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="you" stroke="var(--color-you)" activeDot={{ r: 8 }} name="Your Agency" />
                <Line
                  type="monotone"
                  dataKey="competitor1"
                  stroke="var(--color-competitor1)"
                  activeDot={{ r: 8 }}
                  name="Ray White"
                />
                <Line
                  type="monotone"
                  dataKey="competitor2"
                  stroke="var(--color-competitor2)"
                  activeDot={{ r: 8 }}
                  name="LJ Hooker"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Competing Agents</CardTitle>
          <CardDescription>Most active agents in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topCompetitors.map((competitor, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-4 border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={competitor.image || "/placeholder.svg"} alt={competitor.name} />
                    <AvatarFallback>{competitor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{competitor.name}</h3>
                    <p className="text-sm text-muted-foreground">{competitor.agency}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-wrap gap-4 sm:justify-end items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">{competitor.listings}</span>
                    <span className="text-xs text-muted-foreground">Listings</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">{competitor.sales}</span>
                    <span className="text-xs text-muted-foreground">Sales</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">{competitor.avgDays}</span>
                    <span className="text-xs text-muted-foreground">Avg Days</span>
                  </div>
                  <Badge className="ml-auto" variant="outline">
                    {Math.round((competitor.sales / competitor.listings) * 100)}% Conversion
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
