"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Grid, Map, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { ListingsAnalytics } from "./listings-analytics";
import { ListingsComparison } from "./listings-comparison";
import { ListingsFilters } from "./listings-filters";
import { ListingsGrid } from "./listings-grid";
import { ListingsMap } from "./listings-map";
import { ListingsSavedSearches } from "./listings-saved-searches";
import { cn } from "@/lib/utils";

export function ListingsView() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");
  const [filters, setFilters] = useState({});

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-gray-50 dark:to-gray-400">
            Listings Explorer
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage property listings in your target areas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="explore"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="flex w-full max-w-3xl">
          <TabsTrigger value="explore" className="flex-1">
            Explore
          </TabsTrigger>
          <TabsTrigger value="my-listings" className="flex-1">
            My Listings
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex-1">
            Saved
          </TabsTrigger>
          {/* <TabsTrigger value="compare">Compare</TabsTrigger> */}
          {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
        </TabsList>

        <TabsContent value="explore" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search by address, suburb, or property ID..."
                  className="w-full pl-9"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-accent" : ""}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <div className="hidden rounded-md border md:flex">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("rounded-r-none", {
                    "bg-secondary text-secondary-foreground":
                      viewMode === "grid",
                  })}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="mr-2 h-4 w-4" />
                  Grid
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("rounded-r-none", {
                    "bg-secondary text-secondary-foreground":
                      viewMode === "map",
                  })}
                  onClick={() => setViewMode("map")}
                >
                  <Map className="mr-2 h-4 w-4" />
                  Map
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="date-desc">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="price-desc">
                    Price (High to Low)
                  </SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="views-desc">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {showFilters && <ListingsFilters onFilterChange={setFilters} />}

          <div className="mb-4 flex justify-center md:hidden">
            <div className="inline-flex rounded-md border">
              <Button
                variant="ghost"
                size="sm"
                className={cn("rounded-r-none", {
                  "bg-primary text-primary-foreground": viewMode === "grid",
                })}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="mr-2 h-4 w-4" />
                Grid
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn("rounded-r-none", {
                  "bg-primary text-primary-foreground": viewMode === "map",
                })}
                onClick={() => setViewMode("map")}
              >
                <Map className="mr-2 h-4 w-4" />
                Map
              </Button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <ListingsGrid filters={filters} />
          ) : (
            <ListingsMap />
          )}
        </TabsContent>

        <TabsContent value="my-listings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Listings</CardTitle>
              <CardDescription>
                Manage your active, pending, and sold listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList>
                  <TabsTrigger value="active">Active (12)</TabsTrigger>
                  <TabsTrigger value="pending">Pending (3)</TabsTrigger>
                  <TabsTrigger value="sold">Sold (24)</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts (2)</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="mt-4">
                  <ListingsGrid isManagement />
                </TabsContent>
                <TabsContent value="pending" className="mt-4">
                  <div className="text-muted-foreground py-8 text-center">
                    Select &ldquo;Pending&rdquo; to view your listings with
                    pending offers
                  </div>
                </TabsContent>
                <TabsContent value="sold" className="mt-4">
                  <div className="text-muted-foreground py-8 text-center">
                    Select &ldquo;Sold&rdquo; to view your completed sales
                  </div>
                </TabsContent>
                <TabsContent value="drafts" className="mt-4">
                  <div className="text-muted-foreground py-8 text-center">
                    Select &ldquo;Drafts&rdquo; to view your draft listings
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <ListingsSavedSearches />
        </TabsContent>

        <TabsContent value="compare" className="space-y-4">
          <ListingsComparison />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <ListingsAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
