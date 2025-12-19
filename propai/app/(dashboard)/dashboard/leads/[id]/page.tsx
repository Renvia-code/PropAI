import { use } from "react";

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-semibold">Lead {id}</h1>
      <p className="text-muted-foreground mt-2">Lead detail coming soon...</p>
    </div>
  );
}
