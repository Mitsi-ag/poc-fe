"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ListingsFiltersProps {
  onFilterChange?: (filters: Record<string, any>) => void;
}

export function ListingsFilters({ onFilterChange }: ListingsFiltersProps) {
  const [filters, setFilters] = useState({
    minPrice: 500000,
    maxPrice: 2000000,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: "all",
    features: [] as string[],
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      return newFilters;
    });
  };

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    setFilters((prev) => {
      const features = checked
        ? [...prev.features, feature]
        : prev.features.filter((f) => f !== feature);
      return { ...prev, features };
    });
  };

  const handleReset = () => {
    setFilters({
      minPrice: 500000,
      maxPrice: 2000000,
      bedrooms: 2,
      bathrooms: 1,
      propertyType: "all",
      features: [],
    });
  };

  // Notify parent component when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex-1">
                <Input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handleFilterChange("minPrice", Number(e.target.value))
                  }
                  className="w-full"
                  min={0}
                  step={50000}
                />
                <span className="text-xs text-muted-foreground mt-1 block">
                  Min
                </span>
              </div>
              <span>-</span>
              <div className="flex-1">
                <Input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", Number(e.target.value))
                  }
                  className="w-full"
                  min={0}
                  step={50000}
                />
                <span className="text-xs text-muted-foreground mt-1 block">
                  Max
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Bedrooms</Label>
              <Select
                value={String(filters.bedrooms)}
                onValueChange={(value) =>
                  handleFilterChange("bedrooms", Number(value))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Bathrooms</Label>
              <Select
                value={String(filters.bathrooms)}
                onValueChange={(value) =>
                  handleFilterChange("bathrooms", Number(value))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Property Type</Label>
            <Select
              value={filters.propertyType}
              onValueChange={(value) =>
                handleFilterChange("propertyType", value)
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Features</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pool"
                  checked={filters.features.includes("pool")}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle("pool", checked as boolean)
                  }
                />
                <label
                  htmlFor="pool"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pool
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="garage"
                  checked={filters.features.includes("garage")}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle("garage", checked as boolean)
                  }
                />
                <label
                  htmlFor="garage"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Garage
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="aircon"
                  checked={filters.features.includes("aircon")}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle("aircon", checked as boolean)
                  }
                />
                <label
                  htmlFor="aircon"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Air Conditioning
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="balcony"
                  checked={filters.features.includes("balcony")}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle("balcony", checked as boolean)
                  }
                />
                <label
                  htmlFor="balcony"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Balcony
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button size="sm">Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
