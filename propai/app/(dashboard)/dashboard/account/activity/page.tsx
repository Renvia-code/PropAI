"use client";

import { SettingsHeader } from "@/components/layout/settings-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const activityLog = [
  {
    id: 1,
    action: "Login",
    details: "Signed in from Chrome on macOS",
    ip: "192.168.1.100",
    date: "Dec 19, 2024 10:30 AM",
    status: "success",
  },
  {
    id: 2,
    action: "Profile Update",
    details: "Changed phone number",
    ip: "192.168.1.100",
    date: "Dec 18, 2024 3:45 PM",
    status: "success",
  },
  {
    id: 3,
    action: "Password Change",
    details: "Password successfully updated",
    ip: "192.168.1.100",
    date: "Dec 17, 2024 9:15 AM",
    status: "success",
  },
  {
    id: 4,
    action: "Failed Login",
    details: "Incorrect password attempt",
    ip: "203.45.67.89",
    date: "Dec 16, 2024 11:20 PM",
    status: "warning",
  },
  {
    id: 5,
    action: "Login",
    details: "Signed in from Safari on iOS",
    ip: "192.168.1.105",
    date: "Dec 15, 2024 8:00 AM",
    status: "success",
  },
  {
    id: 6,
    action: "2FA Enabled",
    details: "Two-factor authentication activated",
    ip: "192.168.1.100",
    date: "Dec 14, 2024 2:30 PM",
    status: "success",
  },
  {
    id: 7,
    action: "Login",
    details: "Signed in from Firefox on Windows",
    ip: "10.0.0.50",
    date: "Dec 13, 2024 4:15 PM",
    status: "success",
  },
  {
    id: 8,
    action: "Notification Settings",
    details: "Updated email preferences",
    ip: "192.168.1.100",
    date: "Dec 12, 2024 10:45 AM",
    status: "success",
  },
];

export default function ActivityPage() {
  return (
    <>
      <SettingsHeader
        title="Activity Log"
        description="View your recent account activity and login history"
      />

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your account activity from the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLog.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={item.status === "warning" ? "destructive" : "secondary"}
                        className={item.status === "success" ? "bg-green-500/10 text-green-600" : ""}
                      >
                        {item.action}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.details}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {item.ip}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

