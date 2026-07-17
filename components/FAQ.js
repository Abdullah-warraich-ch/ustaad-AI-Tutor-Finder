"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does the AI matchmaking search work?",
    answer: "Simply type what you want to learn, your grade or level, and your preferred study schedule. Our smart AI assistant instantly parses your query and matches you with the best-suited, verified in-person home tutors near your location."
  },
  {
    question: "Are the home tutors background checked and verified?",
    answer: "Yes, absolutely. We prioritize student safety and academic excellence. Every tutor listed on Ustaad undergoes rigorous identity verification, academic credential checks, and background screening before being allowed to teach."
  },
  {
    question: "Do you offer online classes or tutoring?",
    answer: "No. We focus exclusively on in-person home tutoring. We believe that real-world, face-to-face instruction is significantly more effective, interactive, and engaging than learning behind a computer screen."
  },
  {
    question: "How does the trial lesson work?",
    answer: "Once you match with a tutor, you can schedule an initial in-home trial lesson. This lets you experience their teaching chemistry firsthand. If it is not a perfect match, we will help you find a replacement tutor free of charge."
  },
  {
    question: "What subjects and grade levels do you support?",
    answer: "We support a wide variety of subjects including Mathematics, Sciences, Languages (English, Urdu, etc.), test preparation (IELTS, SAT), coding, and extracurriculars (Chess, Music) for children, teenagers, and adult learners."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-background py-20 px-4 md:px-8 lg:px-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-wider text-color2 uppercase block mb-1">
            Have Questions?
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-color3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-color3/60 mt-3 font-medium">
            Everything you need to know about finding the perfect home tutor.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className="bg-white border border-color3/5 rounded-[1.5rem] overflow-hidden shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
              >
                <span className="text-base font-semibold text-color3 pr-4 group-hover:text-color4 transition-colors">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-color2 group-hover:text-color4 transition-colors">
                  {openIndex === i ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-color3/5 text-sm text-color3/60 leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
