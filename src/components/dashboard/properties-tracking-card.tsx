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
    <Card className="overflow-hidden border shadow-sm hover:shadow transition-all dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Home className="h-5 w-5 text-primary" />
          Properties Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {properties.map((property, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div
                className="h-14 w-14 rounded-lg bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${property.image})` }}
              />
              <div className="space-y-1 flex-1">
                <p className="font-medium group-hover:text-primary transition-colors">
                  {property.address}
                </p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      property.status === "For Sale" &&
                        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400",
                      property.status === "Under Offer" &&
                        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400",
                      property.status === "Sold" &&
                        "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400",
                    )}
                  >
                    {property.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
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
