import { Link, useLocation } from "wouter";
import { Home, Search, Heart, User, Shuffle } from "lucide-react";

export default function MobileAppBar() {
  const [location] = useLocation();

  const NavItem = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => {
    const isActive = location === href;
    return (
      <Link href={href}>
        <a className={`flex flex-col items-center p-2 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
          {children}
          <span className="text-xs mt-1">{label}</span>
        </a>
      </Link>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 p-2 md:hidden z-40">
      <div className="flex justify-around">
        <NavItem href="/" label="Home">
          <Home size={20} />
        </NavItem>
        <NavItem href="/search" label="Search">
          <Search size={20} />
        </NavItem>
        <NavItem href="/swipe" label="Swipe">
          <Shuffle size={20} />
        </NavItem>
        <NavItem href="/saved" label="Saved">
          <Heart size={20} />
        </NavItem>
        <NavItem href="/profile" label="Profile">
          <User size={20} />
        </NavItem>
      </div>
    </div>
  );
}
