"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MessageCircle, X, Bot, User, Sparkles } from "lucide-react";
import AIInput from "@/components/AIInput";
import TinyTutorCard from "@/components/tutor/TinyTutorCard";

function renderFormattedText(text = "") {
  if (!text) return null;

  const paragraphs = text.split(/\n\n+/);

  return (
    <div className="space-y-2">
      {paragraphs.map((paragraph, pIdx) => {
        const lines = paragraph.split(/\n/);

        return (
          <div key={pIdx} className="leading-relaxed">
            {lines.map((rawLine, lIdx) => {
              let line = rawLine;
              let isBullet = false;
              if (/^[\*\-]\s+/.test(line)) {
                line = line.replace(/^[\*\-]\s+/, "");
                isBullet = true;
              }

              const parts = line.split(/(\*\*.*?\*\*)/g);

              const formattedLine = parts.map((part, partIdx) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={partIdx} className="font-semibold text-slate-900">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return part;
              });

              return (
                <React.Fragment key={lIdx}>
                  {isBullet ? (
                    <div className="flex items-start gap-2 my-1 pl-1">
                      <span className="text-[#FF4D00] font-bold select-none">•</span>
                      <div>{formattedLine}</div>
                    </div>
                  ) : (
                    <span>{formattedLine}</span>
                  )}
                  {!isBullet && lIdx < lines.length - 1 && <br />}
                </React.Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Welcome to **Ustaad AI Finder**! I am trained to match you with verified home & online tutors in Lahore. Tell me your subject, grade level, or neighborhood."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = window.innerHeight * 0.4;
    if (latest > threshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setIsOpen(false);
    }
  });

  useEffect(() => {
    const threshold = window.innerHeight * 0.4;
    if (scrollY.get() > threshold) {
      setIsVisible(true);
    }
  }, [scrollY]);

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
        body: JSON.stringify({
          message: text,
          history: messages
        })
      });

      if (!response.ok) {
        throw new Error("Failed to match tutors");
      }

      const data = await response.json();
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
          matchedTutors: data.matchedTutors || []
        }
      ]);
    } catch (error) {
      console.error("Floating AI error:", error);
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
            {!isOpen && (
              <>
                <div className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#FF4D00]/30 animate-ping pointer-events-none"></div>
                <div className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#FF4D00]/15 animate-ping pointer-events-none [animation-delay:0.5s]"></div>
              </>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-10 flex items-center justify-center bg-[#FF4D00] text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-xl hover:bg-[#e04400] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
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

      {/* Chat Window Modal - Matched exactly to /ai */}
      <AnimatePresence>
        {isOpen && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[540px] bg-slate-50 border border-slate-200/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden select-none"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 px-5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FF4D00]/20 text-[#FF4D00] flex items-center justify-center border border-[#FF4D00]/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-white">Ustaad AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 block animate-pulse"></span>
                    <span className="text-[10px] text-slate-300 font-medium">Lahore Tutor Matcher</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area - Exactly like /ai */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 select-text">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${
                    msg.sender === "user" ? "justify-end text-right" : "justify-start text-left"
                  }`}
                >
                  {/* AI Avatar */}
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF4D00] flex items-center justify-center flex-shrink-0 mt-0.5 select-none">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className="max-w-[85%] space-y-2">
                    <div
                      className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#FF4D00] text-white rounded-tr-none shadow-2xs font-semibold"
                          : "bg-white border border-slate-200/90 text-slate-800 rounded-tl-none shadow-2xs font-normal"
                      }`}
                    >
                      {renderFormattedText(msg.text)}
                    </div>

                    {/* Matched Tiny Tutor Cards inside AI Response */}
                    {msg.sender === "ai" && msg.matchedTutors?.length > 0 && (
                      <div className="pt-1 select-none">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Matched Tutors ({msg.matchedTutors.length}):
                        </p>
                        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                          {msg.matchedTutors.map((tutor) => (
                            <TinyTutorCard key={tutor._id || tutor.firebaseUid} tutor={tutor} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF4D00] flex items-center justify-center flex-shrink-0 mt-0.5 select-none">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5 justify-start text-left">
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF4D00] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-slate-200/90 text-slate-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-2xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-slate-200/80 bg-white">
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
