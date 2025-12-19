"use client";

import { SettingsHeader } from "@/components/layout/settings-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function OrgSecuritySettingsPage() {
  return (
    <>
      <SettingsHeader
        title="Security"
        description="Configure organization-wide security policies"
      />

      {/* Password Policy */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Password Policy</CardTitle>
          <CardDescription>
            Set password requirements for team members
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require Strong Passwords</Label>
              <p className="text-sm text-muted-foreground">
                Minimum 12 characters with mixed case, numbers, and symbols
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Password Expiry</Label>
              <p className="text-sm text-muted-foreground">
                Require password change every 90 days
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Prevent Password Reuse</Label>
              <p className="text-sm text-muted-foreground">
                Don&apos;t allow reusing last 5 passwords
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Session Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Session Settings</CardTitle>
          <CardDescription>
            Configure session timeout and security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input id="sessionTimeout" type="number" defaultValue="60" className="w-32" />
            <p className="text-sm text-muted-foreground">
              Automatically log out inactive users
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require 2FA for All Members</Label>
              <p className="text-sm text-muted-foreground">
                Enforce two-factor authentication organization-wide
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* IP Allowlist */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>IP Allowlist</CardTitle>
          <CardDescription>
            Restrict access to specific IP addresses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable IP Restrictions</Label>
              <p className="text-sm text-muted-foreground">
                Only allow access from approved IPs
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="allowedIPs">Allowed IP Addresses</Label>
            <Input 
              id="allowedIPs" 
              placeholder="192.168.1.0/24, 10.0.0.0/8" 
              disabled
            />
            <p className="text-sm text-muted-foreground">
              Comma-separated list of IPs or CIDR ranges
            </p>
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
