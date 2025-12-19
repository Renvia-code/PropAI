"use client";

import { CreditCard, Download, Zap } from "lucide-react";

import { SettingsHeader } from "@/components/layout/settings-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  { id: "INV-001", date: "Dec 1, 2024", amount: "$299.00", status: "Paid" },
  { id: "INV-002", date: "Nov 1, 2024", amount: "$299.00", status: "Paid" },
  { id: "INV-003", date: "Oct 1, 2024", amount: "$299.00", status: "Paid" },
  { id: "INV-004", date: "Sep 1, 2024", amount: "$299.00", status: "Paid" },
];

export default function BillingSettingsPage() {
  return (
    <>
      <SettingsHeader
        title="Billing"
        description="Manage your subscription and payment methods"
      />

      {/* Current Plan */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-propai-accent" />
                Pro Plan
              </CardTitle>
              <CardDescription>
                Your current subscription plan
              </CardDescription>
            </div>
            <Badge className="bg-propai-accent text-white">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold">$299</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground mb-4">
            <li>✓ Unlimited conversations</li>
            <li>✓ 10 team members</li>
            <li>✓ All AI features</li>
            <li>✓ Priority support</li>
          </ul>
          <div className="flex gap-3">
            <Button variant="outline">Change Plan</Button>
            <Button variant="ghost" className="text-destructive">Cancel Subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
          <CardDescription>
            Your usage statistics for December 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-muted-foreground">Conversations</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className="text-2xl font-bold">8/10</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className="text-2xl font-bold">45.2k</div>
              <div className="text-sm text-muted-foreground">AI Messages</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Manage your payment information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <CreditCard className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/2026</p>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>
            Download your past invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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
