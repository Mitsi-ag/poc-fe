import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

interface MarketInsightCardProps {
  suburb: string;
  medianPrice: string;
  priceChange: number;
  daysOnMarket: number;
  daysChange: number;
  clearanceRate: number;
  clearanceChange: number;
}

export function MarketInsightCard({
  suburb,
  medianPrice,
  priceChange,
  daysOnMarket,
  daysChange,
  clearanceRate,
  clearanceChange,
}: MarketInsightCardProps) {
  return (
    <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base">
          <TrendingUp className="text-primary mr-2 h-4 w-4" />
          {suburb} Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 pt-0">
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs">Median Price</p>
          <div className="font-medium">{medianPrice}</div>
          <div
            className={`flex items-center text-xs ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {priceChange >= 0 ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            {Math.abs(priceChange)}% YoY
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs">Days on Market</p>
          <div className="font-medium">{daysOnMarket} days</div>
          <div
            className={`flex items-center text-xs ${daysChange <= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {daysChange <= 0 ? (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            )}
            {Math.abs(daysChange)} days
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs">Clearance Rate</p>
          <div className="font-medium">{clearanceRate}%</div>
          <div
            className={`flex items-center text-xs ${clearanceChange >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {clearanceChange >= 0 ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            {Math.abs(clearanceChange)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
