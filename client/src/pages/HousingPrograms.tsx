import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { HousingProgram } from "@shared/schema";
import ProgramCard from "@/components/common/ProgramCard";
import { Skeleton } from "@/components/ui/skeleton";
import CallToAction from "@/components/home/CallToAction";

export default function HousingPrograms() {
  const { data: programs, isLoading, error } = useQuery({
    queryKey: ["/api/housing-programs"],
    staleTime: 3600000, // 1 hour
  });

  return (
    <>
      <Helmet>
        <title>Housing Assistance Programs | AffordableHomes</title>
        <meta name="description" content="Learn about government housing assistance programs that can help make housing affordable for you and your family." />
      </Helmet>
      
      <div className="bg-light">
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading font-bold text-4xl mb-4">Housing Assistance Programs</h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              Learn about government programs that can help make housing affordable for you and your family.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-2xl mb-4">Understanding Housing Assistance</h2>
            <p className="text-gray-600 mb-4">
              Housing assistance programs help low-income families, seniors, and people with disabilities afford decent and safe housing. These programs are administered by federal, state, and local governments, as well as non-profit organizations.
            </p>
            <p className="text-gray-600">
              Eligibility for these programs typically depends on your income, family size, citizenship status, and other factors. Below are some of the most common housing assistance programs available.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <Skeleton className="w-12 h-12 rounded-lg mr-4" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading programs. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          
          <div className="mt-16 bg-white p-8 rounded-xl shadow-sm">
            <h2 className="font-heading font-bold text-2xl mb-4">How to Apply for Housing Assistance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ol className="list-decimal list-inside space-y-4 text-gray-600">
                  <li>
                    <span className="font-medium text-dark">Determine your eligibility:</span> Check income guidelines and program requirements to see if you qualify.
                  </li>
                  <li>
                    <span className="font-medium text-dark">Gather required documents:</span> Typically includes proof of income, identification, and family composition.
                  </li>
                  <li>
                    <span className="font-medium text-dark">Find local housing agencies:</span> Contact your local Public Housing Authority (PHA) or community organization.
                  </li>
                  <li>
                    <span className="font-medium text-dark">Complete applications:</span> Fill out and submit applications for programs that fit your needs.
                  </li>
                  <li>
                    <span className="font-medium text-dark">Follow up regularly:</span> Waiting lists can be long, so check on your application status periodically.
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold text-xl mb-3">Common Required Documents</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                  <li>Valid government-issued photo ID</li>
                  <li>Social Security cards for all household members</li>
                  <li>Birth certificates for all household members</li>
                  <li>Proof of income (pay stubs, benefit letters, etc.)</li>
                  <li>Bank statements</li>
                  <li>Tax returns from the previous year</li>
                  <li>Current lease or rental agreement</li>
                </ul>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Need Help With Your Application?</h4>
                  <p className="text-sm text-gray-600">Our housing specialists can guide you through the application process and help you find the right program for your needs.</p>
                  <button className="mt-3 text-primary font-medium text-sm hover:underline inline-flex items-center">
                    Request Assistance <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <CallToAction />
      </div>
    </>
  );
}
