"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Channel } from "@/lib/data/mock-properties";
import { cn } from "@/lib/utils";
import { MessageSquare, Instagram, Facebook, Mail, Smartphone, RefreshCw, Settings, BarChart3, AlertCircle, CheckCircle2 } from "lucide-react";

interface ChannelCardProps {
  channel: Channel;
}

const getChannelIcon = (type: string) => {
  switch (type) {
    case "whatsapp": return <MessageSquare className="h-6 w-6 text-green-500" />;
    case "instagram": return <Instagram className="h-6 w-6 text-pink-500" />;
    case "facebook": return <Facebook className="h-6 w-6 text-blue-600" />;
    case "email": return <Mail className="h-6 w-6 text-yellow-500" />;
    case "sms": return <Smartphone className="h-6 w-6 text-purple-500" />;
    default: return <MessageSquare className="h-6 w-6" />;
  }
};

export function ChannelCard({ channel }: ChannelCardProps) {
  return (
    <Card className="overflow-hidden border-muted hover:border-primary/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
           <div className="bg-muted p-2 rounded-lg">
              {getChannelIcon(channel.type)}
           </div>
           <div className="flex flex-col">
              <CardTitle className="text-base font-medium">{channel.name}</CardTitle>
              <CardDescription className="text-xs truncate max-w-[150px]">{channel.identifier}</CardDescription>
           </div>
        </div>
        <Badge variant={channel.status === 'connected' ? 'default' : 'secondary'} 
          className={cn(
             "capitalize shadow-none",
             channel.status === 'connected' ? "bg-green-500 hover:bg-green-600" : "bg-muted text-muted-foreground"
          )}
        >
          {channel.status}
        </Badge>
      </CardHeader>
      <CardContent className="pt-4">
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
               <p className="text-xs text-muted-foreground">Messages Today</p>
               <p className="text-xl font-bold">{channel.messagesToday}</p>
            </div>
            <div className="space-y-1">
               <p className="text-xs text-muted-foreground">Avg Response</p>
               <p className="text-xl font-bold flex items-center gap-2">
                  {channel.responseTime}
                  <span className="text-xs font-normal text-green-500">↓ 12%</span>
               </p>
            </div>
         </div>
         
         {channel.status === 'limited' && (
            <div className="mt-4 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 p-2 rounded-md flex items-start gap-2 text-xs">
               <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
               <p>Connection token expiring soon. Please re-authenticate.</p>
            </div>
         )}
      </CardContent>
      <CardFooter className="bg-muted/30 p-2 px-4 flex justify-between items-center border-t">
         <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            Health: {channel.quality}/5
         </div>
         <div className="flex gap-1">
             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <BarChart3 className="h-4 w-4" />
             </Button>
             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <Settings className="h-4 w-4" />
             </Button>
         </div>
      </CardFooter>
    </Card>
  );
}

