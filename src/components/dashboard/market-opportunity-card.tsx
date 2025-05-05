import { Building, BarChart3, Home } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MarketOpportunityCard() {
  return (
    <Card className="overflow-hidden border shadow-sm transition-all hover:shadow dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="text-primary h-5 w-5" />
          Market Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity, index) => (
            <div
              key={index}
              className="group flex cursor-pointer items-start gap-3"
            >
              <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                {opportunity.icon}
              </div>
              <div className="flex-1 space-y-1">
                <p className="group-hover:text-primary font-medium transition-colors">
                  {opportunity.title}
                </p>
                <p className="text-muted-foreground text-xs">
                  {opportunity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Opportunities
        </Button>
      </CardFooter>
    </Card>
  );
}

const opportunities = [
  {
    title: "Expired Listings",
    description: "3 properties in Bondi Beach expired this week",
    icon: <Building className="h-4 w-4" />,
  },
  {
    title: "Price Reductions",
    description: "5 listings in your area reduced prices",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    title: "New Development",
    description: "Planning approval for 18 units in Randwick",
    icon: <Home className="h-4 w-4" />,
  },
];
