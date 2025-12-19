"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { mockLeads, Lead } from "@/lib/data/mock-data";
import { MoreHorizontal, Phone, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const stages = [
  { id: 'new', label: 'New Leads', color: 'bg-blue-500' },
  { id: 'contacted', label: 'Contacted', color: 'bg-yellow-500' },
  { id: 'site-visit', label: 'Site Visit', color: 'bg-purple-500' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-orange-500' },
  { id: 'won', label: 'Won', color: 'bg-green-500' },
];

export function LeadPipelineView() {
  const router = useRouter();

  const getLeadsByStage = (stage: string) => {
    return mockLeads.filter(lead => lead.status === stage);
  };

  return (
    <ScrollArea className="h-full w-full whitespace-nowrap">
      <div className="flex gap-4 pb-4 min-w-full">
        {stages.map((stage) => {
          const leads = getLeadsByStage(stage.id);
          return (
            <div key={stage.id} className="w-[300px] flex-shrink-0 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                   <div className={`h-2 w-2 rounded-full ${stage.color}`} />
                   <h3 className="font-semibold text-sm">{stage.label}</h3>
                   <Badge variant="secondary" className="text-xs h-5 min-w-5 flex items-center justify-center px-1">
                     {leads.length}
                   </Badge>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 h-full">
                {leads.map((lead) => (
                  <Card 
                    key={lead.id} 
                    className="cursor-pointer hover:shadow-md transition-all border-l-4"
                    style={{ borderLeftColor: stage.color.replace('bg-', 'text-') }} // Hacky but works for now, or use map
                    onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                  >
                    <CardHeader className="p-3 pb-0 space-y-0">
                      <div className="flex items-start justify-between">
                         <div className="flex items-center gap-2">
                           <Avatar className="h-8 w-8">
                             <AvatarImage src={lead.avatar} />
                             <AvatarFallback className="text-xs">{lead.name.substring(0, 2)}</AvatarFallback>
                           </Avatar>
                           <div className="flex flex-col">
                             <span className="text-sm font-semibold truncate max-w-[120px]">{lead.name}</span>
                             <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                {lead.leadScore >= 80 && "🔥"} {lead.leadScore} Score
                             </span>
                           </div>
                         </div>
                         <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                           <MoreHorizontal className="h-3 w-3" />
                         </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-2 space-y-2">
                       <div className="text-xs text-muted-foreground line-clamp-2">
                         Interested in {lead.propertyInterest}
                       </div>
                       <div className="flex gap-1 flex-wrap">
                          {lead.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-[10px] h-5 font-normal px-1">
                              {tag}
                            </Badge>
                          ))}
                       </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex justify-between items-center text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                           <Clock className="h-3 w-3" />
                           {lead.lastActive}
                        </div>
                        <div className="flex gap-1">
                            <div className="p-1.5 rounded-full hover:bg-muted bg-muted/30">
                              <MessageSquare className="h-3 w-3" />
                            </div>
                             <div className="p-1.5 rounded-full hover:bg-muted bg-muted/30">
                              <Phone className="h-3 w-3" />
                            </div>
                        </div>
                    </CardFooter>
                  </Card>
                ))}
                {leads.length === 0 && (
                   <div className="h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground text-xs">
                      No leads
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

