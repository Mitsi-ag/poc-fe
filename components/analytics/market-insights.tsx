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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

interface MarketInsightsProps {
  timeRange: string
  region: string
}

export function MarketInsights({ timeRange, region }: MarketInsightsProps) {
  // Sample data - simplified for a new agent
  const priceData = [
    { month: "Jan", median: 850000, average: 920000 },
    { month: "Feb", median: 860000, average: 935000 },
    { month: "Mar", median: 870000, average: 945000 },
    { month: "Apr", median: 890000, average: 960000 },
    { month: "May", median: 900000, average: 975000 },
    { month: "Jun", median: 915000, average: 990000 },
    { month: "Jul", median: 925000, average: 1000000 },
  ]

  const daysOnMarketData = [
    { month: "Jan", days: 32 },
    { month: "Feb", days: 30 },
    { month: "Mar", days: 28 },
    { month: "Apr", days: 25 },
    { month: "May", days: 24 },
    { month: "Jun", days: 22 },
    { month: "Jul", days: 21 },
  ]

  const propertyTypeData = [
    { name: "Houses", value: 45 },
    { name: "Apartments", value: 30 },
    { name: "Townhouses", value: 15 },
    { name: "Land", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const hotSuburbs = [
    { name: "Bondi", growth: "+3.5%", median: "$2.1M", volume: "High" },
    { name: "Surry Hills", growth: "+2.8%", median: "$1.8M", volume: "Medium" },
    { name: "Manly", growth: "+3.2%", median: "$2.4M", volume: "High" },
    { name: "Newtown", growth: "+2.5%", median: "$1.6M", volume: "Medium" },
    { name: "Parramatta", growth: "+2.1%", median: "$1.2M", volume: "High" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Price Trends</CardTitle>
            <CardDescription>Median and average property prices (Sample data)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                median: {
                  label: "Median Price",
                  color: "hsl(var(--chart-1))",
                },
                average: {
                  label: "Average Price",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="median"
                    stroke="var(--color-median)"
                    activeDot={{ r: 8 }}
                    name="Median Price ($)"
                  />
                  <Line
                    type="monotone"
                    dataKey="average"
                    stroke="var(--color-average)"
                    activeDot={{ r: 8 }}
                    name="Average Price ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Days on Market</CardTitle>
            <CardDescription>Average days properties stay listed (Sample data)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                days: {
                  label: "Days on Market",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={daysOnMarketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="days" fill="var(--color-days)" name="Days on Market" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Type Distribution</CardTitle>
            <CardDescription>Breakdown by property type (Sample data)</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full max-w-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {propertyTypeData.map((entry, index) => (
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
            <CardTitle>Hot Suburbs</CardTitle>
            <CardDescription>Areas with highest price growth (Sample data)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotSuburbs.map((suburb, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <div className="font-medium">{suburb.name}</div>
                    <div className="text-sm text-muted-foreground">Median: {suburb.median}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">{suburb.growth}</span>
                    </Badge>
                    <Badge variant={suburb.volume === "High" ? "default" : "secondary"} className="text-xs">
                      {suburb.volume}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
