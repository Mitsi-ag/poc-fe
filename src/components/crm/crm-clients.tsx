import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Download,
  PlusCircle,
  Search,
  Home,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample client data
const clients = [
  {
    id: "C-1001",
    name: "Robert Williams",
    email: "robert.w@example.com",
    phone: "0412 345 678",
    type: "Buyer",
    status: "Active",
    location: "Bondi Beach",
    budget: "$1.2M - $1.5M",
    lastContact: "2023-04-15",
    avatar: "/thoughtful-elder.png",
  },
  {
    id: "C-1002",
    name: "Jennifer Parker",
    email: "jennifer.p@example.com",
    phone: "0423 456 789",
    type: "Seller",
    status: "Active",
    location: "Randwick",
    budget: "N/A",
    lastContact: "2023-04-14",
    avatar: "/confident-city-woman.png",
  },
  {
    id: "C-1003",
    name: "Thomas Brown",
    email: "thomas.b@example.com",
    phone: "0434 567 890",
    type: "Buyer",
    status: "Active",
    location: "Surry Hills",
    budget: "$800K - $950K",
    lastContact: "2023-04-13",
    avatar: "/thoughtful-urbanite.png",
  },
  {
    id: "C-1004",
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    phone: "0445 678 901",
    type: "Investor",
    status: "On Hold",
    location: "Double Bay",
    budget: "$1.8M - $2.2M",
    lastContact: "2023-04-10",
    avatar: "/serene-portrait.png",
  },
  {
    id: "C-1005",
    name: "Daniel Wilson",
    email: "daniel.w@example.com",
    phone: "0456 789 012",
    type: "Seller",
    status: "Active",
    location: "Paddington",
    budget: "N/A",
    lastContact: "2023-04-14",
    avatar: "/contemplative-artist.png",
  },
];

// Status badge color mapping
const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800",
  "On Hold": "bg-yellow-100 text-yellow-800",
  Inactive: "bg-gray-100 text-gray-800",
  Completed: "bg-blue-100 text-blue-800",
};

// Type badge color mapping
const typeColors: Record<string, string> = {
  Buyer: "bg-blue-100 text-blue-800",
  Seller: "bg-purple-100 text-purple-800",
  Investor: "bg-amber-100 text-amber-800",
  Both: "bg-emerald-100 text-emerald-800",
};

export function CrmClients() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Client Management</CardTitle>
              <CardDescription>
                Manage your active clients and their requirements
              </CardDescription>
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
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button size="sm" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Add Client</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input placeholder="Search clients..." className="max-w-sm pl-8" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={client.avatar || "/placeholder.svg"}
                          alt={client.name}
                        />
                        <AvatarFallback>
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-muted-foreground text-sm">
                          {client.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={typeColors[client.type] || ""}
                      variant="outline"
                    >
                      {client.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={statusColors[client.status] || ""}
                      variant="outline"
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.location}</TableCell>
                  <TableCell>{client.budget}</TableCell>
                  <TableCell>{client.lastContact}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit client</DropdownMenuItem>
                        <DropdownMenuItem>Send email</DropdownMenuItem>
                        <DropdownMenuItem>Schedule meeting</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Archive client
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Home className="text-primary h-4 w-4" />
              Property Viewings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-muted-foreground text-sm">
              Scheduled this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="text-primary h-4 w-4" />
              Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-muted-foreground text-sm">Scheduled this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Mail className="text-primary h-4 w-4" />
              Emails
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-muted-foreground text-sm">Sent this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Phone className="text-primary h-4 w-4" />
              Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-muted-foreground text-sm">Made this week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Requirements</CardTitle>
          <CardDescription>
            Track what your clients are looking for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        Robert Williams
                      </CardTitle>
                      <CardDescription>Buyer - Bondi Beach</CardDescription>
                    </div>
                    <Badge className={typeColors["Buyer"]}>Buyer</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-medium">$1.2M - $1.5M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bedrooms:</span>
                      <span className="font-medium">3+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bathrooms:</span>
                      <span className="font-medium">2+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Property Type:
                      </span>
                      <span className="font-medium">Apartment</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Must Have:</span>
                      <span className="font-medium">Ocean view, parking</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        Jennifer Parker
                      </CardTitle>
                      <CardDescription>Seller - Randwick</CardDescription>
                    </div>
                    <Badge className={typeColors["Seller"]}>Seller</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Property Type:
                      </span>
                      <span className="font-medium">House</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bedrooms:</span>
                      <span className="font-medium">4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bathrooms:</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Expected Price:
                      </span>
                      <span className="font-medium">$1.8M - $2.0M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span className="font-medium">3 months</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
