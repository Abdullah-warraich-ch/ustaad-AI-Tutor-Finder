"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Shah",
    role: "Parent of 8th Grader",
    rating: 5,
    text: "Ustaad matched us with Kamil for Chess and math in less than 5 minutes. Having an in-person tutor come home has completely changed how my son learns. Highly recommended!",
    subject: "Chess & Mathematics"
  },
  {
    name: "Sarah Fatima",
    role: "Adult Learner",
    rating: 5,
    text: "I was looking for an English examiner to prepare for my IELTS. Kinga was absolutely phenomenal. The trial lesson convinced me, and the schedule was incredibly flexible.",
    subject: "IELTS Preparation"
  },
  {
    name: "Zainab Raza",
    role: "Parent of two children",
    rating: 5,
    text: "Finding a graphic design mentor who could teach my kids at home was a challenge until we tried Ustaad. The AI understood our budget and location instantly.",
    subject: "Graphic Design"
  }
];

export default function Testimonials() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-8 lg:px-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-color2 uppercase block mb-1">
            Success Stories
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-color3 tracking-tight">
            Loved by Parents and Students
          </h2>
          <p className="text-sm text-color3/60 mt-3 font-medium">
            Hear from families who found their perfect local home tutor through Ustaad AI.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i}
              className="bg-background border border-color3/5 rounded-[2.5rem] p-8 text-left relative flex flex-col justify-between min-h-[280px]"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-color2/20">
                <Quote className="w-10 h-10 transform rotate-180" />
              </div>

              <div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-6 text-color4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-sm text-color3/80 leading-relaxed font-medium mb-6">
                  "{t.text}"
                </p>
              </div>

              {/* Client Profile details */}
              <div className="border-t border-color3/5 pt-4">
                <h4 className="text-base font-semibold text-color3">{t.name}</h4>
                <p className="text-xs text-color3/50 font-medium mt-0.5">
                  {t.role} • <span className="text-color2 font-semibold">{t.subject}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
