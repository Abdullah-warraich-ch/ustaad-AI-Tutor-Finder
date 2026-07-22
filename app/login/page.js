"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="h-screen w-full overflow-hidden bg-color1 flex flex-col md:flex-row transition-all duration-300 font-sans">
      
      {/* Left Column (Brand & Info Showcase) */}
      <div className="hidden md:flex w-full md:w-5/12 h-screen overflow-hidden bg-color4 text-color1 relative flex-col justify-between p-6 lg:p-10 select-none">
        
        {/* Geometric Background Ornaments */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <img
            src="/svgs/Ornament 80.svg"
            className="absolute top-[-5%] right-[-5%] w-[65%] select-none rotate-12"
            alt="Geometry Top"
          />
          <img
            src="/svgs/Ornament 80.svg"
            className="absolute bottom-[10%] left-[-10%] w-[55%] select-none -rotate-12"
            alt="Geometry Bottom"
          />
        </div>

        {/* Logo Section */}
        <div className="relative z-10 flex items-center gap-1">
          <Link href="/" className="text-xl font-black tracking-tight uppercase">Ustaad</Link>
          <span className="text-xl font-black text-color4">.</span>
        </div>

        {/* Middle text */}
        <div className="relative z-10 my-auto space-y-3">
          <h1 className="text-xl lg:text-2xl font-semibold tracking-tight leading-snug max-w-xs">
            It's good to see you!
          </h1>
          <p className="text-color1/80 text-xs lg:text-sm max-w-xs font-light leading-relaxed">
            Welcome back to Pakistan's premier AI-powered home tutoring network.
          </p>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-[11px] text-color1/60">
          © {new Date().getFullYear()} ustaad.eu. All rights reserved
        </div>
      </div>

      {/* Right Column (Login Form Pane) */}
      <div className="w-full md:w-7/12 h-full md:h-screen overflow-y-auto bg-color1 flex flex-col justify-between p-6 sm:p-10 lg:p-14">

        {/* Top Controls */}
        <div className="flex justify-end items-center mb-4">
          <Link href="/" className="text-color3/60 hover:text-color4 transition-colors p-1.5 rounded-full hover:bg-color3/5">
            <X className="w-5 h-5" />
          </Link>
        </div>

        {/* Modular LoginForm Component */}
        <LoginForm />

        {/* Bottom space wrapper to match layout */}
        <div className="h-2"></div>
      </div>

    </div>
  );
}
