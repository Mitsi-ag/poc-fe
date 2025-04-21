"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Eye, MessageSquare, Home, Calendar, Download } from "lucide-react"

export function ListingsAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Listings Analytics</h2>
          <p className="text-muted-foreground">Track performance and market trends</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Views" value="2,458" change="+12.5%" trend="up" icon={<Eye className="h-4 w-4" />} />
        <MetricCard
          title="Inquiries"
          value="124"
          change="+8.2%"
          trend="up"
          icon={<MessageSquare className="h-4 w-4" />}
        />
        <MetricCard
          title="Avg. Days on Market"
          value="32"
          change="-5.3%"
          trend="down"
          icon={<Calendar className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Listings"
          value="12"
          change="+2"
          trend="neutral"
          icon={<Home className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="market">Market Trends</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Listing Views Over Time</CardTitle>
                <CardDescription>Total views across all your listings</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Chart visualization would appear here</p>
                  <p className="text-sm text-muted-foreground">Showing daily views for the last 30 days</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Listings</CardTitle>
                <CardDescription>Listings with the most views and inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between pb-4 border-b">
                    <div>
                      <div className="font-medium">Modern Waterfront Apartment</div>
                      <div className="text-sm text-muted-foreground">42 Harbour Street, Sydney</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">458 views</div>
                      <div className="text-sm text-muted-foreground">24 inquiries</div>
                    </div>
                  </div>
                  <div className="flex items-start justify-between pb-4 border-b">
                    <div>
                      <div className="font-medium">Charming Family Home</div>
                      <div className="text-sm text-muted-foreground">15 Wattle Avenue, Bondi</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">392 views</div>
                      <div className="text-sm text-muted-foreground">18 inquiries</div>
                    </div>
                  </div>
                  <div className="flex items-start justify-between pb-4 border-b">
                    <div>
                      <div className="font-medium">Stylish Urban Loft</div>
                      <div className="text-sm text-muted-foreground">7/120 Crown Street, Surry Hills</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">312 views</div>
                      <div className="text-sm text-muted-foreground">15 inquiries</div>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">Renovated Victorian Terrace</div>
                      <div className="text-sm text-muted-foreground">42 Oxford Street, Paddington</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">278 views</div>
                      <div className="text-sm text-muted-foreground">12 inquiries</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inquiry Conversion Rate</CardTitle>
              <CardDescription>Percentage of views that result in inquiries</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Chart visualization would appear here</p>
                <p className="text-sm text-muted-foreground">Showing conversion rates by property type</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Price Trends by Suburb</CardTitle>
                <CardDescription>Average price changes in your target areas</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Chart visualization would appear here</p>
                  <p className="text-sm text-muted-foreground">Showing price trends for the last 12 months</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Days on Market by Property Type</CardTitle>
                <CardDescription>Average time to sell different property types</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Chart visualization would appear here</p>
                  <p className="text-sm text-muted-foreground">Comparing your listings vs. market average</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Competitive Analysis</CardTitle>
              <CardDescription>How your listings compare to competitors</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Chart visualization would appear here</p>
                <p className="text-sm text-muted-foreground">Comparing pricing, features, and performance</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your listing views are coming from</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Chart visualization would appear here</p>
                <p className="text-sm text-muted-foreground">Breakdown of traffic sources for your listings</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Devices used to view your listings</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Chart visualization would appear here</p>
                  <p className="text-sm text-muted-foreground">Mobile vs. desktop vs. tablet usage</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time of Day Analysis</CardTitle>
                <CardDescription>When your listings get the most views</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Chart visualization would appear here</p>
                  <p className="text-sm text-muted-foreground">Hourly breakdown of listing views</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}

function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-muted-foreground">{title}</div>
          <div className="bg-muted p-2 rounded-full">{icon}</div>
        </div>
        <div className="text-2xl font-bold mb-2">{value}</div>
        <div className="flex items-center">
          {trend === "up" && (
            <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              {change}
            </Badge>
          )}
          {trend === "down" && (
            <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              {change}
            </Badge>
          )}
          {trend === "neutral" && <Badge variant="outline">{change}</Badge>}
        </div>
      </CardContent>
    </Card>
  )
}
