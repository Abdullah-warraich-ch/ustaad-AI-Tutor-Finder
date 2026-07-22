"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import SignUpForm from "@/components/SignUpForm";

export default function SignUp() {
  return (
    <div className="h-screen w-full overflow-hidden bg-color1 flex flex-col md:flex-row transition-all duration-300 font-sans">
      
      {/* Left Column (Brand & Info Showcase Pane) */}
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
            Join Ustaad as a Verified Home & Online Tutor.
          </h1>
          <p className="text-color1/80 text-xs lg:text-sm max-w-xs font-light leading-relaxed">
            Create your teaching profile to connect with parents and students looking for quality private tutors in Lahore.
          </p>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-[11px] text-color1/60">
          © {new Date().getFullYear()} ustaad.eu. All rights reserved
        </div>
      </div>

      {/* Right Column (Form Pane) */}
      <div className="w-full md:w-7/12 h-full h-screen overflow-y-hidden bg-color1 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="md:hidden flex items-center gap-1">
            <span className="text-lg font-bold uppercase text-color4">ustaad</span>
            <span className="text-lg font-bold text-color2">.</span>
          </Link>

          <Link href="/" className="ml-auto text-color3/60 hover:text-color4 transition-colors p-1.5 rounded-full hover:bg-color3/5">
            <X className="w-5 h-5" />
          </Link>
        </div>

        {/* Modular SignUpForm Component */}
        <SignUpForm />

        {/* Footer padding spacer */}
        <div className="h-2"></div>
      </div>

    </div>
  );
}
