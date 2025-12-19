"use client";

import { ConversationList } from "@/components/conversations/conversation-list";
import { MessageSquare } from "lucide-react";

export default function ConversationsPage() {
  return (
    <div className="flex h-full w-full">
      {/* Mobile: Show List */}
      <div className="flex-1 md:hidden h-full">
        <ConversationList isMobile />
      </div>

      {/* Desktop: Show Empty State */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center text-center p-8 text-muted-foreground bg-muted/10 h-full">
        <div className="bg-muted/30 p-6 rounded-full mb-4 ring-1 ring-border/50 shadow-sm">
           <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-medium text-foreground">Select a conversation</h3>
        <p className="text-sm max-w-xs mt-2 text-muted-foreground/80">
          Choose a conversation from the sidebar to start chatting or view lead details.
        </p>
      </div>
    </div>
  );
}
