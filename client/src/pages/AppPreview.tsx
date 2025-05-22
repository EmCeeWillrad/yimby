import { Helmet } from "react-helmet";
import AppShell from "@/components/mobile/AppShell";
import PropertySwiper from "@/components/mobile/PropertySwiper";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function AppPreview() {
  return (
    <>
      <Helmet>
        <title>Mobile App Preview | AffordableHomes</title>
        <meta name="description" content="Experience the AffordableHomes mobile app interface with our Tinder-like property swiping feature." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">AffordableHomes Mobile App</h1>
            <p className="text-lg mb-6 max-w-2xl mx-auto text-muted-foreground">
              Experience our Tinder-like property swiping feature in the mobile app interface.
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Link href="/">
                <Button variant="outline">Back to Website</Button>
              </Link>
              <Link href="/swipe">
                <Button>Try Swiping Feature</Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Find Your Perfect Home</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 3 21 3 21 8"></polyline>
                      <line x1="4" y1="20" x2="21" y2="3"></line>
                      <polyline points="21 16 21 21 16 21"></polyline>
                      <line x1="15" y1="15" x2="21" y2="21"></line>
                      <line x1="4" y1="4" x2="9" y2="9"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Swipe to Discover</h3>
                    <p className="text-muted-foreground">Quickly browse properties with our intuitive swipe interface. Swipe right to save, left to skip.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Save Your Favorites</h3>
                    <p className="text-muted-foreground">All your liked properties are saved automatically for easy access later.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Personalized Recommendations</h3>
                    <p className="text-muted-foreground">Our app learns your preferences over time to show you the most relevant affordable housing options.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Location-Based Search</h3>
                    <p className="text-muted-foreground">Find affordable homes near your preferred neighborhoods, work, or essential services.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <AppShell>
                <PropertySwiper />
              </AppShell>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}