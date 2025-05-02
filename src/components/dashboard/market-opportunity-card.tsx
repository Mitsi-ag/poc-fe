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
    <Card className="overflow-hidden border shadow-sm hover:shadow transition-all dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Market Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 group cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                {opportunity.icon}
              </div>
              <div className="space-y-1 flex-1">
                <p className="font-medium group-hover:text-primary transition-colors">
                  {opportunity.title}
                </p>
                <p className="text-xs text-muted-foreground">
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
