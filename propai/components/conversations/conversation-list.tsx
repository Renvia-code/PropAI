"use client";

import * as React from "react";
import { Search, Filter, ArrowUpDown, MessageSquare } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockConversations } from "@/lib/data/mock-data";
import { ConversationCard } from "@/components/conversations/conversation-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ConversationListProps {
  isMobile?: boolean;
}

export function ConversationList({ isMobile }: ConversationListProps) {
  const router = useRouter();
  const params = useParams();
  const currentConversationId = params?.id as string;
  const [activeTab, setActiveTab] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [channelFilter, setChannelFilter] = React.useState<string | null>(null);

  const filteredConversations = React.useMemo(() => {
    return mockConversations.filter((conv) => {
      // Filter by Tab
      if (activeTab === "unread" && conv.unreadCount === 0) return false;
      if (activeTab === "ai" && !conv.isAiHandled) return false;
      
      // Filter by Channel
      if (channelFilter && conv.channel !== channelFilter) return false;

      // Filter by Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          conv.lead.name.toLowerCase().includes(query) ||
          conv.messages.some((m) => m.content.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [activeTab, searchQuery, channelFilter]);

  const handleConversationClick = (id: string) => {
    router.push(`/dashboard/conversations/${id}`);
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex flex-col gap-4 p-4 pb-2 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Inbox</h1>
          <div className="flex items-center gap-1">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Channel</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setChannelFilter(null)}>
                  All Channels
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChannelFilter("whatsapp")}>
                  WhatsApp
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setChannelFilter("instagram")}>
                  Instagram
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setChannelFilter("facebook")}>
                  Facebook
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setChannelFilter("sms")}>
                  SMS
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setChannelFilter("email")}>
                  Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 bg-muted/50 p-1 h-9">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
            <TabsTrigger value="ai" className="text-xs">AI</TabsTrigger>
            <TabsTrigger value="archived" className="text-xs text-muted-foreground/60">Archived</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <MessageSquare className="h-10 w-10 mb-2 opacity-20" />
              <p className="text-sm">No conversations found</p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <ConversationCard
                key={conv.id}
                conversation={conv}
                isActive={currentConversationId === conv.id}
                onClick={() => handleConversationClick(conv.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

