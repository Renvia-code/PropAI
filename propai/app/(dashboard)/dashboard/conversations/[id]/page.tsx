import { use } from "react";

export default function ConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-semibold">Conversation {id}</h1>
      <p className="text-muted-foreground mt-2">Conversation detail coming soon...</p>
    </div>
  );
}
