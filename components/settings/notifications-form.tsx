"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

const notificationsFormSchema = z.object({
  emailDigest: z.boolean().default(true),
  marketUpdates: z.boolean().default(true),
  newListings: z.boolean().default(true),
  competitorActivity: z.boolean().default(true),
  leadAlerts: z.boolean().default(true),
  type: z.enum(["all", "important", "none"], {
    required_error: "You need to select a notification type.",
  }),
  mobile: z.boolean().default(true),
  communication: z.array(z.string()).optional(),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

const defaultValues: Partial<NotificationsFormValues> = {
  emailDigest: true,
  marketUpdates: true,
  newListings: true,
  competitorActivity: true,
  leadAlerts: true,
  type: "important",
  mobile: true,
  communication: ["email", "push"],
}

export function NotificationsForm() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  })

  function onSubmit(data: NotificationsFormValues) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="emailDigest"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Daily Digest</FormLabel>
                    <FormDescription>Receive a daily summary of your activity.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketUpdates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Market Updates</FormLabel>
                    <FormDescription>Get notified about significant market changes.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newListings"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">New Listings</FormLabel>
                    <FormDescription>Receive alerts when new properties are listed in your areas.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="competitorActivity"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Competitor Activity</FormLabel>
                    <FormDescription>Get updates on competitor listings and sales.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leadAlerts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Lead Alerts</FormLabel>
                    <FormDescription>Receive immediate notifications for new leads.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notification Frequency</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">All notifications</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="important" />
                    </FormControl>
                    <FormLabel className="font-normal">Important notifications only</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">No notifications</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Push Notifications</FormLabel>
                <FormDescription>Receive notifications on your mobile device.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="communication"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Communication Channels</FormLabel>
                <FormDescription>Select the ways you want to receive notifications.</FormDescription>
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="communication"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes("email")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), "email"])
                                : field.onChange(field.value?.filter((value) => value !== "email"))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Email</FormLabel>
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="communication"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes("push")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), "push"])
                                : field.onChange(field.value?.filter((value) => value !== "push"))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Push Notification</FormLabel>
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="communication"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes("sms")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), "sms"])
                                : field.onChange(field.value?.filter((value) => value !== "sms"))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">SMS</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save preferences</Button>
      </form>
    </Form>
  )
}
