import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpRight, Filter, Download, PlusCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

// Sample lead data
const leads = [
  {
    id: "L-1001",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "0412 345 678",
    source: "Domain.com.au",
    status: "New",
    interest: "Buying",
    location: "Bondi Beach",
    dateAdded: "2023-04-15",
    lastContact: "2023-04-15",
  },
  {
    id: "L-1002",
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "0423 456 789",
    source: "Website",
    status: "Contacted",
    interest: "Selling",
    location: "Randwick",
    dateAdded: "2023-04-10",
    lastContact: "2023-04-14",
  },
  {
    id: "L-1003",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    phone: "0434 567 890",
    source: "Referral",
    status: "Qualified",
    interest: "Buying",
    location: "Surry Hills",
    dateAdded: "2023-04-05",
    lastContact: "2023-04-13",
  },
  {
    id: "L-1004",
    name: "David Thompson",
    email: "david.t@example.com",
    phone: "0445 678 901",
    source: "Open House",
    status: "Nurturing",
    interest: "Buying",
    location: "Double Bay",
    dateAdded: "2023-04-01",
    lastContact: "2023-04-10",
  },
  {
    id: "L-1005",
    name: "Jessica Lee",
    email: "jessica.l@example.com",
    phone: "0456 789 012",
    source: "Facebook Ad",
    status: "New",
    interest: "Investing",
    location: "Paddington",
    dateAdded: "2023-04-14",
    lastContact: "2023-04-14",
  },
]

// Status badge color mapping
const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-yellow-100 text-yellow-800",
  Qualified: "bg-green-100 text-green-800",
  Nurturing: "bg-purple-100 text-purple-800",
  Closed: "bg-gray-100 text-gray-800",
}

export function CrmLeads() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>Manage and track your potential clients</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button size="sm" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Add Lead</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Search leads..." className="max-w-sm" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{lead.email}</div>
                      <div className="text-muted-foreground">{lead.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[lead.status] || ""} variant="outline">
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.interest}</TableCell>
                  <TableCell>{lead.location}</TableCell>
                  <TableCell>{lead.lastContact}</TableCell>
                  <TableCell className="text-right">
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
                        <DropdownMenuItem>Edit lead</DropdownMenuItem>
                        <DropdownMenuItem>Send email</DropdownMenuItem>
                        <DropdownMenuItem>Schedule call</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete lead</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Where your leads are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Domain.com.au</span>
                <span className="font-medium">32%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "32%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span>Website</span>
                <span className="font-medium">24%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "24%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span>Referrals</span>
                <span className="font-medium">18%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "18%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span>Social Media</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "15%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span>Open Houses</span>
                <span className="font-medium">11%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "11%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Status</CardTitle>
            <CardDescription>Current status of your leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>New</span>
                </div>
                <span className="font-medium">24</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Contacted</span>
                </div>
                <span className="font-medium">36</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Qualified</span>
                </div>
                <span className="font-medium">18</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Nurturing</span>
                </div>
                <span className="font-medium">42</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span>Closed</span>
                </div>
                <span className="font-medium">15</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest lead interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4 pb-2">
                <p className="text-sm font-medium">Email sent to Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
              </div>

              <div className="border-l-2 border-primary pl-4 pb-2">
                <p className="text-sm font-medium">Call scheduled with Michael Chen</p>
                <p className="text-xs text-muted-foreground">Today, 9:15 AM</p>
              </div>

              <div className="border-l-2 border-primary pl-4 pb-2">
                <p className="text-sm font-medium">Property viewing with Emma Wilson</p>
                <p className="text-xs text-muted-foreground">Yesterday, 3:00 PM</p>
              </div>

              <div className="border-l-2 border-primary pl-4 pb-2">
                <p className="text-sm font-medium">New lead: Jessica Lee</p>
                <p className="text-xs text-muted-foreground">Yesterday, 11:45 AM</p>
              </div>

              <div className="border-l-2 border-primary pl-4 pb-2">
                <p className="text-sm font-medium">Follow-up email to David Thompson</p>
                <p className="text-xs text-muted-foreground">Apr 14, 2023</p>
              </div>
            </div>
          </CardContent>
          <div className="px-6 py-3 border-t">
            <Button variant="link" className="p-0 h-auto flex items-center text-primary">
              <span>View all activity</span>
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
