"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, MessageSquare, Plus, Sparkles, User, GraduationCap } from "lucide-react";
import AIInput from "@/components/AIInput";

export default function AIPage() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Welcome to Ustaad AI Matchmaker! Tell me what subject or skill you want to learn, your grade level, and location, and I will instantly scan our database of verified local in-person home tutors."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    { text: "Find a Math tutor for Grade 8", icon: "📐" },
    { text: "English examiner for IELTS prep", icon: "🇬🇧" },
    { text: "Graphic design weekend tutor", icon: "🎨" },
    { text: "Beginner Chess coach for kids", icon: "👑" }
  ];

  const recentChats = [
    "Algebra tutor nearby",
    "IELTS speaking examiner",
    "Adobe Illustrator basics"
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
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error("Failed to match tutors");
      }

      const data = await response.json();
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
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

        // Remove q from the URL path so page refreshes don't double-trigger search
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
    <div className="flex h-screen w-full bg-background overflow-hidden text-color3">
      
      {/* Sidebar Dashboard - Hidden on mobile */}
      <aside className="hidden md:flex w-72 bg-color3 text-color1 flex-col justify-between border-r border-color1/10 select-none">
        <div>
          {/* Header Branding */}
          <div className="p-6 border-b border-color1/10 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-color4">ustaad</span>
              <span className="text-color2">.</span>
              <span className="text-xs ml-2 bg-color2/20 text-color2 px-2 py-0.5 rounded-full font-semibold uppercase">AI</span>
            </Link>
          </div>

          {/* Sidebar CTA */}
          <div className="p-4">
            <button 
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 bg-color4 hover:bg-color4/90 text-color1 py-3 px-4 rounded-2xl font-semibold transition-all shadow-md active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              New Matchmaking
            </button>
          </div>

          {/* Recent Searches */}
          <div className="px-4 py-3 text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-color1/40 block mb-3 px-2">
              Recent Matchmaking
            </span>
            <div className="space-y-1">
              {recentChats.map((chat, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSend(chat)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-color1/10 text-color1/70 hover:text-color1 text-sm font-medium text-left transition-colors truncate"
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  {chat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-color1/10">
          <Link 
            href="/"
            className="flex items-center gap-2.5 w-full px-3 py-3 rounded-xl hover:bg-color1/10 text-color1/70 hover:text-color1 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
        </div>
      </aside>

      {/* Main Chat Workspace */}
      <main className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
        
        {/* Mobile Header */}
        <header className="w-full h-16 bg-white border-b border-color3/5 flex items-center justify-between px-4 md:px-8 select-none">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden p-1.5 rounded-full hover:bg-color1 text-color3/60 transition-colors mr-1">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-9 h-9 rounded-full bg-color2/20 flex items-center justify-center text-color2">
              <Bot className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h1 className="text-sm font-bold tracking-tight">Ustaad Matchmaker</h1>
              <span className="text-[10px] text-color2 font-semibold">Active Matchmaking AI</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href="/"
              className="text-xs font-semibold text-color3/60 hover:text-color4 transition-colors hidden md:block"
            >
              Home
            </Link>
            <span className="text-xs text-color3/20 hidden md:block">|</span>
            <div className="flex items-center gap-1 bg-color1 px-2.5 py-1 rounded-full text-xs font-bold text-color3/70">
              <Sparkles className="w-3.5 h-3.5 text-color4" />
              GPT-4 Matching
            </div>
          </div>
        </header>

        {/* Message Panel Area */}
        <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 space-y-6 no-scrollbar">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start text-left"}`}
              >
                {/* AI Avatar */}
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-color2/20 text-color2 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`max-w-[85%] rounded-[2rem] px-5 py-4 text-sm font-medium leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-color4 text-color1 rounded-tr-none shadow-md"
                    : "bg-white border border-color3/5 text-color3 rounded-tl-none shadow-sm"
                }`}>
                  {msg.text}
                </div>

                {/* User Avatar */}
                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-color4/20 text-color4 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Bubble */}
            {isTyping && (
              <div className="flex gap-4 justify-start text-left">
                <div className="w-8 h-8 rounded-full bg-color2/20 text-color2 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-color3/5 text-color3 rounded-[2rem] rounded-tl-none px-6 py-4 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-color3/40 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-color3/40 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-color3/40 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input & Starters Workspace bottom panel */}
        <div className="bg-gradient-to-t from-background via-background to-transparent pt-6 pb-6 px-4 md:px-8 border-t border-color3/5">
          <div className="max-w-3xl mx-auto space-y-4">
            
            {/* Quick Action Prompt Cards - Only show if conversation has only 1 starting message */}
            {messages.length === 1 && !isTyping && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 select-none">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt.text)}
                    className="bg-white border border-color3/5 rounded-[1.5rem] p-4 text-left shadow-sm hover:border-color4 hover:shadow transition-all duration-300 active:scale-[0.98]"
                  >
                    <span className="text-xl block mb-2">{prompt.icon}</span>
                    <p className="text-xs font-semibold text-color3/80 line-clamp-2">
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
               placeholder="Find home tutors (e.g. math, design, english...)"
               mockFallbackText="Need an in-person Python coding tutor for weekends"
               className="w-full !p-3"
             />
            
            <p className="text-[10px] text-color3/40 font-medium text-center">
              Ustaad Matchmaker scans verified local home tutors. Trial lessons are subject to schedule availability.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
