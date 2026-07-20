"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";
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
    <div className="h-screen w-full overflow-hidden bg-color1 flex flex-col md:flex-row transition-all duration-300 font-sans">

      {/* Left Column (Brand & Info Showcase) - Uses Primary Color (color4) for background */}
      <div className="hidden md:flex w-full md:w-5/12 h-screen overflow-hidden bg-color4 text-color1 relative flex-col justify-between p-6 lg:p-10 select-none">

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
        <div className="relative z-10 flex items-center gap-1">
          <Link href="/" className="text-xl font-black tracking-tight uppercase">Ustaad</Link>
          <span className="text-xl font-black text-color2">.</span>
        </div>

        {/* Middle text */}
        <div className="relative z-10 my-auto space-y-3">
          <h1 className="text-xl lg:text-2xl font-semibold tracking-tight leading-snug max-w-xs">
            It's good to see you!
          </h1>
          <p className="text-color1/80 text-xs lg:text-sm max-w-xs font-light leading-relaxed">
            Welcome back to Pakistan's premier AI-powered home tutoring network.
          </p>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-[11px] text-color1/60">
          © {new Date().getFullYear()} ustaad.eu. All rights reserved
        </div>
      </div>

      {/* Right Column (Login Form Pane) */}
      <div className="w-full md:w-7/12 h-full md:h-screen overflow-y-auto bg-color1 flex flex-col justify-between p-6 md:p-10 lg:p-12">

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

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-color3/80">
                Email address
              </label>
              <div className="relative flex items-center group">
                <Mail className="w-4 h-4 absolute left-3.5 text-color3/40 group-focus-within:text-color4 transition-colors pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-color3/20 bg-white text-color3 placeholder-color3/40 outline-none focus:border-color4 focus:ring-2 focus:ring-color4/15 transition-all text-xs sm:text-sm font-medium shadow-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-color3/80">
                Password
              </label>
              <div className="relative flex items-center group">
                <Lock className="w-4 h-4 absolute left-3.5 text-color3/40 group-focus-within:text-color4 transition-colors pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-color3/20 bg-white text-color3 placeholder-color3/40 outline-none focus:border-color4 focus:ring-2 focus:ring-color4/15 transition-all text-xs sm:text-sm font-medium shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-color3/40 hover:text-color3 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              className="w-full font-bold"
            >
              Log in
            </Button>
          </form>

          {/* Sign Up Prompt */}
          <div className="text-center pt-2">
            <p className="text-xs text-color3/60 font-medium">
              Don't have an account?{" "}
              <Link href="/signup" className="text-color4 font-semibold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom space wrapper to match layout */}
        <div className="h-4"></div>
      </div>

    </div>
  );
}
