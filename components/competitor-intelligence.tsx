"use client"

import { useState } from "react"
import {
  Download,
  Eye,
  MapPin,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  RefreshCw,
  Star,
  StarOff,
  FileText,
  Copy,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

// Sample competitor data (replace with your actual data source)
const competitorData = [
  {
    id: 1,
    name: "Sarah Johnson",
    agency: "Ray White",
    avatar: "/confident-agent.png",
    initials: "SJ",
    primarySuburb: "Bondi Beach",
    listings: 14,
    avgDOM: 28,
    clearanceRate: "76%",
    activityLevel: "High",
  },
  {
    id: 2,
    name: "Michael Chen",
    agency: "McGrath",
    avatar: "/confident-agent.png",
    initials: "MC",
    primarySuburb: "Randwick",
    listings: 8,
    avgDOM: 35,
    clearanceRate: "68%",
    activityLevel: "Medium",
  },
  {
    id: 3,
    name: "Emily Davis",
    agency: "Belle Property",
    avatar: "/confident-agent.png",
    initials: "ED",
    primarySuburb: "Coogee",
    listings: 11,
    avgDOM: 22,
    clearanceRate: "82%",
    activityLevel: "High",
  },
  {
    id: 4,
    name: "David Lee",
    agency: "PPD Real Estate",
    avatar: "/seasoned-agent-smile.png",
    initials: "DL",
    primarySuburb: "Bondi Beach",
    listings: 6,
    avgDOM: 42,
    clearanceRate: "55%",
    activityLevel: "Low",
  },
  {
    id: 5,
    name: "Jessica Brown",
    agency: "Raine & Horne",
    avatar: "/confident-agent-greeting.png",
    initials: "JB",
    primarySuburb: "Randwick",
    listings: 9,
    avgDOM: 31,
    clearanceRate: "72%",
    activityLevel: "Medium",
  },
  {
    id: 6,
    name: "Daniel Wilson",
    agency: "Phillips Pantzer Donnelley",
    avatar: "/confident-agent.png",
    initials: "DW",
    primarySuburb: "Coogee",
    listings: 13,
    avgDOM: 25,
    clearanceRate: "79%",
    activityLevel: "High",
  },
]

export function CompetitorIntelligence() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSuburb, setSelectedSuburb] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("30")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [trackedAgents, setTrackedAgents] = useState<number[]>([1, 3])
  const [showAgentProfile, setShowAgentProfile] = useState<number | null>(null)
  const [showPitchGenerator, setShowPitchGenerator] = useState<number | null>(null)
  const [generatingPitch, setGeneratingPitch] = useState(false)
  const [pitchGenerated, setPitchGenerated] = useState(false)
  const [pitchType, setPitchType] = useState("standard")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  // Simulate refresh action
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  // Toggle tracking an agent
  const toggleTrackedAgent = (agentId: number) => {
    if (trackedAgents.includes(agentId)) {
      setTrackedAgents(trackedAgents.filter((id) => id !== agentId))
    } else {
      setTrackedAgents([...trackedAgents, agentId])
    }
  }

  // Generate pitch against competitor
  const handleGeneratePitch = () => {
    setGeneratingPitch(true)
    // Simulate API call delay
    setTimeout(() => {
      setGeneratingPitch(false)
      setPitchGenerated(true)
    }, 2000)
  }

  // Copy pitch to clipboard
  const handleCopyPitch = () => {
    navigator.clipboard.writeText(generatedPitch)
    setCopiedToClipboard(true)
    setTimeout(() => setCopiedToClipboard(false), 2000)
  }

  // Reset pitch generator
  const handleClosePitchGenerator = () => {
    setShowPitchGenerator(null)
    setPitchGenerated(false)
    setPitchType("standard")
    setAdditionalInfo("")
  }

  // Filter competitors based on search and selected suburb
  const filteredCompetitors = competitorData.filter((competitor) => {
    const matchesSearch =
      searchQuery === "" ||
      competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      competitor.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      competitor.primarySuburb.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSuburb =
      selectedSuburb === "all" || competitor.primarySuburb.toLowerCase().includes(selectedSuburb.toLowerCase())

    return matchesSearch && matchesSuburb
  })

  return (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all dark:bg-gray-900/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Competitor Intelligence</CardTitle>
            <CardDescription>Track agent activity in your target suburbs</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => {}}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => {}}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={handleRefresh}
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">Refresh data</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Save view</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Configure alerts</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">View tracked agents only</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search agents or agencies..."
                className="pl-8 bg-gray-100 border-0 focus-visible:ring-2 focus-visible:ring-primary dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedSuburb} onValueChange={setSelectedSuburb}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select suburb" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suburbs</SelectItem>
                  <SelectItem value="bondi">Bondi Beach</SelectItem>
                  <SelectItem value="randwick">Randwick</SelectItem>
                  <SelectItem value="coogee">Coogee</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Card-based layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompetitors.map((agent) => (
              <Card
                key={agent.id}
                className={cn(
                  "overflow-hidden transition-all hover:shadow-md",
                  trackedAgents.includes(agent.id) &&
                    "border-blue-200 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-900/30",
                )}
              >
                <CardHeader className="pb-2 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                        <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                        <AvatarFallback>{agent.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-medium">{agent.name}</h3>
                          {trackedAgents.includes(agent.id) && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Tracked agent</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span>{agent.agency}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{agent.primarySuburb}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        agent.activityLevel === "High"
                          ? "default"
                          : agent.activityLevel === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                      className={cn(
                        "px-2 py-0.5",
                        agent.activityLevel === "High"
                          ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-500"
                          : agent.activityLevel === "Medium"
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-500"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400",
                      )}
                    >
                      {agent.activityLevel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-md border p-2">
                      <div className="text-lg font-semibold">{agent.listings}</div>
                      <div className="text-xs text-gray-500">Listings</div>
                    </div>
                    <div className="rounded-md border p-2">
                      <div className="text-lg font-semibold">{agent.avgDOM}</div>
                      <div className="text-xs text-gray-500">Avg. DOM</div>
                    </div>
                    <div className="rounded-md border p-2">
                      <div className="text-lg font-semibold">{agent.clearanceRate}</div>
                      <div className="text-xs text-gray-500">Clearance</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0 pb-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-gray-800"
                    onClick={() => toggleTrackedAgent(agent.id)}
                  >
                    {trackedAgents.includes(agent.id) ? (
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    ) : (
                      <Star className="h-4 w-4 mr-1" />
                    )}
                    <span>{trackedAgents.includes(agent.id) ? "Untrack" : "Track"}</span>
                  </Button>
                  <div className="flex gap-1">
                    <Dialog
                      open={showAgentProfile === agent.id}
                      onOpenChange={(open) => setShowAgentProfile(open ? agent.id : null)}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          <span>Profile</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Agent Profile</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 border border-gray-200 dark:border-gray-700">
                              <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                              <AvatarFallback>{agent.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{agent.name}</h3>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() => toggleTrackedAgent(agent.id)}
                                >
                                  {trackedAgents.includes(agent.id) ? (
                                    <>
                                      <StarOff className="h-4 w-4" />
                                      <span>Untrack</span>
                                    </>
                                  ) : (
                                    <>
                                      <Star className="h-4 w-4" />
                                      <span>Track Agent</span>
                                    </>
                                  )}
                                </Button>
                              </div>
                              <p className="text-sm text-gray-500">{agent.agency}</p>
                              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                <MapPin className="h-3 w-3" />
                                <span>{agent.primarySuburb}</span>
                              </div>

                              <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="rounded-lg border p-3 text-center">
                                  <div className="text-2xl font-bold">{agent.listings}</div>
                                  <div className="text-xs text-gray-500">Active Listings</div>
                                </div>
                                <div className="rounded-lg border p-3 text-center">
                                  <div className="text-2xl font-bold">{agent.avgDOM}</div>
                                  <div className="text-xs text-gray-500">Avg. Days on Market</div>
                                </div>
                                <div className="rounded-lg border p-3 text-center">
                                  <div className="text-2xl font-bold">{agent.clearanceRate}</div>
                                  <div className="text-xs text-gray-500">Clearance Rate</div>
                                </div>
                              </div>

                              <div className="mt-6 space-y-2">
                                <h4 className="font-medium">Recent Activity</h4>
                                <div className="space-y-2">
                                  <div className="rounded-md border p-2 text-sm">
                                    <div className="font-medium">New Listing: 45 Beach Road, Bondi</div>
                                    <div className="text-xs text-gray-500">2 days ago • $1.8M-$2M</div>
                                  </div>
                                  <div className="rounded-md border p-2 text-sm">
                                    <div className="font-medium">Price Change: 12 Ocean View, Coogee</div>
                                    <div className="text-xs text-gray-500">5 days ago • -$50,000</div>
                                  </div>
                                  <div className="rounded-md border p-2 text-sm">
                                    <div className="font-medium">Sold: 8 Coastal Drive, Randwick</div>
                                    <div className="text-xs text-gray-500">1 week ago • $2.4M</div>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6 flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setShowAgentProfile(null)}>
                                  Close
                                </Button>
                                <Button
                                  onClick={() => {
                                    setShowAgentProfile(null)
                                    setShowPitchGenerator(agent.id)
                                  }}
                                >
                                  Generate Pitch Against
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={showPitchGenerator === agent.id}
                      onOpenChange={(open) => {
                        if (!open) handleClosePitchGenerator()
                        else setShowPitchGenerator(open ? agent.id : null)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          <span>Pitch</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                          <DialogTitle>Generate Pitch Against {agent.name}</DialogTitle>
                          <DialogDescription>
                            Create a compelling pitch to win listings against this competitor
                          </DialogDescription>
                        </DialogHeader>

                        {!pitchGenerated ? (
                          <div className="py-4 space-y-4">
                            <div className="space-y-2">
                              <Label>Pitch Type</Label>
                              <RadioGroup
                                value={pitchType}
                                onValueChange={setPitchType}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="standard" id="standard" />
                                  <Label htmlFor="standard" className="font-normal cursor-pointer">
                                    Standard Pitch
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="detailed" id="detailed" />
                                  <Label htmlFor="detailed" className="font-normal cursor-pointer">
                                    Detailed Comparison
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="script" id="script" />
                                  <Label htmlFor="script" className="font-normal cursor-pointer">
                                    Conversation Script
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="property-type">Property Type</Label>
                              <Select defaultValue="residential">
                                <SelectTrigger id="property-type">
                                  <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="residential">Residential</SelectItem>
                                  <SelectItem value="apartment">Apartment</SelectItem>
                                  <SelectItem value="townhouse">Townhouse</SelectItem>
                                  <SelectItem value="luxury">Luxury</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="additional-info">Additional Information</Label>
                              <Textarea
                                id="additional-info"
                                placeholder="Add any specific details about the property or client situation..."
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                                className="min-h-[100px]"
                              />
                            </div>

                            <DialogFooter>
                              <Button variant="outline" onClick={handleClosePitchGenerator}>
                                Cancel
                              </Button>
                              <Button onClick={handleGeneratePitch} disabled={generatingPitch}>
                                {generatingPitch ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                  </>
                                ) : (
                                  "Generate Pitch"
                                )}
                              </Button>
                            </DialogFooter>
                          </div>
                        ) : (
                          <div className="py-4 space-y-4">
                            <Tabs defaultValue="pitch">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="pitch">Pitch</TabsTrigger>
                                <TabsTrigger value="comparison">Comparison</TabsTrigger>
                                <TabsTrigger value="talking-points">Talking Points</TabsTrigger>
                              </TabsList>
                              <TabsContent value="pitch" className="space-y-4 mt-4">
                                <div className="rounded-md border p-4 bg-gray-50 dark:bg-gray-800">
                                  <div className="prose dark:prose-invert max-w-none">{generatedPitch}</div>
                                </div>
                              </TabsContent>
                              <TabsContent value="comparison" className="space-y-4 mt-4">
                                <div className="rounded-md border overflow-hidden">
                                  <table className="w-full">
                                    <thead className="bg-gray-100 dark:bg-gray-800">
                                      <tr>
                                        <th className="text-left p-3">Metric</th>
                                        <th className="text-center p-3">You</th>
                                        <th className="text-center p-3">{agent.name}</th>
                                        <th className="text-center p-3">Your Advantage</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="border-t">
                                        <td className="p-3">Avg. Days on Market</td>
                                        <td className="text-center p-3">24</td>
                                        <td className="text-center p-3">{agent.avgDOM}</td>
                                        <td className="text-center p-3 text-green-600">
                                          {agent.avgDOM > 24 ? `${agent.avgDOM - 24} days faster` : "—"}
                                        </td>
                                      </tr>
                                      <tr className="border-t">
                                        <td className="p-3">Clearance Rate</td>
                                        <td className="text-center p-3">82%</td>
                                        <td className="text-center p-3">{agent.clearanceRate}</td>
                                        <td className="text-center p-3 text-green-600">
                                          {Number.parseInt(agent.clearanceRate) < 82
                                            ? `${82 - Number.parseInt(agent.clearanceRate)}% higher`
                                            : "—"}
                                        </td>
                                      </tr>
                                      <tr className="border-t">
                                        <td className="p-3">Digital Marketing</td>
                                        <td className="text-center p-3">Premium</td>
                                        <td className="text-center p-3">Standard</td>
                                        <td className="text-center p-3 text-green-600">Superior</td>
                                      </tr>
                                      <tr className="border-t">
                                        <td className="p-3">Professional Photography</td>
                                        <td className="text-center p-3">Included</td>
                                        <td className="text-center p-3">Extra Cost</td>
                                        <td className="text-center p-3 text-green-600">Included</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </TabsContent>
                              <TabsContent value="talking-points" className="space-y-4 mt-4">
                                <div className="space-y-3">
                                  <div className="rounded-md border p-3">
                                    <h4 className="font-medium">1. Market Knowledge</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                      Emphasize your deep understanding of {agent.primarySuburb} and surrounding areas
                                      compared to {agent.name}'s broader focus.
                                    </p>
                                  </div>
                                  <div className="rounded-md border p-3">
                                    <h4 className="font-medium">2. Marketing Approach</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                      Highlight your premium digital marketing package that reaches more qualified
                                      buyers than {agent.agency}'s standard approach.
                                    </p>
                                  </div>
                                  <div className="rounded-md border p-3">
                                    <h4 className="font-medium">3. Performance Metrics</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                      Share your superior days on market (24 vs {agent.avgDOM}) and clearance rate (82%
                                      vs {agent.clearanceRate}).
                                    </p>
                                  </div>
                                  <div className="rounded-md border p-3">
                                    <h4 className="font-medium">4. Personal Attention</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                      Stress your personalized approach compared to {agent.name}'s higher volume of
                                      listings ({agent.listings} active listings).
                                    </p>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>

                            <DialogFooter>
                              <div className="flex justify-between w-full">
                                <Button variant="outline" onClick={handleClosePitchGenerator}>
                                  Close
                                </Button>
                                <div className="flex gap-2">
                                  <Button variant="outline" onClick={handleCopyPitch}>
                                    {copiedToClipboard ? (
                                      <>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Copied!
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="mr-2 h-4 w-4" />
                                        Copy to Clipboard
                                      </>
                                    )}
                                  </Button>
                                  <Button>Save to Library</Button>
                                </div>
                              </div>
                            </DialogFooter>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Sample generated pitch text
const generatedPitch = `# Winning Pitch Against Sarah Johnson

## Introduction

Thank you for considering me to represent your property in Bondi Beach. I'd like to share why my approach would deliver superior results compared to other agents in the area, including Sarah Johnson from Ray White.

## Market Expertise

While Sarah has been active in Bondi Beach with 14 current listings, my focused approach allows me to give each property the dedicated attention it deserves. My average days on market is just 24 days compared to Sarah's 28 days, meaning your property sells faster with me.

## Marketing Advantage

Sarah Johnson offers standard marketing packages through Ray White, but my premium digital marketing strategy includes:

- Professional photography and videography at no extra cost
- Virtual 3D tours for all properties
- Targeted social media campaigns to reach qualified buyers
- Premium placement on major real estate portals

## Performance Metrics

When comparing our performance:

- My clearance rate is 82% compared to Sarah's 76%
- I achieve an average of 5% higher sale prices in comparable properties
- My properties receive 40% more online inquiries due to superior digital presence
- I provide weekly detailed performance reports vs. standard monthly updates

## Client Testimonials

Unlike the more transactional approach at larger agencies like Ray White, my clients consistently praise my personalized service and communication. I'm available 7 days a week and personally handle all inspections and negotiations.

## Conclusion

While Sarah Johnson is certainly a competent agent, my focused approach, superior marketing strategy, and proven performance metrics demonstrate why I'm better positioned to achieve the premium result your property deserves.

I welcome the opportunity to discuss my tailored strategy for your specific property in more detail.`
