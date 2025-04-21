"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useOnboarding } from "@/contexts/onboarding-context"
import { UserPreferencesForm } from "@/components/settings/user-preferences-form"
import { NotificationsForm } from "@/components/settings/notifications-form"
import { AccountForm } from "@/components/settings/account-form"
import { IntegrationsView } from "@/components/settings/integrations-view"
import { Save } from "lucide-react"
import { CalendarSettings } from "./calendar-settings"

export function SettingsView() {
  const { userData, updateUserData } = useOnboarding()
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("preferences")

  const handleSaveChanges = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-50 dark:to-gray-400">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">Manage your account, preferences, and integrations</p>
      </div>

      <Tabs defaultValue="preferences" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
              <CardDescription>
                Review and update your preferences to personalize your RealtyMate experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserPreferencesForm
                userData={
                  userData || {
                    name: "",
                    email: "",
                    locations: [],
                    specializations: [],
                    experience: "",
                    goals: [],
                    preferredDashboardWidgets: [],
                  }
                }
                updateUserData={updateUserData}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details and subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <AccountForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar Settings</CardTitle>
              <CardDescription>Manage your calendar integrations and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect RealtyMate with other tools and services</CardDescription>
            </CardHeader>
            <CardContent>
              <IntegrationsView />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} disabled={isSaving} className="w-[150px]">
          {isSaving ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Saving...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
