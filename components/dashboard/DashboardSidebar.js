"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  BookOpen,
  GraduationCap,
  LogOut,
  X,
  Sparkles,
} from "lucide-react";
import { logoutUser } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const ICON_MAP = {
  overview: LayoutDashboard,
  "basic-info": User,
  teaching: BookOpen,
  qualifications: GraduationCap,
};

export default function DashboardSidebar({
  tabs,
  activeTab,
  onTabChange,
  profile,
  user,
  isOpen,
  onClose,
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl border-r border-slate-100 relative z-20 shadow-xs">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100/80">
        <Link href="/" className="text-2xl font-black tracking-tight uppercase text-slate-900 flex items-center">
          Ustaad<span className="text-[#FF4D00]">.</span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-xl hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Tabs */}
      <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
        {tabs.map((tab) => {
          const Icon = ICON_MAP[tab.id] || LayoutDashboard;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all relative ${
                isActive
                  ? "bg-gradient-to-r from-[#FF4D00] to-[#FF6B00] text-white shadow-md shadow-[#FF4D00]/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-100/80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-600 hover:bg-rose-50/80 transition-all group"
        >
          <LogOut className="w-4.5 h-4.5 group-hover:-translate-x-0.5 transition-transform" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-64 z-30 flex flex-col lg:hidden"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
