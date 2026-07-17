"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "#" },
  { name: "Tutors", href: "#" },
  { name: "About Us", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      {/* Floating Rounded Navbar Container - Width and height reduced, no shadows */}
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md border border-color3/10 rounded-full px-6 py-2 flex items-center justify-between transition-all duration-300">
        
        {/* Brand Logo - Styled as a typographic logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-lg font-semibold uppercase text-color4 group-hover:text-color3 transition-colors duration-300">
            Ustaad
          </span>
          <span className="text-lg font-black text-color3 group-hover:text-color4 transition-colors duration-300">
            .
          </span>
        </Link>

        {/* Desktop Navigation Links with Framer Motion Underline */}
        <div 
          className="hidden md:flex items-center gap-8"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="relative text-sm font-semibold text-color3 py-1"
            >
              {link.name}
              {hoveredIndex === idx && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-color4"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-semibold text-color3 hover:text-color4 transition-colors"
          >
            Sign in
          </Link>
          {/* Reusable Button - uses defaults (bg-color4, text-color1, no transform on hover) */}
          <Button href="/login">
            Sign up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-color3 hover:text-color4 transition-colors p-1"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Rounded beneath) - Width reduced, no shadows */}
      {isOpen && (
        <div className="md:hidden mt-2 max-w-5xl mx-auto bg-white/95 backdrop-blur-lg border border-color3/10 rounded-2xl p-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-color3 hover:text-color4 transition-colors py-1 border-b border-color3/5"
            >
              Home
            </Link>
            <Link 
              href="#" 
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-color3 hover:text-color4 transition-colors py-1 border-b border-color3/5"
            >
              Courses
            </Link>
            <Link 
              href="#" 
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-color3 hover:text-color4 transition-colors py-1 border-b border-color3/5"
            >
              Tutors
            </Link>
            <Link 
              href="#" 
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-color3 hover:text-color4 transition-colors py-1"
            >
              About Us
            </Link>
          </div>
          
          <div className="flex flex-col gap-3 pt-4 border-t border-color3/10">
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-base font-semibold text-color3 hover:text-color4 transition-colors py-2"
            >
              Sign in
            </Link>
            {/* Mobile Signup Button using Reusable Button */}
            <Button 
              href="/login" 
              onClick={() => setIsOpen(false)}
              textSize="text-base"
              padding="py-3"
              className="w-full"
            >
              Sign up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
