import React from 'react';
import { Phone, Wifi, Battery, Signal } from 'lucide-react';
import { useLocation } from 'wouter';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [location] = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    switch(true) {
      case location === '/':
        return 'Home';
      case location === '/search':
        return 'Property Search';
      case location === '/swipe':
        return 'Property Match';
      case location === '/saved':
        return 'Saved Properties';
      case location === '/housing-programs':
        return 'Housing Programs';
      case location.startsWith('/property/'):
        return 'Property Details';
      default:
        return 'AffordableHomes';
    }
  };
  
  return (
    <div className="max-w-[375px] mx-auto my-8 overflow-hidden">
      <div className="rounded-[40px] overflow-hidden shadow-xl border-8 border-gray-800 h-[700px] bg-gray-800 relative">
        {/* Phone speaker + camera */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 z-20 flex justify-center items-center">
          <div className="w-32 h-4 bg-black rounded-b-xl"></div>
        </div>
        
        {/* Status bar */}
        <div className="bg-gray-900 py-2 px-4 text-white flex justify-between items-center z-10">
          <div className="text-xs">9:41 AM</div>
          <div className="flex items-center space-x-1">
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={14} />
          </div>
        </div>
        
        {/* App header */}
        <div className="bg-primary text-white p-3 flex items-center justify-center">
          <div className="font-bold text-lg">{getPageTitle()}</div>
        </div>
        
        {/* App content - scrollable area */}
        <div className="bg-gray-100 h-[590px] overflow-y-auto">
          {children}
        </div>
        
        {/* App navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-10">
          <NavIcon icon={<HomeIcon />} active={location === '/'} />
          <NavIcon icon={<SearchIcon />} active={location === '/search'} />
          <NavIcon icon={<SwipeIcon />} active={location === '/swipe'} />
          <NavIcon icon={<HeartIcon />} active={location === '/saved'} />
          <NavIcon icon={<ProfileIcon />} active={location === '/profile'} />
        </div>
      </div>
    </div>
  );
}

// Navigation icons
function NavIcon({ icon, active }: { icon: React.ReactNode, active: boolean }) {
  return (
    <div className={`flex items-center justify-center w-10 h-10 ${active ? 'text-primary' : 'text-gray-400'}`}>
      {icon}
    </div>
  );
}

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

function SwipeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8"></polyline>
      <line x1="4" y1="20" x2="21" y2="3"></line>
      <polyline points="21 16 21 21 16 21"></polyline>
      <line x1="15" y1="15" x2="21" y2="21"></line>
      <line x1="4" y1="4" x2="9" y2="9"></line>
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5"></circle>
      <path d="M20 21a8 8 0 1 0-16 0"></path>
    </svg>
  );
}