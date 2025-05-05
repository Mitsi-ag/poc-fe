"use client";

import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  MoreHorizontal,
  Phone,
  Plus,
  Star,
  Tag,
  User,
  Mail,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function CrmOverview() {
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
  const [showLeadDetails, setShowLeadDetails] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Filter leads based on active tab
  const filteredLeads = leads.filter((lead) => {
    if (activeTab === "all") return true;
    if (activeTab === "hot") return lead.status === "Hot";
    if (activeTab === "warm") return lead.status === "Warm";
    if (activeTab === "cold") return lead.status === "Cold";
    return true;
  });

  return (
    <Card className="overflow-hidden border bg-white/80 shadow-sm backdrop-blur-sm transition-all hover:shadow-md dark:bg-gray-900/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>CRM Overview</CardTitle>
            <CardDescription>
              Your active leads and opportunities
            </CardDescription>
          </div>
          <Dialog open={showAddLeadDialog} onOpenChange={setShowAddLeadDialog}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="gap-1 bg-linear-to-r from-blue-600 to-blue-500 shadow-sm transition-all duration-300 hover:from-blue-700 hover:to-blue-600 hover:shadow"
              >
                <Plus className="h-4 w-4" />
                <span>Add Lead</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    placeholder="Enter lead name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    className="col-span-3"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    className="col-span-3"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="property" className="text-right">
                    Property
                  </Label>
                  <Input
                    id="property"
                    className="col-span-3"
                    placeholder="Enter property address"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select>
                    <SelectTrigger id="status" className="col-span-3">
                      <SelectValue placeholder="Select lead status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="warm">Warm</SelectItem>
                      <SelectItem value="cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    className="col-span-3"
                    placeholder="Add any additional notes"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowAddLeadDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setShowAddLeadDialog(false)}>
                  Add Lead
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none dark:data-[state=active]:text-blue-400"
            >
              All Leads
            </TabsTrigger>
            <TabsTrigger
              value="hot"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-500 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:shadow-none dark:data-[state=active]:text-red-400"
            >
              Hot
            </TabsTrigger>
            <TabsTrigger
              value="warm"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none dark:data-[state=active]:text-blue-400"
            >
              Warm
            </TabsTrigger>
            <TabsTrigger
              value="cold"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-gray-500 data-[state=active]:bg-transparent data-[state=active]:text-gray-600 data-[state=active]:shadow-none dark:data-[state=active]:text-gray-400"
            >
              Cold
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0">
            <div className="space-y-1 px-2">
              {filteredLeads.map((lead) => (
                <LeadItem
                  key={lead.id}
                  lead={lead}
                  onViewDetails={() => setShowLeadDetails(lead.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hot" className="m-0">
            <div className="space-y-1 px-2">
              {filteredLeads.map((lead) => (
                <LeadItem
                  key={lead.id}
                  lead={lead}
                  onViewDetails={() => setShowLeadDetails(lead.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="warm" className="m-0">
            <div className="space-y-1 px-2">
              {filteredLeads.map((lead) => (
                <LeadItem
                  key={lead.id}
                  lead={lead}
                  onViewDetails={() => setShowLeadDetails(lead.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cold" className="m-0">
            <div className="space-y-1 px-2">
              {filteredLeads.map((lead) => (
                <LeadItem
                  key={lead.id}
                  lead={lead}
                  onViewDetails={() => setShowLeadDetails(lead.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {showLeadDetails !== null && (
          <Dialog
            open={showLeadDetails !== null}
            onOpenChange={() => setShowLeadDetails(null)}
          >
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Lead Details</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                {leads
                  .filter((lead) => lead.id === showLeadDetails)
                  .map((lead) => (
                    <div key={lead.id} className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border border-gray-200 dark:border-gray-700">
                          <AvatarImage
                            src={lead.avatar || "/placeholder.svg"}
                            alt={lead.name}
                          />
                          <AvatarFallback>{lead.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                              {lead.name}
                            </h3>
                            <Badge
                              variant={
                                lead.status === "Hot"
                                  ? "destructive"
                                  : lead.status === "Warm"
                                    ? "default"
                                    : "secondary"
                              }
                              className={cn(
                                "px-2 py-0.5",
                                lead.status === "Hot"
                                  ? "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-500"
                                  : lead.status === "Warm"
                                    ? "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-500"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400",
                              )}
                            >
                              {lead.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {lead.property}
                          </p>

                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="text-xs text-gray-500">
                                Contact Info
                              </Label>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <span>+61 4XX XXX XXX</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span>
                                  {lead.name.toLowerCase().replace(" ", ".")}
                                  @example.com
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs text-gray-500">
                                Timeline
                              </Label>
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span>Added: April 12, 2025</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span>Last Contact: 2 days ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Notes</Label>
                        <div className="rounded-lg border p-3 text-sm">
                          <p>
                            Interested in selling their property in the next 3
                            months. Currently renovating the bathroom. Concerned
                            about market timing and wants to maximize value.
                            Prefers communication via phone calls.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Activity Timeline
                        </Label>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <Phone className="h-4 w-4" />
                              </div>
                              <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  Phone Call
                                </h4>
                                <span className="text-xs text-gray-500">
                                  2 days ago
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Discussed property valuation and market
                                conditions. Client is leaning towards listing in
                                June.
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                <Mail className="h-4 w-4" />
                              </div>
                              <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  Email Sent
                                </h4>
                                <span className="text-xs text-gray-500">
                                  1 week ago
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Sent market report for Bondi Beach with recent
                                comparable sales.
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                <User className="h-4 w-4" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  Initial Contact
                                </h4>
                                <span className="text-xs text-gray-500">
                                  2 weeks ago
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Met at open house for 18 Palm St. Expressed
                                interest in selling their own property.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-gray-500" />
                        <div className="flex flex-wrap gap-1">
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                          >
                            Bondi
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                          >
                            Seller
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                          >
                            3BR
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button
                          variant="outline"
                          className="gap-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                          onClick={() => {}}
                        >
                          <Phone className="h-4 w-4" />
                          <span>Call</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="gap-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                          onClick={() => {}}
                        >
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </Button>
                        <Button
                          className="gap-1 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                          onClick={() => {}}
                        >
                          <span>Schedule Meeting</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3">
        <Button
          variant="link"
          className="ml-auto gap-1 px-0 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <span>View all leads</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

interface Lead {
  id: number;
  name: string;
  initials: string;
  avatar: string;
  property: string;
  status: "Hot" | "Warm" | "Cold";
  priority?: boolean;
}

interface LeadItemProps {
  lead: Lead;
  onViewDetails: () => void;
}

function LeadItem({ lead, onViewDetails }: LeadItemProps) {
  const [isPriority, setIsPriority] = useState(lead.priority || false);

  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-blue-50 dark:hover:bg-gray-800"
      onClick={onViewDetails}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700">
          <AvatarImage
            src={lead.avatar || "/placeholder.svg"}
            alt={lead.name}
          />
          <AvatarFallback>{lead.initials}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{lead.name}</div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <span>{lead.property}</span>
            <Badge
              variant={
                lead.status === "Hot"
                  ? "destructive"
                  : lead.status === "Warm"
                    ? "default"
                    : "secondary"
              }
              className={cn(
                "px-1 py-0",
                lead.status === "Hot"
                  ? "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-500"
                  : lead.status === "Warm"
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-500"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400",
              )}
            >
              {lead.status}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:bg-yellow-50 hover:text-yellow-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-yellow-400"
          onClick={(e) => {
            e.stopPropagation();
            setIsPriority(!isPriority);
          }}
        >
          <Star
            className={cn(
              "h-4 w-4",
              isPriority && "fill-yellow-400 text-yellow-400",
            )}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Phone className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
              }}
            >
              View details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              Send email
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              Schedule meeting
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              Update status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

const leads = [
  {
    id: 1,
    name: "Robert Smith",
    initials: "RS",
    avatar: "/thoughtful-urbanite.png",
    property: "22 Palm St, Bondi",
    status: "Hot",
    priority: true,
  },
  {
    id: 2,
    name: "Jennifer Lee",
    initials: "JL",
    avatar: "/serene-portrait.png",
    property: "8/45 Beach Rd, Bondi",
    status: "Warm",
  },
  {
    id: 3,
    name: "Mark Johnson",
    initials: "MJ",
    avatar: "/thoughtful-elder.png",
    property: "12 Ocean View, Coogee",
    status: "Cold",
  },
  {
    id: 4,
    name: "Sarah Williams",
    initials: "SW",
    avatar: "/placeholder.svg?height=32&width=32&query=blonde woman",
    property: "5 Coastal Dr, Randwick",
    status: "Warm",
  },
];
