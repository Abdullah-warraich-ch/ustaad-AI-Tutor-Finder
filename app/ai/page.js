"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, Plus, Sparkles, User } from "lucide-react";
import AIInput from "@/components/AIInput";
import TinyTutorCard from "@/components/tutor/TinyTutorCard";

function renderFormattedText(text = "") {
  if (!text) return null;

  // Split text by double newlines into distinct paragraphs
  const paragraphs = text.split(/\n\n+/);

  return (
    <div className="space-y-2">
      {paragraphs.map((paragraph, pIdx) => {
        const lines = paragraph.split(/\n/);

        return (
          <div key={pIdx} className="leading-relaxed">
            {lines.map((rawLine, lIdx) => {
              // Strip leading asterisk or hyphen bullet point (* item or - item)
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

export default function AIPage() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Welcome to **Ustaad AI Finder**! I am exclusively trained to help you find verified home and online tutors in Lahore. Tell me your subject, grade level, or neighborhood (e.g., 'Need an **O Level Physics** tutor in **DHA Phase 5**')."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue;
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
      console.error("AI Finder page error:", error);
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

  const didInitRef = useRef(false);

  useEffect(() => {
    if (didInitRef.current) return;

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const query = params.get("q");
      if (query) {
        didInitRef.current = true;
        handleSend(query);

        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, []);

  const handleNewChat = () => {
    setMessages([
      {
        sender: "ai",
        text: "Started a new tutor search session. Tell me what subject or skill you want to learn!"
      }
    ]);
  };

  return (
    <div className="flex flex-col h-screen h-[100dvh] w-full bg-slate-50 text-slate-900 overflow-hidden font-sans select-none">
      
      {/* Top Fixed Header Navigation */}
      <header className="h-16 flex-shrink-0 bg-white border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between shadow-2xs z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <h1 className="text-base font-bold text-slate-900">
              AI Finder
            </h1>
            <p className="text-[11px] text-slate-500">
              Finding verified private tutors in Lahore
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Chat</span>
          </button>
        </div>
      </header>

      {/* Main Chat Area - ONLY THIS SECTION SCROLLS */}
      <main className="flex-1 min-h-0 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth select-text">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.sender === "user" ? "justify-end text-right" : "justify-start text-left"
              }`}
            >
              {/* AI Avatar */}
              {msg.sender === "ai" && (
                <div className="w-8 h-8 rounded-full bg-orange-50 text-[#FF4D00] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5 select-none">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble + Tiny Cards */}
              <div className="max-w-[88%] space-y-3">
                <div className={`rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#FF4D00] text-white rounded-tr-none shadow-2xs font-semibold"
                    : "bg-white border border-slate-200/90 text-slate-800 rounded-tl-none shadow-2xs font-normal"
                }`}>
                  {renderFormattedText(msg.text)}
                </div>

                {/* Tiny Teacher Cards inside AI Response */}
                {msg.sender === "ai" && msg.matchedTutors?.length > 0 && (
                  <div className="pt-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 select-none">
                      Matched Teacher Cards ({msg.matchedTutors.length}):
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none select-none">
                      {msg.matchedTutors.map((tutor) => (
                        <TinyTutorCard key={tutor._id || tutor.firebaseUid} tutor={tutor} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF4D00] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5 select-none">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* AI Typing Bubble */}
          {isTyping && (
            <div className="flex gap-3 justify-start text-left">
              <div className="w-8 h-8 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200/80 text-slate-800 rounded-2xl rounded-tl-none px-5 py-3.5 shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Fixed Bottom Input Panel */}
      <footer className="flex-shrink-0 bg-white pt-3 pb-4 px-4 md:px-8 border-t border-slate-200/80">
        <div className="max-w-3xl mx-auto space-y-2">
          
          {/* AI Search Input Bar */}
          <AIInput
            value={inputValue}
            onChange={(val) => setInputValue(typeof val === "string" ? val : val?.target?.value || "")}
            onSubmit={() => handleSend()}
            isTyping={isTyping}
          />

          <p className="text-[11px] text-center text-slate-400">
            Ustaad AI Assistant searches registered home & online tutors in Lahore.
          </p>
        </div>
      </footer>

    </div>
  );
}
