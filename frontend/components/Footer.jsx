"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-900 text-stone-400 relative overflow-hidden pt-12 pb-8 px-4 sm:px-6 lg:px-8 w-full">
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center overflow-hidden">
        <div className="mb-6 flex items-center justify-center">
          <Image
            src="/orange-logo.png"
            alt="Servd Logo"
            width={80}
            height={80}
            className="h-auto object-contain transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-4 mb-8 text-center w-full">
          <p className="text-sm text-stone-500 font-light max-w-xs sm:max-w-sm tracking-wide">
            Elevating modern culinary workflows with cinematic AI precision.
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-medium text-stone-400 mb-8 w-full">
          <Link
            href="/dashboard"
            className="hover:text-orange-500 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/recipes"
            className="hover:text-orange-500 transition-colors"
          >
            Recipes
          </Link>
          <Link
            href="/pantry"
            className="hover:text-orange-500 transition-colors"
          >
            Pantry
          </Link>
        </div>

        <div className="w-full relative flex items-center justify-center select-none mb-8 overflow-hidden">
          <h2 className="text-[18vw] font-black tracking-wide uppercase leading-none font-sans text-center select-none pointer-events-none bg-linear-to-b from-stone-800/60 via-stone-800/22 to-transparent bg-clip-text text-transparent p-1">
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
