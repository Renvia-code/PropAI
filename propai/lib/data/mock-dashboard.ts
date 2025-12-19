export interface DashboardStats {
  newLeads: number;
  newLeadsTrend: number;
  openConversations: number;
  openConversationsTrend: number;
  todayVisits: number;
  pipelineValue: string;
  pipelineTrend: number;
}

export interface ActivityItem {
  id: string;
  type: "message" | "visit" | "lead" | "ai" | "call";
  title: string;
  description: string;
  time: string;
  leadName?: string;
}

export interface HotLead {
  id: string;
  name: string;
  score: number;
  interest: string;
  lastActive: string;
}

export interface AIAgentStats {
  status: "active" | "paused";
  handledToday: number;
  handledThisWeek: number;
  handoffRate: number;
  avgRating: number;
  totalRatings: number;
  avgResponseTime: string;
  resolutionRate: number;
}

export interface KnowledgeSource {
  id: string;
  type: "files" | "database" | "website" | "qa";
  name: string;
  count: number;
  status: "trained" | "syncing" | "crawling" | "pending" | "error";
  lastUpdated: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: "pdf" | "xlsx" | "docx" | "txt" | "csv";
  size: string;
  status: "trained" | "training" | "pending" | "failed";
  uploadedAt: string;
}

export interface SiteVisit {
  id: string;
  leadName: string;
  leadId: string;
  propertyName: string;
  propertyId: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled" | "no-show";
  assignedTo: string;
}

export const mockDashboardStats: DashboardStats = {
  newLeads: 45,
  newLeadsTrend: 12,
  openConversations: 23,
  openConversationsTrend: -5,
  todayVisits: 8,
  pipelineValue: "₹12.5 Cr",
  pipelineTrend: 8,
};

export const mockActivityFeed: ActivityItem[] = [
  { id: "a1", type: "message", title: "New message received", description: "Aarav Patel sent a message on WhatsApp", time: "2m ago", leadName: "Aarav Patel" },
  { id: "a2", type: "visit", title: "Site visit booked", description: "Rajesh Kumar booked a visit for tomorrow", time: "15m ago", leadName: "Rajesh Kumar" },
  { id: "a3", type: "ai", title: "AI qualified lead", description: "Sarah Williams marked as high intent", time: "30m ago", leadName: "Sarah Williams" },
  { id: "a4", type: "lead", title: "New lead captured", description: "New inquiry from Facebook Ads", time: "1h ago" },
  { id: "a5", type: "call", title: "Call completed", description: "5 min call with Priya Sharma", time: "2h ago", leadName: "Priya Sharma" },
];

export const mockHotLeads: HotLead[] = [
  { id: "l1", name: "Rajesh Kumar", score: 92, interest: "3BHK in Gurgaon", lastActive: "5m ago" },
  { id: "l2", name: "Priya Sharma", score: 88, interest: "Ready to book visit", lastActive: "1h ago" },
  { id: "l3", name: "Aarav Patel", score: 85, interest: "Cyber City Heights", lastActive: "2m ago" },
  { id: "l4", name: "Sarah Williams", score: 78, interest: "Investment property", lastActive: "3h ago" },
];

export const mockAIAgentStats: AIAgentStats = {
  status: "active",
  handledToday: 156,
  handledThisWeek: 1234,
  handoffRate: 7.2,
  avgRating: 4.8,
  totalRatings: 156,
  avgResponseTime: "3s",
  resolutionRate: 89,
};

export const mockKnowledgeSources: KnowledgeSource[] = [
  { id: "ks1", type: "files", name: "Files", count: 12, status: "trained", lastUpdated: "2h ago" },
  { id: "ks2", type: "database", name: "Property Database", count: 156, status: "syncing", lastUpdated: "5m ago" },
  { id: "ks3", type: "website", name: "Website Pages", count: 3, status: "crawling", lastUpdated: "1d ago" },
  { id: "ks4", type: "qa", name: "Q&A Pairs", count: 45, status: "trained", lastUpdated: "3h ago" },
];

export const mockUploadedFiles: UploadedFile[] = [
  { id: "f1", name: "Cyber City Brochure.pdf", type: "pdf", size: "4.2 MB", status: "trained", uploadedAt: "2h ago" },
  { id: "f2", name: "Price List Q4 2025.xlsx", type: "xlsx", size: "1.1 MB", status: "trained", uploadedAt: "1d ago" },
  { id: "f3", name: "Amenities List.pdf", type: "pdf", size: "2.3 MB", status: "training", uploadedAt: "30m ago" },
  { id: "f4", name: "Floor Plans Tower B.pdf", type: "pdf", size: "8.7 MB", status: "trained", uploadedAt: "2d ago" },
  { id: "f5", name: "FAQ Document.docx", type: "docx", size: "156 KB", status: "trained", uploadedAt: "3d ago" },
  { id: "f6", name: "Payment Plans.xlsx", type: "xlsx", size: "890 KB", status: "pending", uploadedAt: "5m ago" },
];

export const mockSiteVisits: SiteVisit[] = [
  { id: "sv1", leadName: "Aarav Patel", leadId: "l1", propertyName: "Cyber City Heights", propertyId: "p1", date: "2025-12-20", time: "10:00 AM", status: "pending", assignedTo: "Rahul" },
  { id: "sv2", leadName: "Rajesh Kumar", leadId: "l3", propertyName: "Green Valley Villa", propertyId: "p2", date: "2025-12-20", time: "2:30 PM", status: "confirmed", assignedTo: "Rahul" },
  { id: "sv3", leadName: "Sarah Williams", leadId: "l2", propertyName: "Sunrise Enclave", propertyId: "p3", date: "2025-12-20", time: "5:00 PM", status: "pending", assignedTo: "Priya" },
  { id: "sv4", leadName: "Priya Sharma", leadId: "l4", propertyName: "Tower B-304", propertyId: "p1", date: "2025-12-21", time: "11:00 AM", status: "pending", assignedTo: "Rahul" },
  { id: "sv5", leadName: "Michael Chen", leadId: "l5", propertyName: "Villa #12", propertyId: "p2", date: "2025-12-22", time: "3:00 PM", status: "confirmed", assignedTo: "Priya" },
];

