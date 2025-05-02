"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CrmOverview } from "@/components/crm-overview";
import { CrmIntegrations } from "@/components/crm/crm-integrations";
import { CrmLeads } from "@/components/crm/crm-leads";
import { CrmClients } from "@/components/crm/crm-clients";
import { CrmDeals } from "@/components/crm/crm-deals";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function CRMView() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-50 dark:to-gray-400">
            CRM Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your leads, clients, and opportunities
          </p>
        </div>
        <Button className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Contact</span>
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <CrmOverview />
        </TabsContent>
        <TabsContent value="leads" className="space-y-4">
          <CrmLeads />
        </TabsContent>
        <TabsContent value="clients" className="space-y-4">
          <CrmClients />
        </TabsContent>
        <TabsContent value="deals" className="space-y-4">
          <CrmDeals />
        </TabsContent>
        <TabsContent value="integrations" className="space-y-4">
          <CrmIntegrations />
        </TabsContent>
      </Tabs>
    </div>
  );
}
