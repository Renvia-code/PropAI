"use client";

import { Smartphone, Monitor, Globe } from "lucide-react";

import { SettingsHeader } from "@/components/layout/settings-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const activeSessions = [
  {
    id: 1,
    device: "MacBook Pro",
    browser: "Chrome 120",
    location: "New York, USA",
    ip: "192.168.1.100",
    lastActive: "Active now",
    current: true,
    icon: Monitor,
  },
  {
    id: 2,
    device: "iPhone 15 Pro",
    browser: "Safari Mobile",
    location: "New York, USA",
    ip: "192.168.1.105",
    lastActive: "2 hours ago",
    current: false,
    icon: Smartphone,
  },
  {
    id: 3,
    device: "Windows PC",
    browser: "Firefox 121",
    location: "Boston, USA",
    ip: "10.0.0.50",
    lastActive: "1 day ago",
    current: false,
    icon: Monitor,
  },
];

export default function SecurityPage() {
  return (
    <>
      <SettingsHeader
        title="Security"
        description="Manage your account security and active sessions"
      />

      {/* Two-Factor Authentication */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable 2FA</Label>
              <p className="text-sm text-muted-foreground">
                Require a verification code when signing in
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="my-4" />
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <Smartphone className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Authenticator App</p>
              <p className="text-sm text-muted-foreground">
                Using Google Authenticator
              </p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>
                Devices currently signed in to your account
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="text-destructive">
              Sign out all other sessions
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeSessions.map((session, index) => (
            <div key={session.id}>
              {index > 0 && <Separator className="mb-4" />}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <session.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{session.device}</p>
                    {session.current && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session.browser} • {session.location} • {session.ip}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.lastActive}
                  </p>
                </div>
                {!session.current && (
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Sign out
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>
            Recent sign-in activity on your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Dec 19, 2024 10:30 AM", location: "New York, USA", device: "Chrome on macOS" },
              { date: "Dec 18, 2024 8:15 AM", location: "New York, USA", device: "Safari on iOS" },
              { date: "Dec 17, 2024 3:45 PM", location: "Boston, USA", device: "Firefox on Windows" },
              { date: "Dec 16, 2024 9:00 AM", location: "New York, USA", device: "Chrome on macOS" },
            ].map((login, i) => (
              <div key={i} className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm">
                    {login.device} from {login.location}
                  </p>
                  <p className="text-xs text-muted-foreground">{login.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

