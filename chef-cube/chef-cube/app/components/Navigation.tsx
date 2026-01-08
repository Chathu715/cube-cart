"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHome, IoGrid, IoAdd, IoRestaurant } from "react-icons/io5";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: IoHome },
    { href: "/recipes", label: "All Recipes", icon: IoGrid },
    { href: "/add", label: "Add Recipe", icon: IoAdd },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <IoRestaurant className="text-2xl text-yellow-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              ChefCube
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all
                    ${isActive
                      ? 'bg-yellow-400/20 text-yellow-400'
                      : 'hover:bg-white/10 text-gray-300 hover:text-white'
                    }
                  `}
                >
                  <Icon className="text-lg" />
                  <span className="hidden md:inline text-sm font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
