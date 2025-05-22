import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Property } from "@shared/schema";
import PropertyCard from "@/components/properties/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function PopularListings() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["/api/properties"],
    staleTime: 60000, // 1 minute
  });

  const filterProperties = (programType: string) => {
    if (programType === "All") {
      return properties || [];
    }
    return (properties || []).filter((property: Property) => 
      property.programType === programType
    );
  };

  const filteredProperties = filterProperties(activeFilter === "All" ? "All" : activeFilter);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const filterOptions = [
    "All", 
    "Section 8", 
    "Income Restricted", 
    "Senior Housing", 
    "Family Housing", 
    "Disability Access"
  ];

  return (
    <section className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl">Featured Affordable Properties</h2>
          <a href="/search" className="hidden md:block text-primary font-medium hover:underline">
            View All <i className="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
        
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              className={`filter-badge px-4 py-2 rounded-full text-sm font-medium border border-gray-200 cursor-pointer transition-colors ${
                activeFilter === filter ? "bg-primary text-white" : "bg-white"
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Property Listings */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <p className="text-red-500">Error loading properties. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property: Property) => (
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
        )}
        
        <div className="text-center mt-8 md:hidden">
          <a href="/search" className="text-primary font-medium hover:underline">
            View All Properties <i className="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
