import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = location === href;
    return (


      
      <Link href={href}>
        <a className={`font-medium ${isActive ? 'text-primary' : 'hover:text-primary'}`}>
          {children}
        </a>
      </Link>
    );
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <div className="text-primary mr-2">
                  <i className="fas fa-home text-3xl"></i>
                </div>
                <div>
                  <span className="font-heading font-bold text-xl text-primary">AffordableHomes</span>
                </div>
              </a>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/search">Find Rentals</NavLink>
            <NavLink href="/housing-programs">Housing Programs</NavLink>
            <NavLink href="/resources">Resources</NavLink>
            <NavLink href="/about">About Us</NavLink>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <a className="hidden md:block font-medium text-secondary hover:underline">
                Sign In
              </a>
            </Link>
            <Link href="/register">
              <Button variant="default" className="hidden md:block bg-primary hover:bg-primary/90 text-white font-medium">
                Sign Up
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden p-2" aria-label="Menu">
                  <i className="fas fa-bars text-2xl"></i>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigate to different sections of the site
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Link href="/">
                    <a className="font-medium text-lg py-2 hover:text-primary">Home</a>
                  </Link>
                  <Link href="/search">
                    <a className="font-medium text-lg py-2 hover:text-primary">Find Rentals</a>
                  </Link>
                  <Link href="/housing-programs">
                    <a className="font-medium text-lg py-2 hover:text-primary">Housing Programs</a>
                  </Link>
                  <Link href="/resources">
                    <a className="font-medium text-lg py-2 hover:text-primary">Resources</a>
                  </Link>
                  <Link href="/about">
                    <a className="font-medium text-lg py-2 hover:text-primary">About Us</a>
                  </Link>
                  <Link href="/saved">
                    <a className="font-medium text-lg py-2 hover:text-primary">Saved Properties</a>
                  </Link>
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <Link href="/login">
                      <a className="font-medium text-lg py-2 hover:text-primary">Sign In</a>
                    </Link>
                    <Link href="/register">
                      <a className="block w-full mt-2">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
                          Sign Up
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
