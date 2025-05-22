// Mock property data for the property swiping feature
export interface Property {
  id: number;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: string;
  programType: string;
  isPetFriendly: boolean;
  isAccessible: boolean;
  amenities: string[];
  availableDate: string;
  imageUrls: string[];
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
}

export const mockProperties: Property[] = [
  {
    id: 1,
    title: "Parkside Commons",
    description: "Affordable housing complex with green spaces and community amenities. Close to public transportation.",
    address: "123 Main Street",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    price: 950,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 850,
    propertyType: "Apartment",
    programType: "Income Restricted",
    isPetFriendly: true,
    isAccessible: false,
    amenities: ["Playground", "Laundry Facilities", "Community Room", "Close to Schools"],
    availableDate: "2023-07-01",
    imageUrls: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
    latitude: 41.88425,
    longitude: -87.63245,
    rating: 4.5,
    reviewCount: 24
  },
  {
    id: 2,
    title: "Harmony Heights",
    description: "Section 8 apartment complex with on-site management and security. Units include basic utilities.",
    address: "456 Oak Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    price: 1200,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    propertyType: "Apartment",
    programType: "Section 8",
    isPetFriendly: false,
    isAccessible: true,
    amenities: ["Elevator", "Security System", "24-hour Maintenance", "Public Transit Access"],
    availableDate: "2023-08-15",
    imageUrls: ["https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
    latitude: 40.75232,
    longitude: -73.9978,
    rating: 4.2,
    reviewCount: 18
  },
  {
    id: 3,
    title: "Golden Horizons",
    description: "Senior living community with accessible features and supportive services. Peaceful neighborhood with walking trails.",
    address: "789 Oak Drive",
    city: "Atlanta",
    state: "GA",
    zipCode: "30308",
    price: 1100,
    bedrooms: 1,
    bathrooms: 1.5,
    squareFeet: 700,
    propertyType: "Apartment",
    programType: "Senior Housing",
    isPetFriendly: true,
    isAccessible: true,
    amenities: ["Elevator", "Grab Bars", "Emergency Pull Cords", "Social Activities"],
    availableDate: "2023-06-30",
    imageUrls: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
    latitude: 33.77196,
    longitude: -84.38799,
    rating: 4.8,
    reviewCount: 32
  }
];