import { Link } from "wouter";
import { PropertyCardProps } from "@/lib/types";

export default function PropertyCard({
  id,
  title,
  address,
  city,
  state,
  zipCode,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  programType,
  isPetFriendly,
  isAccessible,
  imageUrl,
  rating,
  reviewCount
}: PropertyCardProps) {
  
  const getProgramTagColor = (programType: string) => {
    switch (programType) {
      case "Section 8":
        return "bg-primary";
      case "Income Restricted":
        return "bg-secondary";
      case "Senior Housing":
        return "bg-accent";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="property-card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <span className={`absolute top-2 right-2 ${getProgramTagColor(programType)} text-white text-xs font-bold px-2 py-1 rounded`}>
          {programType.toUpperCase()}
        </span>
      </div>
      <div className="p-5">
        <div className="flex justify-between mb-2">
          <h3 className="font-heading font-semibold text-lg">{title}</h3>
          <span className="text-primary font-bold">${price}+</span>
        </div>
        <p className="text-gray-500 text-sm mb-3">{address}, {city}, {state} {zipCode}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-100 text-xs px-2 py-1 rounded">
            {bedrooms} {bedrooms === 1 ? "Bed" : "Beds"}
          </span>
          <span className="bg-gray-100 text-xs px-2 py-1 rounded">
            {bathrooms} {bathrooms === 1 ? "Bath" : "Baths"}
          </span>
          <span className="bg-gray-100 text-xs px-2 py-1 rounded">
            {squareFeet} sq ft
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <i className="fas fa-star text-warning mr-1"></i>
            <span className="text-sm font-medium">{rating} ({reviewCount} reviews)</span>
          </div>
          <Link href={`/properties/${id}`}>
            <a className="text-primary font-medium text-sm hover:underline">View Details</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
