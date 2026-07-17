"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AIInput from "@/components/AIInput";

export default function Hero() {
  const [aiPrompt, setAiPrompt] = useState("");
  const router = useRouter();

  const handleAISubmit = (val) => {
    if (!val.trim()) return;
    router.push(`/ai?q=${encodeURIComponent(val)}`);
  };

  return (
    <section className="relative w-full min-h-[85vh] lg:h-[80vh] flex items-center overflow-hidden bg-color1 text-color4 pt-24 pb-12 px-4 md:px-8 lg:px-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

        {/* Left Side Content Column */}
        <div className="w-full lg:w-1/2 space-y-8 relative z-10">

          {/* Main Hero Headline - Split into primary color (color4) and secondary color (color2) */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.2] tracking-tight max-w-xl">
            <span className="block text-color4">We will ignite your</span>
            <span className="block text-color2">passion for learning</span>
          </h1>

          {/* AI Search/Ask Input Bar */}
          <div id="ai-search" className="scroll-mt-28 max-w-xl w-full space-y-3">
            <AIInput
              value={aiPrompt}
              onChange={setAiPrompt}
              onSubmit={handleAISubmit}
              placeholder="Ask AI to find the perfect tutor for you..."
              submitButtonText="Ask"
              mockFallbackText="Need a qualified Math tutor for Grade 8 near me"
              className="w-full"
            />
            <p className="text-xs text-color4/70 pl-4 font-medium">
              Describe what you want to learn, and our AI will match you with the perfect Ustaad tutors.
            </p>
          </div>
        </div>

        {/* Right Side Graphics Column (Orbital Images & Shapes) - Height reduced */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[320px] md:min-h-[380px]">

          {/* Orbital curved paths and icons */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Curved orbits */}
            <div className="absolute top-[10%] left-[5%] w-[80%] h-[80%] rounded-full border border-color4/10"></div>
            <div className="absolute top-[18%] left-[12%] w-[68%] h-[68%] rounded-full border-2 border-dashed border-color2/15"></div>

            {/* Color Accent Blob behind */}
            <div className="absolute top-[18%] right-[10%] w-[60%] h-[60%] rounded-full bg-color2/5 filter blur-3xl"></div>

            {/* Floating Diamonds and circles */}
            <div className="absolute top-[35%] left-[2%] w-4 h-4 bg-color2 rotate-45 rounded"></div>
            <div className="absolute bottom-[20%] right-[5%] w-5 h-5 rounded-full bg-color4/80"></div>
            <div className="absolute top-[10%] right-[15%] w-8 h-8 border-2 border-color2 rotate-12 rounded-lg"></div>
          </div>

          {/* Orbiting Small Circle Image 1 (Top Left) - Size reduced */}
          <div className="absolute top-[6%] left-[8%] md:left-[15%] w-18 h-18 rounded-full border-4 border-white overflow-hidden shadow-md z-20 hover:scale-105 transition-transform duration-300">
            <img
              src="/images/wester-Teacher.jpg"
              className="w-full h-full object-cover"
              alt="Classwork"
            />
          </div>

          {/* Orbiting Small Circle Image 2 (Bottom Left) - Size reduced */}
          <div className="absolute bottom-[6%] left-[10%] md:left-[18%] w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-md z-20 hover:scale-105 transition-transform duration-300">
            <img
              src="/images/images (1).jpeg"
              className="w-full h-full object-cover"
              alt="Learning Group"
            />
          </div>

          {/* Orbiting Small Circle Image 3 (Far Right) - Size reduced */}
          <div className="absolute bottom-[25%] right-[2%] w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-md z-20 hover:scale-105 transition-transform duration-300">
            <img
              src="/images/wester-Teacher.jpg"
              className="w-full h-full object-cover scale-150"
              alt="Classwork"
            />
          </div>

          {/* Main Large Center Image Circle - Sized down */}
          <div className="relative w-[200px] h-[200px] md:w-[265px] md:h-[265px] z-10">

            {/* Colored background circle behind main image */}
            <div className="absolute inset-0 bg-color2 rounded-full transform -translate-x-2.5 translate-y-2.5"></div>

            {/* Image container - Swapped to images.jpeg */}
            <div className="w-full h-full rounded-full border-6 border-white overflow-hidden relative shadow-lg">
              <img
                src="/images/images.jpeg"
                className="w-full h-full object-cover"
                alt="Student studying"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
