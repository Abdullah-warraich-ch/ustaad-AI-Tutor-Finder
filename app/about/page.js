"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bot, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      
      {/* Navigation */}
      <Navbar />

      {/* Main Content Container - Compact & Simple */}
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 max-w-4xl mx-auto w-full space-y-12">
        
        {/* Simple Header */}
        <section className="text-center space-y-3 pt-6">
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Connecting Students with Expert Tutors in Lahore
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Ustaad is a smart tutor discovery platform designed to help parents and students find verified home and online private tutors quickly, reliably, and transparently.
          </p>
        </section>

        {/* 3 Core Highlights Cards */}
        <section className="grid sm:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF4D00] flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">AI Matchmaking</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Find tutors filtered by subject, neighborhood, price budget, and qualifications in seconds.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Verified Profiles</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Every educator profile is reviewed for academic degrees, teaching experience, and authenticity.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Direct Connections</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Connect directly with tutors without middleman commissions or hidden booking charges.
            </p>
          </div>
        </section>

        {/* Simple Mission Box */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-3 shadow-2xs text-center">
          <h2 className="text-xl font-semibold text-slate-900">Our Mission</h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            We aim to simplify education by empowering parents with transparent information and giving dedicated tutors the platform to build successful independent careers across Lahore.
          </p>
        </section>

        {/* Compact CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold">Ready to find your tutor?</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/ai"
              className="inline-flex items-center gap-2 bg-[#FF4D00] hover:bg-[#e04400] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              <Bot className="w-4 h-4 text-white" />
              <span>Try AI Finder</span>
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors border border-slate-700"
            >
              <span>Join as a Tutor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
