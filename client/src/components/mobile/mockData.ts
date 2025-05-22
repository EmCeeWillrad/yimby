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
    imageUrls: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500"],
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
  },
  {
    id: 4,
    title: "Riverfront Townhomes",
    description: "Newly renovated 3-bedroom townhomes in a tax credit property with spacious layouts, modern appliances, and riverside walking trail.",
    address: "475 River Drive",
    city: "Chicago",
    state: "IL",
    zipCode: "60607",
    price: 1450,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1200,
    propertyType: "Townhouse",
    programType: "Tax Credit",
    isPetFriendly: false,
    isAccessible: true,
    amenities: ["Parking", "Fitness Center", "Riverside Trail", "Energy-Efficient Windows"],
    availableDate: "2023-08-10",
    imageUrls: ["https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
    latitude: 41.87672,
    longitude: -87.63026,
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 5,
    title: "Oakwood Veterans Studios",
    description: "Supportive housing for veterans with on-site services including job placement assistance, counseling resources, and community support.",
    address: "215 Oak Street",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    price: 825,
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 450,
    propertyType: "Studio",
    programType: "Veterans Housing",
    isPetFriendly: true,
    isAccessible: true,
    amenities: ["On-site Counseling", "Job Placement Services", "Computer Lab", "Community Room"],
    availableDate: "2023-06-15",
    imageUrls: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
    latitude: 30.26715,
    longitude: -97.74306,
    rating: 4.5,
    reviewCount: 38
  },
  {
    id: 6,
    title: "Sunset Garden Apartments",
    description: "Modern income-restricted apartments with eco-friendly features, community garden, and on-site daycare facilities. Near public transit.",
    address: "835 Sunset Boulevard",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90026",
    price: 1050,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    propertyType: "Apartment",
    programType: "Income Restricted",
    isPetFriendly: true,
    isAccessible: false,
    amenities: ["Community Garden", "Bike Storage", "Energy-Efficient Appliances", "On-site Daycare"],
    availableDate: "2023-06-01",
    imageUrls: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
    latitude: 34.07677,
    longitude: -118.26566,
    rating: 4.3,
    reviewCount: 28
  },
  {
    id: 7,
    title: "Maple Street Co-op",
    description: "Cooperative living community with shared common spaces, community activities, and affordable rent in a prime urban location.",
    address: "127 Maple Street",
    city: "Portland",
    state: "OR",
    zipCode: "97205",
    price: 875,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 600,
    propertyType: "Co-op",
    programType: "Cooperative Housing",
    isPetFriendly: true,
    isAccessible: false,
    amenities: ["Shared Kitchen", "Community Events", "Garden Space", "Bike Storage"],
    availableDate: "2023-07-15",
    imageUrls: ["https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
    latitude: 45.52186,
    longitude: -122.68317,
    rating: 4.6,
    reviewCount: 42
  }
];