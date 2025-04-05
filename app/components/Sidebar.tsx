'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setIsOpen: (value: boolean) => void;
}

const Sidebar = ({ isOpen, toggleSidebar, setIsOpen }: SidebarProps) => {
  const pathname = usePathname();

  const links = [
    { href: "/strategies/create", label: "Create Strategy" },
    { href: "/strategies", label: "View Strategies" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 text-white transform transition-all duration-300 z-50 sm:w-64 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:relative sm:translate-x-0`}
    >
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Strategy App</h2>
        <button
          className="sm:hidden text-white"
          onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <nav className="space-y-4 p-4">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`hover:text-blue-500 ${
                  pathname === link.href ? "text-blue-500 font-semibold" : ""
                }`}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;