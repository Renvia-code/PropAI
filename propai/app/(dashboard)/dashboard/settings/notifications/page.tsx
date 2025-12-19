"use client";

import { SettingsHeader } from "@/components/layout/settings-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function OrgNotificationsSettingsPage() {
  return (
    <>
      <SettingsHeader
        title="Notifications"
        description="Configure organization-wide notification rules and defaults"
      />

      {/* Default Notification Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Default Member Settings</CardTitle>
          <CardDescription>
            Default notification settings for new team members
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send email notifications by default
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Browser Push</Label>
              <p className="text-sm text-muted-foreground">
                Enable push notifications by default
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Send SMS for critical alerts
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Escalation Rules */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Escalation Rules</CardTitle>
          <CardDescription>
            Configure when to escalate notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Unanswered Message Alert</Label>
              <p className="text-sm text-muted-foreground">
                Alert managers after 5 minutes without response
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>High Priority Lead Alert</Label>
              <p className="text-sm text-muted-foreground">
                Immediate notification for hot leads
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>AI Handoff Alert</Label>
              <p className="text-sm text-muted-foreground">
                Notify when AI transfers to human
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-propai-accent hover:bg-propai-accent-hover">
          Save Changes
        </Button>
      </div>
    </>
  );
}
