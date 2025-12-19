"use client";

import { Palette } from "lucide-react";

import { SettingsHeader } from "@/components/layout/settings-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function BrandingSettingsPage() {
  return (
    <>
      <SettingsHeader
        title="Branding"
        description="Customize your brand appearance across all channels"
      />

      {/* Brand Colors */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Brand Colors</CardTitle>
          <CardDescription>
            These colors will be used in the chat widget and customer-facing interfaces
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-propai-accent" />
              <Input id="primaryColor" defaultValue="#FF6B35" className="font-mono" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500" />
              <Input id="secondaryColor" defaultValue="#3B82F6" className="font-mono" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logo Upload */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Logo Variants</CardTitle>
          <CardDescription>
            Upload logo versions for different contexts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Light Mode Logo</Label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-32 items-center justify-center rounded-lg border border-dashed border-border bg-white">
                <Palette className="h-6 w-6 text-muted-foreground" />
              </div>
              <Button variant="outline" size="sm">Upload</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Dark Mode Logo</Label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-32 items-center justify-center rounded-lg border border-dashed border-border bg-gray-900">
                <Palette className="h-6 w-6 text-gray-500" />
              </div>
              <Button variant="outline" size="sm">Upload</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Domain */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
          <CardDescription>
            Use your own domain for the chat widget
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customDomain">Domain</Label>
            <Input id="customDomain" placeholder="chat.yourdomain.com" />
          </div>
          <p className="text-sm text-muted-foreground">
            Point your CNAME record to widget.propai.com
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
