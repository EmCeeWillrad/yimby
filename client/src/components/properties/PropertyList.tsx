import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import PropertyCard from "./PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyFilters } from "@/lib/types";

export default function PropertyList({ filters }: { filters: PropertyFilters }) {
  // Construct URL with filters
  const buildQueryString = () => {
    const params = new URLSearchParams();
    
    if (filters.city) params.append("city", filters.city);
    if (filters.state) params.append("state", filters.state);
    if (filters.zipCode) params.append("zipCode", filters.zipCode);
    if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
    if (filters.bedrooms) params.append("bedrooms", filters.bedrooms.toString());
    if (filters.bathrooms) params.append("bathrooms", filters.bathrooms.toString());
    if (filters.programType) params.append("programType", filters.programType);
    if (filters.isPetFriendly) params.append("isPetFriendly", filters.isPetFriendly.toString());
    if (filters.isAccessible) params.append("isAccessible", filters.isAccessible.toString());
    
    return params.toString();
  };

  const queryString = buildQueryString();
  const url = `/api/properties${queryString ? `?${queryString}` : ''}`;

  const { data: properties, isLoading, error } = useQuery({
    queryKey: [url],
    staleTime: 60000, // 1 minute
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
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
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading properties. Please try again later.</p>
      </div>
    );
  }

  if (properties?.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <i className="fas fa-home text-gray-300 text-5xl mb-4"></i>
        <h3 className="text-xl font-medium mb-2">No Properties Found</h3>
        <p className="text-gray-500">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties?.map((property: Property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          title={property.title}
          address={property.address}
          city={property.city}
          state={property.state}
          zipCode={property.zipCode}
          price={property.price}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          squareFeet={property.squareFeet || 0}
          programType={property.programType}
          isPetFriendly={property.isPetFriendly}
          isAccessible={property.isAccessible}
          imageUrl={property.imageUrls[0]}
          rating={property.rating || 0}
          reviewCount={property.reviewCount || 0}
        />
      ))}
    </div>
  );
}
