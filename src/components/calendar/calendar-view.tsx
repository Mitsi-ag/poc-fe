"use client";

// import { useState } from "react";
// import {
//   addDays,
//   format,
//   startOfWeek,
//   endOfWeek,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   isSameMonth,
//   isSameDay,
//   addMonths,
//   subMonths,
//   parseISO,
// } from "date-fns";
// import {
//   Calendar,
//   Clock,
//   MapPin,
//   Plus,
//   Users,
//   X,
//   AlertCircle,
//   Check,
//   ExternalLink,
//   RefreshCw,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// Sample data for calendar events
const initialEvents = [
  {
    id: "1",
    title: "Open House - 42 Ocean View",
    date: "2024-04-22T13:00",
    endTime: "2024-04-22T15:00",
    location: "42 Ocean View Drive, Bondi",
    type: "open-house",
    description:
      "Luxury beachfront property with 4 bedrooms and stunning ocean views.",
    attendees: ["John Smith", "Sarah Johnson"],
  },
  {
    id: "2",
    title: "Client Meeting - The Wilsons",
    date: "2024-04-22T10:00",
    endTime: "2024-04-22T11:00",
    location: "Office",
    type: "client-meeting",
    description: "Discuss potential listings in Eastern Suburbs.",
    attendees: ["James Wilson", "Emma Wilson"],
  },
  {
    id: "3",
    title: "Property Valuation - 15 Harbour St",
    date: "2024-04-24T14:30",
    endTime: "2024-04-24T15:30",
    location: "15 Harbour Street, Sydney",
    type: "valuation",
    description: "Conduct property valuation for potential listing.",
    attendees: [],
  },
  {
    id: "4",
    title: "Team Meeting",
    date: "2024-04-26T09:00",
    endTime: "2024-04-26T10:00",
    location: "Conference Room",
    type: "internal",
    description: "Weekly team catch-up and market update.",
    attendees: ["All Team Members"],
  },
];

// Event type definitions with colors
const eventTypes = {
  "open-house": {
    label: "Open House",
    color: "bg-blue-100 text-blue-700 border-blue-300",
  },
  "client-meeting": {
    label: "Client Meeting",
    color: "bg-green-100 text-green-700 border-green-300",
  },
  valuation: {
    label: "Property Valuation",
    color: "bg-purple-100 text-purple-700 border-purple-300",
  },
  internal: {
    label: "Internal Meeting",
    color: "bg-gray-100 text-gray-700 border-gray-300",
  },
  "follow-up": {
    label: "Follow-up",
    color: "bg-amber-100 text-amber-700 border-amber-300",
  },
  other: { label: "Other", color: "bg-red-100 text-red-700 border-red-300" },
};

// Add these calendar sources after the eventTypes object
const calendarSources = [
  {
    id: "google",
    name: "Google Calendar",
    connected: true,
    color: "bg-red-500",
    lastSynced: "2024-04-20T09:30:00",
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    connected: false,
    color: "bg-blue-500",
    lastSynced: null,
  },
  {
    id: "apple",
    name: "Apple Calendar",
    connected: false,
    color: "bg-purple-500",
    lastSynced: null,
  },
  {
    id: "realtymate",
    name: "RealtyMate",
    connected: true,
    color: "bg-emerald-500",
    lastSynced: null,
    default: true,
  },
];

// Add these imported events after initialEvents
const importedEvents = [
  {
    id: "imported-1",
    title: "Team Strategy Meeting",
    date: "2024-04-23T11:00",
    endTime: "2024-04-23T12:30",
    location: "Conference Room B",
    type: "internal",
    description:
      "Quarterly strategy planning session with the leadership team.",
    attendees: ["Marketing Team", "Sales Team"],
    source: "google",
    readonly: true,
  },
  {
    id: "imported-2",
    title: "Lunch with Michael Chen",
    date: "2024-04-25T12:30",
    endTime: "2024-04-25T13:30",
    location: "Cafe Sydney",
    type: "client-meeting",
    description: "Discuss potential investment properties in Eastern Suburbs.",
    attendees: ["Michael Chen"],
    source: "google",
    readonly: true,
  },
];

// Update the useState for events to include importedEvents
export function CalendarView() {
  return null;
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [events, setEvents] = useState([...initialEvents, ...importedEvents]);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  // const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  // const [newEvent, setNewEvent] = useState({
  //   title: "",
  //   date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  //   endTime: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
  //   location: "",
  //   type: "client-meeting",
  //   description: "",
  //   attendees: [],
  // });
  // const [view, setView] = useState("month");
  // const [attendeeInput, setAttendeeInput] = useState("");
  //
  // // Add this state for calendar sources
  // const [activeSources, setActiveSources] = useState(
  //   calendarSources
  //     .filter((source) => source.connected)
  //     .map((source) => source.id),
  // );
  //
  // // Calendar navigation functions
  // const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  // const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  // const goToToday = () => setCurrentDate(new Date());
  //
  // // Get days for month view
  // const monthStart = startOfMonth(currentDate);
  // const monthEnd = endOfMonth(currentDate);
  // const startDate = startOfWeek(monthStart);
  // const endDate = endOfWeek(monthEnd);
  // const dateFormat = "d";
  // const rows = [];
  // const days = eachDayOfInterval({ start: startDate, end: endDate });
  //
  // // Get days for week view
  // const weekStart = startOfWeek(currentDate);
  // const weekEnd = endOfWeek(currentDate);
  // const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  //
  // // Handle event creation
  // const handleAddEvent = () => {
  //   const id = Math.random().toString(36).substring(2, 9);
  //   setEvents([...events, { id, ...newEvent }]);
  //   setNewEvent({
  //     title: "",
  //     date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  //     endTime: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
  //     location: "",
  //     type: "client-meeting",
  //     description: "",
  //     attendees: [],
  //   });
  //   setIsAddEventOpen(false);
  // };
  //
  // // Handle event deletion
  // const handleDeleteEvent = (id: string) => {
  //   setEvents(events.filter((event) => event.id !== id));
  //   setSelectedEvent(null);
  // };
  //
  // // Handle adding attendees
  // const handleAddAttendee = () => {
  //   if (attendeeInput.trim()) {
  //     setNewEvent({
  //       ...newEvent,
  //       attendees: [...newEvent.attendees, attendeeInput.trim()],
  //     });
  //     setAttendeeInput("");
  //   }
  // };
  //
  // // Handle removing attendees
  // const handleRemoveAttendee = (index: number) => {
  //   const updatedAttendees = [...newEvent.attendees];
  //   updatedAttendees.splice(index, 1);
  //   setNewEvent({
  //     ...newEvent,
  //     attendees: updatedAttendees,
  //   });
  // };
  //
  // // Add this function to toggle calendar sources
  // const toggleCalendarSource = (sourceId: string) => {
  //   if (activeSources.includes(sourceId)) {
  //     setActiveSources(activeSources.filter((id) => id !== sourceId));
  //   } else {
  //     setActiveSources([...activeSources, sourceId]);
  //   }
  // };
  //
  // // Add this function to filter events by active sources
  // const getFilteredEvents = () => {
  //   return events.filter((event) => {
  //     const source = event.source || "realtymate";
  //     return activeSources.includes(source);
  //   });
  // };
  //
  // // Update the getEventsForDay function to use filtered events
  // const getEventsForDay = (day) => {
  //   return getFilteredEvents().filter((event) => {
  //     const eventDate = parseISO(event.date);
  //     return isSameDay(eventDate, day);
  //   });
  // };
  //
  // // Add this function for syncing calendars
  // const syncCalendars = () => {
  //   // In a real implementation, this would trigger API calls to sync with external calendars
  //   alert(
  //     "Syncing calendars... This would connect to external calendar APIs in production.",
  //   );
  // };
  //
  // // Add this function to connect a new calendar
  // const connectCalendar = (calendarId) => {
  //   // In a real implementation, this would open OAuth flow or connection dialog
  //   alert(
  //     `Connecting to ${calendarId}... This would initiate OAuth in production.`,
  //   );
  //
  //   // Update the calendar source to connected
  //   const updatedSources = calendarSources.map((source) =>
  //     source.id === calendarId
  //       ? { ...source, connected: true, lastSynced: new Date().toISOString() }
  //       : source,
  //   );
  //
  //   // In a real app, you would save this to the backend
  //   console.log("Updated sources:", updatedSources);
  // };
  //
  // return (
  //   <div className="space-y-6">
  //     <div className="flex justify-between items-center">
  //       <div>
  //         <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text from-gray-900 to-gray-600 dark:from-gray-50 dark:to-gray-400 bg-linear-to-r">
  //           Calendar
  //         </h1>
  //         <p className="mt-1 text-muted-foreground">
  //           Manage your appointments, open houses, and schedule
  //         </p>
  //       </div>
  //       <div className="flex gap-2 items-center">
  //         <Button variant="outline" onClick={goToToday}>
  //           Today
  //         </Button>
  //         <Button variant="outline" size="icon" onClick={prevMonth}>
  //           <span className="sr-only">Previous month</span>
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="24"
  //             height="24"
  //             viewBox="0 0 24 24"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             className="w-4 h-4"
  //           >
  //             <path d="m15 18-6-6 6-6" />
  //           </svg>
  //         </Button>
  //         <Button variant="outline" size="icon" onClick={nextMonth}>
  //           <span className="sr-only">Next month</span>
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="24"
  //             height="24"
  //             viewBox="0 0 24 24"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             className="w-4 h-4"
  //           >
  //             <path d="m9 18 6-6-6-6" />
  //           </svg>
  //         </Button>
  //         <h2 className="ml-2 text-xl font-semibold">
  //           {format(currentDate, "MMMM yyyy")}
  //         </h2>
  //       </div>
  //       <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
  //         <DialogTrigger asChild>
  //           <Button>
  //             <Plus className="mr-2 w-4 h-4" />
  //             Add Event
  //           </Button>
  //         </DialogTrigger>
  //         <DialogContent className="sm:max-w-[525px]">
  //           <DialogHeader>
  //             <DialogTitle>Add New Event</DialogTitle>
  //             <DialogDescription>
  //               Create a new event on your calendar. Click save when you&apos;re
  //               done.
  //             </DialogDescription>
  //           </DialogHeader>
  //           <div className="grid gap-4 py-4">
  //             <div className="grid gap-2">
  //               <Label htmlFor="title">Event Title</Label>
  //               <Input
  //                 id="title"
  //                 value={newEvent.title}
  //                 onChange={(e) =>
  //                   setNewEvent({ ...newEvent, title: e.target.value })
  //                 }
  //                 placeholder="Enter event title"
  //               />
  //             </div>
  //             <div className="grid grid-cols-2 gap-4">
  //               <div className="grid gap-2">
  //                 <Label htmlFor="start-date">Start Date & Time</Label>
  //                 <Input
  //                   id="start-date"
  //                   type="datetime-local"
  //                   value={newEvent.date}
  //                   onChange={(e) =>
  //                     setNewEvent({ ...newEvent, date: e.target.value })
  //                   }
  //                 />
  //               </div>
  //               <div className="grid gap-2">
  //                 <Label htmlFor="end-date">End Date & Time</Label>
  //                 <Input
  //                   id="end-date"
  //                   type="datetime-local"
  //                   value={newEvent.endTime}
  //                   onChange={(e) =>
  //                     setNewEvent({ ...newEvent, endTime: e.target.value })
  //                   }
  //                 />
  //               </div>
  //             </div>
  //             <div className="grid gap-2">
  //               <Label htmlFor="location">Location</Label>
  //               <Input
  //                 id="location"
  //                 value={newEvent.location}
  //                 onChange={(e) =>
  //                   setNewEvent({ ...newEvent, location: e.target.value })
  //                 }
  //                 placeholder="Enter location"
  //               />
  //             </div>
  //             <div className="grid gap-2">
  //               <Label htmlFor="type">Event Type</Label>
  //               <Select
  //                 value={newEvent.type}
  //                 onValueChange={(value) =>
  //                   setNewEvent({ ...newEvent, type: value })
  //                 }
  //               >
  //                 <SelectTrigger id="type">
  //                   <SelectValue placeholder="Select event type" />
  //                 </SelectTrigger>
  //                 <SelectContent>
  //                   {Object.entries(eventTypes).map(([key, { label }]) => (
  //                     <SelectItem key={key} value={key}>
  //                       {label}
  //                     </SelectItem>
  //                   ))}
  //                 </SelectContent>
  //               </Select>
  //             </div>
  //             <div className="grid gap-2">
  //               <Label htmlFor="description">Description</Label>
  //               <Textarea
  //                 id="description"
  //                 value={newEvent.description}
  //                 onChange={(e) =>
  //                   setNewEvent({ ...newEvent, description: e.target.value })
  //                 }
  //                 placeholder="Enter event description"
  //               />
  //             </div>
  //             <div className="grid gap-2">
  //               <Label>Attendees</Label>
  //               <div className="flex gap-2">
  //                 <Input
  //                   value={attendeeInput}
  //                   onChange={(e) => setAttendeeInput(e.target.value)}
  //                   placeholder="Add attendee"
  //                   onKeyDown={(e) => {
  //                     if (e.key === "Enter") {
  //                       e.preventDefault();
  //                       handleAddAttendee();
  //                     }
  //                   }}
  //                 />
  //                 <Button
  //                   type="button"
  //                   onClick={handleAddAttendee}
  //                   variant="secondary"
  //                 >
  //                   Add
  //                 </Button>
  //               </div>
  //               {newEvent.attendees.length > 0 && (
  //                 <div className="flex flex-wrap gap-2 mt-2">
  //                   {newEvent.attendees.map((attendee, index) => (
  //                     <div
  //                       key={index}
  //                       className="flex items-center py-1 px-3 text-sm rounded-full bg-muted"
  //                     >
  //                       {attendee}
  //                       <Button
  //                         type="button"
  //                         variant="ghost"
  //                         size="sm"
  //                         className="p-0 ml-2 h-auto"
  //                         onClick={() => handleRemoveAttendee(index)}
  //                       >
  //                         <X className="w-3 h-3" />
  //                         <span className="sr-only">Remove</span>
  //                       </Button>
  //                     </div>
  //                   ))}
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //           <DialogFooter>
  //             <Button
  //               type="button"
  //               variant="outline"
  //               onClick={() => setIsAddEventOpen(false)}
  //             >
  //               Cancel
  //             </Button>
  //             <Button type="button" onClick={handleAddEvent}>
  //               Save Event
  //             </Button>
  //           </DialogFooter>
  //         </DialogContent>
  //       </Dialog>
  //     </div>
  //
  //     <div className="mb-6">
  //       <Card>
  //         <CardHeader className="pb-3">
  //           <div className="flex justify-between items-center">
  //             <div>
  //               <CardTitle className="text-lg">Calendar Integrations</CardTitle>
  //               <CardDescription>
  //                 Connect and manage your external calendars
  //               </CardDescription>
  //             </div>
  //             <div className="flex gap-2 items-center">
  //               <TooltipProvider>
  //                 <Tooltip>
  //                   <TooltipTrigger asChild>
  //                     <Button
  //                       variant="outline"
  //                       size="sm"
  //                       onClick={syncCalendars}
  //                     >
  //                       <RefreshCw className="mr-2 w-4 h-4" />
  //                       Sync Now
  //                     </Button>
  //                   </TooltipTrigger>
  //                   <TooltipContent>
  //                     <p>Sync events from all connected calendars</p>
  //                   </TooltipContent>
  //                 </Tooltip>
  //               </TooltipProvider>
  //               <Dialog>
  //                 <DialogTrigger asChild>
  //                   <Button variant="outline" size="sm">
  //                     <Plus className="mr-2 w-4 h-4" />
  //                     Connect Calendar
  //                   </Button>
  //                 </DialogTrigger>
  //                 <DialogContent>
  //                   <DialogHeader>
  //                     <DialogTitle>Connect External Calendar</DialogTitle>
  //                     <DialogDescription>
  //                       Link your external calendars to view all your events in
  //                       one place.
  //                     </DialogDescription>
  //                   </DialogHeader>
  //                   <div className="py-4 space-y-4">
  //                     {calendarSources
  //                       .filter(
  //                         (source) => !source.default && !source.connected,
  //                       )
  //                       .map((source) => (
  //                         <div
  //                           key={source.id}
  //                           className="flex justify-between items-center"
  //                         >
  //                           <div className="flex gap-3 items-center">
  //                             <div
  //                               className={`w-3 h-3 rounded-full ${source.color}`}
  //                             ></div>
  //                             <span>{source.name}</span>
  //                           </div>
  //                           <Button
  //                             size="sm"
  //                             onClick={() => connectCalendar(source.id)}
  //                           >
  //                             Connect
  //                           </Button>
  //                         </div>
  //                       ))}
  //                     {calendarSources.filter(
  //                       (source) => !source.default && !source.connected,
  //                     ).length === 0 && (
  //                       <div className="py-4 text-center">
  //                         <Check className="mx-auto mb-2 w-8 h-8 text-green-500" />
  //                         <p className="font-medium">
  //                           All available calendars are connected!
  //                         </p>
  //                       </div>
  //                     )}
  //                   </div>
  //                   <DialogFooter>
  //                     <Button variant="outline" onClick={() => {}}>
  //                       Close
  //                     </Button>
  //                   </DialogFooter>
  //                 </DialogContent>
  //               </Dialog>
  //             </div>
  //           </div>
  //         </CardHeader>
  //         <CardContent>
  //           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
  //             {calendarSources.map((source) => (
  //               <div
  //                 key={source.id}
  //                 className="flex justify-between items-center space-x-2"
  //               >
  //                 <div className="flex items-center space-x-2">
  //                   <div
  //                     className={`w-3 h-3 rounded-full ${source.color}`}
  //                   ></div>
  //                   <div className="flex flex-col">
  //                     <span className="text-sm font-medium">{source.name}</span>
  //                     {source.connected ? (
  //                       <span className="text-xs text-muted-foreground">
  //                         {source.lastSynced
  //                           ? `Last synced: ${format(parseISO(source.lastSynced), "MMM d, h:mm a")}`
  //                           : "Connected"}
  //                       </span>
  //                     ) : (
  //                       <span className="text-xs text-muted-foreground">
  //                         Not connected
  //                       </span>
  //                     )}
  //                   </div>
  //                 </div>
  //                 <div className="flex items-center space-x-2">
  //                   {source.connected && (
  //                     <Switch
  //                       checked={activeSources.includes(source.id)}
  //                       onCheckedChange={() => toggleCalendarSource(source.id)}
  //                       disabled={source.default}
  //                     />
  //                   )}
  //                   {!source.connected && (
  //                     <Button
  //                       variant="ghost"
  //                       size="sm"
  //                       className="h-8"
  //                       onClick={() => connectCalendar(source.id)}
  //                     >
  //                       Connect
  //                     </Button>
  //                   )}
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //
  //     <Tabs value={view} onValueChange={setView} className="w-full">
  //       <TabsList className="grid grid-cols-3 mb-4 w-full">
  //         <TabsTrigger value="month">Month</TabsTrigger>
  //         <TabsTrigger value="week">Week</TabsTrigger>
  //         <TabsTrigger value="day">Day</TabsTrigger>
  //       </TabsList>
  //
  //       <TabsContent value="month" className="mt-0">
  //         <Card>
  //           <CardContent className="p-0">
  //             {/* Calendar header - days of week */}
  //             <div className="grid grid-cols-7 gap-px bg-muted">
  //               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
  //                 (day) => (
  //                   <div
  //                     key={day}
  //                     className="p-2 text-sm font-medium text-center"
  //                   >
  //                     {day}
  //                   </div>
  //                 ),
  //               )}
  //             </div>
  //
  //             {/* Calendar grid */}
  //             <div className="grid grid-cols-7 gap-px bg-muted">
  //               {days.map((day, i) => {
  //                 const dayEvents = getEventsForDay(day);
  //                 return (
  //                   <div
  //                     key={i}
  //                     className={cn(
  //                       "min-h-[120px] p-2 bg-background",
  //                       !isSameMonth(day, monthStart) &&
  //                         "text-muted-foreground",
  //                       isSameDay(day, new Date()) &&
  //                         "bg-blue-50 dark:bg-blue-950",
  //                     )}
  //                   >
  //                     <div className="flex justify-between">
  //                       <span
  //                         className={cn(
  //                           "text-sm font-medium",
  //                           isSameDay(day, new Date()) &&
  //                             "text-blue-600 dark:text-blue-400",
  //                         )}
  //                       >
  //                         {format(day, dateFormat)}
  //                       </span>
  //                       {isSameMonth(day, monthStart) && (
  //                         <Popover>
  //                           <PopoverTrigger asChild>
  //                             <Button
  //                               variant="ghost"
  //                               size="icon"
  //                               className="w-5 h-5"
  //                             >
  //                               <Plus className="w-3 h-3" />
  //                               <span className="sr-only">Add event</span>
  //                             </Button>
  //                           </PopoverTrigger>
  //                           <PopoverContent className="w-80">
  //                             <div className="grid gap-4">
  //                               <div className="space-y-2">
  //                                 <h4 className="font-medium leading-none">
  //                                   Add Event on {format(day, "PPP")}
  //                                 </h4>
  //                                 <p className="text-sm text-muted-foreground">
  //                                   Create a new event on this date.
  //                                 </p>
  //                               </div>
  //                               <div className="grid gap-2">
  //                                 <Button
  //                                   onClick={() => {
  //                                     setNewEvent({
  //                                       ...newEvent,
  //                                       date: format(day, "yyyy-MM-dd'T'09:00"),
  //                                       endTime: format(
  //                                         day,
  //                                         "yyyy-MM-dd'T'10:00",
  //                                       ),
  //                                     });
  //                                     setIsAddEventOpen(true);
  //                                   }}
  //                                 >
  //                                   Add Event
  //                                 </Button>
  //                               </div>
  //                             </div>
  //                           </PopoverContent>
  //                         </Popover>
  //                       )}
  //                     </div>
  //                     <div className="overflow-y-auto mt-1 space-y-1 max-h-[80px]">
  //                       {dayEvents.map((event) => (
  //                         <Dialog key={event.id}>
  //                           <DialogTrigger asChild>
  //                             <Button
  //                               variant="ghost"
  //                               className={cn(
  //                                 "w-full justify-start text-left text-xs p-1 h-auto font-normal border-l-2",
  //                                 eventTypes[event.type].color,
  //                               )}
  //                             >
  //                               <div className="flex items-center w-full">
  //                                 {event.source &&
  //                                   event.source !== "realtymate" && (
  //                                     <div
  //                                       className={`w-2 h-2 rounded-full mr-1 ${calendarSources.find((s) => s.id === event.source)?.color || ""}`}
  //                                     ></div>
  //                                   )}
  //                                 <span className="truncate">
  //                                   {event.title}
  //                                 </span>
  //                               </div>
  //                             </Button>
  //                           </DialogTrigger>
  //                           <DialogContent>
  //                             <DialogHeader>
  //                               <DialogTitle>{event.title}</DialogTitle>
  //                             </DialogHeader>
  //                             <div className="py-4 space-y-4">
  //                               <div className="flex gap-2 items-center">
  //                                 <Calendar className="w-4 h-4 text-muted-foreground" />
  //                                 <span>
  //                                   {format(parseISO(event.date), "PPP")} at{" "}
  //                                   {format(parseISO(event.date), "p")}
  //                                   {" - "}
  //                                   {format(parseISO(event.endTime), "p")}
  //                                 </span>
  //                               </div>
  //                               {event.location && (
  //                                 <div className="flex gap-2 items-center">
  //                                   <MapPin className="w-4 h-4 text-muted-foreground" />
  //                                   <span>{event.location}</span>
  //                                 </div>
  //                               )}
  //                               <div className="flex gap-2 items-center">
  //                                 <div
  //                                   className={cn(
  //                                     "px-2 py-1 rounded-full text-xs",
  //                                     eventTypes[event.type].color,
  //                                   )}
  //                                 >
  //                                   {eventTypes[event.type].label}
  //                                 </div>
  //                               </div>
  //                               {event.description && (
  //                                 <div className="pt-2 border-t">
  //                                   <h4 className="mb-1 text-sm font-medium">
  //                                     Description
  //                                   </h4>
  //                                   <p className="text-sm text-muted-foreground">
  //                                     {event.description}
  //                                   </p>
  //                                 </div>
  //                               )}
  //                               {event.attendees.length > 0 && (
  //                                 <div className="pt-2 border-t">
  //                                   <div className="flex gap-2 items-center mb-2">
  //                                     <Users className="w-4 h-4 text-muted-foreground" />
  //                                     <h4 className="text-sm font-medium">
  //                                       Attendees
  //                                     </h4>
  //                                   </div>
  //                                   <div className="flex flex-wrap gap-2">
  //                                     {event.attendees.map(
  //                                       (attendee, index) => (
  //                                         <div
  //                                           key={index}
  //                                           className="py-1 px-2 text-xs rounded-full bg-muted"
  //                                         >
  //                                           {attendee}
  //                                         </div>
  //                                       ),
  //                                     )}
  //                                   </div>
  //                                 </div>
  //                               )}
  //                             </div>
  //                             {event.source &&
  //                               event.source !== "realtymate" && (
  //                                 <div className="pt-2 border-t">
  //                                   <div className="flex justify-between items-center">
  //                                     <div className="flex gap-2 items-center">
  //                                       <ExternalLink className="w-4 h-4 text-muted-foreground" />
  //                                       <span className="text-sm">
  //                                         From{" "}
  //                                         {calendarSources.find(
  //                                           (s) => s.id === event.source,
  //                                         )?.name || "External Calendar"}
  //                                       </span>
  //                                     </div>
  //                                     {event.readonly && (
  //                                       <Badge
  //                                         variant="outline"
  //                                         className="text-xs"
  //                                       >
  //                                         Read Only
  //                                       </Badge>
  //                                     )}
  //                                   </div>
  //                                 </div>
  //                               )}
  //                             <DialogFooter>
  //                               <Button
  //                                 variant="destructive"
  //                                 onClick={() => handleDeleteEvent(event.id)}
  //                                 disabled={event.readonly}
  //                               >
  //                                 {event.readonly ? (
  //                                   <>
  //                                     <AlertCircle className="mr-2 w-4 h-4" />
  //                                     Read Only
  //                                   </>
  //                                 ) : (
  //                                   "Delete Event"
  //                                 )}
  //                               </Button>
  //                             </DialogFooter>
  //                           </DialogContent>
  //                         </Dialog>
  //                       ))}
  //                     </div>
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //
  //       <TabsContent value="week" className="mt-0">
  //         <Card>
  //           <CardContent className="p-0">
  //             <div className="grid grid-cols-7 gap-px bg-muted">
  //               {weekDays.map((day, i) => (
  //                 <div key={i} className="p-2 text-center">
  //                   <div
  //                     className={cn(
  //                       "text-sm font-medium",
  //                       isSameDay(day, new Date()) &&
  //                         "text-blue-600 dark:text-blue-400",
  //                     )}
  //                   >
  //                     {format(day, "EEE")}
  //                   </div>
  //                   <div
  //                     className={cn(
  //                       "flex h-8 w-8 items-center justify-center rounded-full mx-auto mt-1",
  //                       isSameDay(day, new Date()) &&
  //                         "bg-blue-100 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-400",
  //                     )}
  //                   >
  //                     {format(day, "d")}
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //
  //             <div className="grid grid-cols-7 gap-px bg-muted">
  //               {weekDays.map((day, i) => {
  //                 const dayEvents = getEventsForDay(day);
  //                 return (
  //                   <div
  //                     key={i}
  //                     className={cn(
  //                       "min-h-[400px] p-2 bg-background",
  //                       isSameDay(day, new Date()) &&
  //                         "bg-blue-50 dark:bg-blue-950",
  //                     )}
  //                   >
  //                     <div className="space-y-1">
  //                       {dayEvents.map((event) => (
  //                         <Dialog key={event.id}>
  //                           <DialogTrigger asChild>
  //                             <Button
  //                               variant="ghost"
  //                               className={cn(
  //                                 "w-full justify-start text-left text-xs p-2 h-auto font-normal border-l-2",
  //                                 eventTypes[event.type].color,
  //                               )}
  //                             >
  //                               <div className="w-full">
  //                                 <div className="flex justify-between items-center w-full">
  //                                   <div className="flex items-center">
  //                                     {event.source &&
  //                                       event.source !== "realtymate" && (
  //                                         <div
  //                                           className={`w-2 h-2 rounded-full mr-1 ${calendarSources.find((s) => s.id === event.source)?.color || ""}`}
  //                                         ></div>
  //                                       )}
  //                                     <span className="font-medium">
  //                                       {event.title}
  //                                     </span>
  //                                   </div>
  //                                   <span className="text-muted-foreground">
  //                                     {format(parseISO(event.date), "h:mm a")}
  //                                   </span>
  //                                 </div>
  //                                 {event.location && (
  //                                   <div className="mt-1 text-muted-foreground truncate">
  //                                     {event.location}
  //                                   </div>
  //                                 )}
  //                               </div>
  //                             </Button>
  //                           </DialogTrigger>
  //                           <DialogContent>
  //                             <DialogHeader>
  //                               <DialogTitle>{event.title}</DialogTitle>
  //                             </DialogHeader>
  //                             <div className="py-4 space-y-4">
  //                               <div className="flex gap-2 items-center">
  //                                 <Calendar className="w-4 h-4 text-muted-foreground" />
  //                                 <span>
  //                                   {format(parseISO(event.date), "PPP")} at{" "}
  //                                   {format(parseISO(event.date), "p")}
  //                                   {" - "}
  //                                   {format(parseISO(event.endTime), "p")}
  //                                 </span>
  //                               </div>
  //                               {event.location && (
  //                                 <div className="flex gap-2 items-center">
  //                                   <MapPin className="w-4 h-4 text-muted-foreground" />
  //                                   <span>{event.location}</span>
  //                                 </div>
  //                               )}
  //                               <div className="flex gap-2 items-center">
  //                                 <div
  //                                   className={cn(
  //                                     "px-2 py-1 rounded-full text-xs",
  //                                     eventTypes[event.type].color,
  //                                   )}
  //                                 >
  //                                   {eventTypes[event.type].label}
  //                                 </div>
  //                               </div>
  //                               {event.description && (
  //                                 <div className="pt-2 border-t">
  //                                   <h4 className="mb-1 text-sm font-medium">
  //                                     Description
  //                                   </h4>
  //                                   <p className="text-sm text-muted-foreground">
  //                                     {event.description}
  //                                   </p>
  //                                 </div>
  //                               )}
  //                               {event.attendees.length > 0 && (
  //                                 <div className="pt-2 border-t">
  //                                   <div className="flex gap-2 items-center mb-2">
  //                                     <Users className="w-4 h-4 text-muted-foreground" />
  //                                     <h4 className="text-sm font-medium">
  //                                       Attendees
  //                                     </h4>
  //                                   </div>
  //                                   <div className="flex flex-wrap gap-2">
  //                                     {event.attendees.map(
  //                                       (attendee, index) => (
  //                                         <div
  //                                           key={index}
  //                                           className="py-1 px-2 text-xs rounded-full bg-muted"
  //                                         >
  //                                           {attendee}
  //                                         </div>
  //                                       ),
  //                                     )}
  //                                   </div>
  //                                 </div>
  //                               )}
  //                             </div>
  //                             {event.source &&
  //                               event.source !== "realtymate" && (
  //                                 <div className="pt-2 border-t">
  //                                   <div className="flex justify-between items-center">
  //                                     <div className="flex gap-2 items-center">
  //                                       <ExternalLink className="w-4 h-4 text-muted-foreground" />
  //                                       <span className="text-sm">
  //                                         From{" "}
  //                                         {calendarSources.find(
  //                                           (s) => s.id === event.source,
  //                                         )?.name || "External Calendar"}
  //                                       </span>
  //                                     </div>
  //                                     {event.readonly && (
  //                                       <Badge
  //                                         variant="outline"
  //                                         className="text-xs"
  //                                       >
  //                                         Read Only
  //                                       </Badge>
  //                                     )}
  //                                   </div>
  //                                 </div>
  //                               )}
  //                             <DialogFooter>
  //                               <Button
  //                                 variant="destructive"
  //                                 onClick={() => handleDeleteEvent(event.id)}
  //                                 disabled={event.readonly}
  //                               >
  //                                 {event.readonly ? (
  //                                   <>
  //                                     <AlertCircle className="mr-2 w-4 h-4" />
  //                                     Read Only
  //                                   </>
  //                                 ) : (
  //                                   "Delete Event"
  //                                 )}
  //                               </Button>
  //                             </DialogFooter>
  //                           </DialogContent>
  //                         </Dialog>
  //                       ))}
  //                     </div>
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //
  //       <TabsContent value="day" className="mt-0">
  //         <Card>
  //           <CardContent className="p-4">
  //             <div className="flex justify-between items-center mb-4">
  //               <h3 className="text-lg font-medium">
  //                 {format(currentDate, "EEEE, MMMM d, yyyy")}
  //               </h3>
  //               <Button
  //                 onClick={() => {
  //                   setNewEvent({
  //                     ...newEvent,
  //                     date: format(currentDate, "yyyy-MM-dd'T'09:00"),
  //                     endTime: format(currentDate, "yyyy-MM-dd'T'10:00"),
  //                   });
  //                   setIsAddEventOpen(true);
  //                 }}
  //               >
  //                 <Plus className="mr-2 w-4 h-4" />
  //                 Add Event
  //               </Button>
  //             </div>
  //
  //             <div className="space-y-4">
  //               {getEventsForDay(currentDate).length > 0 ? (
  //                 getEventsForDay(currentDate)
  //                   .sort((a, b) => new Date(a.date) - new Date(b.date))
  //                   .map((event) => (
  //                     <Card key={event.id} className="overflow-hidden">
  //                       <div
  //                         className={cn(
  //                           "h-1",
  //                           event.type === "open-house" && "bg-blue-500",
  //                           event.type === "client-meeting" && "bg-green-500",
  //                           event.type === "valuation" && "bg-purple-500",
  //                           event.type === "internal" && "bg-gray-500",
  //                           event.type === "follow-up" && "bg-amber-500",
  //                           event.type === "other" && "bg-red-500",
  //                         )}
  //                       />
  //                       <CardHeader className="p-4 pb-2">
  //                         <div className="flex justify-between items-start">
  //                           <div className="flex items-center">
  //                             {event.source &&
  //                               event.source !== "realtymate" && (
  //                                 <div
  //                                   className={`w-3 h-3 rounded-full mr-2 ${calendarSources.find((s) => s.id === event.source)?.color || ""}`}
  //                                   title={`From ${calendarSources.find((s) => s.id === event.source)?.name || "External Calendar"}`}
  //                                 ></div>
  //                               )}
  //                             <CardTitle className="text-base">
  //                               {event.title}
  //                             </CardTitle>
  //                           </div>
  //                           <div className="flex gap-2 items-center">
  //                             {event.readonly && (
  //                               <Badge variant="outline" className="text-xs">
  //                                 Read Only
  //                               </Badge>
  //                             )}
  //                             <div
  //                               className={cn(
  //                                 "px-2 py-1 rounded-full text-xs",
  //                                 eventTypes[event.type].color,
  //                               )}
  //                             >
  //                               {eventTypes[event.type].label}
  //                             </div>
  //                           </div>
  //                         </div>
  //                       </CardHeader>
  //                       <CardContent className="p-4 pt-0 space-y-2">
  //                         <div className="flex gap-2 items-center text-sm">
  //                           <Clock className="w-4 h-4 text-muted-foreground" />
  //                           <span>
  //                             {format(parseISO(event.date), "h:mm a")} -{" "}
  //                             {format(parseISO(event.endTime), "h:mm a")}
  //                           </span>
  //                         </div>
  //                         {event.location && (
  //                           <div className="flex gap-2 items-center text-sm">
  //                             <MapPin className="w-4 h-4 text-muted-foreground" />
  //                             <span>{event.location}</span>
  //                           </div>
  //                         )}
  //                         {event.description && (
  //                           <p className="mt-2 text-sm text-muted-foreground">
  //                             {event.description}
  //                           </p>
  //                         )}
  //                         {event.attendees.length > 0 && (
  //                           <div className="pt-2">
  //                             <div className="flex gap-2 items-center mb-2">
  //                               <Users className="w-4 h-4 text-muted-foreground" />
  //                               <span className="text-sm font-medium">
  //                                 Attendees
  //                               </span>
  //                             </div>
  //                             <div className="flex flex-wrap gap-2">
  //                               {event.attendees.map((attendee, index) => (
  //                                 <div
  //                                   key={index}
  //                                   className="py-1 px-2 text-xs rounded-full bg-muted"
  //                                 >
  //                                   {attendee}
  //                                 </div>
  //                               ))}
  //                             </div>
  //                           </div>
  //                         )}
  //                       </CardContent>
  //                       <CardFooter className="flex justify-end p-4 pt-0">
  //                         <Button
  //                           variant="destructive"
  //                           size="sm"
  //                           onClick={() => handleDeleteEvent(event.id)}
  //                           disabled={event.readonly}
  //                         >
  //                           {event.readonly ? "Read Only" : "Delete"}
  //                         </Button>
  //                       </CardFooter>
  //                     </Card>
  //                   ))
  //               ) : (
  //                 <div className="py-12 text-center">
  //                   <Calendar className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
  //                   <h3 className="mb-2 text-lg font-medium">
  //                     No Events Today
  //                   </h3>
  //                   <p className="mb-4 text-muted-foreground">
  //                     You don't have any events scheduled for today.
  //                   </p>
  //                   <Button
  //                     onClick={() => {
  //                       setNewEvent({
  //                         ...newEvent,
  //                         date: format(currentDate, "yyyy-MM-dd'T'09:00"),
  //                         endTime: format(currentDate, "yyyy-MM-dd'T'10:00"),
  //                       });
  //                       setIsAddEventOpen(true);
  //                     }}
  //                   >
  //                     <Plus className="mr-2 w-4 h-4" />
  //                     Add Your First Event
  //                   </Button>
  //                 </div>
  //               )}
  //             </div>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //     </Tabs>
  //   </div>
  // );
}
