import { ConversationList } from "@/components/conversations/conversation-list";

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-80 border-r flex-col h-full bg-background/50 backdrop-blur-sm">
        <ConversationList />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {children}
      </main>
    </div>
  );
}

