"use client";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Australian states and territories
const australianStates = [
  "New South Wales",
  "Victoria",
  "Queensland",
  "Western Australia",
  "South Australia",
  "Tasmania",
  "Australian Capital Territory",
  "Northern Territory",
];

// Popular suburbs by state (simplified for demo)
const popularSuburbs = {
  "New South Wales": [
    "Sydney",
    "Newcastle",
    "Wollongong",
    "Byron Bay",
    "Orange",
  ],
  Victoria: [
    "Melbourne",
    "Geelong",
    "Ballarat",
    "Bendigo",
    "Mornington Peninsula",
  ],
  Queensland: [
    "Brisbane",
    "Gold Coast",
    "Sunshine Coast",
    "Cairns",
    "Townsville",
  ],
  "Western Australia": [
    "Perth",
    "Fremantle",
    "Margaret River",
    "Broome",
    "Albany",
  ],
  "South Australia": [
    "Adelaide",
    "Barossa Valley",
    "Mount Gambier",
    "Port Lincoln",
    "Victor Harbor",
  ],
  Tasmania: ["Hobart", "Launceston", "Devonport", "Burnie", "Strahan"],
  "Australian Capital Territory": [
    "Canberra",
    "Belconnen",
    "Woden",
    "Gungahlin",
    "Tuggeranong",
  ],
  "Northern Territory": [
    "Darwin",
    "Alice Springs",
    "Katherine",
    "Nhulunbuy",
    "Tennant Creek",
  ],
};

// Property types
const propertyTypes = [
  "Residential",
  "Commercial",
  "Industrial",
  "Land",
  "Rural",
  "Development Sites",
];

// Experience levels
const experienceLevels = [
  "New to the industry (0-2 years)",
  "Established agent (3-5 years)",
  "Experienced agent (6-10 years)",
  "Veteran agent (10+ years)",
];

// Goals
const commonGoals = [
  "Increase listings",
  "Improve conversion rate",
  "Expand to new areas",
  "Build stronger client relationships",
  "Reduce admin workload",
  "Improve market knowledge",
  "Generate more leads",
  "Enhance digital presence",
];

// Dashboard widgets
const dashboardWidgets = [
  "Market Trends",
  "New Listings",
  "Competitor Activity",
  "Lead Pipeline",
  "Recent Sales",
  "Upcoming Appointments",
  "Performance Metrics",
  "AI Insights",
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  state: z.string().min(1, {
    message: "Please select a state.",
  }),
  locations: z.array(z.string()).min(1, {
    message: "Please select at least one location.",
  }),
  specializations: z.array(z.string()).min(1, {
    message: "Please select at least one specialization.",
  }),
  experience: z.string().min(1, {
    message: "Please select your experience level.",
  }),
  goals: z.array(z.string()),
  preferredDashboardWidgets: z.array(z.string()),
});

interface UserPreferencesFormProps {
  userData: {
    name?: string;
    email?: string;
    locations?: string[];
    specializations?: string[];
    experience?: string;
    goals?: string[];
    preferredDashboardWidgets?: string[];
  };
  updateUserData: (data: Partial<UserPreferencesFormProps["userData"]>) => void;
}

export function UserPreferencesForm({
  userData,
  updateUserData,
}: UserPreferencesFormProps) {
  const [selectedState, setSelectedState] = useState<string>(
    userData?.locations?.length > 0
      ? Object.keys(popularSuburbs).find((state) =>
          popularSuburbs[state as keyof typeof popularSuburbs].some((suburb) =>
            userData.locations.includes(suburb),
          ),
        ) || ""
      : "",
  );

  const [availableSuburbs, setAvailableSuburbs] = useState<string[]>(
    selectedState
      ? popularSuburbs[selectedState as keyof typeof popularSuburbs]
      : [],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      state: selectedState,
      locations: userData?.locations || [],
      specializations: userData?.specializations || [],
      experience: userData?.experience || "",
      goals: userData?.goals || [],
      preferredDashboardWidgets: userData?.preferredDashboardWidgets || [],
    },
  });

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setAvailableSuburbs(popularSuburbs[state as keyof typeof popularSuburbs]);
    form.setValue("locations", []);
  };

  const handleSuburbSelect = (suburb: string) => {
    const currentLocations = form.getValues("locations");
    if (!currentLocations.includes(suburb)) {
      form.setValue("locations", [...currentLocations, suburb]);
    }
  };

  const handleRemoveSuburb = (suburb: string) => {
    const currentLocations = form.getValues("locations");
    form.setValue(
      "locations",
      currentLocations.filter((loc) => loc !== suburb),
    );
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateUserData(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Location Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Location Preferences</h3>

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Territory</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleStateChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state or territory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {australianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suburbs/Regions</FormLabel>
                  <div className="space-y-4">
                    {selectedState && (
                      <Select onValueChange={handleSuburbSelect}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Add suburbs or regions" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableSuburbs.map((suburb) => (
                            <SelectItem key={suburb} value={suburb}>
                              {suburb}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((location) => (
                        <Badge
                          key={location}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {location}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => handleRemoveSuburb(location)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {location}</span>
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Specializations */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Property Specializations</h3>

          <FormField
            control={form.control}
            name="specializations"
            render={() => (
              <FormItem>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {propertyTypes.map((type) => (
                    <FormField
                      key={type}
                      control={form.control}
                      name="specializations"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={type}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(type)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, type])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== type,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {type}
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

        {/* Goals */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your Goals</h3>

          <FormField
            control={form.control}
            name="goals"
            render={() => (
              <FormItem>
                <FormDescription>
                  Select the goals you want to achieve with RealtyMate
                </FormDescription>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {commonGoals.map((goal) => (
                    <FormField
                      key={goal}
                      control={form.control}
                      name="goals"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={goal}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(goal)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, goal])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== goal,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {goal}
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

        {/* Dashboard Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Dashboard Preferences</h3>

          <FormField
            control={form.control}
            name="preferredDashboardWidgets"
            render={() => (
              <FormItem>
                <FormDescription>
                  Select which widgets you want to see on your dashboard
                </FormDescription>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {dashboardWidgets.map((widget) => (
                    <FormField
                      key={widget}
                      control={form.control}
                      name="preferredDashboardWidgets"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={widget}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(widget)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, widget])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== widget,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {widget}
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

        <Button type="submit">Save Preferences</Button>
      </form>
    </Form>
  );
}
