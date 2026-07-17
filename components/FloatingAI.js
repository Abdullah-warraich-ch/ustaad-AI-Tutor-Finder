"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MessageCircle, X, Bot } from "lucide-react";
import AIInput from "@/components/AIInput";

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am Ustaad AI. Tell me what subject or grade you need, and I'll match you with the perfect in-person home tutor!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // High-performance scroll listener using Framer Motion
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = window.innerHeight * 0.5;
    if (latest > threshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setIsOpen(false); // Close chat modal when scrolling back up
    }
  });

  // Initial load check for scroll position
  useEffect(() => {
    const threshold = window.innerHeight * 0.5;
    if (scrollY.get() > threshold) {
      setIsVisible(true);
    }
  }, [scrollY]);

  // Auto-scroll messages to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (textOrEvent) => {
    if (textOrEvent && typeof textOrEvent === "object" && textOrEvent.preventDefault) {
      textOrEvent.preventDefault();
    }

    const text = typeof textOrEvent === "string" ? textOrEvent : inputValue;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error("Failed to match tutors");
      }

      const data = await response.json();
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      console.error("Floating AI matchmaker error:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I encountered a minor error connecting to our server. Please ensure you are online and try again!"
        }
      ]);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 select-none flex items-center justify-center"
          >
            {/* Radar Wave rings - active when chat is closed */}
            {!isOpen && (
              <>
                <div className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full bg-color4/40 animate-ping pointer-events-none"></div>
                <div className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full bg-color4/20 animate-ping pointer-events-none [animation-delay:0.5s]"></div>
              </>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-10 flex items-center justify-center bg-color4 text-color1 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:bg-color4/90 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
              aria-label="Ask AI Assistant"
            >
              {isOpen ? (
                <X className="w-6 h-6 md:w-7 md:h-7" />
              ) : (
                <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[500px] bg-white border border-color3/5 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden select-none"
          >
            {/* Header */}
            <div className="bg-color3 text-color1 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-color2/20 flex items-center justify-center text-color2">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold tracking-tight">Ustaad AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 block animate-pulse"></span>
                    <span className="text-[10px] text-color1/50 font-medium">Online Matcher</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-color1/60 hover:text-color1 transition-colors p-1"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-color1/30 no-scrollbar text-left">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-[1.5rem] px-4 py-3 text-sm font-medium leading-relaxed ${msg.sender === "user"
                      ? "bg-color4 text-color1 rounded-tr-none"
                      : "bg-white border border-color3/5 text-color3 rounded-tl-none shadow-sm"
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-color3/5 text-color3 rounded-[1.5rem] rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-color3/40 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-color3/40 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-color3/40 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-color3/5 bg-white">
              <AIInput
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleSend}
                placeholder="Ask Ustaad AI to find a tutor..."
                mockFallbackText="Need an experienced IELTS prep English teacher"
                className="w-full"
              />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
