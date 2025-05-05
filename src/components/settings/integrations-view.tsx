"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  CalendarDays,
  Database,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";

const integrations = [
  {
    id: "domain",
    name: "Domain.com.au",
    description: "Connect to Domain.com.au for property data and listings",
    icon: <Database className="h-5 w-5" />,
    connected: true,
  },
  {
    id: "calendar",
    name: "Calendar",
    description: "Sync with Google Calendar or Outlook",
    icon: <CalendarDays className="h-5 w-5" />,
    connected: true,
  },
  {
    id: "email",
    name: "Email Integration",
    description: "Connect your email for automated follow-ups",
    icon: <Mail className="h-5 w-5" />,
    connected: false,
  },
  {
    id: "sms",
    name: "SMS Integration",
    description: "Send SMS notifications to clients",
    icon: <Phone className="h-5 w-5" />,
    connected: false,
  },
  {
    id: "chat",
    name: "Chat Integration",
    description: "Connect to WhatsApp or Facebook Messenger",
    icon: <MessageSquare className="h-5 w-5" />,
    connected: false,
  },
];

export function IntegrationsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 text-primary rounded-md p-2">
                    {integration.icon}
                  </div>
                  <CardTitle>{integration.name}</CardTitle>
                </div>
                <Switch checked={integration.connected} />
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant={integration.connected ? "outline" : "default"}
                size="sm"
              >
                {integration.connected ? "Manage" : "Connect"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
