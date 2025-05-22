import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">Ready to Find Your Affordable Home?</h2>
          <p className="text-white/80 text-lg mb-8">Join thousands of families who have found affordable housing through our platform. Start your search today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button className="bg-white text-primary font-medium rounded-lg px-8 py-3 hover:bg-white/90 transition">
                Start Your Search
              </Button>
            </Link>
            <Link href="/housing-programs">
              <Button variant="outline" className="border border-white text-white font-medium rounded-lg px-8 py-3 hover:bg-white/10 transition">
                Check Eligibility
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
