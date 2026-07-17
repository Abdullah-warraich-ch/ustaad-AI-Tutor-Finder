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
    <section className="w-full bg-background py-16 transition-colors duration-300">
      
      {/* Title Header with Navigation Chevrons */}
      <div className="w-full px-4 md:px-8 lg:px-16 mb-8 flex items-end justify-between select-none">
        <div className="text-left">
          <span className="text-xs font-semibold tracking-wider text-color2 uppercase block mb-1">
            Top-rated In-home Instruction
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-color3 tracking-tight">
            Recommended Tutors
          </h2>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleScroll("left")}
            className="w-10 h-10 rounded-full border border-color3/10 flex items-center justify-center text-color3 hover:border-color4 hover:text-color4 transition-all duration-300 bg-white shadow-sm active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleScroll("right")}
            className="w-10 h-10 rounded-full border border-color3/10 flex items-center justify-center text-color3 hover:border-color4 hover:text-color4 transition-all duration-300 bg-white shadow-sm active:scale-95"
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
        className={`w-full overflow-x-auto no-scrollbar flex gap-6 px-4 md:px-8 lg:px-16 py-6 scroll-smooth select-none ${
          isDown ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {tutors.map((tutor) => (
          <div 
            key={tutor.id}
            className="min-w-[300px] max-w-[300px] min-h-[420px] bg-white border border-color3/5 rounded-[2.5rem] p-8 pt-10 pb-8 flex flex-col items-center justify-between text-center shadow-sm transition-all duration-300 hover:border-color4 group"
          >
            {/* Top content wrapper to group image & details */}
            <div className="flex flex-col items-center">
              {/* Profile Image Wrapper */}
              <div className="w-36 h-36 rounded-full overflow-hidden relative mb-6">
                <img 
                  src={tutor.image} 
                  className="w-full h-full object-cover select-none pointer-events-none"
                  alt={tutor.name}
                />
              </div>
              
              {/* Name */}
              <h3 className="text-xl font-semibold text-color3 mb-1">
                {tutor.name}
              </h3>
              
              {/* Subject */}
              <span className="text-xs font-semibold text-color2 uppercase tracking-wide mb-3 block">
                {tutor.subject}
              </span>
            </div>
            
            {/* Bio Description */}
            <p className="text-sm text-color3/60 leading-relaxed font-medium">
              {tutor.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
