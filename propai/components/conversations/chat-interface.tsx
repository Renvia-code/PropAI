"use client";

import * as React from "react";
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video,
  Bot,
  Sparkles,
  Check,
  CheckCheck,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Conversation, Message } from "@/lib/data/mock-data";
import { ChatContextPanel } from "./chat-context-panel";

interface ChatInterfaceProps {
  conversation: Conversation;
}

export function ChatInterface({ conversation }: ChatInterfaceProps) {
  const [input, setInput] = React.useState("");
  const [showContextPanel, setShowContextPanel] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Handle send logic
    setInput("");
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b p-3 h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={conversation.lead.avatar} />
              <AvatarFallback>{conversation.lead.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="font-semibold text-sm flex items-center gap-2">
                {conversation.lead.name}
                <span className="flex items-center text-[10px] font-normal text-muted-foreground bg-muted px-1.5 rounded-full capitalize">
                  {conversation.channel}
                </span>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                 {conversation.isAiHandled && (
                    <span className="text-blue-500 flex items-center gap-0.5">
                        <Sparkles className="h-2.5 w-2.5" /> AI Active
                    </span>
                 )}
                 {!conversation.isAiHandled && (
                    <span className="text-green-500">Online</span>
                 )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
             <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                   </Button>
                </TooltipTrigger>
                <TooltipContent>Call Lead</TooltipContent>
              </Tooltip>
             </TooltipProvider>

             <Button 
               variant="ghost" 
               size="icon" 
               className="h-8 w-8 text-muted-foreground md:hidden"
               onClick={() => setShowContextPanel(!showContextPanel)}
             >
                {showContextPanel ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
             </Button>

             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Lead Details</DropdownMenuItem>
                <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Block Contact</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-muted/5 space-y-4" ref={scrollRef}>
          {conversation.messages.map((msg, index) => {
            const isMe = msg.sender === 'user' || msg.sender === 'ai';
            const isAi = msg.sender === 'ai';
            const showAvatar = index === 0 || conversation.messages[index - 1].sender !== msg.sender;
            
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex w-full gap-2 max-w-[80%]",
                  isMe ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn("flex-shrink-0 w-8", !showAvatar && "opacity-0")}>
                   {isMe ? (
                     isAi ? (
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                           <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                     ) : (
                        <Avatar className="h-8 w-8">
                           <AvatarFallback className="bg-primary text-primary-foreground text-xs">YO</AvatarFallback>
                        </Avatar>
                     )
                   ) : (
                     <Avatar className="h-8 w-8">
                        <AvatarFallback>{conversation.lead.name.substring(0, 2)}</AvatarFallback>
                     </Avatar>
                   )}
                </div>
                
                <div className={cn("flex flex-col gap-1", isMe ? "items-end" : "items-start")}>
                   <div className="flex items-end gap-2">
                       {isMe && isAi && (
                           <span className="text-[10px] text-blue-500 font-medium px-1 flex items-center gap-0.5">
                               <Sparkles className="h-2 w-2" /> AI
                           </span>
                       )}
                       <div 
                         className={cn(
                           "px-4 py-2 rounded-2xl text-sm shadow-sm",
                           isMe 
                             ? isAi 
                               ? "bg-blue-50 dark:bg-blue-950/40 text-foreground border border-blue-100 dark:border-blue-900 rounded-tr-sm" 
                               : "bg-primary text-primary-foreground rounded-tr-sm"
                             : "bg-background border rounded-tl-sm"
                         )}
                       >
                         {msg.content}
                       </div>
                   </div>
                   <div className="flex items-center gap-1 px-1">
                      <span className="text-[10px] text-muted-foreground">
                        {format(new Date(msg.timestamp), 'h:mm a')}
                      </span>
                      {isMe && (
                         msg.isRead ? <CheckCheck className="h-3 w-3 text-blue-500" /> : <Check className="h-3 w-3 text-muted-foreground" />
                      )}
                   </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Input Area */}
        <div className="p-4 bg-background border-t">
           {conversation.isAiHandled && (
               <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/30 px-3 py-2 rounded-lg mb-3 border border-blue-100 dark:border-blue-900/50">
                   <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-400">
                       <Sparkles className="h-3 w-3" />
                       <span>AI is handling this conversation</span>
                   </div>
                   <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-700 dark:text-blue-400 hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900/50">
                       Take Over
                   </Button>
               </div>
           )}
           
           <form onSubmit={handleSendMessage} className="flex items-end gap-2">
              <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground shrink-0">
                  <Paperclip className="h-5 w-5" />
              </Button>
              <div className="relative flex-1">
                 <Input 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder="Type a message..."
                   className="min-h-[40px] pr-10 resize-none py-2"
                 />
                 <Button 
                   type="button" 
                   variant="ghost" 
                   size="icon" 
                   className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
                 >
                    <Smile className="h-4 w-4" />
                 </Button>
              </div>
              <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
              </Button>
           </form>
        </div>
      </div>
      
      {/* Context Panel (Desktop) */}
      <div className={cn(
        "hidden md:flex w-80 transition-all duration-300 ease-in-out border-l",
        showContextPanel ? "mr-0" : "-mr-80"
      )}>
         <ChatContextPanel lead={conversation.lead} />
      </div>
    </div>
  );
}

