"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  GraduationCap, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  Lock, 
  X 
} from "lucide-react";
import Button from "@/components/Button";

export default function SignUp() {
  const [role, setRole] = useState("student"); // "student" | "tutor"
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Clean, minimal form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Registering ${role}:`, formData);
    setSubmitted(true);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-color1 flex flex-col md:flex-row transition-all duration-300 font-sans">
      
      {/* Left Column (Brand & Info Showcase Pane) */}
      <div className="hidden md:flex w-full md:w-5/12 h-screen overflow-hidden bg-color4 text-color1 relative flex-col justify-between p-6 lg:p-10 select-none">
        
        {/* Geometric Background Ornaments */}
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

        {/* Middle text (Clean & Semibold) */}
        <div className="relative z-10 my-auto space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <h1 className="text-xl lg:text-2xl font-semibold tracking-tight leading-snug max-w-xs">
                {role === "student"
                  ? "Find certified in-person home tutors near you."
                  : "Share your knowledge and teach local students."}
              </h1>
              <p className="text-color1/80 text-xs lg:text-sm max-w-xs font-light leading-relaxed">
                {role === "student"
                  ? "Join Ustaad to instantly match with top-rated verified tutors."
                  : "Join our tutor network and start receiving student requests."}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-[11px] text-color1/60">
          © {new Date().getFullYear()} ustaad.eu. All rights reserved
        </div>
      </div>

      {/* Right Column (Form Pane) */}
      <div className="w-full md:w-7/12 h-full h-screen overflow-y-hidden bg-color1 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="md:hidden flex items-center gap-1">
            <span className="text-lg font-bold uppercase text-color4">ustaad</span>
            <span className="text-lg font-bold text-color2">.</span>
          </Link>

          <Link href="/" className="ml-auto text-color3/60 hover:text-color4 transition-colors p-1.5 rounded-full hover:bg-color3/5">
            <X className="w-5 h-5" />
          </Link>
        </div>

        {/* Main Form Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="max-w-md w-full mx-auto my-auto space-y-6"
        >
          {/* Header & Modern Capsule Role Switcher */}
          <div className="space-y-4 text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-color4">
                Create Account
              </h2>
            </div>

            {/* Redesigned Modern Pill Toggle Switcher */}
            <div className="grid grid-cols-2 gap-1 bg-color3/5 p-1 rounded-full border border-color3/15 relative">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`relative z-10 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                  role === "student" ? "text-white font-bold" : "text-color3/70 hover:text-color3"
                }`}
              >
                <User className="w-4 h-4" />
                Student / Parent
                {role === "student" && (
                  <motion.div
                    layoutId="activeRoleCapsule"
                    className="absolute inset-0 bg-color4 rounded-full shadow-md shadow-color4/25 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setRole("tutor")}
                className={`relative z-10 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                  role === "tutor" ? "text-white font-bold" : "text-color3/70 hover:text-color3"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Tutor
                {role === "tutor" && (
                  <motion.div
                    layoutId="activeRoleCapsule"
                    className="absolute inset-0 bg-color4 rounded-full shadow-md shadow-color4/25 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Submitted Success Message */}
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-6 text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Account Created!</h3>
              <p className="text-sm text-emerald-700 font-medium">
                Welcome to Ustaad! Check your email to confirm your account.
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white px-6 py-2.5 rounded-full hover:bg-emerald-700 transition-all shadow-sm"
                >
                  Proceed to Login <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Clean Form Fields with Soft Modern Labels */
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              
              {/* Full Name Field */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-color3/80">
                  Full Name
                </label>
                <div className="relative flex items-center group">
                  <User className="w-4 h-4 absolute left-3.5 text-color3/40 group-focus-within:text-color4 transition-colors pointer-events-none" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-color3/20 bg-white text-color3 placeholder-color3/40 outline-none focus:border-color4 focus:ring-2 focus:ring-color4/15 transition-all text-xs sm:text-sm font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Email Address Field */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-color3/80">
                  Email address
                </label>
                <div className="relative flex items-center group">
                  <Mail className="w-4 h-4 absolute left-3.5 text-color3/40 group-focus-within:text-color4 transition-colors pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
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

              {/* Submit Button */}
              <div className="pt-3">
                <Button
                  type="submit"
                  rounded="rounded-xl"
                  padding="py-3.5 px-6"
                  textSize="text-xs sm:text-sm font-bold"
                  className="w-full shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                >
                  {`Create ${role === "student" ? "Student" : "Tutor"} Account →`}
                </Button>
              </div>
            </form>
          )}

          {/* Sign In Link Prompt */}
          <div className="text-center pt-3 border-t border-color3/10">
            <p className="text-xs text-color3/60 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-color4 font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Footer padding spacer */}
        <div className="h-2"></div>
      </div>

    </div>
  );
}
