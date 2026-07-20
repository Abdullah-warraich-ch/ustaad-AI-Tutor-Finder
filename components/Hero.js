"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AIInput from "@/components/AIInput";

export default function Hero() {
  const [aiPrompt, setAiPrompt] = useState("");
  const router = useRouter();

  const handleAISubmit = (val) => {
    if (!val.trim()) return;
    router.push(`/ai?q=${encodeURIComponent(val)}`);
  };

  const quickSearches = [
    "Maths in Johar Town",
    "Biology in Thokar",
    "Physics in DHA",
    "English in Model Town"
  ];

  return (
    <section className="relative w-full bg-gradient-to-t from-orange-100/90 via-orange-50/50 to-white text-slate-900 pt-24 md:pt-28 pb-12 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
      
      {/* Dense Background Accent Orbs */}
      <div className="absolute top-12 right-[-5%] w-72 sm:w-[32rem] h-72 sm:h-[32rem] bg-[#FF4D00]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-5%] w-64 sm:w-[28rem] h-64 sm:h-[28rem] bg-orange-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
        
        {/* Left Column (Text & Search) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold leading-[1.15] text-slate-900 tracking-tight">
            Find the perfect <span className="text-[#FF4D00]">home tutor</span> in Lahore
          </h1>

          <p className="text-xs sm:text-base text-slate-600 font-normal max-w-xl leading-relaxed">
            Use our AI Finder to search by subject, neighborhood, or budget. Connect directly with verified private tutors near you.
          </p>

          {/* AI Search Bar */}
          <div id="ai-search" className="scroll-mt-28 space-y-3 max-w-xl">
            <AIInput
              value={aiPrompt}
              onChange={setAiPrompt}
              onSubmit={handleAISubmit}
              placeholder="Type or speak what tutor you need..."
              submitButtonText="Search"
              mockFallbackText="Need a qualified Biology teacher in Thokar Niaz Baig"
              className="w-full"
            />

            {/* Simple Quick Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-slate-400">Popular:</span>
              {quickSearches.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAISubmit(tag)}
                  className="text-xs bg-slate-100 hover:bg-[#FF4D00] hover:text-white text-slate-700 px-3 py-1 rounded-full font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Vibrant Image Showcase) - Completely Responsive */}
        <div className="lg:col-span-5 flex justify-center w-full mt-4 lg:mt-0">
          <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] aspect-square">
            {/* Solid Color Back Drop */}
            <div className="absolute inset-0 bg-[#FF4D00] rounded-3xl transform translate-x-2 sm:translate-x-3 translate-y-2 sm:translate-y-3"></div>
            
            {/* Image Container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-slate-900 bg-slate-100 shadow-lg">
              <img
                src="/images/main.jpg"
                alt="Home Tutor in Lahore"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
