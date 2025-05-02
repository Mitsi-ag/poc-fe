"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const calendarFormSchema = z.object({
  googleCalendar: z.boolean().default(false),
  outlookCalendar: z.boolean().default(false),
  appleCalendar: z.boolean().default(false),
  defaultView: z.enum(["day", "week", "month"], {
    required_error: "Please select a default calendar view.",
  }),
  workingHours: z.object({
    start: z.string().default("09:00"),
    end: z.string().default("17:00"),
  }),
  workingDays: z
    .array(z.string())
    .min(1, "Please select at least one working day"),
  reminderTimes: z.array(z.string()).optional(),
});

type CalendarFormValues = z.infer<typeof calendarFormSchema>;

const defaultValues: Partial<CalendarFormValues> = {
  googleCalendar: true,
  outlookCalendar: false,
  appleCalendar: false,
  defaultView: "week",
  workingHours: {
    start: "09:00",
    end: "17:00",
  },
  workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  reminderTimes: ["30min", "1hour", "1day"],
};

export function CalendarSettings() {
  const form = useForm<CalendarFormValues>({
    resolver: zodResolver(calendarFormSchema),
    defaultValues,
  });

  function onSubmit(data: CalendarFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-medium">Calendar Integrations</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="googleCalendar"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Google Calendar</FormLabel>
                    <FormDescription>
                      Sync your events with Google Calendar.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="outlookCalendar"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Outlook Calendar
                    </FormLabel>
                    <FormDescription>
                      Sync your events with Outlook Calendar.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appleCalendar"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Apple Calendar</FormLabel>
                    <FormDescription>
                      Sync your events with Apple Calendar.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Calendar Display</h3>
          <FormField
            control={form.control}
            name="defaultView"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default View</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select default view" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose how your calendar is displayed by default.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="workingHours.start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Working Hours Start</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workingHours.end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Working Hours End</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Working Days</h3>
          <FormField
            control={form.control}
            name="workingDays"
            render={() => (
              <FormItem>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                  ].map((day) => (
                    <FormField
                      key={day}
                      control={form.control}
                      name="workingDays"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={day}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(day)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, day])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== day,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal capitalize">
                              {day}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Reminder Settings</h3>
          <FormField
            control={form.control}
            name="reminderTimes"
            render={() => (
              <FormItem>
                <FormLabel>Default Reminder Times</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["15min", "30min", "1hour", "2hours", "1day", "2days"].map(
                    (time) => (
                      <FormField
                        key={time}
                        control={form.control}
                        name="reminderTimes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={time}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(time)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          time,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== time,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {time}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ),
                  )}
                </div>
                <FormDescription>
                  Select default reminder times for calendar events.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Save calendar settings</Button>
      </form>
    </Form>
  );
}
