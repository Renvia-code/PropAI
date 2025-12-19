import {
  MessageSquare,
  Phone,
  Target,
  Calendar,
  TrendingUp,
  Users,
  Bot,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Active Conversations",
    value: "24",
    change: "+12%",
    icon: MessageSquare,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Calls Today",
    value: "156",
    change: "+8%",
    icon: Phone,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "New Leads",
    value: "48",
    change: "+23%",
    icon: Target,
    color: "text-propai-accent",
    bgColor: "bg-propai-accent/10",
  },
  {
    title: "Site Visits Scheduled",
    value: "12",
    change: "+5%",
    icon: Calendar,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const recentActivity = [
  {
    type: "lead",
    message: "New lead from WhatsApp - John Smith interested in 3BHK",
    time: "2 mins ago",
  },
  {
    type: "call",
    message: "AI completed call with Sarah Johnson - Site visit scheduled",
    time: "15 mins ago",
  },
  {
    type: "conversation",
    message: "Human takeover requested for Michael Brown",
    time: "32 mins ago",
  },
  {
    type: "lead",
    message: "Lead qualified - Emily Davis moved to Hot Leads",
    time: "1 hour ago",
  },
  {
    type: "call",
    message: "Outbound campaign completed - 45 calls made",
    time: "2 hours ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-propai-accent/10">
            <Bot className="h-6 w-6 text-propai-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Welcome back!
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your AI assistant today.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">{stat.change}</span>
                <span>from yesterday</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border border-border bg-muted/30 p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full rounded-lg border border-border bg-secondary/50 p-3 text-left text-sm font-medium transition-colors hover:bg-secondary">
                📞 Start Outbound Campaign
              </button>
              <button className="w-full rounded-lg border border-border bg-secondary/50 p-3 text-left text-sm font-medium transition-colors hover:bg-secondary">
                📝 Import New Leads
              </button>
              <button className="w-full rounded-lg border border-border bg-secondary/50 p-3 text-left text-sm font-medium transition-colors hover:bg-secondary">
                🤖 Train AI Agent
              </button>
              <button className="w-full rounded-lg border border-border bg-secondary/50 p-3 text-left text-sm font-medium transition-colors hover:bg-secondary">
                📊 View Analytics
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
