'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/strategies/create", label: "Create Strategy" },
    { href: "/strategies", label: "View Strategies" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold">Strategy App</h2>
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