import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ["/api/testimonials"],
    staleTime: 3600000, // 1 hour
  });

  const renderStars = (rating: number) => {
    const stars = [];
    
    // Full stars
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }
    
    // Half star
    if (rating % 1 !== 0) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>);
    }
    
    return <div className="text-warning">{stars}</div>;
  };

  return (
    <section className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium">Success Stories</span>
          <h2 className="font-heading font-bold text-3xl mt-2 mb-4">Helping Families Find Affordable Homes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Hear from families who found their perfect affordable home through our platform.</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                <div className="flex items-center">
                  <Skeleton className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading testimonials. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials?.map((testimonial: Testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
