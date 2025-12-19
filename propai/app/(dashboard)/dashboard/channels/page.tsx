"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockChannels } from "@/lib/data/mock-properties";
import { ChannelCard } from "@/components/channels/channel-card";
import { Plus, Zap, Activity, MessageCircle, Clock } from "lucide-react";

export default function ChannelsPage() {
  const connectedChannels = mockChannels.filter(c => c.status !== 'disconnected');
  const availableChannels = [
    { name: "Line", icon: "💬" },
    { name: "Web Chat", icon: "🌐" },
    { name: "Telegram", icon: "✈️" }
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b">
         <div>
            <h1 className="text-2xl font-semibold">Channels</h1>
            <p className="text-sm text-muted-foreground mt-1">Connect your messaging platforms to centralize lead communication.</p>
         </div>
         <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Channel
         </Button>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-8 bg-muted/5">
         
         {/* Stats Overview */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                     <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                     <p className="text-sm text-muted-foreground">Active Channels</p>
                     <p className="text-2xl font-bold">4</p>
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                     <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                     <p className="text-sm text-muted-foreground">Messages Today</p>
                     <p className="text-2xl font-bold">236 <span className="text-xs font-normal text-green-500">↑ 12%</span></p>
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                     <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                     <p className="text-sm text-muted-foreground">Avg Response</p>
                     <p className="text-2xl font-bold">2m 30s</p>
                  </div>
               </CardContent>
            </Card>
             <Card>
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                     <Activity className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                     <p className="text-sm text-muted-foreground">System Status</p>
                     <p className="text-sm font-bold text-green-600">All Systems Operational</p>
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Connected Channels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {connectedChannels.map(channel => (
                  <ChannelCard key={channel.id} channel={channel} />
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Available to Connect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {availableChannels.map(ch => (
                  <Card key={ch.name} className="border-dashed flex flex-col items-center justify-center p-6 gap-4 hover:bg-muted/30 cursor-pointer transition-colors">
                      <div className="text-4xl grayscale opacity-50">{ch.icon}</div>
                      <div className="text-center">
                         <h3 className="font-medium">{ch.name}</h3>
                         <p className="text-xs text-muted-foreground mt-1">Connect to receive messages</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">Connect</Button>
                  </Card>
               ))}
            </div>
         </div>

      </div>
    </div>
  );
}
