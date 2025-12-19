"use client";

import { Building2 } from "lucide-react";

import { SettingsHeader } from "@/components/layout/settings-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OrganizationSettingsPage() {
  return (
    <>
      <SettingsHeader
        title="Organization"
        description="Manage your organization settings and preferences"
      />

      {/* Organization Logo */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Organization Logo</CardTitle>
          <CardDescription>
            This logo will appear in the sidebar and on customer-facing interfaces
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                Upload Logo
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive">
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organization Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>
            Basic information about your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization Name</Label>
            <Input id="orgName" defaultValue="PropAI Real Estate" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" type="url" defaultValue="https://propai.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" defaultValue="Real Estate" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Default Timezone</Label>
            <Input id="timezone" defaultValue="America/New_York (EST)" />
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>
            Set your organization's working hours for AI responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" defaultValue="09:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" type="time" defaultValue="18:00" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            AI will indicate when messages are received outside business hours
          </p>
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
