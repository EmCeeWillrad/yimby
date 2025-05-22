import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [_, setLocation] = useLocation();

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

  return (
    <section className="bg-hero h-80 md:h-96 flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-6">Find Your Affordable Home</h1>
          <p className="text-white text-xl mb-8">Search thousands of affordable housing options across the country</p>
          
          {/* Search Bar */}
          <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row">
            <div className="flex-grow mb-2 md:mb-0 md:mr-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="City, State, or ZIP"
                  className="w-full pl-10 pr-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-map-marker-alt text-gray-400"></i>
                </div>
              </div>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white font-medium rounded-md px-6 py-3 transition"
              onClick={handleSearch}
            >
              <i className="fas fa-search mr-2"></i>Search
            </Button>
          </div>
          
          {/* App Preview Link */}
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white"
              onClick={() => setLocation('/app-preview')}
            >
              Try Our App Preview with Tinder-Style Swiping
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
