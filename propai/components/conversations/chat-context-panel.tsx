"use client";

import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Tag, 
  Calendar, 
  Clock,
  MoreVertical,
  Briefcase
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lead } from "@/lib/data/mock-data";

interface ChatContextPanelProps {
  lead: Lead;
}

export function ChatContextPanel({ lead }: ChatContextPanelProps) {
  return (
    <div className="flex h-full w-full flex-col border-l bg-muted/10">
      <div className="flex items-center justify-between p-4 border-b h-14 bg-background">
        <h3 className="font-medium text-sm">Lead Details</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-6 p-4">
          {/* Profile Card */}
          <div className="flex flex-col items-center text-center gap-2">
            <Avatar className="h-20 w-20 border-4 border-background shadow-sm">
              <AvatarImage src={lead.avatar} />
              <AvatarFallback className="text-xl bg-primary/10 text-primary">{lead.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">{lead.name}</h2>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-1">
                <Badge variant="secondary" className="font-normal capitalize">
                  {lead.status}
                </Badge>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">🔥</span>
                  {lead.leadScore}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-2 w-full">
               <Button className="flex-1 gap-2" size="sm">
                 <Phone className="h-4 w-4" /> Call
               </Button>
               <Button variant="outline" className="flex-1 gap-2" size="sm">
                 <Calendar className="h-4 w-4" /> Visit
               </Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Info</h4>
            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="bg-background p-2 rounded-md border">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{lead.phone}</div>
                  <div className="text-xs text-muted-foreground">Mobile</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-background p-2 rounded-md border">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{lead.email}</div>
                  <div className="text-xs text-muted-foreground">Email</div>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <div className="bg-background p-2 rounded-md border">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{lead.location}</div>
                  <div className="text-xs text-muted-foreground">Location</div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Property Interest */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Property Interest</h4>
            <Card className="bg-background shadow-none border-dashed">
              <CardContent className="p-3 space-y-2">
                 <div className="flex items-center gap-2">
                   <Briefcase className="h-4 w-4 text-primary" />
                   <span className="font-medium text-sm">{lead.propertyInterest}</span>
                 </div>
                 <div className="flex items-center justify-between text-xs text-muted-foreground pl-6">
                    <span>Budget</span>
                    <span className="font-medium text-foreground">{lead.budget}</span>
                 </div>
              </CardContent>
            </Card>
          </div>
          
           <Separator />
           
           {/* Tags */}
           <div className="space-y-3">
             <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tags</h4>
             <div className="flex flex-wrap gap-2">
               {lead.tags.map(tag => (
                 <Badge key={tag} variant="secondary" className="text-xs font-normal">
                   <Tag className="h-3 w-3 mr-1 opacity-50" />
                   {tag}
                 </Badge>
               ))}
                <Badge variant="outline" className="text-xs font-normal cursor-pointer border-dashed hover:border-solid hover:bg-accent">
                   + Add
                 </Badge>
             </div>
           </div>
           
           <Separator />
           
           {/* Last Activity */}
           <div className="space-y-2">
             <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Activity</h4>
             <div className="text-xs text-muted-foreground flex items-center gap-2">
               <Clock className="h-3 w-3" />
               Last active {lead.lastActive}
             </div>
           </div>

        </div>
      </ScrollArea>
    </div>
  );
}

