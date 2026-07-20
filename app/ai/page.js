"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, MessageSquare, Plus, Sparkles, User } from "lucide-react";
import AIInput from "@/components/AIInput";
import TinyTutorCard from "@/components/tutor/TinyTutorCard";

function renderFormattedText(text = "") {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function AIPage() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Welcome to **Ustaad AI Tutor Matchmaker**! I am exclusively trained to help you find verified home and online tutors in Lahore. Tell me your subject, grade level, or neighborhood (e.g., 'Need an **O Level Physics** tutor in **DHA Phase 5**')."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    { text: "O/A Level Physics tutor in DHA", icon: "⚛️" },
    { text: "Math tutor for Grade 8 in Model Town", icon: "📐" },
    { text: "Female Chemistry tutor in Johar Town", icon: "🧪" },
    { text: "Python & Coding tutor in Gulberg", icon: "💻" }
  ];

  const recentChats = [
    "Physics tutor in DHA Phase 5",
    "Female Math tutor for Grade 8",
    "Computer Science home tutor"
  ];

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
      console.error("AI Matchmaker page error:", error);
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
        text: "Started a new matchmaking session. Tell me what subject or skill you want to learn!"
      }
    ]);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* Sidebar Dashboard - Hidden on mobile */}
      <aside className="hidden md:flex w-72 bg-slate-900 text-white flex-col justify-between border-r border-slate-800 select-none">
        <div>
          {/* Header Branding */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center">
              <span>ustaad</span>
              <span className="text-[#FF4D00]">.</span>
              <span className="text-xs ml-2 bg-[#FF4D00]/20 text-[#FF4D00] px-2 py-0.5 rounded-full font-semibold uppercase">AI</span>
            </Link>
          </div>

          {/* Sidebar CTA */}
          <div className="p-4">
            <button 
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 bg-[#FF4D00] hover:bg-[#e04400] text-white py-3 px-4 rounded-2xl font-semibold transition-all shadow-md active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              New Matchmaking
            </button>
          </div>

          {/* Recent Searches */}
          <div className="px-4 py-3 text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-3 px-2">
              Recent Matchmaking
            </span>
            <div className="space-y-1">
              {recentChats.map((chat, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSend(chat)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium text-left transition-colors truncate"
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  {chat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <Link 
            href="/"
            className="flex items-center gap-2.5 w-full px-3 py-3 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
        </div>
      </aside>

      {/* Main Chat Workspace */}
      <main className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
        
        {/* Header */}
        <header className="w-full h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 md:px-8 select-none">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors mr-1">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-9 h-9 rounded-full bg-orange-50 text-[#FF4D00] flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h1 className="text-sm font-bold tracking-tight text-slate-900">Ustaad AI Matchmaker</h1>
              <span className="text-[10px] text-emerald-600 font-semibold">Active Tutor Discovery</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href="/tutor"
              className="text-xs font-semibold text-slate-600 hover:text-[#FF4D00] transition-colors hidden md:block"
            >
              Browse All Tutors
            </Link>
            <span className="text-xs text-slate-300 hidden md:block">|</span>
            <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full text-xs font-bold text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4D00]" />
              AI Matcher
            </div>
          </div>
        </header>

        {/* Message Panel Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-6">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex gap-3.5 ${msg.sender === "user" ? "justify-end" : "justify-start text-left"}`}
              >
                {/* AI Avatar */}
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-orange-50 text-[#FF4D00] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                {/* Message Bubble + Tiny Cards */}
                <div className="max-w-[88%] space-y-3">
                  <div className={`rounded-2xl px-5 py-3.5 text-sm font-medium leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-slate-900 text-white rounded-tr-none shadow-2xs"
                      : "bg-white border border-slate-200/80 text-slate-800 rounded-tl-none shadow-2xs"
                  }`}>
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Tiny Teacher Cards inside AI Response */}
                  {msg.sender === "ai" && msg.matchedTutors?.length > 0 && (
                    <div className="pt-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Matched Teacher Cards ({msg.matchedTutors.length}):
                      </p>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {msg.matchedTutors.map((tutor) => (
                          <TinyTutorCard key={tutor._id || tutor.firebaseUid} tutor={tutor} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Bubble */}
            {isTyping && (
              <div className="flex gap-3 justify-start text-left">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-[#FF4D00] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
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
        </div>

        {/* Input Panel */}
        <div className="bg-white pt-4 pb-5 px-4 md:px-8 border-t border-slate-200/80">
          <div className="max-w-3xl mx-auto space-y-3">
            
            {/* Quick Prompts */}
            {messages.length === 1 && !isTyping && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 select-none">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt.text)}
                    className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left shadow-2xs hover:border-slate-400 transition-all duration-200"
                  >
                    <span className="text-lg block mb-1">{prompt.icon}</span>
                    <p className="text-xs font-semibold text-slate-700 line-clamp-2">
                      {prompt.text}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {/* Input Form Box */}
            <AIInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSend}
              placeholder="Ask for tutors (e.g. O Level Physics in DHA Phase 5...)"
              mockFallbackText="Need a female Math tutor in Johar Town"
              className="w-full !p-3"
            />
            
            <p className="text-[10px] text-slate-400 font-medium text-center">
              Ustaad Matchmaker scans verified home and online tutors in Lahore.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
