"use client";

import { Camera } from "lucide-react";

import { SettingsHeader } from "@/components/layout/settings-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <>
      <SettingsHeader
        title="Profile"
        description="Manage your personal information and preferences"
      />

      {/* Avatar Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
          <CardDescription>
            This will be displayed on your profile and in conversations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/avatars/user.png" alt="Profile" />
                <AvatarFallback className="bg-propai-accent text-white text-xl font-medium">
                  NS
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-propai-accent text-white hover:bg-propai-accent-hover transition-colors">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                Upload Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive">
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details here
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Neeraj" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Saranala" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="neeraj@propai.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" defaultValue="America/New_York (EST)" />
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
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

