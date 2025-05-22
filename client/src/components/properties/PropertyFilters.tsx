import { useState } from "react";
import { PropertyFilters } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface PropertyFiltersProps {
  filters: PropertyFilters;
  onFilterChange: (filters: PropertyFilters) => void;
}

export default function PropertyFiltersComponent({ filters, onFilterChange }: PropertyFiltersProps) {
  // Local state to track filter changes before applying
  const [localFilters, setLocalFilters] = useState<PropertyFilters>(filters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value ? Number(value) : undefined }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setLocalFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    if (name === "priceRange") {
      setLocalFilters((prev) => ({ 
        ...prev, 
        minPrice: value[0], 
        maxPrice: value[1] 
      }));
    }
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters: PropertyFilters = {};
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Determine the price range for the slider
  const minPrice = localFilters.minPrice || 0;
  const maxPrice = localFilters.maxPrice || 3000;
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-heading font-semibold text-xl mb-6">Filter Properties</h3>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="location" className="text-sm font-medium mb-1 block">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="City, State, or ZIP"
            value={localFilters.city || ""}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div>
          <Label htmlFor="priceRange" className="text-sm font-medium mb-1 block">
            Price Range: ${minPrice} - ${maxPrice}
          </Label>
          <Slider
            id="priceRange"
            min={0}
            max={5000}
            step={100}
            value={[minPrice, maxPrice]}
            onValueChange={(value) => handleSliderChange("priceRange", value)}
            className="my-6"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bedrooms" className="text-sm font-medium mb-1 block">Bedrooms</Label>
            <Select 
              value={localFilters.bedrooms?.toString() || ""} 
              onValueChange={(value) => handleSelectChange("bedrooms", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="0">Studio</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="bathrooms" className="text-sm font-medium mb-1 block">Bathrooms</Label>
            <Select 
              value={localFilters.bathrooms?.toString() || ""} 
              onValueChange={(value) => handleSelectChange("bathrooms", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="1">1 Bathroom</SelectItem>
                <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                <SelectItem value="2">2 Bathrooms</SelectItem>
                <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                <SelectItem value="3">3+ Bathrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="programType" className="text-sm font-medium mb-1 block">Program Type</Label>
          <Select 
            value={localFilters.programType || ""} 
            onValueChange={(value) => handleSelectChange("programType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Program</SelectItem>
              <SelectItem value="Section 8">Section 8</SelectItem>
              <SelectItem value="Income Restricted">Income Restricted</SelectItem>
              <SelectItem value="Senior Housing">Senior Housing</SelectItem>
              <SelectItem value="Family Housing">Family Housing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="isPetFriendly" className="text-sm font-medium cursor-pointer">
              Pet Friendly
            </Label>
            <Switch
              id="isPetFriendly"
              checked={Boolean(localFilters.isPetFriendly)}
              onCheckedChange={(checked) => handleSwitchChange("isPetFriendly", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="isAccessible" className="text-sm font-medium cursor-pointer">
              Accessibility Features
            </Label>
            <Switch
              id="isAccessible"
              checked={Boolean(localFilters.isAccessible)}
              onCheckedChange={(checked) => handleSwitchChange("isAccessible", checked)}
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleResetFilters}
          >
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
}
