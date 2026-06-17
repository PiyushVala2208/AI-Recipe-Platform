"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cookie,
  LayoutDashboardIcon,
  Refrigerator,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/recipes", label: "My Recipes", icon: Cookie },
  { href: "/pantry", label: "My Pantry", icon: Refrigerator },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
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
  );
}

