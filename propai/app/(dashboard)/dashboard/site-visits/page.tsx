"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { mockSiteVisits } from "@/lib/data/mock-dashboard";
import { 
  Plus, 
  CalendarDays, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MapPin,
  Phone,
  MessageSquare,
  MoreHorizontal,
  ChevronRight,
  Users,
  Building2
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SiteVisitsPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const todayVisits = mockSiteVisits.filter(v => v.date === "2025-12-20");
  const upcomingVisits = mockSiteVisits.filter(v => v.date !== "2025-12-20");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0"><CheckCircle2 className="h-3 w-3 mr-1" /> Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-0"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case "completed":
        return <Badge variant="secondary"><CheckCircle2 className="h-3 w-3 mr-1" /> Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>;
      case "no-show":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> No-show</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Get dates with visits for calendar highlighting
  const visitDates = mockSiteVisits.map(v => new Date(v.date));

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Site Visits</h1>
            <p className="text-muted-foreground mt-1">Manage property viewing appointments</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Book Visit
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-muted/5">
        <div className="p-6 space-y-6">
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold">{todayVisits.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">No-shows</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Calendar */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md"
                  modifiers={{
                    hasVisit: visitDates,
                  }}
                  modifiersStyles={{
                    hasVisit: {
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      textDecorationColor: 'var(--primary)',
                    }
                  }}
                />
                <div className="flex items-center gap-4 mt-4 pt-4 border-t text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span>Has visits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-muted" />
                    <span>Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-base">Today's Schedule</CardTitle>
                  <CardDescription>Saturday, December 20, 2025</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {todayVisits.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <CalendarDays className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>No visits scheduled for today</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todayVisits.map((visit) => (
                      <div key={visit.id} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/30 transition-colors group">
                        <div className="text-center min-w-[60px]">
                          <p className="text-lg font-bold">{visit.time.split(' ')[0]}</p>
                          <p className="text-xs text-muted-foreground">{visit.time.split(' ')[1]}</p>
                        </div>
                        
                        <div className="h-full w-px bg-border" />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                    {visit.leadName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold text-sm">{visit.leadName}</p>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                    <Building2 className="h-3 w-3" />
                                    <span>{visit.propertyName}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {getStatusBadge(visit.status)}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Confirm</DropdownMenuItem>
                                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                  <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3">
                            {visit.status === 'pending' && (
                              <>
                                <Button size="sm" variant="default" className="h-7">
                                  <CheckCircle2 className="mr-1 h-3 w-3" /> Confirm
                                </Button>
                                <Button size="sm" variant="outline" className="h-7">
                                  Reschedule
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="ghost" className="h-7 ml-auto">
                              <MessageSquare className="mr-1 h-3 w-3" /> Message
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7">
                              <Phone className="mr-1 h-3 w-3" /> Call
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Visits */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Upcoming Visits</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="text-left text-xs text-muted-foreground">
                      <th className="p-3 font-medium">Date</th>
                      <th className="p-3 font-medium">Time</th>
                      <th className="p-3 font-medium">Lead</th>
                      <th className="p-3 font-medium">Property</th>
                      <th className="p-3 font-medium">Assigned To</th>
                      <th className="p-3 font-medium">Status</th>
                      <th className="p-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {upcomingVisits.map((visit) => (
                      <tr key={visit.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-medium text-sm">
                          {new Date(visit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{visit.time}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                {visit.leadName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{visit.leadName}</span>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{visit.propertyName}</td>
                        <td className="p-3 text-sm text-muted-foreground">{visit.assignedTo}</td>
                        <td className="p-3">{getStatusBadge(visit.status)}</td>
                        <td className="p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

        </div>
      </ScrollArea>
    </div>
  );
}
