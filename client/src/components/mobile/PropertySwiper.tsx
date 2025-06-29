import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, X, Heart, Star, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { mockProperties } from "./mockData";

// Minimum distance required for a swipe to count
const MIN_SWIPE_DISTANCE = 50;

export default function PropertySwiper() {
  // AI-generated property images that are more realistic for affordable housing
  const propertyImages = [
    'https://placehold.co/800x500/e9e9e9/ff7a08?text=Parkside+Commons',
    'https://placehold.co/800x500/e9e9e9/ff7a08?text=Harmony+Heights',
    'https://placehold.co/800x500/e9e9e9/ff7a08?text=Golden+Horizons',
    'https://placehold.co/800x500/e9e9e9/ff7a08?text=Riverfront+Townhomes',
    'https://placehold.co/800x500/e9e9e9/ff7a08?text=Oakwood+Veterans+Studios',
    'https://placehold.co/800x500/e9e9e9/ff7a08?text=Sunset+Garden+Apartments',
    'https://placehold.co/800x500/e9e9e9/ff7a08?text=Maple+Street+Co-op'
  ];
  
  // Use the mock properties data with our reliable images
  const properties = mockProperties.map((property, index) => ({
    ...property,
    imageUrls: [propertyImages[index % propertyImages.length]]
  }));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const currentProperty = properties[currentIndex];
  const isLastProperty = currentIndex === properties.length - 1;

  useEffect(() => {
    console.log("Current property:", currentProperty?.title);
  }, [currentIndex, currentProperty]);
  
  // Reset state when swipe is finished
  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => {
        setDirection(null);
        
        if (direction === 'right') {
          // Save the property in a real implementation
          toast({
            title: "Property saved!",
            description: "Property has been added to your saved list.",
          });
        }
        
        if (!isLastProperty) {
          setCurrentIndex(prev => prev + 1);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [direction, isLastProperty, toast]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setHasInteracted(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current === null || direction) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startXRef.current - currentX;
    
    if (Math.abs(diff) > 5) {
      if (cardRef.current) {
        const rotate = diff / 10;
        const translateX = -diff;
        cardRef.current.style.transform = `translateX(${translateX}px) rotate(${rotate}deg)`;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startXRef.current - endX;
    
    if (Math.abs(diff) > MIN_SWIPE_DISTANCE) {
      if (diff > 0) {
        // Swiped left (dislike)
        setDirection('left');
        if (cardRef.current) {
          cardRef.current.style.transform = `translateX(-150%) rotate(-30deg)`;
        }
      } else {
        // Swiped right (like)
        setDirection('right');
        if (cardRef.current) {
          cardRef.current.style.transform = `translateX(150%) rotate(30deg)`;
        }
      }
    } else {
      // Reset position if swipe wasn't far enough
      if (cardRef.current) {
        cardRef.current.style.transform = '';
      }
    }
    
    startXRef.current = null;
  };

  const handleSwipe = (dir: 'left' | 'right') => {
    setDirection(dir);
    setHasInteracted(true);
    if (cardRef.current) {
      if (dir === 'left') {
        cardRef.current.style.transform = `translateX(-150%) rotate(-30deg)`;
      } else {
        cardRef.current.style.transform = `translateX(150%) rotate(30deg)`;
      }
    }
  };

  const handleDetails = () => {
    if (currentProperty) {
      setLocation(`/property/${currentProperty.id}`);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  if (!properties.length) {
    return (
      <div className="w-full h-[calc(100vh-200px)] flex justify-center items-center">
        <div className="text-center">
          <Home className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
          <h3 className="text-lg font-medium mb-2">No properties available</h3>
          <p className="text-sm text-muted-foreground">
            Check back soon for new listings
          </p>
        </div>
      </div>
    );
  }

  if (isLastProperty && direction) {
    return (
      <div className="w-full h-[calc(100vh-200px)] flex justify-center items-center">
        <div className="text-center">
          <Home className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
          <h3 className="text-lg font-medium mb-2">You've seen all properties</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check back soon for new listings
          </p>
          <Button onClick={() => {
            setCurrentIndex(0);
            setDirection(null);
          }}>Start Over</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">      
      <div 
        className="relative h-[450px] w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute top-0 right-4 left-4 h-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md z-10 rounded-t-lg shadow-sm flex items-center justify-between px-3">
          <span className="text-sm font-medium text-primary">Property Match</span>
          <span className="text-xs text-muted-foreground">{currentIndex + 1} of {properties.length}</span>
        </div>
        
        {/* Gesture hint overlay - only visible initially */}
        {currentIndex === 0 && !hasInteracted && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white px-6 bg-primary/90 rounded-xl py-4 shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-center mb-4">
                <svg width="70" height="70" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
                  <path d="M28 40H52M52 40L40 28M52 40L40 52" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-xl font-semibold mb-2">Find Your Perfect Match</p>
              <p className="text-sm">Swipe to browse available properties</p>
            </div>
          </div>
        )}
        
        <Card 
          ref={cardRef}
          className={`absolute inset-0 overflow-hidden transition-transform duration-300 shadow-xl rounded-xl ${
            direction === 'left' ? 'border-destructive' : 
            direction === 'right' ? 'border-primary' : ''
          }`}
        >
          {currentProperty && (
            <>
              <div 
                className="w-full h-64 bg-cover bg-center" 
                style={{ backgroundImage: `url(${currentProperty.imageUrls[0]})` }}
              >
                <div className="p-3 flex justify-between pt-12">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm">
                    {currentProperty.programType}
                  </Badge>
                  
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 stroke-yellow-400" />
                    {currentProperty.rating}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold line-clamp-1">{currentProperty.title}</h3>
                
                <div className="flex items-center text-muted-foreground text-sm mt-1 mb-2">
                  <span>{currentProperty.city}, {currentProperty.state}</span>
                </div>
                
                <div className="text-2xl font-bold text-primary mb-2">
                  {formatPrice(currentProperty.price)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">/month</span>
                </div>
                
                <div className="flex gap-3 mb-3">
                  <Badge variant="outline">{currentProperty.bedrooms} bed</Badge>
                  <Badge variant="outline">{currentProperty.bathrooms} bath</Badge>
                  <Badge variant="outline">{currentProperty.squareFeet} sq ft</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{currentProperty.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-1">
                  {currentProperty.amenities.slice(0, 3).map((amenity: string, index: number) => (
                    <Badge key={index} variant="secondary">{amenity}</Badge>
                  ))}
                  {currentProperty.amenities.length > 3 && (
                    <Badge variant="secondary">+{currentProperty.amenities.length - 3} more</Badge>
                  )}
                </div>
              </div>
            </>
          )}
          
          {direction === 'left' && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-destructive/20 z-10">
              <div className="bg-destructive text-white p-4 rounded-full transform rotate-12 scale-150 shadow-lg">
                <X className="w-10 h-10" />
              </div>
            </div>
          )}
          
          {direction === 'right' && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary/20 z-10">
              <div className="bg-primary text-white p-4 rounded-full transform -rotate-12 scale-150 shadow-lg">
                <Heart className="w-10 h-10" />
              </div>
            </div>
          )}
        </Card>
      </div>
      
      <div className="flex justify-center gap-4 mt-4 px-4 pb-4">
        <Button 
          onClick={() => handleSwipe('left')} 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-destructive text-destructive hover:bg-destructive hover:text-white shadow-sm"
        >
          <X className="w-6 h-6" />
        </Button>
        
        <Button 
          onClick={handleDetails} 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white shadow-sm"
        >
          <Info className="w-6 h-6" />
        </Button>
        
        <Button 
          onClick={() => handleSwipe('right')} 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-primary text-primary hover:bg-primary hover:text-white shadow-sm"
        >
          <Heart className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}