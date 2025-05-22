import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Helmet } from "react-helmet";
import PropertyList from "@/components/properties/PropertyList";
import PropertySearch from "@/components/properties/PropertySearch";
import PropertyFilters from "@/components/properties/PropertyFilters";
import { PropertyFilters as PropertyFiltersType } from "@/lib/types";

export default function PropertySearchPage() {
  const [location] = useLocation();
  const [filters, setFilters] = useState<PropertyFiltersType>({});
  
  // Parse URL search params on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split("?")[1]);
    
    const newFilters: PropertyFiltersType = {};
    
    if (searchParams.has("q")) {
      const query = searchParams.get("q") || "";
      // Assume query is city for now, could be more complex in a real app
      newFilters.city = query;
    }
    
    if (searchParams.has("city")) newFilters.city = searchParams.get("city") || undefined;
    if (searchParams.has("state")) newFilters.state = searchParams.get("state") || undefined;
    if (searchParams.has("zipCode")) newFilters.zipCode = searchParams.get("zipCode") || undefined;
    
    if (searchParams.has("minPrice")) 
      newFilters.minPrice = parseInt(searchParams.get("minPrice") || "0");
    
    if (searchParams.has("maxPrice")) 
      newFilters.maxPrice = parseInt(searchParams.get("maxPrice") || "0");
    
    if (searchParams.has("bedrooms")) 
      newFilters.bedrooms = parseInt(searchParams.get("bedrooms") || "0");
    
    if (searchParams.has("bathrooms")) 
      newFilters.bathrooms = parseFloat(searchParams.get("bathrooms") || "0");
    
    if (searchParams.has("programType")) 
      newFilters.programType = searchParams.get("programType") || undefined;
    
    if (searchParams.has("isPetFriendly")) 
      newFilters.isPetFriendly = searchParams.get("isPetFriendly") === "true";
    
    if (searchParams.has("isAccessible")) 
      newFilters.isAccessible = searchParams.get("isAccessible") === "true";
    
    setFilters(newFilters);
  }, [location]);

  const handleFilterChange = (newFilters: PropertyFiltersType) => {
    setFilters(newFilters);
    
    // In a real app, you might want to update the URL with the new filters
    // using a useEffect that runs when filters change
  };

  return (
    <>
      <Helmet>
        <title>Search Affordable Housing Properties | AffordableHomes</title>
        <meta name="description" content="Find affordable housing properties that match your needs. Filter by price, location, bedrooms, and housing assistance programs." />
      </Helmet>
      
      <div className="bg-light min-h-screen pb-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-heading font-bold text-3xl mb-6">Find Affordable Housing</h1>
          
          <div className="mb-8">
            <PropertySearch />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />
            </div>
            
            <div className="md:col-span-3">
              <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex justify-between items-center">
                <h2 className="font-heading font-semibold text-xl">
                  Properties
                  {filters.city && <span className="font-normal text-gray-500 text-base ml-2">in {filters.city}</span>}
                </h2>
                
                <div className="text-gray-500 text-sm">
                  <select className="bg-transparent border-0 focus:ring-0">
                    <option>Sort: Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
              
              <PropertyList filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
