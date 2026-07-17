"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-color3 text-color1 pt-16 pb-8 px-4 md:px-8 lg:px-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Logo & Description */}
          <div className="space-y-4 text-left">
            <Link href="/" className="inline-block text-2xl font-bold tracking-tight">
              <span className="text-color4">ustaad</span>
              <span className="text-color2">.</span>
            </Link>
            <p className="text-sm text-color1/60 leading-relaxed font-medium">
              Elite AI-assisted matchmaking for local in-person home tutoring services. We connect you with certified teachers for personalized, real-world learning.
            </p>
          </div>

          {/* Links Column 1: Explore */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-color2">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-color1/60 font-medium">
              <li>
                <Link href="#ai-search" className="hover:text-color4 transition-colors">
                  Ask AI Tutor Finder
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-color4 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-color4 transition-colors">
                  Recommended Tutors
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-color4 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Subjects */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-color2">
              Popular Subjects
            </h4>
            <ul className="space-y-2.5 text-sm text-color1/60 font-medium">
              <li>
                <span className="hover:text-color4 cursor-pointer transition-colors block">Mathematics</span>
              </li>
              <li>
                <span className="hover:text-color4 cursor-pointer transition-colors block">Sciences (Physics, Chemistry)</span>
              </li>
              <li>
                <span className="hover:text-color4 cursor-pointer transition-colors block">English & IELTS Prep</span>
              </li>
              <li>
                <span className="hover:text-color4 cursor-pointer transition-colors block">Graphic Design & UI/UX</span>
              </li>
              <li>
                <span className="hover:text-color4 cursor-pointer transition-colors block">Extracurriculars (Chess, Music)</span>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Contact */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-color2">
              Contact & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-color1/60 font-medium">
              <li className="flex flex-col">
                <span className="text-xs text-color1/40">Email Us</span>
                <a href="mailto:support@ustaad.com" className="hover:text-color4 transition-colors">
                  support@ustaad.com
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-color1/40">Call Us</span>
                <span className="hover:text-color4 transition-colors">+92 (300) 123-4567</span>
              </li>
              <li className="text-xs text-color1/40 pt-1 leading-relaxed">
                * Note: We focus strictly on local, in-person tutoring. Online tutoring options are not supported.
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-color1/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-color1/40 font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} Ustaad. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-color1/40 font-medium">
            <Link href="/" className="hover:text-color4 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-color4 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-color4 transition-colors">Cookie Preferences</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
