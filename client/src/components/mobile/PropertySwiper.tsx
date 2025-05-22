import { useState, useRef, useEffect } from "react";
import { Property } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, X, Heart, Star, DollarSign, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

// Add touch gesture support
const MIN_SWIPE_DISTANCE = 50;

export default function PropertySwiper() {
  const { data: properties = [] } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const currentProperty = properties[currentIndex];
  const isLastProperty = currentIndex === properties.length - 1;

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

  if (!currentProperty) {
    return (
      <div className="w-full h-[calc(100vh-200px)] flex justify-center items-center">
        <div className="text-center">
          <Home className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
          <h3 className="text-lg font-medium mb-2">You've seen all properties</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check back soon for new listings
          </p>
          <Button onClick={() => setCurrentIndex(0)}>Start Over</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="w-full max-w-md mx-auto py-6 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Find Your Match</h2>
      
      <div 
        className="relative h-[500px] w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Card 
          ref={cardRef}
          className={`absolute inset-0 overflow-hidden transition-transform duration-300 ${
            direction === 'left' ? 'border-destructive' : 
            direction === 'right' ? 'border-primary' : ''
          }`}
        >
          <div 
            className="w-full h-64 bg-cover bg-center" 
            style={{ backgroundImage: `url(${currentProperty.imageUrls?.[0] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'})` }}
          >
            <div className="p-3 flex justify-between">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                {currentProperty.programType}
              </Badge>
              
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 stroke-yellow-400" />
                {currentProperty.rating || 4.5}
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
              {currentProperty.amenities?.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="secondary">{amenity}</Badge>
              ))}
              {(currentProperty.amenities?.length || 0) > 3 && (
                <Badge variant="secondary">+{(currentProperty.amenities?.length || 0) - 3} more</Badge>
              )}
            </div>
          </div>
          
          {direction === 'left' && (
            <div className="absolute top-4 right-4 bg-destructive text-white p-2 rounded-full transform rotate-12">
              <X className="w-8 h-8" />
            </div>
          )}
          
          {direction === 'right' && (
            <div className="absolute top-4 left-4 bg-primary text-white p-2 rounded-full transform -rotate-12">
              <Heart className="w-8 h-8" />
            </div>
          )}
        </Card>
      </div>
      
      <div className="flex justify-center gap-4 mt-6">
        <Button 
          onClick={() => handleSwipe('left')} 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-destructive text-destructive hover:bg-destructive hover:text-white"
        >
          <X className="w-6 h-6" />
        </Button>
        
        <Button 
          onClick={handleDetails} 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white"
        >
          <Info className="w-6 h-6" />
        </Button>
        
        <Button 
          onClick={() => handleSwipe('right')} 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Heart className="w-6 h-6" />
        </Button>
      </div>
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Property {currentIndex + 1} of {properties.length}</p>
      </div>
    </div>
  );
}