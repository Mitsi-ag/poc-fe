"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListingsGrid } from "./listings-grid";
import { ListingsMap } from "./listings-map";
import { ListingsFilters } from "./listings-filters";
import { ListingsSavedSearches } from "./listings-saved-searches";
import { ListingsComparison } from "./listings-comparison";
import { ListingsAnalytics } from "./listings-analytics";
import {
  Search,
  Grid,
  Map,
  SlidersHorizontal,
  Plus,
  Download,
} from "lucide-react";

export function ListingsView() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");
  const [filters, setFilters] = useState({});

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-50 dark:to-gray-400">
            Listings Explorer
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage property listings in your target areas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Listing
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="explore"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by address, suburb, or property ID..."
                  className="pl-9 w-full"
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
              <div className="hidden md:flex border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-r-none ${viewMode === "grid" ? "bg-accent" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-l-none ${viewMode === "map" ? "bg-accent" : ""}`}
                  onClick={() => setViewMode("map")}
                >
                  <Map className="h-4 w-4 mr-2" />
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

          <div className="flex md:hidden justify-center mb-4">
            <div className="inline-flex border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-r-none ${viewMode === "grid" ? "bg-accent" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-l-none ${viewMode === "map" ? "bg-accent" : ""}`}
                onClick={() => setViewMode("map")}
              >
                <Map className="h-4 w-4 mr-2" />
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
                  <div className="text-center py-8 text-muted-foreground">
                    Select "Pending" to view your listings with pending offers
                  </div>
                </TabsContent>
                <TabsContent value="sold" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Select "Sold" to view your completed sales
                  </div>
                </TabsContent>
                <TabsContent value="drafts" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Select "Drafts" to view your draft listings
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
