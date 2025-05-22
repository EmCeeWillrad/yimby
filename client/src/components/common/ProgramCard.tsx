import { Link } from "wouter";
import { ProgramCardProps } from "@/lib/types";

export default function ProgramCard({ id, name, description, icon, iconBg }: ProgramCardProps) {
  return (
    <div className="bg-light rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`${iconBg} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
            <i className={`${icon} text-secondary text-xl`}></i>
          </div>
          <h3 className="font-heading font-semibold text-xl">{name}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href={`/housing-programs/${id}`}>
          <a className="text-secondary font-medium hover:underline inline-flex items-center">
            Learn More <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </Link>
      </div>
    </div>
  );
}
