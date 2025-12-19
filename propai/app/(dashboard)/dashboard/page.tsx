"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  mockDashboardStats, 
  mockActivityFeed, 
  mockHotLeads, 
  mockAIAgentStats 
} from "@/lib/data/mock-dashboard";
import { 
  TrendingUp, 
  TrendingDown, 
  MessageSquare, 
  Calendar, 
  Users, 
  IndianRupee,
  Bot,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  Plus,
  Send,
  BarChart3,
  Settings,
  Zap,
  Clock,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "message": return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "visit": return <Calendar className="h-4 w-4 text-purple-500" />;
      case "ai": return <Sparkles className="h-4 w-4 text-yellow-500" />;
      case "lead": return <Users className="h-4 w-4 text-green-500" />;
      case "call": return <Phone className="h-4 w-4 text-orange-500" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{getGreeting()}, Rahul 👋</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your leads today</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" /> Full Analytics
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Lead
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-muted/5">
        <div className="p-6 space-y-6">
          
          {/* AI Summary Banner */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    Today: 3 high-intent leads waiting, 2 site visits to confirm
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    AI handled 156 conversations with 94% satisfaction
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="bg-white dark:bg-background">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Leads</p>
                    <p className="text-3xl font-bold mt-1">{mockDashboardStats.newLeads}</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 font-medium">+{mockDashboardStats.newLeadsTrend}%</span>
                  <span className="text-muted-foreground">vs last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Open Conversations</p>
                    <p className="text-3xl font-bold mt-1">{mockDashboardStats.openConversations}</p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-sm">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-red-600 font-medium">{mockDashboardStats.openConversationsTrend}%</span>
                  <span className="text-muted-foreground">vs last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Visits</p>
                    <p className="text-3xl font-bold mt-1">{mockDashboardStats.todayVisits}</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Next at 10:00 AM</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pipeline Value</p>
                    <p className="text-3xl font-bold mt-1">{mockDashboardStats.pipelineValue}</p>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                    <IndianRupee className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 font-medium">+{mockDashboardStats.pipelineTrend}%</span>
                  <span className="text-muted-foreground">this month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Activity Feed */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your leads</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/conversations">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockActivityFeed.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-muted/30 transition-colors">
                      <div className="bg-muted p-2 rounded-full shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hot Leads */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    🔥 Hot Leads
                  </CardTitle>
                  <CardDescription>Highest intent leads</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/leads">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockHotLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{lead.name}</p>
                        <Badge variant="secondary" className="text-[10px] h-5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {lead.score}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{lead.interest}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* AI Agent Card */}
          <Card className="bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">AI Agent Status</CardTitle>
                  <CardDescription>Your 24/7 lead qualification assistant</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500 hover:bg-green-600 border-0">
                  <span className="relative flex h-2 w-2 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Active
                </Badge>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/agent"><Settings className="mr-2 h-4 w-4" /> Configure</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-background rounded-lg border">
                  <p className="text-2xl font-bold">{mockAIAgentStats.handledToday}</p>
                  <p className="text-xs text-muted-foreground">Handled Today</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <p className="text-2xl font-bold">{mockAIAgentStats.handoffRate}%</p>
                  <p className="text-xs text-muted-foreground">Handoff Rate</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <p className="text-2xl font-bold">{mockAIAgentStats.avgResponseTime}</p>
                  <p className="text-xs text-muted-foreground">Avg Response</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <p className="text-2xl font-bold flex items-center justify-center gap-1">
                    {mockAIAgentStats.avgRating} <span className="text-yellow-500 text-lg">⭐</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{mockAIAgentStats.totalRatings} ratings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" /> Add Lead
            </Button>
            <Button variant="outline" className="gap-2">
              <Send className="h-4 w-4" /> Send Broadcast
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard/analytics">
                <BarChart3 className="h-4 w-4" /> Full Analytics
              </Link>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4" /> Settings
              </Link>
            </Button>
          </div>

        </div>
      </ScrollArea>
    </div>
  );
}
