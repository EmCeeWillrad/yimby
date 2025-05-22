import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { HousingProgram } from "@shared/schema";
import ProgramCard from "@/components/common/ProgramCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function HousingProgramsSection() {
  const { data: programs, isLoading, error } = useQuery({
    queryKey: ["/api/housing-programs"],
    staleTime: 3600000, // 1 hour
  });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium">Housing Assistance</span>
          <h2 className="font-heading font-bold text-3xl mt-2 mb-4">Affordable Housing Programs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Learn about government programs that can help make housing affordable for you and your family.</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-light rounded-xl overflow-hidden shadow-sm">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Skeleton className="w-12 h-12 rounded-lg mr-4" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading programs. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs?.map((program: HousingProgram) => (
              <ProgramCard
                key={program.id}
                id={program.id}
                name={program.name}
                description={program.description}
                icon={program.icon}
                iconBg={program.iconBg}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
