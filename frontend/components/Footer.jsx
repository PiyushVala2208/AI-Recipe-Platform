"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-900 text-stone-400 relative overflow-hidden pt-16 pb-8 px-4 sm:px-8 w-full">
       <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center isolation-auto">
        <div className="mb-6 flex items-center justify-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <Image
              src="/orange-logo.png"
              alt="Servd Logo"
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mb-8 text-center w-full max-w-md px-2">
          <p className="text-xs sm:text-sm text-stone-500 font-light tracking-wide leading-relaxed">
            Elevating modern culinary workflows with cinematic AI precision.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-stone-400 mb-12 w-full max-w-sm px-4">
          <Link
            href="/dashboard"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="/recipes"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            Recipes
          </Link>
          <Link
            href="/pantry"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            Pantry
          </Link>
        </div>

        <div className="w-full relative flex items-center justify-center select-none mb-6 overflow-hidden max-w-full">
          <h2 className="text-[18vw] xl:text-[220px] 2xl:text-[260px] font-black tracking-tighter uppercase leading-none font-sans text-center select-none pointer-events-none bg-linear-to-b from-stone-800/80 via-stone-800/50 to-transparent bg-clip-text text-transparent p-1 whitespace-nowrap">
            SERVD
          </h2>
        </div>

        <div className="w-full border-t border-stone-900 mt-4 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] font-medium text-stone-600 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} SERVD AI. All rights reserved.
          </p>

          <p className="text-stone-500 text-sm font-light flex items-center gap-1.5">
            <span>Made with</span>
            <span className="text-orange-600 text-[16px]">💕</span>
            <span>by</span>
            <span
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-orange-500 text-2xl tracking-wide pl-1 font-bold italic hover:text-stone-200 transition-colors duration-500"
            >
              pd
            </span>
          </p>

          <div className="flex gap-4 text-[9px] font-black text-stone-600 uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
