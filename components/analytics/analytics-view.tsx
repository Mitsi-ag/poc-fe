"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PerformanceMetrics } from "./performance-metrics"
import { MarketInsights } from "./market-insights"
import { LeadAnalytics } from "./lead-analytics"
import { ListingPerformance } from "./listing-performance"
import { CompetitorAnalysis } from "./competitor-analysis"
import { CalendarIcon as CalendarHeatmap, LineChart, BarChart, PieChart, Download, Filter } from "lucide-react"

export function AnalyticsView() {
  const [timeRange, setTimeRange] = useState("30days")
  const [region, setRegion] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your performance and gain insights to grow your business.{" "}
          <span className="text-sm italic">(Sample data shown)</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Tabs defaultValue="performance" className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-5 w-full sm:w-auto">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span className="hidden md:inline">Performance</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span className="hidden md:inline">Market</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span className="hidden md:inline">Leads</span>
            </TabsTrigger>
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <CalendarHeatmap className="h-4 w-4" />
              <span className="hidden md:inline">Listings</span>
            </TabsTrigger>
            <TabsTrigger value="competitors" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden md:inline">Competitors</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>

          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="sydney">Sydney</SelectItem>
              <SelectItem value="melbourne">Melbourne</SelectItem>
              <SelectItem value="brisbane">Brisbane</SelectItem>
              <SelectItem value="perth">Perth</SelectItem>
              <SelectItem value="adelaide">Adelaide</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsContent value="performance" className="mt-0">
          <PerformanceMetrics timeRange={timeRange} region={region} />
        </TabsContent>
        <TabsContent value="market" className="mt-0">
          <MarketInsights timeRange={timeRange} region={region} />
        </TabsContent>
        <TabsContent value="leads" className="mt-0">
          <LeadAnalytics timeRange={timeRange} region={region} />
        </TabsContent>
        <TabsContent value="listings" className="mt-0">
          <ListingPerformance timeRange={timeRange} region={region} />
        </TabsContent>
        <TabsContent value="competitors" className="mt-0">
          <CompetitorAnalysis timeRange={timeRange} region={region} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
