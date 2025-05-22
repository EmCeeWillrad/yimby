import { useState } from "react";
import { Helmet } from "react-helmet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MoveHorizontal } from "lucide-react";
import PropertyMatchCard, { matchProperties } from "@/components/mobile/PropertyMatchCard";
import { useToast } from "@/hooks/use-toast";

export default function PropertySwipe() {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentProperty = matchProperties[currentIndex];
  const isLastProperty = currentIndex === matchProperties.length - 1;
  
  const handleSwipeLeft = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('left');
    
    // Move to next property after animation
    setTimeout(() => {
      setDirection(null);
      if (!isLastProperty) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Reset to first property if we've seen all
        setCurrentIndex(0);
        toast({
          title: "You've seen all properties",
          description: "Starting over with the first property."
        });
      }
      setIsAnimating(false);
    }, 500);
  };
  
  const handleSwipeRight = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('right');
    
    // Show save notification and move to next property
    setTimeout(() => {
      toast({
        title: "Property saved!",
        description: "Property has been added to your saved list."
      });
      
      setDirection(null);
      if (!isLastProperty) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Reset to first property if we've seen all
        setCurrentIndex(0);
        toast({
          title: "You've seen all properties",
          description: "Starting over with the first property."
        });
      }
      setIsAnimating(false);
    }, 500);
  };
  
  const handleDetails = () => {
    toast({
      title: "Property Details",
      description: "Viewing details for " + currentProperty.name
    });
  };
  
  return (
    <>
      <Helmet>
        <title>Find Your Match | AffordableHomes</title>
        <meta name="description" content="Swipe right on your dream affordable home. Find properties that match your needs with our simple swipe interface." />
      </Helmet>
      
      <div className="container mx-auto py-8">
        <div className={isMobile ? "" : "mb-8 text-center"}>
          <h1 className="text-3xl font-bold mb-4">Property Match</h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            This feature is optimized for mobile devices. For the best experience, 
            please visit on your smartphone or make your browser window narrower.
          </p>
          
          <div className="flex justify-center gap-4 mt-4 mb-6">
            <Link href="/search">
              <Button variant="outline">Traditional Search</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
          </div>
        </div>
        
        <div className="flex justify-center items-center mb-4">
          <div className="p-2 bg-background rounded-full shadow-sm mr-3">
            <MoveHorizontal className="w-5 h-5" />
          </div>
          <span className="text-sm text-muted-foreground">Swipe left or right, or use the buttons below</span>
        </div>
        
        <div className="flex items-center justify-between px-4 mb-2">
          <div className="text-sm font-medium text-primary">Property Match</div>
          <div className="text-xs text-muted-foreground">{currentIndex + 1} of {matchProperties.length}</div>
        </div>
        
        <div className="max-w-md mx-auto">
          <PropertyMatchCard 
            property={currentProperty}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onDetails={handleDetails}
            isAnimating={isAnimating}
            direction={direction}
          />
        </div>
      </div>
    </>
  );
}