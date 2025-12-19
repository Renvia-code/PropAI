import {
  Home,
  MessageSquare,
  Users,
  Bot,
  BarChart3,
  Plug,
  Settings,
  Inbox,
  UserX,
  User,
  Phone,
  Archive,
  LayoutGrid,
  GitBranch,
  Calendar,
  Building2,
  Upload,
  Sparkles,
  FileText,
  MessageCircle,
  TrendingUp,
  UsersRound,
  Zap,
  Building,
  UserCog,
  Shield,
  Bell,
  CreditCard,
  Lock,
  Globe,
  Webhook,
  Key,
  type LucideIcon,
} from "lucide-react";

export interface NavSubmenuItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  // For brand icons (WhatsApp, Instagram, etc.) - use custom component
  brandIcon?: "whatsapp" | "instagram" | "facebook" | "line" | "webchat";
}

export interface NavSubmenuGroup {
  label: string;
  items: NavSubmenuItem[];
  defaultOpen?: boolean;
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
  // Can be flat items or grouped items
  submenu: NavSubmenuItem[] | null;
  submenuGroups?: NavSubmenuGroup[] | null;
  position?: "top" | "bottom";
}

/**
 * Navigation Structure - Award-Winning Design (2025)
 */

export const navigationConfig: NavItem[] = [
  // ═══════════════════════════════════════════════════════════════
  // 1. HOME
  // ═══════════════════════════════════════════════════════════════
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/dashboard",
    submenu: null,
    position: "top",
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. INBOX - Communication Hub
  // ═══════════════════════════════════════════════════════════════
  {
    id: "inbox",
    label: "Inbox",
    icon: MessageSquare,
    href: "/dashboard/conversations",
    badge: { type: "count", value: "unreadCount" },
    submenu: [
      { label: "All Conversations", href: "/dashboard/conversations", icon: Inbox },
      { label: "Unassigned", href: "/dashboard/conversations?filter=unassigned", icon: UserX },
      { label: "My Conversations", href: "/dashboard/conversations?filter=mine", icon: User },
      { label: "Voice Calls", href: "/dashboard/voice", icon: Phone },
      { label: "Archived", href: "/dashboard/conversations/archived", icon: Archive },
    ],
    position: "top",
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. LEADS - CRM Hub
  // ═══════════════════════════════════════════════════════════════
  {
    id: "leads",
    label: "Leads",
    icon: Users,
    href: "/dashboard/leads",
    badge: { type: "count", value: "newLeadsToday" },
    submenu: [
      { label: "All Leads", href: "/dashboard/leads", icon: LayoutGrid },
      { label: "Pipeline", href: "/dashboard/leads/pipeline", icon: GitBranch },
      { label: "Site Visits", href: "/dashboard/site-visits", icon: Calendar },
      { label: "Properties", href: "/dashboard/properties", icon: Building2 },
      { label: "Import / Export", href: "/dashboard/leads/import", icon: Upload },
    ],
    position: "top",
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. AI AGENT
  // ═══════════════════════════════════════════════════════════════
  {
    id: "agent",
    label: "AI Agent",
    icon: Bot,
    href: "/dashboard/agent",
    submenu: [
      { label: "Overview", href: "/dashboard/agent", icon: Sparkles },
      { label: "Configuration", href: "/dashboard/agent/setup", icon: Settings },
      { label: "Knowledge Base", href: "/dashboard/knowledge", icon: FileText },
      { label: "Upload Files", href: "/dashboard/knowledge/files", icon: Upload },
      { label: "Test Agent", href: "/dashboard/agent/test", icon: MessageCircle },
    ],
    position: "top",
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. ANALYTICS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    submenu: [
      { label: "Overview", href: "/dashboard/analytics", icon: LayoutGrid },
      { label: "AI Performance", href: "/dashboard/analytics/ai", icon: Bot },
      { label: "Lead Analytics", href: "/dashboard/analytics/leads", icon: TrendingUp },
      { label: "Channel Insights", href: "/dashboard/analytics/channels", icon: BarChart3 },
      { label: "Team Performance", href: "/dashboard/analytics/team", icon: UsersRound },
    ],
    position: "top",
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. CHANNELS - With Brand Icons
  // ═══════════════════════════════════════════════════════════════
  {
    id: "channels",
    label: "Channels",
    icon: Plug,
    href: "/dashboard/channels",
    submenu: null,
    submenuGroups: [
      {
        label: "Messaging",
        defaultOpen: true,
        items: [
          { label: "All Channels", href: "/dashboard/channels", icon: LayoutGrid },
          { label: "WhatsApp", href: "/dashboard/channels/whatsapp", brandIcon: "whatsapp" },
          { label: "Instagram", href: "/dashboard/channels/instagram", brandIcon: "instagram" },
          { label: "Facebook", href: "/dashboard/channels/facebook", brandIcon: "facebook" },
          { label: "Line", href: "/dashboard/channels/line", brandIcon: "line" },
          { label: "Web Chat", href: "/dashboard/channels/webchat", brandIcon: "webchat" },
        ],
      },
      {
        label: "Integrations",
        defaultOpen: false,
        items: [
          { label: "All Integrations", href: "/dashboard/integrations", icon: Zap },
          { label: "CRM", href: "/dashboard/integrations/crm", icon: Building },
          { label: "Webhooks", href: "/dashboard/integrations/webhooks", icon: Webhook },
          { label: "API Keys", href: "/dashboard/integrations/api", icon: Key },
        ],
      },
    ],
    position: "top",
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. SETTINGS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    submenu: null,
    submenuGroups: [
      {
        label: "Organization",
        defaultOpen: true,
        items: [
          { label: "General", href: "/dashboard/settings", icon: Building },
          { label: "Notifications", href: "/dashboard/settings/notifications", icon: Bell },
          { label: "Billing", href: "/dashboard/settings/billing", icon: CreditCard },
        ],
      },
      {
        label: "Team",
        defaultOpen: false,
        items: [
          { label: "Members", href: "/dashboard/team", icon: UsersRound },
          { label: "Roles & Permissions", href: "/dashboard/team/roles", icon: UserCog },
        ],
      },
      {
        label: "Security",
        defaultOpen: false,
        items: [
          { label: "Security Settings", href: "/dashboard/settings/security", icon: Lock },
        ],
      },
    ],
    position: "bottom",
  },
];

export const navBadgeCounts = {
  unreadCount: 5,
  newLeadsToday: 12,
  todayVisits: 3,
};
