import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/properties/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function SavedProperties() {
  const { toast } = useToast();
  
  // In a real app, you would get the userId from the auth context
  const userId = 1;
  
  const { data: savedProperties, isLoading, error } = useQuery({
    queryKey: [`/api/users/${userId}/saved-properties`],
    staleTime: 60000, // 1 minute
  });

  const handleRemoveSaved = async (savedId: number) => {
    try {
      await apiRequest("DELETE", `/api/saved-properties/${savedId}`);
      
      toast({
        title: "Property Removed",
        description: "The property has been removed from your saved list",
      });
      
      // Invalidate the query to refresh the list
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/saved-properties`] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove this property. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Saved Properties | AffordableHomes</title>
        <meta name="description" content="View and manage your saved affordable housing properties." />
      </Helmet>
      
      <div className="bg-light min-h-screen pb-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-heading font-bold text-3xl mb-2">Saved Properties</h1>
          <p className="text-gray-600 mb-8">Manage your list of saved affordable housing properties.</p>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <Skeleton className="w-full h-48" />
                  <div className="p-5">
                    <div className="flex justify-between mb-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-3" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading saved properties. Please try again later.</p>
            </div>
          ) : savedProperties?.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm py-12 px-6 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-heart text-gray-400 text-2xl"></i>
              </div>
              <h2 className="font-heading font-semibold text-xl mb-2">No Saved Properties</h2>
              <p className="text-gray-600 mb-6">You haven't saved any properties yet. Browse our listings and save properties you're interested in.</p>
              <Link href="/search">
                <Button className="bg-primary hover:bg-primary/90">
                  Find Properties
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedProperties?.map((saved: any) => (
                <div key={saved.id} className="relative">
                  <PropertyCard
                    id={saved.property.id}
                    title={saved.property.title}
                    address={saved.property.address}
                    city={saved.property.city}
                    state={saved.property.state}
                    zipCode={saved.property.zipCode}
                    price={saved.property.price}
                    bedrooms={saved.property.bedrooms}
                    bathrooms={saved.property.bathrooms}
                    squareFeet={saved.property.squareFeet || 0}
                    programType={saved.property.programType}
                    isPetFriendly={saved.property.isPetFriendly}
                    isAccessible={saved.property.isAccessible}
                    imageUrl={saved.property.imageUrls[0]}
                    rating={saved.property.rating || 0}
                    reviewCount={saved.property.reviewCount || 0}
                  />
                  <button
                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-red-500 hover:bg-white transition-colors"
                    onClick={() => handleRemoveSaved(saved.id)}
                    aria-label="Remove saved property"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
