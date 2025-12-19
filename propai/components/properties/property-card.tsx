"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Property } from "@/lib/data/mock-properties";
import { BedDouble, Bath, Square, MoreHorizontal, Eye, Share2, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter();

  return (
    <Card 
      className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-muted"
      onClick={() => router.push(`/dashboard/properties/${property.id}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 flex gap-2">
           <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground font-medium shadow-sm border-0">
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
           </Badge>
           {property.virtualTourUrl && (
             <Badge variant="secondary" className="bg-blue-500/90 text-white backdrop-blur-sm font-medium shadow-sm border-0">
                🎬 360° Tour
             </Badge>
           )}
        </div>
        <div className="absolute bottom-2 left-2">
           <Badge 
             className={`${
               property.status === 'available' ? 'bg-green-500 hover:bg-green-600' :
               property.status === 'reserved' ? 'bg-yellow-500 hover:bg-yellow-600' :
               'bg-red-500 hover:bg-red-600'
             } text-white border-0 shadow-sm`}
           >
             {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
           </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2 space-y-1">
        <div className="flex justify-between items-start">
           <div>
             <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
               {property.title}
             </h3>
             <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
               <MapPin className="h-3.5 w-3.5" /> {property.location}
             </p>
           </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 py-2 space-y-3">
         <div className="flex items-end gap-1">
            <span className="text-xl font-bold text-primary">{property.price}</span>
            {property.pricePerSqft && (
              <span className="text-xs text-muted-foreground mb-1">
                 ({property.pricePerSqft})
              </span>
            )}
         </div>
         
         <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg border border-border/50">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5" title="Bedrooms">
                 <BedDouble className="h-4 w-4 text-foreground/70" />
                 <span>{property.bedrooms} Bed</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5" title="Bathrooms">
                 <Bath className="h-4 w-4 text-foreground/70" />
                 <span>{property.bathrooms} Bath</span>
              </div>
            )}
            <div className="flex items-center gap-1.5" title="Area">
               <Square className="h-4 w-4 text-foreground/70" />
               <span>{property.area} sqft</span>
            </div>
         </div>
         
         <div className="flex items-center gap-2 text-xs">
            <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
               {property.leadsCount} Interested Leads
            </Badge>
            <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
               {property.leadMatchScore}% Match
            </Badge>
         </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex items-center justify-between border-t mt-2">
         <Button variant="ghost" size="sm" className="h-8 text-xs">
            <Eye className="h-3.5 w-3.5 mr-1.5" /> View Details
         </Button>
         <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
               <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
               <MoreHorizontal className="h-4 w-4" />
            </Button>
         </div>
      </CardFooter>
    </Card>
  );
}

