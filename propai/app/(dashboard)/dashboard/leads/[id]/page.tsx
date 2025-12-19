"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { mockLeads, mockConversations } from "@/lib/data/mock-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MoreVertical, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Tag, 
  Clock,
  Briefcase,
  Home,
  CheckCircle2,
  FileText
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConversationCard } from "@/components/conversations/conversation-card";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const lead = React.useMemo(() => {
    return mockLeads.find(l => l.id === id);
  }, [id]);

  const leadConversations = React.useMemo(() => {
     return mockConversations.filter(c => c.leadId === id);
  }, [id]);

  if (!lead) {
    return (
       <div className="flex flex-col items-center justify-center h-full gap-4">
          <p className="text-muted-foreground">Lead not found</p>
          <Button variant="outline" onClick={() => router.push('/dashboard/leads')}>
             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Leads
          </Button>
       </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-background">
         <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/leads')}>
               <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
               <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                  <AvatarImage src={lead.avatar} />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">{lead.name.substring(0, 2).toUpperCase()}</AvatarFallback>
               </Avatar>
               <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                     {lead.name}
                     <Badge variant="outline" className="text-sm font-normal ml-2">
                        {lead.status.replace('-', ' ')}
                     </Badge>
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                     <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {lead.location || "Location unknown"}
                     </div>
                     <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Active {lead.lastActive}
                     </div>
                     <div className="flex items-center gap-1 text-green-600 font-medium">
                        🔥 Score: {lead.leadScore}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <Button variant="outline">
               <Calendar className="mr-2 h-4 w-4" /> Book Visit
            </Button>
            <Button>
               <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
            <Button variant="ghost" size="icon">
               <MoreVertical className="h-4 w-4" />
            </Button>
         </div>
      </div>

      <div className="flex-1 overflow-hidden">
         <ScrollArea className="h-full">
            <div className="container max-w-6xl mx-auto p-6 space-y-8">
               
               <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-6">
                     <TabsTrigger 
                       value="overview" 
                       className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-3"
                     >
                        Overview
                     </TabsTrigger>
                     <TabsTrigger 
                       value="conversations" 
                       className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-3"
                     >
                        Conversations
                     </TabsTrigger>
                     <TabsTrigger 
                       value="visits" 
                       className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-3"
                     >
                        Site Visits
                     </TabsTrigger>
                     <TabsTrigger 
                       value="properties" 
                       className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-3"
                     >
                        Properties
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left Column: Details */}
                        <div className="md:col-span-2 space-y-6">
                           <Card>
                              <CardHeader>
                                 <CardTitle>Lead Details</CardTitle>
                              </CardHeader>
                              <CardContent className="grid gap-6">
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <label className="text-xs font-medium text-muted-foreground">Phone</label>
                                       <div className="flex items-center gap-2">
                                          <Phone className="h-4 w-4 text-muted-foreground" />
                                          {lead.phone}
                                       </div>
                                    </div>
                                    <div className="space-y-1">
                                       <label className="text-xs font-medium text-muted-foreground">Email</label>
                                       <div className="flex items-center gap-2">
                                          <Mail className="h-4 w-4 text-muted-foreground" />
                                          {lead.email}
                                       </div>
                                    </div>
                                    <div className="space-y-1">
                                       <label className="text-xs font-medium text-muted-foreground">Source</label>
                                       <div className="capitalize">{lead.source}</div>
                                    </div>
                                    <div className="space-y-1">
                                       <label className="text-xs font-medium text-muted-foreground">Assigned To</label>
                                       <div className="flex items-center gap-2">
                                          <Avatar className="h-5 w-5">
                                             <AvatarFallback className="text-[10px]">ME</AvatarFallback>
                                          </Avatar>
                                          You
                                       </div>
                                    </div>
                                 </div>
                                 <Separator />
                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="space-y-1">
                                       <label className="text-xs font-medium text-muted-foreground">Budget</label>
                                       <div className="font-medium">{lead.budget || "Not specified"}</div>
                                    </div>
                                    <div className="space-y-1">
                                       <label className="text-xs font-medium text-muted-foreground">Looking For</label>
                                       <div className="font-medium">{lead.propertyInterest || "Not specified"}</div>
                                    </div>
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground">Tags</label>
                                    <div className="flex flex-wrap gap-2">
                                       {lead.tags.map(tag => (
                                          <Badge key={tag} variant="secondary">{tag}</Badge>
                                       ))}
                                       <Button variant="outline" size="sm" className="h-6 text-xs border-dashed">
                                          + Add Tag
                                       </Button>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>

                           <Card>
                              <CardHeader>
                                 <CardTitle>Notes</CardTitle>
                              </CardHeader>
                              <CardContent>
                                 <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground italic">
                                    No notes yet. Start typing to add a note...
                                 </div>
                              </CardContent>
                           </Card>
                        </div>

                        {/* Right Column: Timeline */}
                        <div className="space-y-6">
                           <Card>
                              <CardHeader>
                                 <CardTitle>Activity Timeline</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-6">
                                 {/* Mock Timeline Items */}
                                 <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                       <div className="h-2 w-2 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900" />
                                       <div className="w-[1px] h-full bg-border mt-2" />
                                    </div>
                                    <div className="space-y-1 pb-2">
                                       <p className="text-sm font-medium">New Message</p>
                                       <p className="text-xs text-muted-foreground">Received on WhatsApp</p>
                                       <p className="text-xs text-muted-foreground">{lead.lastActive}</p>
                                    </div>
                                 </div>
                                 
                                 <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                       <div className="h-2 w-2 rounded-full bg-green-500 ring-4 ring-green-100 dark:ring-green-900" />
                                       <div className="w-[1px] h-full bg-border mt-2" />
                                    </div>
                                    <div className="space-y-1 pb-2">
                                       <p className="text-sm font-medium">Lead Created</p>
                                       <p className="text-xs text-muted-foreground">Imported from Facebook Ads</p>
                                       <p className="text-xs text-muted-foreground">2 days ago</p>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                           
                           <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100 dark:border-blue-900">
                              <CardHeader>
                                 <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <CardTitle className="text-base">Next Best Action</CardTitle>
                                 </div>
                              </CardHeader>
                              <CardContent>
                                 <p className="text-sm text-blue-900 dark:text-blue-300 mb-4">
                                    Lead score is high (85). Based on interest in "Cyber City Heights", we recommend scheduling a site visit this weekend.
                                 </p>
                                 <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Schedule Visit
                                 </Button>
                              </CardContent>
                           </Card>
                        </div>
                     </div>
                  </TabsContent>

                  <TabsContent value="conversations" className="mt-6">
                      <div className="grid gap-4 max-w-2xl">
                         {leadConversations.length > 0 ? (
                            leadConversations.map(conv => (
                               <ConversationCard 
                                 key={conv.id} 
                                 conversation={conv} 
                                 onClick={() => router.push(`/dashboard/conversations/${conv.id}`)}
                               />
                            ))
                         ) : (
                            <div className="text-center py-10 text-muted-foreground">
                               No conversations found.
                            </div>
                         )}
                      </div>
                  </TabsContent>

                  <TabsContent value="visits" className="mt-6">
                      <Card>
                         <CardContent className="flex flex-col items-center justify-center py-10 text-center gap-4">
                            <Calendar className="h-10 w-10 text-muted-foreground/30" />
                            <div>
                               <h3 className="text-lg font-medium">No site visits scheduled</h3>
                               <p className="text-muted-foreground text-sm">Book a site visit to show properties to this lead.</p>
                            </div>
                            <Button>Book Site Visit</Button>
                         </CardContent>
                      </Card>
                  </TabsContent>
                  
                  <TabsContent value="properties" className="mt-6">
                      <Card>
                         <CardContent className="flex flex-col items-center justify-center py-10 text-center gap-4">
                            <Home className="h-10 w-10 text-muted-foreground/30" />
                            <div>
                               <h3 className="text-lg font-medium">No properties viewed</h3>
                               <p className="text-muted-foreground text-sm">Track which properties this lead has expressed interest in.</p>
                            </div>
                            <Button variant="outline">Browse Properties</Button>
                         </CardContent>
                      </Card>
                  </TabsContent>
               </Tabs>
            </div>
         </ScrollArea>
      </div>
    </div>
  );
}
