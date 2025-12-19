"use client";

import * as React from "react";
import { Plus, LayoutGrid, List, Map as MapIcon, Filter, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockProperties } from "@/lib/data/mock-properties";
import { PropertyCard } from "@/components/properties/property-card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Since we're using mock data and simple layout for now, we'll implement Map View later or use a placeholder
// For "Award Winning" feel, the grid layout needs to be responsive and clean.

export default function PropertiesPage() {
  const [view, setView] = React.useState<"grid" | "list" | "map">("grid");

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex flex-col gap-4 p-6 border-b">
        <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-semibold tracking-tight">Properties</h1>
             <p className="text-sm text-muted-foreground mt-1">
               Manage your inventory and track interested leads.
             </p>
           </div>
           <div className="flex items-center gap-2">
              <Button variant="outline">
                 <Download className="mr-2 h-4 w-4" /> Import
              </Button>
              <Button>
                 <Plus className="mr-2 h-4 w-4" /> Add Property
              </Button>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between mt-2">
           <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
              <div className="relative w-full">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input placeholder="Search by name, project, or location..." className="pl-9 bg-muted/50" />
              </div>
           </div>
           
           <div className="flex items-center gap-2 w-full sm:w-auto">
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Available</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Reserved</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Sold</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="bg-muted p-1 rounded-md flex items-center border">
                  <Button 
                    variant={view === 'grid' ? 'secondary' : 'ghost'} 
                    size="icon" 
                    className="h-7 w-7 rounded-sm shadow-none"
                    onClick={() => setView('grid')}
                  >
                     <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={view === 'list' ? 'secondary' : 'ghost'} 
                    size="icon" 
                    className="h-7 w-7 rounded-sm shadow-none"
                    onClick={() => setView('list')}
                  >
                     <List className="h-4 w-4" />
                  </Button>
                   <Button 
                    variant={view === 'map' ? 'secondary' : 'ghost'} 
                    size="icon" 
                    className="h-7 w-7 rounded-sm shadow-none"
                    onClick={() => setView('map')}
                  >
                     <MapIcon className="h-4 w-4" />
                  </Button>
              </div>
           </div>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-muted/5">
        <div className="p-6">
           {view === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {mockProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                 ))}
                 {/* Add more mock items to fill grid for visual effect if needed */}
              </div>
           )}
           
           {view === 'list' && (
              <div className="flex flex-col gap-4">
                 {/* List view placeholder - can implement table later */}
                 <div className="text-center py-20 text-muted-foreground">List View Coming Soon</div>
              </div>
           )}

           {view === 'map' && (
              <div className="flex flex-col gap-4 h-[600px] bg-muted rounded-lg items-center justify-center border text-muted-foreground">
                 <MapIcon className="h-12 w-12 opacity-20 mb-4" />
                 <p>Interactive Map View Integration</p>
                 <Button variant="outline" size="sm">Enable Google Maps</Button>
              </div>
           )}
        </div>
      </ScrollArea>
    </div>
  );
}
