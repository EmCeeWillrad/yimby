import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useLocation } from "wouter";
import { Property } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function PropertyDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  
  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
    staleTime: 60000, // 1 minute
  });

  const handleSaveProperty = async () => {
    try {
      // This is a placeholder. In a complete application, 
      // you would have proper authentication and user IDs
      const saveData = {
        userId: 1, // This would normally come from auth context
        propertyId: Number(id)
      };
      
      await apiRequest("POST", "/api/saved-properties", saveData);
      
      toast({
        title: "Property Saved",
        description: "This property has been added to your saved list",
      });
      
      // Invalidate saved properties query if it exists
      queryClient.invalidateQueries({ queryKey: ["/api/users/1/saved-properties"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save this property. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <Skeleton className="md:w-1/2 h-64 md:h-auto" />
            <div className="p-8 md:w-1/2">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-1/2 mb-6" />
              <div className="flex flex-wrap gap-2 mb-6">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="text-gray-600 mb-8">
          The property you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/search">
          <Button>
            <i className="fas fa-search mr-2"></i> Find Other Properties
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-light">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <Link href="/search">
              <a className="text-primary hover:underline inline-flex items-center">
                <i className="fas fa-arrow-left mr-2"></i> Back to Search
              </a>
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                {property.imageUrls && property.imageUrls.length > 0 ? (
                  <img 
                    src={property.imageUrls[0]} 
                    alt={property.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-64 md:h-full bg-gray-200 flex items-center justify-center">
                    <i className="fas fa-home text-gray-400 text-4xl"></i>
                  </div>
                )}
              </div>
              
              <div className="p-8 md:w-1/2">
                <div className="flex justify-between items-start">
                  <h1 className="font-heading font-bold text-2xl mb-2">{property.title}</h1>
                  <Badge className="bg-primary">${property.price}+</Badge>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline">{property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}</Badge>
                  <Badge variant="outline">{property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}</Badge>
                  {property.squareFeet && (
                    <Badge variant="outline">{property.squareFeet} sq ft</Badge>
                  )}
                  <Badge className="bg-secondary">{property.programType}</Badge>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button onClick={handleSaveProperty}>
                    <i className="fas fa-heart mr-2"></i> Save Property
                  </Button>
                  <Button variant="outline">
                    <i className="fas fa-envelope mr-2"></i> Contact Property
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-8 border-t border-gray-100">
              <h2 className="font-heading font-semibold text-xl mb-4">About This Property</h2>
              <p className="text-gray-600 mb-6">{property.description}</p>
              
              <h3 className="font-heading font-semibold text-lg mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mb-6">
                {property.amenities && Array.isArray(property.amenities) ? (
                  property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>{amenity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No amenities listed</p>
                )}
              </div>
              
              <h3 className="font-heading font-semibold text-lg mb-3">Additional Details</h3>
              <div className="grid grid-cols-2 gap-y-3">
                <div>
                  <span className="text-gray-500">Available:</span>{" "}
                  <span>{property.availableDate ? new Date(property.availableDate).toLocaleDateString() : "Now"}</span>
                </div>
                <div>
                  <span className="text-gray-500">Pet Policy:</span>{" "}
                  <span>{property.isPetFriendly ? "Pets Allowed" : "No Pets"}</span>
                </div>
                <div>
                  <span className="text-gray-500">Accessibility:</span>{" "}
                  <span>{property.isAccessible ? "Accessible Features" : "Not specified"}</span>
                </div>
                <div>
                  <span className="text-gray-500">Program:</span>{" "}
                  <span className="font-medium">{property.programType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
