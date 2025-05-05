import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

export function PropertiesTrackingCard() {
  return (
    <Card className="overflow-hidden border shadow-sm transition-all hover:shadow dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Home className="text-primary h-5 w-5" />
          Properties Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {properties.map((property, index) => (
            <div
              key={index}
              className="group flex cursor-pointer items-center gap-3"
            >
              <div
                className="h-14 w-14 rounded-lg bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${property.image})` }}
              />
              <div className="flex-1 space-y-1">
                <p className="group-hover:text-primary font-medium transition-colors">
                  {property.address}
                </p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      property.status === "For Sale" &&
                        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
                      property.status === "Under Offer" &&
                        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
                      property.status === "Sold" &&
                        "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400",
                    )}
                  >
                    {property.status}
                  </Badge>
                  <span className="text-muted-foreground text-xs">
                    {property.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Properties
        </Button>
      </CardFooter>
    </Card>
  );
}

const properties = [
  {
    address: "42 Beach Rd, Bondi Beach",
    status: "For Sale",
    price: "$2.8M - $3.2M",
    image: "/coastal-minimalism.png",
  },
  {
    address: "18 Palm St, Coogee",
    status: "Under Offer",
    price: "$1.95M",
    image: "/palm-lined-residence.png",
  },
  {
    address: "5 Ocean View, Randwick",
    status: "Sold",
    price: "$2.4M",
    image: "/coastal-living.png",
  },
];
