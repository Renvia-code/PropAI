"use client";

import * as React from "react";
import { Plus, List, Kanban, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadListView } from "@/components/leads/lead-list-view";
import { LeadPipelineView } from "@/components/leads/lead-pipeline-view";

export default function LeadsPage() {
  const [view, setView] = React.useState<"list" | "pipeline">("list");

  return (
    <div className="flex flex-col h-full gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-semibold">Leads</h1>
           <p className="text-muted-foreground text-sm">Manage and track your potential clients.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline">
             <Download className="mr-2 h-4 w-4" /> Export
           </Button>
           <Button>
             <Plus className="mr-2 h-4 w-4" /> Add Lead
           </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
         <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Input placeholder="Search leads..." className="h-9" />
         </div>
         
         <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
               <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <div className="bg-muted p-1 rounded-md flex items-center">
               <Button 
                 variant={view === 'list' ? 'secondary' : 'ghost'} 
                 size="sm" 
                 className="h-7 px-2 shadow-none"
                 onClick={() => setView('list')}
               >
                  <List className="h-4 w-4 mr-2" /> List
               </Button>
               <Button 
                 variant={view === 'pipeline' ? 'secondary' : 'ghost'} 
                 size="sm" 
                 className="h-7 px-2 shadow-none"
                 onClick={() => setView('pipeline')}
               >
                  <Kanban className="h-4 w-4 mr-2" /> Pipeline
               </Button>
            </div>
         </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
         {view === 'list' ? <LeadListView /> : <LeadPipelineView />}
      </div>
    </div>
  );
}
