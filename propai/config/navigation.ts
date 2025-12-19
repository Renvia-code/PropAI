import {
  Home,
  MessageSquare,
  Phone,
  Bot,
  BookOpen,
  BarChart3,
  Plug,
  Target,
  Calendar,
  Building2,
  Link,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavSubmenuItem {
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: {
    type: "count" | "status";
    value?: string;
  };
  submenu: NavSubmenuItem[] | null;
}

export const navigationConfig: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/dashboard",
    submenu: null,
  },
  {
    id: "conversations",
    label: "Conversations",
    icon: MessageSquare,
    href: "/dashboard/conversations",
    badge: { type: "count", value: "unreadCount" },
    submenu: [
      { label: "All Conversations", href: "/dashboard/conversations" },
      { label: "Unassigned", href: "/dashboard/conversations?filter=unassigned" },
      { label: "My Conversations", href: "/dashboard/conversations?filter=mine" },
      { label: "Archived", href: "/dashboard/conversations/archived" },
    ],
  },
  {
    id: "voice",
    label: "Voice AI",
    icon: Phone,
    href: "/dashboard/voice",
    submenu: [
      { label: "Call Logs", href: "/dashboard/voice/logs" },
      { label: "Phone Numbers", href: "/dashboard/voice/numbers" },
      { label: "Outbound Campaigns", href: "/dashboard/voice/campaigns" },
      { label: "Voice Settings", href: "/dashboard/voice/settings" },
    ],
  },
  {
    id: "agent",
    label: "AI Agent",
    icon: Bot,
    href: "/dashboard/agent",
    submenu: [
      { label: "Agent Setup", href: "/dashboard/agent/setup" },
      { label: "Industry Templates", href: "/dashboard/agent/templates" },
      { label: "Custom Instructions", href: "/dashboard/agent/instructions" },
      { label: "Lead Forms", href: "/dashboard/agent/forms" },
      { label: "Test Agent", href: "/dashboard/agent/test" },
    ],
  },
  {
    id: "knowledge",
    label: "Knowledge Base",
    icon: BookOpen,
    href: "/dashboard/knowledge",
    submenu: [
      { label: "Files", href: "/dashboard/knowledge/files" },
      { label: "Database", href: "/dashboard/knowledge/database" },
      { label: "Website Crawler", href: "/dashboard/knowledge/crawler" },
      { label: "Q&A Pairs", href: "/dashboard/knowledge/qa" },
      { label: "Knowledge Stats", href: "/dashboard/knowledge/stats" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    submenu: [
      { label: "Overview", href: "/dashboard/analytics" },
      { label: "AI Performance", href: "/dashboard/analytics/ai" },
      { label: "Channel Insights", href: "/dashboard/analytics/channels" },
      { label: "Lead Analytics", href: "/dashboard/analytics/leads" },
      { label: "Team Performance", href: "/dashboard/analytics/team" },
    ],
  },
  {
    id: "channels",
    label: "Channels",
    icon: Plug,
    href: "/dashboard/channels",
    submenu: [
      { label: "All Channels", href: "/dashboard/channels" },
      { label: "WhatsApp", href: "/dashboard/channels/whatsapp" },
      { label: "Facebook", href: "/dashboard/channels/facebook" },
      { label: "Instagram", href: "/dashboard/channels/instagram" },
      { label: "Line", href: "/dashboard/channels/line" },
      { label: "SMS", href: "/dashboard/channels/sms" },
      { label: "Email", href: "/dashboard/channels/email" },
      { label: "Web Chat", href: "/dashboard/channels/webchat" },
    ],
  },
  {
    id: "leads",
    label: "Leads",
    icon: Target,
    href: "/dashboard/leads",
    badge: { type: "count", value: "newLeadsToday" },
    submenu: [
      { label: "All Leads", href: "/dashboard/leads" },
      { label: "Pipeline", href: "/dashboard/leads/pipeline" },
      { label: "Hot Leads", href: "/dashboard/leads?filter=hot" },
      { label: "Import/Export", href: "/dashboard/leads/import" },
    ],
  },
  {
    id: "siteVisits",
    label: "Site Visits",
    icon: Calendar,
    href: "/dashboard/site-visits",
    badge: { type: "count", value: "todayVisits" },
    submenu: [
      { label: "Calendar", href: "/dashboard/site-visits" },
      { label: "Upcoming", href: "/dashboard/site-visits/upcoming" },
      { label: "Completed", href: "/dashboard/site-visits/completed" },
      { label: "Booking Settings", href: "/dashboard/site-visits/settings" },
    ],
  },
  {
    id: "properties",
    label: "Properties",
    icon: Building2,
    href: "/dashboard/properties",
    submenu: [
      { label: "All Properties", href: "/dashboard/properties" },
      { label: "Projects", href: "/dashboard/properties/projects" },
      { label: "Units", href: "/dashboard/properties/units" },
      { label: "Import", href: "/dashboard/properties/import" },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Link,
    href: "/dashboard/integrations",
    submenu: [
      { label: "All Integrations", href: "/dashboard/integrations" },
      { label: "CRM", href: "/dashboard/integrations/crm" },
      { label: "Automation", href: "/dashboard/integrations/automation" },
      { label: "Webhooks", href: "/dashboard/integrations/webhooks" },
      { label: "API Keys", href: "/dashboard/integrations/api" },
    ],
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    href: "/dashboard/team",
    submenu: [
      { label: "Members", href: "/dashboard/team" },
      { label: "Roles & Permissions", href: "/dashboard/team/roles" },
      { label: "Working Hours", href: "/dashboard/team/hours" },
      { label: "Assignment Rules", href: "/dashboard/team/assignments" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    submenu: [
      { label: "Organization", href: "/dashboard/settings" },
      { label: "Branding", href: "/dashboard/settings/branding" },
      { label: "Notifications", href: "/dashboard/settings/notifications" },
      { label: "Billing", href: "/dashboard/settings/billing" },
      { label: "Security", href: "/dashboard/settings/security" },
    ],
  },
];

