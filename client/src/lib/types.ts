// Types for frontend components

export interface PropertyFilters {
  city?: string;
  state?: string;
  zipCode?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  programType?: string;
  isPetFriendly?: boolean;
  isAccessible?: boolean;
}

export interface PropertyCardProps {
  id: number;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  programType: string;
  isPetFriendly: boolean;
  isAccessible: boolean;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

export interface ProgramCardProps {
  id: number;
  name: string;
  description: string;
  icon: string;
  iconBg: string;
}

export interface TestimonialProps {
  id: number;
  name: string;
  location: string;
  content: string;
  rating: number;
}

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}
