import { Link, useLocation } from "wouter";

export default function MobileAppBar() {
  const [location] = useLocation();

  const NavItem = ({ href, icon, label }: { href: string; icon: string; label: string }) => {
    const isActive = location === href;
    return (
      <Link href={href}>
        <a className={`flex flex-col items-center p-2 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
          <i className={`${icon} text-xl`}></i>
          <span className="text-xs mt-1">{label}</span>
        </a>
      </Link>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-2 md:hidden z-40">
      <div className="flex justify-around">
        <NavItem href="/" icon="fas fa-home" label="Home" />
        <NavItem href="/search" icon="fas fa-search" label="Search" />
        <NavItem href="/saved" icon="fas fa-heart" label="Saved" />
        <NavItem href="/profile" icon="fas fa-user" label="Profile" />
      </div>
    </div>
  );
}
