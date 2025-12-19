"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { mockProperties } from "@/lib/data/mock-properties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Share2, 
  Download, 
  BedDouble, 
  Bath, 
  Square, 
  CheckCircle2, 
  Car, 
  Dumbbell, 
  Waves, 
  ShieldCheck,
  Building2,
  Calendar,
  MoreVertical,
  Camera
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const property = React.useMemo(() => {
    return mockProperties.find(p => p.id === id);
  }, [id]);

  if (!property) {
    return (
       <div className="flex flex-col items-center justify-center h-full gap-4">
          <p className="text-muted-foreground">Property not found</p>
          <Button variant="outline" onClick={() => router.push('/dashboard/properties')}>
             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
          </Button>
       </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
       {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-background z-10">
         <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/properties')}>
               <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
               <h1 className="text-xl font-bold flex items-center gap-2">
                  {property.title}
                  <Badge variant="secondary" className="font-normal bg-muted">
                     {property.type}
                  </Badge>
               </h1>
               <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {property.location} • {property.project}
               </div>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <Button variant="outline">
               <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="outline">
               <Download className="mr-2 h-4 w-4" /> Brochure
            </Button>
             <Button variant="ghost" size="icon">
               <MoreVertical className="h-4 w-4" />
            </Button>
         </div>
      </div>

      <ScrollArea className="flex-1">
         <div className="container max-w-6xl mx-auto p-6 space-y-8">
            
            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Main Image Gallery */}
               <div className="md:col-span-2 space-y-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-muted group cursor-pointer">
                     <Image 
                       src={property.image} 
                       alt={property.title}
                       fill
                       className="object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="flex gap-2">
                           {property.images.map((_, i) => (
                              <div key={i} className={`h-1.5 w-8 rounded-full shadow-sm backdrop-blur-md ${i === 0 ? 'bg-white' : 'bg-white/50'}`} />
                           ))}
                        </div>
                        <Button size="sm" className="bg-white/90 text-black hover:bg-white border-0 shadow-lg">
                           <Camera className="mr-2 h-4 w-4" /> View All Photos
                        </Button>
                     </div>
                     {property.virtualTourUrl && (
                        <div className="absolute top-4 left-4">
                           <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg">
                              <Waves className="mr-2 h-4 w-4" /> 360° Tour
                           </Button>
                        </div>
                     )}
                  </div>
               </div>

               {/* Key Details Card */}
               <Card className="h-full border-muted">
                  <CardHeader>
                     <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <div className="flex items-end gap-2">
                           <h2 className="text-3xl font-bold text-primary">{property.price}</h2>
                        </div>
                        <p className="text-xs text-muted-foreground">{property.pricePerSqft}</p>
                     </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col gap-1 p-3 bg-muted/30 rounded-lg border">
                           <span className="text-muted-foreground flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> Bedrooms</span>
                           <span className="font-semibold text-lg">{property.bedrooms}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 bg-muted/30 rounded-lg border">
                           <span className="text-muted-foreground flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> Bathrooms</span>
                           <span className="font-semibold text-lg">{property.bathrooms}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 bg-muted/30 rounded-lg border">
                           <span className="text-muted-foreground flex items-center gap-1"><Square className="h-3.5 w-3.5" /> Area</span>
                           <span className="font-semibold text-lg">{property.area} <span className="text-xs font-normal text-muted-foreground">sqft</span></span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 bg-muted/30 rounded-lg border">
                           <span className="text-muted-foreground flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Possession</span>
                           <span className="font-semibold text-sm truncate">{property.possessionDate}</span>
                        </div>
                     </div>
                     
                     <div className="space-y-3 pt-2">
                        <Button className="w-full h-11 text-base">Mark as Sold</Button>
                        <Button variant="outline" className="w-full">Edit Property</Button>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
               <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-6">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-3"
                  >
                     Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="leads" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-3"
                  >
                     Interested Leads <Badge className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">{property.leadsCount}</Badge>
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="overview" className="mt-8 space-y-8">
                  {/* Description */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="md:col-span-2 space-y-6">
                        <div>
                           <h3 className="text-lg font-semibold mb-3">Description</h3>
                           <p className="text-muted-foreground leading-relaxed">
                              {property.description}
                           </p>
                        </div>
                        
                        <Separator />
                        
                        {/* Amenities */}
                        <div>
                           <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {property.amenities.map(amenity => (
                                 <div key={amenity} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                       <CheckCircle2 className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium">{amenity}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Sidebar Info */}
                     <div className="space-y-6">
                        <Card>
                           <CardHeader>
                              <CardTitle className="text-base">Project Details</CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-4">
                              <div className="flex justify-between text-sm border-b pb-3">
                                 <span className="text-muted-foreground">Builder</span>
                                 <span className="font-medium">{property.builder}</span>
                              </div>
                              <div className="flex justify-between text-sm border-b pb-3">
                                 <span className="text-muted-foreground">RERA ID</span>
                                 <span className="font-medium font-mono text-xs">{property.reraId}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                 <span className="text-muted-foreground">Status</span>
                                 <Badge variant="outline" className="capitalize">{property.status}</Badge>
                              </div>
                           </CardContent>
                        </Card>
                        
                        <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900">
                           <CardHeader>
                              <CardTitle className="text-base text-blue-700 dark:text-blue-400 flex items-center gap-2">
                                 <Building2 className="h-4 w-4" /> Price History
                              </CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className="h-32 flex items-end justify-between gap-2 px-2">
                                 {[40, 45, 30, 60, 55, 70, 85].map((h, i) => (
                                    <div key={i} className="w-full bg-blue-200 dark:bg-blue-800 rounded-t-sm" style={{ height: `${h}%` }} />
                                 ))}
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                 <span>Jan</span>
                                 <span>Jun</span>
                                 <span>Dec</span>
                              </div>
                              <p className="text-xs text-center mt-4 text-blue-600 dark:text-blue-400 font-medium">
                                 ↑ 12% appreciation in last year
                              </p>
                           </CardContent>
                        </Card>
                     </div>
                  </div>
               </TabsContent>

               <TabsContent value="leads" className="mt-8">
                  <div className="text-center py-12 bg-muted/10 rounded-xl border border-dashed">
                     <p className="text-muted-foreground">Lead integration coming soon...</p>
                     <Button variant="outline" className="mt-4">View All Leads</Button>
                  </div>
               </TabsContent>
            </Tabs>

         </div>
      </ScrollArea>
    </div>
  );
}
