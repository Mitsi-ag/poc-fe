"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Home,
  BarChart,
  Mail,
  Share2,
  ImageIcon,
  MapPin,
  MessageSquare,
  Clock,
  ArrowRight,
  Search,
  Sparkles,
  Globe,
  Calendar,
  Camera,
  PenTool,
  Briefcase,
  Users,
  Hammer,
  DollarSign,
  Target,
  FileText,
  Zap,
  Lightbulb,
  TrendingUp,
  Layers,
  Compass,
  Award,
  Smartphone,
  Video,
  Headphones,
  Percent,
} from "lucide-react"

export function AIToolsHub() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [featureRequest, setFeatureRequest] = useState("")

  const tools = [
    {
      id: "property-description",
      title: "Property Description Generator",
      description: "Create compelling property listings",
      longDescription:
        "Transform property features into captivating descriptions that highlight the best aspects of a home. This tool analyzes property details and creates engaging, SEO-optimized content that appeals to potential buyers.",
      category: "marketing",
      icon: <Home className="h-6 w-6 text-purple-500" />,
      timeEstimate: "2-3 minutes",
    },
    {
      id: "pitch-builder",
      title: "Competitive Pitch Builder",
      description: "Win more listings with data-backed pitches",
      longDescription:
        "Create powerful listing presentations that showcase your expertise against specific competitors. This tool analyzes your performance metrics and competitor data to build persuasive pitches that win more listings.",
      category: "sales",
      icon: <BarChart className="h-6 w-6 text-blue-500" />,
      timeEstimate: "5-7 minutes",
    },
    {
      id: "market-analyzer",
      title: "Market Trend Analyzer",
      description: "Visualize and explain local market trends",
      longDescription:
        "Transform complex market data into clear insights and visualizations. This tool analyzes historical trends, current inventory, and predictive indicators to create compelling market reports for clients.",
      category: "analysis",
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      timeEstimate: "3-4 minutes",
    },
    {
      id: "email-campaign",
      title: "Email Campaign Creator",
      description: "Targeted email sequences for different scenarios",
      longDescription:
        "Create personalized email sequences for different client scenarios. This tool helps you nurture leads, follow up with past clients, and maintain relationships with tailored communication that drives engagement.",
      category: "marketing",
      icon: <Mail className="h-6 w-6 text-purple-500" />,
      timeEstimate: "4-5 minutes",
    },
    {
      id: "social-media",
      title: "Social Media Content Generator",
      description: "Create engaging posts for multiple platforms",
      longDescription:
        "Generate platform-specific content for your social media channels. This tool creates engaging posts, captions, and hashtags tailored to different platforms and audience segments to maximize your online presence.",
      category: "marketing",
      icon: <Share2 className="h-6 w-6 text-purple-500" />,
      timeEstimate: "3-4 minutes",
    },
    {
      id: "buyer-needs",
      title: "Buyer Needs Analyzer",
      description: "Match buyers to perfect properties",
      longDescription:
        "Analyze buyer preferences and match them to available properties. This tool helps you understand buyer priorities, recommend suitable properties, and create personalized viewing schedules that increase conversion rates.",
      category: "sales",
      icon: <Target className="h-6 w-6 text-blue-500" />,
      timeEstimate: "4-6 minutes",
    },
    {
      id: "virtual-staging",
      title: "Virtual Staging Assistant",
      description: "Transform empty spaces with virtual staging",
      longDescription:
        "Create virtually staged images of empty properties. This tool helps you show the potential of vacant spaces by adding furniture and decor that appeals to your target buyer demographic.",
      category: "marketing",
      icon: <ImageIcon className="h-6 w-6 text-purple-500" />,
      timeEstimate: "5-7 minutes",
    },
    {
      id: "neighborhood-expert",
      title: "Neighborhood Expert Content",
      description: "Position yourself as a local authority",
      longDescription:
        "Generate neighborhood guides and local market insights. This tool helps you create authoritative content about specific areas, highlighting amenities, market trends, and lifestyle benefits to position you as a neighborhood expert.",
      category: "marketing",
      icon: <MapPin className="h-6 w-6 text-purple-500" />,
      timeEstimate: "5-8 minutes",
    },
    {
      id: "objection-handler",
      title: "Objection Handler",
      description: "Overcome client hesitations effectively",
      longDescription:
        "Prepare for and address common client objections. This tool provides data-backed responses to price concerns, market uncertainties, and other common hesitations that can derail a transaction.",
      category: "sales",
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      timeEstimate: "2-3 minutes",
    },
    {
      id: "pricing-strategy",
      title: "Pricing Strategy Optimizer",
      description: "Set the perfect price with AI analysis",
      longDescription:
        "Determine optimal listing prices based on comprehensive market analysis. This tool analyzes comparable sales, market trends, property features, and buyer demand to recommend strategic pricing that maximizes seller returns.",
      category: "analysis",
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      timeEstimate: "4-5 minutes",
    },
    {
      id: "open-house",
      title: "Open House Optimizer",
      description: "Maximize open house effectiveness",
      longDescription:
        "Plan and execute high-converting open houses. This tool helps you prepare marketing materials, highlight key property features, capture visitor information, and follow up effectively to turn attendees into serious buyers.",
      category: "sales",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      timeEstimate: "3-4 minutes",
    },
    {
      id: "video-script",
      title: "Video Script Generator",
      description: "Create engaging property video content",
      longDescription:
        "Generate professional scripts for property videos and agent introductions. This tool helps you create compelling video content that showcases properties effectively and builds your personal brand.",
      category: "marketing",
      icon: <Video className="h-6 w-6 text-purple-500" />,
      timeEstimate: "3-5 minutes",
    },
    {
      id: "investment-analyzer",
      title: "Investment Property Analyzer",
      description: "Evaluate investment potential with key metrics",
      longDescription:
        "Analyze the investment potential of properties with comprehensive financial metrics. This tool calculates ROI, cash flow, cap rate, and other key indicators to help investors make informed decisions.",
      category: "analysis",
      icon: <Briefcase className="h-6 w-6 text-green-500" />,
      timeEstimate: "5-7 minutes",
    },
    {
      id: "renovation-calculator",
      title: "Renovation Value Calculator",
      description: "Estimate ROI on property improvements",
      longDescription:
        "Calculate the potential return on investment for various renovation projects. This tool helps homeowners and investors determine which improvements will add the most value relative to their cost.",
      category: "analysis",
      icon: <Hammer className="h-6 w-6 text-green-500" />,
      timeEstimate: "3-4 minutes",
    },
    {
      id: "buyer-persona",
      title: "Buyer Persona Creator",
      description: "Define ideal buyers for targeted marketing",
      longDescription:
        "Create detailed buyer personas for different property types and neighborhoods. This tool helps you understand your target audience and tailor your marketing and communication strategies to their specific needs.",
      category: "marketing",
      icon: <Users className="h-6 w-6 text-purple-500" />,
      timeEstimate: "4-6 minutes",
    },
    {
      id: "multilingual-translator",
      title: "Multilingual Property Translator",
      description: "Translate listings into 40+ languages",
      longDescription:
        "Instantly translate property descriptions, marketing materials, and communications into over 40 languages. This tool helps you reach international buyers and diverse communities with professionally translated real estate content.",
      category: "international",
      icon: <Globe className="h-6 w-6 text-indigo-500" />,
      timeEstimate: "2-3 minutes",
    },
    {
      id: "cultural-adaptation",
      title: "Cultural Adaptation Assistant",
      description: "Customize content for international buyers",
      longDescription:
        "Adapt your property marketing for different cultural preferences and expectations. This tool helps you highlight features that appeal to specific international buyer groups and avoid cultural misunderstandings.",
      category: "international",
      icon: <Compass className="h-6 w-6 text-indigo-500" />,
      timeEstimate: "4-5 minutes",
    },
    {
      id: "drone-shot-planner",
      title: "Drone Shot Planner",
      description: "Plan perfect aerial property photography",
      longDescription:
        "Create detailed shot lists and flight paths for drone photography. This tool analyzes property features, surrounding areas, and lighting conditions to recommend the most impactful aerial shots.",
      category: "marketing",
      icon: <Camera className="h-6 w-6 text-purple-500" />,
      timeEstimate: "3-4 minutes",
    },
    {
      id: "seasonal-marketing",
      title: "Seasonal Marketing Strategist",
      description: "Optimize listings for seasonal advantages",
      longDescription:
        "Adapt your property marketing to highlight seasonal advantages. This tool helps you emphasize different property features based on the time of year to maximize appeal and perceived value.",
      category: "marketing",
      icon: <Layers className="h-6 w-6 text-purple-500" />,
      timeEstimate: "3-5 minutes",
    },
    {
      id: "audio-tour-creator",
      title: "Audio Tour Creator",
      description: "Generate professional property audio tours",
      longDescription:
        "Create engaging audio narratives for property tours. This tool transforms property details into professional audio descriptions that guide potential buyers through virtual or self-guided tours.",
      category: "marketing",
      icon: <Headphones className="h-6 w-6 text-purple-500" />,
      timeEstimate: "4-6 minutes",
    },
    {
      id: "first-time-buyer-guide",
      title: "First-Time Buyer Guide Generator",
      description: "Create customized guides for new buyers",
      longDescription:
        "Generate comprehensive, personalized guides for first-time homebuyers. This tool creates educational content that positions you as a trusted advisor while simplifying the buying process for newcomers.",
      category: "sales",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      timeEstimate: "5-7 minutes",
    },
    {
      id: "luxury-property-copywriter",
      title: "Luxury Property Copywriter",
      description: "Craft premium descriptions for high-end listings",
      longDescription:
        "Generate sophisticated, evocative descriptions for luxury properties. This tool uses elevated language and focuses on exclusive features, premium materials, and lifestyle benefits to appeal to affluent buyers.",
      category: "marketing",
      icon: <PenTool className="h-6 w-6 text-purple-500" />,
      timeEstimate: "3-4 minutes",
    },
    {
      id: "market-disruption-analyzer",
      title: "Market Disruption Analyzer",
      description: "Predict and prepare for market shifts",
      longDescription:
        "Analyze potential market disruptions and their impact on your business. This tool helps you identify early warning signs of market shifts and develop proactive strategies to maintain your competitive edge.",
      category: "analysis",
      icon: <Zap className="h-6 w-6 text-green-500" />,
      timeEstimate: "6-8 minutes",
    },
    {
      id: "mobile-listing-optimizer",
      title: "Mobile Listing Optimizer",
      description: "Optimize listings for mobile device viewing",
      longDescription:
        "Enhance your listings for the mobile-first audience. This tool reformats descriptions, recommends mobile-friendly images, and ensures your property details display perfectly on smartphones and tablets.",
      category: "marketing",
      icon: <Smartphone className="h-6 w-6 text-purple-500" />,
      timeEstimate: "2-3 minutes",
    },
    {
      id: "negotiation-coach",
      title: "Negotiation Coach",
      description: "Prepare for complex negotiation scenarios",
      longDescription:
        "Develop effective negotiation strategies for different scenarios. This tool provides data-backed talking points, counter-offer suggestions, and psychological insights to help you secure the best deals for your clients.",
      category: "sales",
      icon: <Award className="h-6 w-6 text-blue-500" />,
      timeEstimate: "4-6 minutes",
    },
    {
      id: "property-story-creator",
      title: "Property Story Creator",
      description: "Craft emotional narratives about properties",
      longDescription:
        "Transform property features into compelling emotional narratives. This tool helps you create stories about the lifestyle and memories a property could provide, connecting with buyers on an emotional level.",
      category: "marketing",
      icon: <Lightbulb className="h-6 w-6 text-purple-500" />,
      timeEstimate: "3-5 minutes",
    },
    {
      id: "price-reduction-strategist",
      title: "Price Reduction Strategist",
      description: "Optimize timing and amount of price adjustments",
      longDescription:
        "Determine the optimal timing and amount for price reductions. This tool analyzes market conditions, showing activity, and comparable sales to recommend strategic price adjustments that maximize seller returns.",
      category: "analysis",
      icon: <Percent className="h-6 w-6 text-green-500" />,
      timeEstimate: "3-4 minutes",
    },
  ]

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const handleFeatureRequestSubmit = () => {
    // In a real app, this would send the request to a backend
    alert("Thank you for your feature request! We'll review it and get back to you soon.")
    setFeatureRequest("")
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">AI Tools Hub</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Specialized AI workflows to supercharge your real estate business
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="text-sm">Custom Workflow</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request a Custom AI Workflow</DialogTitle>
              <DialogDescription>
                Tell us about the AI workflow you'd like us to build for your real estate business.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Describe the AI workflow you need..."
                className="min-h-[150px]"
                value={featureRequest}
                onChange={(e) => setFeatureRequest(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleFeatureRequestSubmit}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search AI tools..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto overflow-x-auto -mx-3 px-3 pb-1">
          <Tabs defaultValue="all" className="w-auto" onValueChange={setActiveCategory}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="text-xs md:text-sm">
                All
              </TabsTrigger>
              <TabsTrigger value="marketing" className="text-xs md:text-sm">
                Marketing
              </TabsTrigger>
              <TabsTrigger value="sales" className="text-xs md:text-sm">
                Sales
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-xs md:text-sm">
                Analysis
              </TabsTrigger>
              <TabsTrigger value="international" className="text-xs md:text-sm">
                International
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredTools.map((tool) => (
          <Card key={tool.id} className="overflow-hidden">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start mb-3 md:mb-4">
                <div className="bg-gray-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4">{tool.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h3 className="font-semibold text-base md:text-lg truncate">{tool.title}</h3>
                    <Badge
                      variant="outline"
                      className={`
                text-xs whitespace-nowrap
                ${tool.category === "marketing" ? "bg-purple-100 text-purple-800" : ""}
                ${tool.category === "sales" ? "bg-blue-100 text-blue-800" : ""}
                ${tool.category === "analysis" ? "bg-green-100 text-green-800" : ""}
                ${tool.category === "international" ? "bg-indigo-100 text-indigo-800" : ""}
              `}
                    >
                      {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">{tool.description}</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-3 md:mb-4 line-clamp-3 md:line-clamp-4">
                {tool.longDescription}
              </p>
              <div className="flex justify-between items-center mt-3 md:mt-4">
                <div className="flex items-center text-gray-500 text-xs md:text-sm">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  <span>{tool.timeEstimate}</span>
                </div>
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 h-auto text-xs md:text-sm"
                >
                  Launch <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tools found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}
