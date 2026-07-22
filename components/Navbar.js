"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Home, Bot, GraduationCap, Info, LogIn, UserPlus } from "lucide-react";
import Button from "@/components/Button";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "AI Finder", href: "/ai", icon: Bot },
  { name: "Tutors", href: "/tutor", icon: GraduationCap },
  { name: "About Us", href: "/about", icon: Info },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Permanent Typical Full-Width Fixed Header */}
      <header className="w-full fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-xl font-bold tracking-tight uppercase text-color3 group-hover:text-color4 transition-colors duration-300">
              Ustaad
            </span>
            <span className="text-xl font-black text-color4 group-hover:text-color3 transition-colors duration-300">
              .
            </span>
          </Link>

          {/* Desktop Navigation Links */}
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
            <Button href="/signup">
              Become a Tutor
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="text-color3 hover:text-color4 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Appearing from Right */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">

            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Slide-in Right Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto ml-auto"
            >
              <div>
                {/* Header with Logo and Close Button */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-1">
                    <span className="text-xl font-bold tracking-tight uppercase text-color3">
                      Ustaad
                    </span>
                    <span className="text-xl font-black text-color4">.</span>
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="pt-6 space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                    Navigation
                  </p>
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#FF4D00] hover:bg-orange-50/70 transition-all group"
                      >
                        <IconComponent className="w-4 h-4 text-slate-400 group-hover:text-[#FF4D00] transition-colors" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign in</span>
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#FF4D00] hover:bg-[#e04400] transition-all shadow-md shadow-orange-950/10"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Become a Tutor</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
