import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export interface MatchProperty {
  id: number;
  name: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  programType: string;
  rating: number;
  amenities: string[];
}

// Create 5 realistic affordable housing property examples
export const matchProperties: MatchProperty[] = [
  {
    id: 1,
    name: "Parkside Commons",
    city: "Chicago",
    state: "IL",
    price: 950,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 850,
    description: "Affordable housing complex with green spaces and community amenities. Close to public transportation.",
    programType: "Income Restricted",
    rating: 4.5,
    amenities: ["Playground", "Laundry Facilities", "Community Room", "Close to Schools"]
  },
  {
    id: 2,
    name: "Harmony Heights",
    city: "New York",
    state: "NY",
    price: 1200,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    description: "Section 8 apartment complex with on-site management and security. Units include basic utilities.",
    programType: "Section 8",
    rating: 4.2,
    amenities: ["Elevator", "Security System", "24-hour Maintenance", "Public Transit Access"]
  },
  {
    id: 3,
    name: "Golden Horizons",
    city: "Atlanta",
    state: "GA",
    price: 1100,
    bedrooms: 1,
    bathrooms: 1.5,
    squareFeet: 700,
    description: "Senior living community with accessible features and supportive services. Peaceful neighborhood.",
    programType: "Senior Housing",
    rating: 4.8,
    amenities: ["Elevator", "Grab Bars", "Emergency Pull Cords", "Social Activities"]
  },
  {
    id: 4,
    name: "Riverfront Townhomes",
    city: "Chicago",
    state: "IL",
    price: 1450,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1200,
    description: "Newly renovated townhomes with spacious layouts, modern appliances, and riverside walking trail.",
    programType: "Tax Credit",
    rating: 4.7,
    amenities: ["Parking", "Fitness Center", "Riverside Trail", "Energy-Efficient Windows"]
  },
  {
    id: 5,
    name: "Oakwood Veterans Studios",
    city: "Austin",
    state: "TX",
    price: 825,
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 450,
    description: "Supportive housing for veterans with on-site services including job placement assistance.",
    programType: "Veterans Housing",
    rating: 4.5,
    amenities: ["On-site Counseling", "Job Placement Services", "Computer Lab", "Community Room"]
  }
];

interface PropertyMatchCardProps {
  property: MatchProperty;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onDetails: () => void;
  isAnimating: boolean;
  direction: 'left' | 'right' | null;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
};

const PropertyMatchCard: React.FC<PropertyMatchCardProps> = ({ 
  property, 
  onSwipeLeft, 
  onSwipeRight, 
  onDetails, 
  isAnimating, 
  direction 
}) => {
  return (
    <div className="w-full">
      <Card className="overflow-hidden shadow-lg">
        {/* Property Header - Property Name */}
        <div className="bg-primary text-white p-3 text-center">
          <h2 className="text-xl font-bold">{property.name}</h2>
        </div>

        {/* Property Image */}
        <div 
          className="w-full h-48 bg-gray-100 flex items-center justify-center text-2xl font-bold text-primary"
          style={{ backgroundColor: '#f5f5f5', color: '#ff7a08' }}
        >
          {property.name}
        </div>

        {/* Property Details */}
        <div className="p-4">
          {/* Location and Program Badge */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">{property.city}, {property.state}</span>
            <Badge className="bg-primary">{property.programType}</Badge>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-primary mb-2">
            {formatPrice(property.price)}
            <span className="text-sm font-normal text-gray-500 ml-1">/month</span>
          </div>
          
          {/* Specs */}
          <div className="flex gap-3 mb-3">
            <Badge variant="outline">{property.bedrooms} bed</Badge>
            <Badge variant="outline">{property.bathrooms} bath</Badge>
            <Badge variant="outline">{property.squareFeet} sq ft</Badge>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {property.description}
          </p>
          
          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-3">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary">{amenity}</Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge variant="secondary">+{property.amenities.length - 3} more</Badge>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 mr-1 fill-yellow-400 stroke-yellow-400" />
            <span className="text-sm font-medium">{property.rating} Rating</span>
          </div>
        </div>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button 
          onClick={onSwipeLeft}
          className="w-14 h-14 rounded-full flex items-center justify-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          disabled={isAnimating}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button 
          onClick={onDetails}
          className="w-14 h-14 rounded-full flex items-center justify-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
          disabled={isAnimating}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V16M12 8H10M12 8H14M12 16H10M12 16H14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <button 
          onClick={onSwipeRight}
          className="w-14 h-14 rounded-full flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          disabled={isAnimating}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 12.5718L12 20.0718L4.5 12.5718M12 4.07178V19.0718" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PropertyMatchCard;