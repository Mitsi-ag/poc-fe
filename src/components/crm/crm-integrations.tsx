"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Mail,
  FileText,
  MessageSquare,
  Globe,
  Users,
  BarChart,
  Share2,
  CheckCircle,
  AlertCircle,
  Clock,
  PlusCircle,
} from "lucide-react";

// Integration categories and their tools
const integrationCategories = [
  {
    id: "email",
    name: "Email Marketing",
    icon: <Mail className="h-5 w-5" />,
    tools: [
      { id: "mailchimp", name: "Mailchimp", connected: true, status: "active" },
      {
        id: "sendgrid",
        name: "SendGrid",
        connected: false,
        status: "inactive",
      },
      {
        id: "campaign-monitor",
        name: "Campaign Monitor",
        connected: false,
        status: "inactive",
      },
      {
        id: "activecampaign",
        name: "ActiveCampaign",
        connected: false,
        status: "inactive",
      },
    ],
  },
  {
    id: "documents",
    name: "Document Management",
    icon: <FileText className="h-5 w-5" />,
    tools: [
      { id: "docusign", name: "DocuSign", connected: true, status: "active" },
      {
        id: "adobe-sign",
        name: "Adobe Sign",
        connected: false,
        status: "inactive",
      },
      {
        id: "pandadoc",
        name: "PandaDoc",
        connected: false,
        status: "inactive",
      },
      { id: "dropbox", name: "Dropbox", connected: true, status: "active" },
      {
        id: "google-drive",
        name: "Google Drive",
        connected: false,
        status: "inactive",
      },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    icon: <MessageSquare className="h-5 w-5" />,
    tools: [
      { id: "twilio", name: "Twilio SMS", connected: true, status: "active" },
      {
        id: "whatsapp",
        name: "WhatsApp Business",
        connected: false,
        status: "inactive",
      },
      {
        id: "messenger",
        name: "Facebook Messenger",
        connected: false,
        status: "inactive",
      },
      {
        id: "intercom",
        name: "Intercom",
        connected: false,
        status: "inactive",
      },
    ],
  },
  {
    id: "property",
    name: "Property Portals",
    icon: <Globe className="h-5 w-5" />,
    tools: [
      {
        id: "domain",
        name: "Domain.com.au",
        connected: true,
        status: "active",
      },
      {
        id: "realestate",
        name: "REA Group",
        connected: false,
        status: "inactive",
      },
      { id: "zillow", name: "Zillow", connected: false, status: "inactive" },
      {
        id: "property-data",
        name: "PropertyData",
        connected: false,
        status: "inactive",
      },
    ],
  },
  {
    id: "leads",
    name: "Lead Generation",
    icon: <Users className="h-5 w-5" />,
    tools: [
      { id: "hubspot", name: "HubSpot", connected: false, status: "inactive" },
      {
        id: "salesforce",
        name: "Salesforce",
        connected: false,
        status: "inactive",
      },
      { id: "zoho", name: "Zoho CRM", connected: true, status: "active" },
      {
        id: "pipedrive",
        name: "Pipedrive",
        connected: false,
        status: "inactive",
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics & Reporting",
    icon: <BarChart className="h-5 w-5" />,
    tools: [
      {
        id: "google-analytics",
        name: "Google Analytics",
        connected: true,
        status: "active",
      },
      {
        id: "mixpanel",
        name: "Mixpanel",
        connected: false,
        status: "inactive",
      },
      { id: "hotjar", name: "Hotjar", connected: false, status: "inactive" },
      {
        id: "amplitude",
        name: "Amplitude",
        connected: false,
        status: "inactive",
      },
    ],
  },
  {
    id: "social",
    name: "Social Media",
    icon: <Share2 className="h-5 w-5" />,
    tools: [
      { id: "facebook", name: "Facebook", connected: true, status: "active" },
      { id: "instagram", name: "Instagram", connected: true, status: "active" },
      {
        id: "linkedin",
        name: "LinkedIn",
        connected: false,
        status: "inactive",
      },
      { id: "twitter", name: "Twitter", connected: false, status: "inactive" },
    ],
  },
];

// Data flow examples
const dataFlows = [
  {
    id: "lead-capture",
    name: "Lead Capture to Email Sequence",
    description:
      "New leads from Domain.com.au are automatically added to Mailchimp welcome sequence",
    status: "active",
    lastRun: "2 hours ago",
    source: "Domain.com.au",
    destination: "Mailchimp",
  },
  {
    id: "document-signing",
    name: "Contract Signing Workflow",
    description:
      "Contracts are sent via DocuSign and status is updated in RealtyMate CRM",
    status: "active",
    lastRun: "1 day ago",
    source: "RealtyMate",
    destination: "DocuSign",
  },
  {
    id: "sms-reminder",
    name: "Open House SMS Reminders",
    description:
      "Automatic SMS reminders sent to interested buyers before open houses",
    status: "active",
    lastRun: "3 hours ago",
    source: "RealtyMate Calendar",
    destination: "Twilio SMS",
  },
  {
    id: "social-listing",
    name: "New Listing Social Posts",
    description:
      "New listings are automatically posted to Facebook and Instagram",
    status: "paused",
    lastRun: "5 days ago",
    source: "RealtyMate Listings",
    destination: "Facebook & Instagram",
  },
];

export function CrmIntegrations() {
  const [activeCategory, setActiveCategory] = useState("email");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "paused":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Available Integrations</CardTitle>
              <CardDescription>
                Connect RealtyMate CRM with your favorite tools and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="mb-4 grid grid-cols-4">
                  {integrationCategories.slice(0, 4).map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2"
                    >
                      {category.icon}
                      <span className="hidden sm:inline">{category.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsList className="mb-6 grid grid-cols-3">
                  {integrationCategories.slice(4).map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2"
                    >
                      {category.icon}
                      <span className="hidden sm:inline">{category.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {integrationCategories.map((category) => (
                  <TabsContent
                    key={category.id}
                    value={category.id}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {category.tools.map((tool) => (
                        <Card key={tool.id} className="border border-gray-200">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">
                                {tool.name}
                              </CardTitle>
                              <Switch checked={tool.connected} />
                            </div>
                          </CardHeader>
                          <CardFooter className="pt-2">
                            <Button
                              variant={tool.connected ? "outline" : "default"}
                              size="sm"
                              className="w-full"
                            >
                              {tool.connected ? "Configure" : "Connect"}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Your active integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {integrationCategories
                  .flatMap((category) =>
                    category.tools.filter((tool) => tool.connected),
                  )
                  .map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{tool.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Active
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Manage Connections
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Flows</CardTitle>
          <CardDescription>
            Automated workflows between your connected services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataFlows.map((flow) => (
              <Card key={flow.id} className="border border-gray-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-base">
                        {flow.name}
                        {getStatusIcon(flow.status)}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        {flow.description}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={flow.status === "active" ? "default" : "outline"}
                      className={
                        flow.status === "paused" ? "text-amber-500" : ""
                      }
                    >
                      {flow.status.charAt(0).toUpperCase() +
                        flow.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-2">
                  <div className="text-muted-foreground flex items-center text-sm">
                    <span>
                      From: <strong>{flow.source}</strong>
                    </span>
                    <span className="mx-2">→</span>
                    <span>
                      To: <strong>{flow.destination}</strong>
                    </span>
                    <span className="ml-auto">Last run: {flow.lastRun}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex w-full gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    {flow.status === "active" ? (
                      <Button variant="outline" size="sm" className="flex-1">
                        Pause
                      </Button>
                    ) : (
                      <Button variant="default" size="sm" className="flex-1">
                        Activate
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Data Flow
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
