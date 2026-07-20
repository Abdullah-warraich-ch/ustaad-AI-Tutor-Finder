"use client";

import { Bell, Menu, AlertCircle } from "lucide-react";

export default function DashboardHeader({ user, profile, onMenuClick }) {
  const isComplete = profile?.isProfileComplete;

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 text-slate-900">
      {/* Left: Mobile Menu + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-slate-900 font-bold text-base sm:text-lg leading-tight">
            Tutor Dashboard
          </h1>
          <p className="text-slate-500 text-xs hidden sm:block">
            Manage your teaching details, schedule, and profile
          </p>
        </div>
      </div>

      {/* Right: Actions + Status */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Profile Incomplete Badge - ONLY shown if profile is not completed */}
        {profile && !isComplete && (
          <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Incomplete Profile</span>
          </div>
        )}

        {/* Notification Bell */}
        <button className="relative text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100 border border-slate-200/80">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF4D00] rounded-full" />
        </button>
      </div>
    </header>
  );
}
