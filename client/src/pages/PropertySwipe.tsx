import { Helmet } from "react-helmet";
import PropertySwiper from "@/components/mobile/PropertySwiper";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MoveHorizontal } from "lucide-react";

export default function PropertySwipe() {
  const isMobile = useIsMobile();
  
  return (
    <>
      <Helmet>
        <title>Find Your Match | AffordableHomes</title>
        <meta name="description" content="Swipe right on your dream affordable home. Find properties that match your needs with our simple swipe interface." />
      </Helmet>
      
      <div className="container mx-auto py-8">
        {!isMobile && (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Property Match</h1>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
              This feature is optimized for mobile devices. For the best experience, 
              please visit on your smartphone or make your browser window narrower.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/search">
                <Button variant="outline">Traditional Search</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Return to Home</Button>
              </Link>
            </div>
          </div>
        )}
        
        <div className={isMobile ? "" : "border rounded-lg p-4 max-w-md mx-auto bg-muted/30"}>
          <div className={isMobile ? "" : "flex items-center justify-center mb-4 text-muted-foreground"}>
            {!isMobile && (
              <>
                <div className="p-2 bg-background rounded-full shadow-sm mr-3">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
                <span className="text-sm">Swipe left or right, or use the buttons below</span>
              </>
            )}
          </div>
          
          <div className={isMobile ? "" : "border rounded-lg overflow-hidden bg-background"}>
            <PropertySwiper />
          </div>
        </div>
      </div>
    </>
  );
}