import { formatDistanceToNow } from "date-fns";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Check, 
  CheckCheck,
  Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Conversation } from "@/lib/data/mock-data";

interface ConversationCardProps {
  conversation: Conversation;
  isActive?: boolean;
  onClick?: () => void;
}

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "whatsapp":
      return <MessageSquare className="h-3 w-3 text-green-500" />;
    case "instagram":
      return <Instagram className="h-3 w-3 text-pink-500" />;
    case "facebook":
      return <Facebook className="h-3 w-3 text-blue-600" />;
    case "email":
      return <Mail className="h-3 w-3 text-yellow-500" />;
    case "sms":
      return <Smartphone className="h-3 w-3 text-purple-500" />;
    default:
      return <MessageSquare className="h-3 w-3" />;
  }
};

export function ConversationCard({ conversation, isActive, onClick }: ConversationCardProps) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const isUnread = conversation.unreadCount > 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col gap-2 rounded-lg p-3 text-sm transition-all hover:bg-accent/50 cursor-pointer border border-transparent",
        isActive && "bg-accent border-border shadow-sm"
      )}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{conversation.lead.name}</div>
            {isUnread && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true })}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground line-clamp-1 flex-1">
            {lastMessage.content}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
        <div className="flex items-center gap-1 bg-background/50 px-1.5 py-0.5 rounded-full border">
            {getChannelIcon(conversation.channel)}
            <span className="capitalize">{conversation.channel}</span>
        </div>
        
        {conversation.isAiHandled && (
          <Badge variant="outline" className="h-5 px-1.5 gap-1 text-[10px] font-normal border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            AI Handling
          </Badge>
        )}
        
        {conversation.sentiment === 'positive' && (
             <span className="text-green-500 text-[10px] ml-auto">😊 High Intent</span>
        )}
        {conversation.sentiment === 'negative' && (
             <span className="text-red-500 text-[10px] ml-auto">😟 At Risk</span>
        )}
      </div>
    </div>
  );
}

