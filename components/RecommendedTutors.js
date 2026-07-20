"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const baseTutors = [
  {
    name: "Monika",
    subject: "Graphic Design",
    image: "/images/images.jpeg",
    description: "Graduate of the Academy of Fine Arts in Krakow. Methodologist in the graphics department."
  },
  {
    name: "Kamil",
    subject: "Chess",
    image: "/images/images (1).jpeg",
    description: "Chess expert, curriculum developer, mentor for home-learning teachers."
  },
  {
    name: "Kinga",
    subject: "English",
    image: "/images/wester-Teacher.jpg",
    description: "Master's degree in English Philology. Experienced in-person tutor and examiner."
  }
];

// Generate 24 cards (repeating the 3 base cards 8 times)
const tutors = Array.from({ length: 24 }, (_, i) => ({
  ...baseTutors[i % baseTutors.length],
  id: i
}));

export default function RecommendedTutors() {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed modifier
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Button scroll helper
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 324; // Card width (300) + gap (24)
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-t from-orange-100/90 via-orange-50/50 to-white text-slate-900 py-16 px-4 md:px-8 lg:px-16 overflow-hidden ">
      
      {/* Background Accent Orbs */}
      <div className="absolute top-10 left-[-5%] w-72 h-72 bg-[#FF4D00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-80 h-80 bg-orange-300/25 rounded-full blur-3xl pointer-events-none" />

      {/* Title Header with Navigation Chevrons */}
      <div className="max-w-6xl mx-auto w-full mb-8 flex items-end justify-between select-none relative z-10">
        <div className="text-left">
          <span className="text-xs font-semibold tracking-wider text-[#FF4D00] uppercase block mb-1">
            Top-rated In-home Instruction
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
            Our Recommended Tutors
          </h2>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleScroll("left")}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleScroll("right")}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Overflow track of cards with drag-to-scroll handlers */}
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto no-scrollbar flex gap-6 py-6 scroll-smooth select-none max-w-6xl mx-auto relative z-10 ${
          isDown ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {tutors.map((tutor) => (
          <div 
            key={tutor.id}
            className="min-w-[280px] sm:min-w-[300px] max-w-[300px] min-h-[400px] bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-[2.5rem] p-7 pt-9 pb-8 flex flex-col items-center justify-between text-center shadow-md shadow-slate-900/5 transition-all duration-300 hover:border-[#FF4D00] hover:shadow-lg group"
          >
            {/* Top content wrapper to group image & details */}
            <div className="flex flex-col items-center">
              {/* Profile Image Wrapper */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden relative mb-5 border-4 border-orange-100 shadow-sm">
                <img 
                  src={tutor.image} 
                  className="w-full h-full object-cover select-none pointer-events-none"
                  alt={tutor.name}
                />
              </div>
              
              {/* Name */}
              <h3 className="text-xl font-semibold text-slate-900 mb-1">
                {tutor.name}
              </h3>
              
              {/* Subject */}
              <span className="text-xs font-semibold text-[#FF4D00] uppercase tracking-wide mb-3 block">
                {tutor.subject}
              </span>
            </div>
            
            {/* Bio Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {tutor.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
