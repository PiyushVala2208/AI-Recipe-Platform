"use client";

import { useState } from "react";
import Link from "next/link"; // Fixed import
import { usePathname } from "next/navigation";
import {
  Cookie,
  LayoutDashboardIcon,
  Refrigerator,
  Menu,
  X,
  ChefHat,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/recipes", label: "My Recipes", icon: Cookie },
  { href: "/pantry", label: "My Pantry", icon: Refrigerator },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 h-full">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-1.5 h-16 text-sm font-medium transition-colors duration-300 group cursor-pointer ${
                isActive
                  ? "text-stone-900"
                  : "text-stone-500 hover:text-orange-600"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform duration-300 ${isActive ? "text-orange-600" : "group-hover:scale-110"}`}
              />
              <span>{item.label}</span>

              {/* Premium Animated Underline Line */}
              <span
                className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-orange-600 rounded-t-full transition-all duration-300 ease-out origin-center ${
                  isActive
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-50"
                }`}
              />
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-stone-600 hover:text-orange-600 hover:bg-stone-100 rounded-xl transition-all cursor-pointer shrink-0"
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 bg-stone-900/20 backdrop-blur-xs z-40 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Responsive Mobile Drawer Panel */}
      <div
        className={`fixed top-16 right-0 w-full sm:w-80 h-[calc(100vh-4rem)] bg-white border-l border-stone-200 p-6 z-50 transition-transform duration-300 ease-in-out md:hidden shadow-xl flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 px-3 mb-4">
            Navigation Menu
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all group ${
                  isActive
                    ? "bg-orange-50 text-orange-600 border border-orange-100/50"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-orange-600" : "text-stone-400 group-hover:text-stone-600"}`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-stone-100 pt-4 flex items-center justify-center gap-2 text-stone-400 text-xs">
          <ChefHat className="w-4 h-4" />
          <span>Curated Cooking Experience</span>
        </div>
      </div>
    </>
  );
}
