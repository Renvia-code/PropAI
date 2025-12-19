"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockAIAgentStats } from "@/lib/data/mock-dashboard";
import { 
  Bot, 
  Settings, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare,
  Clock,
  TrendingUp,
  Star,
  ArrowRight,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function AgentPage() {
  const [testMessage, setTestMessage] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState([
    { role: "assistant", content: "Hi! I'm Priya, your PropAI assistant. How can I help you find your dream property today?" }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testMessage.trim()) return;
    
    setChatMessages(prev => [...prev, { role: "user", content: testMessage }]);
    setTestMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'd be happy to help! We have several excellent options. Could you tell me your preferred location and budget range?" 
      }]);
    }, 1000);
  };

  const configStatus = [
    { label: "Personality Configured", complete: true },
    { label: "Knowledge Base (3 sources)", complete: true },
    { label: "WhatsApp Connected", complete: true },
    { label: "Lead Forms (1 incomplete)", complete: false },
  ];

  const recentConversations = [
    { lead: "Aarav Patel", channel: "WhatsApp", outcome: "Qualified", duration: "3m 12s", rating: 5 },
    { lead: "Sarah Williams", channel: "Instagram", outcome: "Handoff", duration: "5m 45s", rating: 4 },
    { lead: "Rajesh Kumar", channel: "WhatsApp", outcome: "Qualified", duration: "2m 30s", rating: 5 },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                AI Agent
                <Badge className="bg-green-500 hover:bg-green-600 border-0 font-normal">
                  <span className="relative flex h-2 w-2 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Active
                </Badge>
              </h1>
              <p className="text-muted-foreground mt-1">Your 24/7 lead qualification assistant</p>
            </div>
          </div>
          <Button asChild>
            <Link href="/dashboard/agent/setup">
              <Settings className="mr-2 h-4 w-4" /> Configure Agent
            </Link>
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-muted/5">
        <div className="p-6 space-y-6">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Handled Today</p>
                    <p className="text-3xl font-bold mt-1">{mockAIAgentStats.handledToday}</p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Handoff Rate</p>
                    <p className="text-3xl font-bold mt-1">{mockAIAgentStats.handoffRate}%</p>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Lower is better</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Response</p>
                    <p className="text-3xl font-bold mt-1">{mockAIAgentStats.avgResponseTime}</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Satisfaction</p>
                    <p className="text-3xl font-bold mt-1 flex items-center gap-1">
                      {mockAIAgentStats.avgRating}
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </p>
                  </div>
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{mockAIAgentStats.totalRatings} ratings</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Test Widget */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Test Your Agent
                </CardTitle>
                <CardDescription>Chat with your AI to see how it responds</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 bg-muted/30 rounded-lg p-4 mb-4 min-h-[300px] max-h-[400px] overflow-y-auto space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                      {msg.role === 'assistant' && (
                        <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                          : 'bg-background border rounded-tl-sm'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input 
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="Type a test message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Configuration Status */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Configuration Status</CardTitle>
                  <CardDescription>Complete all steps for optimal performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {configStatus.map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${
                      item.complete 
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900' 
                        : 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900'
                    }`}>
                      {item.complete ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      )}
                      <span className={`text-sm font-medium ${
                        item.complete 
                          ? 'text-green-800 dark:text-green-300' 
                          : 'text-yellow-800 dark:text-yellow-300'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/agent/setup">
                      Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Performance</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Resolution Rate</span>
                      <span className="font-medium">{mockAIAgentStats.resolutionRate}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all" 
                        style={{ width: `${mockAIAgentStats.resolutionRate}%` }} 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-xl font-bold">{mockAIAgentStats.handledThisWeek}</p>
                      <p className="text-xs text-muted-foreground">This Week</p>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-xl font-bold">4.2m</p>
                      <p className="text-xs text-muted-foreground">Avg Duration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent AI Conversations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Recent AI Conversations</CardTitle>
                <CardDescription>Latest interactions handled by AI</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/conversations">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="text-left text-xs text-muted-foreground">
                      <th className="p-3 font-medium">Lead</th>
                      <th className="p-3 font-medium">Channel</th>
                      <th className="p-3 font-medium">Outcome</th>
                      <th className="p-3 font-medium">Duration</th>
                      <th className="p-3 font-medium">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentConversations.map((conv, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {conv.lead.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm">{conv.lead}</span>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{conv.channel}</td>
                        <td className="p-3">
                          <Badge variant="outline" className={`text-xs ${
                            conv.outcome === 'Qualified' 
                              ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                              : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
                          }`}>
                            {conv.outcome === 'Qualified' ? '✅' : '🔄'} {conv.outcome}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{conv.duration}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} className={`h-3.5 w-3.5 ${j < conv.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                            ))}
                          </div>
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
