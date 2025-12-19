export interface Property {
  id: string;
  title: string;
  project: string;
  price: string;
  pricePerSqft: string;
  type: "apartment" | "villa" | "plot";
  status: "available" | "reserved" | "sold";
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  location: string;
  coordinates: [number, number];
  description: string;
  amenities: string[];
  images: string[];
  virtualTourUrl?: string;
  leadsCount: number;
  leadMatchScore: number;
  rating: number;
  reraId: string;
  possessionDate: string;
  builder: string;
}

export const mockProperties: Property[] = [
  {
    id: "p1",
    title: "Luxury 3BHK Apartment",
    project: "Cyber City Heights",
    price: "₹1.85 Cr",
    pricePerSqft: "₹10,000/sqft",
    type: "apartment",
    status: "available",
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    location: "Gurgaon, Sector 42",
    coordinates: [28.4595, 77.0266],
    description: "Premium 3BHK apartment in the heart of Cyber City with stunning views of the golf course. Modern fittings, Italian marble flooring, and modular kitchen.",
    amenities: ["Swimming Pool", "Gym", "Parking", "Security", "Club House", "Power Backup"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
    ],
    virtualTourUrl: "https://example.com/tour",
    leadsCount: 12,
    leadMatchScore: 95,
    rating: 4.8,
    reraId: "PRJ123456789",
    possessionDate: "Dec 2025",
    builder: "ABC Developers"
  },
  {
    id: "p2",
    title: "Premium 4BHK Villa",
    project: "Green Valley",
    price: "₹4.20 Cr",
    pricePerSqft: "₹13,125/sqft",
    type: "villa",
    status: "reserved",
    bedrooms: 4,
    bathrooms: 5,
    area: 3200,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
    location: "Noida Extension",
    coordinates: [28.5355, 77.3910],
    description: "Spacious 4BHK villa with private garden and terrace. Located in a gated community with top-tier security.",
    amenities: ["Private Garden", "Terrace", "Servant Room", "Home Theater", "Smart Home"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
    ],
    leadsCount: 5,
    leadMatchScore: 88,
    rating: 4.9,
    reraId: "PRJ987654321",
    possessionDate: "Ready to Move",
    builder: "XYZ Group"
  },
  {
    id: "p3",
    title: "Residential Plot",
    project: "Sunrise Enclave",
    price: "₹95 Lakhs",
    pricePerSqft: "₹47,500/sqyrd",
    type: "plot",
    status: "sold",
    bedrooms: 0,
    bathrooms: 0,
    area: 1800, // 200 sq yards
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80",
    location: "Pune, Hinjewadi",
    coordinates: [18.5913, 73.7389],
    description: "Corner plot in a developing residential area. Excellent investment opportunity with high appreciation potential.",
    amenities: ["Park", "Water Supply", "Electricity", "Wide Roads"],
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80"
    ],
    leadsCount: 28,
    leadMatchScore: 72,
    rating: 4.5,
    reraId: "PRJ456123789",
    possessionDate: "Immediate",
    builder: "Sunrise Builders"
  }
];

export interface Channel {
  id: string;
  type: "whatsapp" | "instagram" | "facebook" | "email" | "sms" | "line" | "webchat";
  name: string;
  identifier: string; // phone number, handle, or email
  status: "connected" | "limited" | "disconnected";
  messagesToday: number;
  responseTime: string; // e.g. "2m"
  quality: number; // 0-5 stars
}

export const mockChannels: Channel[] = [
  {
    id: "ch1",
    type: "whatsapp",
    name: "WhatsApp Business API",
    identifier: "+91 98765 43210",
    status: "connected",
    messagesToday: 156,
    responseTime: "2m",
    quality: 5
  },
  {
    id: "ch2",
    type: "instagram",
    name: "Instagram Direct",
    identifier: "@propai_realestate",
    status: "connected",
    messagesToday: 23,
    responseTime: "5m",
    quality: 4
  },
  {
    id: "ch3",
    type: "facebook",
    name: "Facebook Messenger",
    identifier: "PropAI Page",
    status: "connected",
    messagesToday: 45,
    responseTime: "8m",
    quality: 4
  },
  {
    id: "ch4",
    type: "email",
    name: "Support Email",
    identifier: "support@propai.com",
    status: "limited",
    messagesToday: 12,
    responseTime: "2h",
    quality: 3
  }
];

export interface WhatsAppTemplate {
  id: string;
  name: string;
  content: string;
  status: "approved" | "pending" | "rejected";
  language: string;
  category: "marketing" | "utility" | "authentication";
}

export const mockTemplates: WhatsAppTemplate[] = [
  {
    id: "t1",
    name: "welcome_message",
    content: "Hello {{1}}! Thank you for your interest in {{2}}. How can we help you today?",
    status: "approved",
    language: "en_US",
    category: "marketing"
  },
  {
    id: "t2",
    name: "site_visit_reminder",
    content: "Hi {{1}}, your site visit is confirmed for {{2}} at {{3}}. Please reply 'Y' to confirm.",
    status: "approved",
    language: "en_US",
    category: "utility"
  },
  {
    id: "t3",
    name: "price_drop_alert",
    content: "Great news {{1}}! The price for {{2}} has dropped to {{3}}. Book a visit now!",
    status: "pending",
    language: "en_US",
    category: "marketing"
  }
];

