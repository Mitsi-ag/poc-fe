import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Filter,
  PlusCircle,
  ArrowRight,
  DollarSign,
  Calendar,
  Home,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Sample deal data
const deals = [
  {
    id: "D-1001",
    title: "42 Ocean View Drive",
    client: {
      name: "Robert Williams",
      avatar: "/thoughtful-elder.png",
    },
    type: "Purchase",
    status: "Contract",
    value: "$1,350,000",
    progress: 75,
    location: "Bondi Beach",
    nextStep: "Final inspection",
    nextDate: "2023-04-25",
  },
  {
    id: "D-1002",
    title: "18 Parkside Avenue",
    client: {
      name: "Jennifer Parker",
      avatar: "/confident-city-woman.png",
    },
    type: "Sale",
    status: "Marketing",
    value: "$1,850,000",
    progress: 30,
    location: "Randwick",
    nextStep: "Open house",
    nextDate: "2023-04-22",
  },
  {
    id: "D-1003",
    title: "7/122 Crown Street",
    client: {
      name: "Thomas Brown",
      avatar: "/thoughtful-urbanite.png",
    },
    type: "Purchase",
    status: "Negotiation",
    value: "$920,000",
    progress: 50,
    location: "Surry Hills",
    nextStep: "Second offer",
    nextDate: "2023-04-20",
  },
  {
    id: "D-1004",
    title: "5 Harbour View Road",
    client: {
      name: "Olivia Martinez",
      avatar: "/serene-portrait.png",
    },
    type: "Investment",
    status: "Due Diligence",
    value: "$2,100,000",
    progress: 60,
    location: "Double Bay",
    nextStep: "Building inspection",
    nextDate: "2023-04-23",
  },
];

// Status badge color mapping
const statusColors: Record<string, string> = {
  Lead: "bg-blue-100 text-blue-800",
  Negotiation: "bg-amber-100 text-amber-800",
  "Due Diligence": "bg-purple-100 text-purple-800",
  Contract: "bg-emerald-100 text-emerald-800",
  Settled: "bg-green-100 text-green-800",
  Marketing: "bg-indigo-100 text-indigo-800",
  Lost: "bg-red-100 text-red-800",
};

// Type badge color mapping
const typeColors: Record<string, string> = {
  Purchase: "bg-blue-100 text-blue-800",
  Sale: "bg-purple-100 text-purple-800",
  Investment: "bg-amber-100 text-amber-800",
  Lease: "bg-emerald-100 text-emerald-800",
};

export function CrmDeals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Active Deals
          </h2>
          <p className="text-sm text-muted-foreground">
            Track and manage your active property transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>New Deal</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{deal.title}</CardTitle>
                  <CardDescription>{deal.location}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Schedule task</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Cancel deal
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={deal.client.avatar || "/placeholder.svg"}
                      alt={deal.client.name}
                    />
                    <AvatarFallback>
                      {deal.client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{deal.client.name}</span>
                </div>
                <div className="flex gap-2">
                  <Badge
                    className={typeColors[deal.type] || ""}
                    variant="outline"
                  >
                    {deal.type}
                  </Badge>
                  <Badge
                    className={statusColors[deal.status] || ""}
                    variant="outline"
                  >
                    {deal.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Deal Progress</span>
                  <span className="font-medium">{deal.progress}%</span>
                </div>
                <Progress value={deal.progress} className="h-2" />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Value</p>
                      <p className="text-sm font-medium">{deal.value}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Next Step</p>
                      <p className="text-sm font-medium">{deal.nextDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-3 bg-muted/50 border-t">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Next: {deal.nextStep}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-primary"
                >
                  <span>View Deal</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Deal Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6.22M</div>
            <p className="text-sm text-muted-foreground">Total active deals</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Purchase</span>
                <span className="font-medium">$2.27M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sale</span>
                <span className="font-medium">$1.85M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Investment</span>
                <span className="font-medium">$2.10M</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Home className="h-4 w-4 text-primary" />
              Deal Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lead</span>
                  <span>3</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Negotiation</span>
                  <span>2</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Due Diligence</span>
                  <span>2</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Contract</span>
                  <span>3</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Recent Settlements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">15 Beach Road</p>
                  <p className="text-sm text-muted-foreground">Bondi</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$1.42M</p>
                  <p className="text-sm text-muted-foreground">Apr 10</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">8/42 Park Street</p>
                  <p className="text-sm text-muted-foreground">Surry Hills</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$875K</p>
                  <p className="text-sm text-muted-foreground">Apr 5</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">22 Harbour View</p>
                  <p className="text-sm text-muted-foreground">Double Bay</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$2.35M</p>
                  <p className="text-sm text-muted-foreground">Mar 28</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
