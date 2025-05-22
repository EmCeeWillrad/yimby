import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PropertySearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useLocation();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const isSearchPage = location.startsWith("/search");

  return (
    <div className={`bg-white rounded-lg shadow-md ${isSearchPage ? 'p-4' : 'p-2'}`}>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-grow relative">
          <Input
            type="text"
            placeholder="City, State, or ZIP"
            className="w-full pl-10 pr-4 py-3 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-map-marker-alt text-gray-400"></i>
          </div>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white font-medium"
          onClick={handleSearch}
        >
          <i className="fas fa-search mr-2"></i>Search
        </Button>
      </div>
    </div>
  );
}
