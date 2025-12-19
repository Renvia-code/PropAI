"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, MessageSquare, Phone, Mail } from "lucide-react";
import { mockLeads, Lead } from "@/lib/data/mock-data";
import { useRouter } from "next/navigation";

export function LeadListView() {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/leads/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'contacted': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'site-visit': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'negotiation': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      case 'won': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'lost': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockLeads.map((lead) => (
            <TableRow 
              key={lead.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleRowClick(lead.id)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={lead.avatar} />
                    <AvatarFallback>{lead.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{lead.name}</span>
                    <span className="text-xs text-muted-foreground">{lead.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={`border-0 font-normal ${getStatusColor(lead.status)}`}>
                  {lead.status.replace('-', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 font-medium">
                  {lead.leadScore >= 80 && <span className="text-sm">🔥</span>}
                  <span className={lead.leadScore >= 80 ? "text-green-600" : "text-muted-foreground"}>
                    {lead.leadScore}
                  </span>
                </div>
              </TableCell>
              <TableCell className="capitalize text-muted-foreground">
                {lead.source}
              </TableCell>
               <TableCell className="max-w-[150px] truncate text-muted-foreground">
                {lead.propertyInterest}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {lead.lastActive}
              </TableCell>
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                       <MessageSquare className="mr-2 h-4 w-4" /> Message
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                       <Phone className="mr-2 h-4 w-4" /> Call
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                       <Mail className="mr-2 h-4 w-4" /> Email
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

