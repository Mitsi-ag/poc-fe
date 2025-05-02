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
        <CardTitle className="text-base flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-primary" />
          {suburb} Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 pt-0">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Median Price</p>
          <div className="font-medium">{medianPrice}</div>
          <div
            className={`text-xs flex items-center ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {priceChange >= 0 ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            {Math.abs(priceChange)}% YoY
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Days on Market</p>
          <div className="font-medium">{daysOnMarket} days</div>
          <div
            className={`text-xs flex items-center ${daysChange <= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {daysChange <= 0 ? (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            )}
            {Math.abs(daysChange)} days
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Clearance Rate</p>
          <div className="font-medium">{clearanceRate}%</div>
          <div
            className={`text-xs flex items-center ${clearanceChange >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {clearanceChange >= 0 ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            {Math.abs(clearanceChange)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
