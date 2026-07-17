"use client";

import React from "react";

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
  return (
    <section className="w-full bg-background py-16 transition-colors duration-300">
      
      {/* Title Aligned Left - Matches cards layout */}
      <div className="w-full px-4 md:px-8 lg:px-16 mb-8 text-left">
        <span className="text-xs font-semibold tracking-wider text-color2 uppercase block mb-1">
          Top-rated In-home Instruction
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold text-color3 tracking-tight">
          Recommended Tutors
        </h2>
      </div>

      {/* Overflow track of cards */}
      <div className="w-full overflow-x-auto no-scrollbar flex gap-6 px-4 md:px-8 lg:px-16 py-6">
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
                  className="w-full h-full object-cover"
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
