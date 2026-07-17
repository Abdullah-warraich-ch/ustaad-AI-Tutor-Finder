"use client";

import React from "react";
import { Search, GraduationCap, Calendar } from "lucide-react";
import Button from "./Button";

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 lg:px-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-color3 tracking-tight mb-12">
          How it works?
        </h2>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">

          {/* Step 1: Find Home Tutor using AI */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-color4/10 flex items-center justify-center text-color4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-color3">
              Find Home Tutor using AI
            </h3>
            <p className="text-sm text-color3/60 leading-relaxed max-w-[260px] mx-auto font-medium">
              Search or let our smart AI assistant instantly match you with the perfect <strong className="text-color3 font-semibold">in-person home tutor</strong> near you.
            </p>
          </div>

          {/* Step 2: In-Person Trial */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-color2/10 flex items-center justify-center text-color2">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-color3">
              In-person trial lesson
            </h3>
            <p className="text-sm text-color3/60 leading-relaxed max-w-[260px] mx-auto font-medium">
              We do not offer online tutoring. Schedule a trial <strong className="text-color3 font-semibold">in-home lesson</strong> to check the fit without obligation.
            </p>
          </div>

          {/* Step 3: Book home lesson */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-color3/10 flex items-center justify-center text-color3">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-color3">
              Book and buy access
            </h3>
            <p className="text-sm text-color3/60 leading-relaxed max-w-[260px] mx-auto font-medium">
              Choose the schedule and days that suit you best. Book your private <strong className="text-color3 font-semibold">home lesson</strong> and buy access.
            </p>
          </div>

        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4 border-t border-color3/5">
          <Button
            href="#ai-search"
            bgColor="bg-color4"
            textColor="text-color1"
            hoverBgColor="hover:bg-color4/90"
            padding="px-10 py-3.5"
            textSize="text-sm font-semibold"
          >
            Find Home Tutor with AI
          </Button>
        </div>

      </div>
    </section>
  );
}
