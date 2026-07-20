"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import Button from "@/components/Button";
import { signInUser } from "@/lib/firebase";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const { user, error } = await signInUser(email, password);

    setLoading(false);

    if (error) {
      setErrorMessage(error);
      toast.error(error);
    } else if (user) {
      setSuccess(true);
      // Set session cookie for Next.js proxy middleware route protection
      document.cookie = "session=true; path=/; max-age=86400; SameSite=Lax";
      toast.success("Login successful! Redirecting to dashboard...", {
        duration: 2000,
      });
      setTimeout(() => {
        router.push("/dashboard/tutor");
      }, 1500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-md w-full mx-auto my-auto space-y-6"
    >
      <div className="space-y-1.5 text-left">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-color4">
          Log In
        </h2>
        <p className="text-color3/60 text-xs sm:text-sm font-medium">
          Enter your credentials to access your account.
        </p>
      </div>

      {/* Error Alert Message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {/* Success Message */}
      {success ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-6 text-center space-y-2"
        >
          <h3 className="text-base font-bold text-emerald-800">Login Successful!</h3>
          <p className="text-xs text-emerald-700 font-medium">
            Welcome back! You are now logged in.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
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
          <div className="flex justify-end pt-0.5">
            <a href="#" className="text-xs font-semibold text-color4 hover:underline transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              rounded="rounded-xl"
              padding="py-3.5 px-6"
              textSize="text-xs sm:text-sm font-bold"
              className="w-full shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Log In →"}
            </Button>
          </div>
        </form>
      )}

      {/* Sign Up Prompt */}
      <div className="text-center pt-3 border-t border-color3/10">
        <p className="text-xs text-color3/60 font-medium">
          Don't have an account?{" "}
          <Link href="/signup" className="text-color4 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
