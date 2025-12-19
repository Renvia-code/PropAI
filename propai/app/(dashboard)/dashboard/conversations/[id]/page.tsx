"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { mockConversations } from "@/lib/data/mock-data";
import { ChatInterface } from "@/components/conversations/chat-interface";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ConversationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const conversation = React.useMemo(() => {
    return mockConversations.find(c => c.id === id);
  }, [id]);

  if (!conversation) {
    return (
       <div className="flex flex-col items-center justify-center h-full gap-4">
          <p className="text-muted-foreground">Conversation not found</p>
          <Button variant="outline" onClick={() => router.push('/dashboard/conversations')}>
             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inbox
          </Button>
       </div>
    );
  }

  return <ChatInterface conversation={conversation} />;
}
