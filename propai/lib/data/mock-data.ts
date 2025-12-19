import { MessageSquare, Phone, Mail, Instagram, Facebook } from "lucide-react";

export type ChannelType = "whatsapp" | "sms" | "email" | "instagram" | "facebook";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "lead" | "ai";
  timestamp: string;
  isRead: boolean;
}

export interface Lead {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  email: string;
  source: ChannelType;
  status: "new" | "contacted" | "site-visit" | "negotiation" | "won" | "lost";
  leadScore: number;
  lastActive: string;
  tags: string[];
  assignedTo?: string;
  budget?: string;
  propertyInterest?: string;
  location?: string;
}

export interface Conversation {
  id: string;
  leadId: string;
  lead: Lead;
  messages: Message[];
  lastMessageAt: string;
  unreadCount: number;
  channel: ChannelType;
  status: "open" | "resolved" | "snoozed";
  isAiHandled: boolean;
  sentiment: "positive" | "neutral" | "negative";
}

export const mockLeads: Lead[] = [
  {
    id: "l1",
    name: "Aarav Patel",
    email: "aarav.p@example.com",
    phone: "+91 98765 43210",
    source: "whatsapp",
    status: "new",
    leadScore: 85,
    lastActive: "2m ago",
    tags: ["High Budget", "3BHK", "Gurgaon"],
    budget: "₹1.5 Cr - ₹2.0 Cr",
    propertyInterest: "Cyber City Heights",
    location: "Gurgaon, Sector 42",
  },
  {
    id: "l2",
    name: "Sarah Williams",
    email: "sarah.w@gmail.com",
    phone: "+1 555 123 4567",
    source: "instagram",
    status: "contacted",
    leadScore: 65,
    lastActive: "1h ago",
    tags: ["Investor", "Bangkok"],
    budget: "$250,000",
    propertyInterest: "Sukhumvit Condo",
    location: "Bangkok, Thailand",
  },
  {
    id: "l3",
    name: "Rajesh Kumar",
    email: "rajesh.k@yahoo.com",
    phone: "+91 88888 99999",
    source: "facebook",
    status: "site-visit",
    leadScore: 92,
    lastActive: "1d ago",
    tags: ["Ready to Move", "Family"],
    budget: "₹85 Lakhs",
    propertyInterest: "Green Valley Phase 2",
    location: "Noida Extension",
  },
  {
    id: "l4",
    name: "Priya Sharma",
    email: "priya.s@outlook.com",
    phone: "+91 77777 66666",
    source: "email",
    status: "negotiation",
    leadScore: 78,
    lastActive: "3d ago",
    tags: ["First Time Buyer"],
    budget: "₹60 Lakhs",
    propertyInterest: "Sunrise Apartments",
    location: "Pune",
  },
  {
    id: "l5",
    name: "Michael Chen",
    email: "m.chen@tech.co",
    phone: "+66 81 234 5678",
    source: "sms",
    status: "new",
    leadScore: 45,
    lastActive: "5m ago",
    tags: ["Inquiry"],
    budget: "Undecided",
    propertyInterest: "General Inquiry",
    location: "Bangkok",
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    leadId: "l1",
    lead: mockLeads[0],
    channel: "whatsapp",
    status: "open",
    isAiHandled: true,
    sentiment: "positive",
    unreadCount: 2,
    lastMessageAt: "2024-03-10T10:30:00Z",
    messages: [
      {
        id: "m1",
        content: "Hi, I saw the listing for Cyber City Heights. Is the 3BHK still available?",
        sender: "lead",
        timestamp: "2024-03-10T10:28:00Z",
        isRead: true,
      },
      {
        id: "m2",
        content: "Hello Aarav! Yes, we have two 3BHK units available in Tower B. Would you like to see the floor plan?",
        sender: "ai",
        timestamp: "2024-03-10T10:28:05Z",
        isRead: true,
      },
      {
        id: "m3",
        content: "Yes please. Also what is the current price?",
        sender: "lead",
        timestamp: "2024-03-10T10:30:00Z",
        isRead: false,
      },
    ],
  },
  {
    id: "c2",
    leadId: "l2",
    lead: mockLeads[1],
    channel: "instagram",
    status: "open",
    isAiHandled: false,
    sentiment: "neutral",
    unreadCount: 0,
    lastMessageAt: "2024-03-10T09:15:00Z",
    messages: [
      {
        id: "m1",
        content: "Do you have any units with a pool view?",
        sender: "lead",
        timestamp: "2024-03-10T09:10:00Z",
        isRead: true,
      },
      {
        id: "m2",
        content: "Hi Sarah, yes we do! Check out this video tour.",
        sender: "user",
        timestamp: "2024-03-10T09:15:00Z",
        isRead: true,
      },
    ],
  },
  {
    id: "c3",
    leadId: "l3",
    lead: mockLeads[2],
    channel: "facebook",
    status: "resolved",
    isAiHandled: true,
    sentiment: "positive",
    unreadCount: 0,
    lastMessageAt: "2024-03-09T14:20:00Z",
    messages: [
      {
        id: "m1",
        content: "Is the site visit confirmed for tomorrow?",
        sender: "lead",
        timestamp: "2024-03-09T14:15:00Z",
        isRead: true,
      },
      {
        id: "m2",
        content: "Yes Rajesh, your visit is confirmed for 11 AM tomorrow. See you there!",
        sender: "ai",
        timestamp: "2024-03-09T14:20:00Z",
        isRead: true,
      },
    ],
  },
  {
    id: "c4",
    leadId: "l4",
    lead: mockLeads[3],
    channel: "email",
    status: "open",
    isAiHandled: false,
    sentiment: "negative",
    unreadCount: 1,
    lastMessageAt: "2024-03-08T11:00:00Z",
    messages: [
      {
        id: "m1",
        content: "I haven't received the documents yet.",
        sender: "lead",
        timestamp: "2024-03-08T11:00:00Z",
        isRead: false,
      },
    ],
  },
  {
    id: "c5",
    leadId: "l5",
    lead: mockLeads[4],
    channel: "sms",
    status: "snoozed",
    isAiHandled: true,
    sentiment: "neutral",
    unreadCount: 0,
    lastMessageAt: "2024-03-10T10:45:00Z",
    messages: [
      {
        id: "m1",
        content: "Call me back later.",
        sender: "lead",
        timestamp: "2024-03-10T10:45:00Z",
        isRead: true,
      },
    ],
  },
];

