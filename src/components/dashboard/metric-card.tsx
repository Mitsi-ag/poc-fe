"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function MetricCard({
  title,
  value,
  change,
  trend,
  description,
  icon,
  onClick,
}: MetricCardProps) {
  return (
    <Card
      className="group cursor-pointer overflow-hidden border bg-white shadow-sm backdrop-blur-sm transition-all hover:shadow dark:border-gray-800 dark:bg-gray-900/50"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="group-hover:bg-primary/20 rounded-full bg-gray-100 p-1 transition-colors dark:bg-gray-800">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs">
          <Badge
            variant={trend === "up" ? "default" : "destructive"}
            className={cn(
              "px-1 py-0",
              trend === "up"
                ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-500"
                : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-500",
            )}
          >
            {change}
            {trend === "up" ? (
              <ArrowUpRight className="ml-0.5 h-3 w-3" />
            ) : (
              <ArrowUpRight className="ml-0.5 h-3 w-3 rotate-180" />
            )}
          </Badge>
          <span className="text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}
