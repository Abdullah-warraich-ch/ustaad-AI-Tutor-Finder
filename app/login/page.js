"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="min-h-screen bg-color1 flex flex-col md:flex-row transition-all duration-300 font-sans">
      
      {/* Left Column (Brand & Info Showcase) - Uses Primary Color (color4) for background */}
      <div className="w-full md:w-1/2 bg-color4 text-color1 relative overflow-hidden flex flex-col justify-between p-8 md:p-16 min-h-[350px] md:min-h-screen">
        
        {/* Geometric Background Shapes from public folder */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <img 
            src="/svgs/Ornament 80.svg" 
            className="absolute top-[-5%] right-[-5%] w-[65%] select-none rotate-12" 
            alt="Geometry Top" 
          />
          <img 
            src="/svgs/Ornament 80.svg" 
            className="absolute bottom-[10%] left-[-10%] w-[55%] select-none -rotate-12" 
            alt="Geometry Bottom" 
          />
        </div>

        {/* Logo Section */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">Ustaad</span>
        </div>

        {/* Middle text */}
        <div className="relative z-10 my-auto py-12 md:py-0 space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-md">
            It's good to see you!
          </h1>
          <p className="text-color1/80 text-lg max-w-xs font-light">
            Welcome again to the world of education!
          </p>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-color1/55">
          © {new Date().getFullYear()} ustaad.eu. All rights reserved
        </div>
      </div>

      {/* Right Column (Login Form Pane) */}
      <div className="w-full md:w-1/2 bg-color1 flex flex-col justify-between p-8 md:p-16 min-h-[500px]">
        
        {/* Top Controls */}
        <div className="flex justify-end items-center">
          {/* Close button uses Primary Color (color4) and routes to homepage */}
          <Link href="/" className="text-color4 hover:text-color4/80 transition-colors p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </Link>
        </div>

        {/* Main Form Box */}
        <div className="max-w-md w-full mx-auto my-auto space-y-8">
          <div className="space-y-3">
            {/* Login Heading uses Primary Color (color4) and is semibold */}
            <h2 className="text-4xl font-semibold tracking-tight text-color4">
              Log in
            </h2>
            <p className="text-color3/75 text-sm">
              Log in and start the lesson
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field - Labels use default text (color3) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-color3/60 tracking-wider uppercase">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your account's e-mail address"
                className="w-full px-4 py-3.5 rounded-xl border border-color3/20 bg-white text-color3 placeholder-color3/45 outline-none focus:border-color2 focus:ring-1 focus:ring-color2 transition-all text-sm"
              />
            </div>

            {/* Password Field - Labels use default text (color3) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-color3/60 tracking-wider uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type in your password"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl border border-color3/20 bg-white text-color3 placeholder-color3/45 outline-none focus:border-color2 focus:ring-1 focus:ring-color2 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-color3/50 hover:text-color3 transition-colors"
                >
                  {showPassword ? (
                    /* Crossed eye icon */
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"></path>
                    </svg>
                  ) : (
                    /* Regular eye icon */
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-start">
              <a href="#" className="text-sm font-semibold text-color3 hover:text-color4 transition-colors">
                I forgot my password
              </a>
            </div>

            {/* Submit Button uses Reusable Button */}
            <Button
              type="submit"
              rounded="rounded-xl"
              padding="py-3.5 px-6"
              className="w-full"
            >
              Log in
            </Button>
          </form>
        </div>

        {/* Bottom space wrapper to match layout */}
        <div className="h-4"></div>
      </div>
      
    </div>
  );
}
