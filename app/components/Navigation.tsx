"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoHome, IoGrid, IoCube, IoInformationCircle, IoMail, IoHelpCircle, IoCart, IoPerson, IoLogOut, IoLogIn, IoPersonAdd, IoSettings } from "react-icons/io5";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import CartSidebar from "./CartSidebar";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { getCartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const cartCount = getCartCount();

  const links = [
    { href: "/", label: "Home", icon: IoHome },
    { href: "/products", label: "Products", icon: IoGrid },
    { href: "/about", label: "About", icon: IoInformationCircle },
    { href: "/how-it-works", label: "How It Works", icon: IoCube },
    { href: "/contact", label: "Contact", icon: IoMail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <IoCube className="text-2xl text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              CubeCart
            </span>
          </Link>

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

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-white/10 text-gray-300 hover:text-white"
            >
              <IoCart className="text-lg" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
              <span className="hidden md:inline text-sm font-medium">Cart</span>
            </button>

            {/* User Menu */}
            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-white/10 text-gray-300 hover:text-white"
                >
                  <IoPerson className="text-lg" />
                  <span className="hidden md:inline text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 glass-strong rounded-lg shadow-lg border border-white/10 py-2 z-50">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    <Link
                      href="/account"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 transition text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <IoSettings className="text-lg" />
                      My Account
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 transition text-sm text-yellow-400"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <IoSettings className="text-lg" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                        router.push('/');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-white/10 transition text-sm text-red-400"
                    >
                      <IoLogOut className="text-lg" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-white/10 text-gray-300 hover:text-white"
                >
                  <IoLogIn className="text-lg" />
                  <span className="hidden md:inline text-sm font-medium">Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition"
                >
                  <IoPersonAdd className="text-lg" />
                  <span className="hidden md:inline text-sm">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
