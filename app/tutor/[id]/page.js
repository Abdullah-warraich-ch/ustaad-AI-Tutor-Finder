"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  PhoneCall,
  MessageCircle,
  MapPin,
  Star,
  ShieldCheck,
  BookOpen,
  Clock,
  Globe,
  Award,
  GraduationCap,
  Sparkles,
  Calendar,
  X,
  UserCheck,
  CheckCircle2,
  Quote,
  Calculator,
  Atom,
  Code,
  Languages,
  BadgeCheck,
  Building2,
  Sliders,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";

function getSubjectBadgeConfig(subjectName = "") {
  const text = subjectName.toLowerCase();
  if (text.includes("math") || text.includes("calc") || text.includes("stat")) {
    return { icon: Calculator, gradient: "from-blue-500 to-indigo-600", tag: "STEM & Logic" };
  }
  if (text.includes("phys") || text.includes("chem") || text.includes("biol") || text.includes("sci")) {
    return { icon: Atom, gradient: "from-[#FF4D00] to-amber-500", tag: "Natural Sciences" };
  }
  if (text.includes("comp") || text.includes("pyth") || text.includes("code") || text.includes("web")) {
    return { icon: Code, gradient: "from-purple-600 to-indigo-600", tag: "Tech & Computing" };
  }
  if (text.includes("eng") || text.includes("urdu") || text.includes("lit") || text.includes("isl")) {
    return { icon: GraduationCap, gradient: "from-emerald-500 to-teal-600", tag: "Languages & Humanities" };
  }
  return { icon: BookOpen, gradient: "from-slate-700 to-slate-900", tag: "General Academic" };
}

const ALL_WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function TutorDetailPage({ params }) {
  const { id } = use(params);
  const searchParams = useSearchParams();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  // Dynamic back button destination
  const fromParam = searchParams.get("from");
  let backHref = "/tutor";
  let backLabel = "Back to Tutors";

  if (fromParam === "ai") {
    backHref = "/ai";
    backLabel = "Back to AI Finder";
  } else if (fromParam === "tutor") {
    backHref = "/tutor";
    backLabel = "Back to Tutors Directory";
  } else if (typeof window !== "undefined") {
    if (document.referrer.includes("/ai")) {
      backHref = "/ai";
      backLabel = "Back to AI Finder";
    } else if (document.referrer.includes("/tutor")) {
      backHref = "/tutor";
      backLabel = "Back to Tutors Directory";
    }
  }

  useEffect(() => {
    async function getTutor() {
      try {
        setLoading(true);
        const res = await fetch(`/api/tutors/${id}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setTutor(data.tutor);
      } catch (err) {
        console.error("Tutor fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getTutor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#FF4D00] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 text-xs font-medium tracking-wide">Loading tutor profile...</p>
        </div>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 max-w-sm text-center space-y-4 shadow-xl">
          <p className="text-slate-700 font-semibold text-sm">Tutor profile not found.</p>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {backLabel}
          </Link>
        </div>
      </div>
    );
  }

  const qual = tutor.qualifications?.[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-28 sm:pb-20">
      
      {/* Global Header Navigation */}
      <Navbar />

      {/* Hero Header Section */}
      <section className="pt-24 pb-6 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80 relative">
        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 text-slate-700 hover:text-[#FF4D00] hover:border-orange-300 text-xs font-semibold shadow-2xs transition-all group"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#FF4D00] transition-colors" />
              <span>{backLabel}</span>
            </Link>
          </div>

          {/* Main Hero Card with Dashboard Overview Orange Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF4D00] via-[#FF6B00] to-[#FF8C00] p-6 sm:p-8 shadow-xl shadow-[#FF4D00]/20 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            {/* Background Decorative Ambient Circles */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full translate-x-28 -translate-y-28" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-white rounded-full -translate-x-20 translate-y-20" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              
              {/* DP Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white/30 backdrop-blur-md shadow-md">
                  <img
                    src={
                      tutor.profilePhoto ||
                      (tutor.gender === "female"
                        ? "/female-placeholder.png"
                        : "/male-placeholder.png")
                    }
                    alt={tutor.fullName}
                    className="w-full h-full rounded-full object-cover bg-slate-100 border-2 border-white"
                  />
                </div>
                <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs" title="Identity Verified">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Tutor Essential Info */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-white font-semibold text-2xl sm:text-3xl tracking-tight">
                    {tutor.fullName}
                  </h1>
                  <ShieldCheck className="w-5 h-5 text-white flex-shrink-0" />
                </div>

                {qual && (
                  <p className="text-white/90 text-xs sm:text-sm font-medium flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-white/80" />
                    {qual.degree} · <span className="text-white/80 font-normal">{qual.institution || "Lahore"}</span>
                  </p>
                )}

                {/* Key Metric Chips */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
                  
                  {/* Rating */}
                  <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-xl text-white font-medium">
                    <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span className="font-semibold">{tutor.rating || 4.9}</span>
                    <span className="text-white/80 text-[11px]">({tutor.totalReviews || 12} reviews)</span>
                  </div>

                  {/* Experience */}
                  <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-xl text-white font-medium">
                    <Award className="w-3.5 h-3.5 text-white/80" />
                    <span>{tutor.experience || 3}+ Yrs Exp</span>
                  </div>

                  {/* Location */}
                  <div className="inline-flex items-center gap-1 text-white/90 font-medium px-1 py-1">
                    <MapPin className="w-3.5 h-3.5 text-white/80" />
                    <span>{tutor.city || "Lahore"}, Pakistan</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Monthly Tuition Fee & Primary Contact Button */}
            <div className="relative z-10 w-full md:w-auto bg-white/15 backdrop-blur-md border border-white/25 text-white rounded-2xl p-5 flex md:flex-col items-center justify-between gap-4 flex-shrink-0">
              <div>
                <span className="text-[10px] text-white/80 font-medium uppercase tracking-wider block">
                  Monthly Tuition Fee
                </span>
                <span className="text-white font-semibold text-2xl sm:text-3xl tracking-tight">
                  {tutor.monthlyRate ? `PKR ${tutor.monthlyRate.toLocaleString()}` : "Contact"}
                  <span className="text-white/70 text-xs font-normal"> / mo</span>
                </span>
              </div>

              <button
                onClick={() => setShowCallModal(true)}
                className="flex items-center justify-center gap-2 bg-white text-[#FF4D00] font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-orange-50 transition-all shadow-md active:scale-95 w-full sm:w-auto"
              >
                <PhoneCall className="w-4 h-4 text-[#FF4D00]" />
                Contact Tutor
              </button>
            </div>

          </motion.div>

        </div>
      </section>

      {/* Main Profile Content Grid */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Main Content (2 Columns) */}
          <div className="md:col-span-2 space-y-7">
            
            {/* 1. About the Tutor */}
            {tutor.bio && (
              <section className="bg-gradient-to-r from-orange-50/50 via-white to-white border border-slate-200/90 border-l-4 border-l-[#FF4D00] rounded-3xl p-6 sm:p-7 space-y-3 shadow-2xs relative overflow-hidden">
                <Quote className="w-12 h-12 text-orange-200/60 absolute top-4 right-4 pointer-events-none" />
                <h3 className="text-slate-900 font-semibold text-lg">
                  About {tutor.fullName}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal relative z-10">
                  {tutor.bio}
                </p>
              </section>
            )}

            {/* 2. Subjects & Specializations Grid */}
            <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4D00]">
                    Subject Offered
                  </span>
                  <h3 className="text-slate-900 font-semibold text-lg">
                    Subjects & Specializations Offered
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF4D00] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tutor.subjects?.map((sub) => {
                  const badge = getSubjectBadgeConfig(sub);
                  const Icon = badge.icon;
                  return (
                    <div
                      key={sub}
                      className="group bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 transition-all hover:bg-white hover:border-orange-300 hover:shadow-md"
                    >
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${badge.gradient} text-white flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                          {badge.tag}
                        </span>
                        <h4 className="text-slate-900 font-semibold text-sm truncate">
                          {sub}
                        </h4>
                        <span className="text-[#FF4D00] text-[11px] font-medium block mt-0.5">
                          Home & Online Tuition
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. Accessible Lahore Localities */}
            {tutor.accessibleAreas?.length > 0 && (
              <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4D00]">
                      Location & Coverage
                    </span>
                    <h3 className="text-slate-900 font-semibold text-lg">
                      Accessible Localities in Lahore
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF4D00] flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {tutor.accessibleAreas.map((area) => (
                    <div
                      key={area}
                      className="bg-slate-50 border border-slate-200/90 text-slate-700 px-3.5 py-2 rounded-2xl text-xs font-medium flex items-center gap-2 shadow-2xs hover:bg-orange-50/70 hover:border-orange-200 transition-all cursor-default"
                    >
                      <div className="w-5 h-5 rounded-full bg-orange-100 text-[#FF4D00] flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-3 h-3" />
                      </div>
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. Academic Timeline & Qualifications */}
            {tutor.qualifications?.length > 0 && (
              <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4D00]">
                      Verified Background
                    </span>
                    <h3 className="text-slate-900 font-semibold text-lg">
                      Education & Academic Credentials
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF4D00] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {tutor.qualifications.map((q, i) => (
                    <div key={i} className="relative flex items-start justify-between gap-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                      
                      {/* Timeline Dot */}
                      <div className="absolute -left-[27px] top-4 w-4 h-4 rounded-full bg-white border-2 border-[#FF4D00] flex items-center justify-center shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]"></span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-slate-900 font-semibold text-sm">{q.degree}</h4>
                          <BadgeCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                        <p className="text-slate-500 text-xs font-medium flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {q.institution}
                        </p>
                      </div>

                      {q.year && (
                        <span className="text-xs font-semibold text-[#FF4D00] bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-xl flex-shrink-0">
                          {q.year}
                        </span>
                      )}

                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Sidebar Column (1 Column) */}
          <div className="space-y-6">
            
            {/* 1. Teaching Profile Specifications */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-slate-900 font-semibold text-sm">
                  Teaching Profile Specs
                </h3>
                <Sliders className="w-4 h-4 text-[#FF4D00]" />
              </div>

              <div className="space-y-3.5 text-xs">
                
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Award className="w-4 h-4 text-slate-400" />
                    <span>Experience:</span>
                  </div>
                  <span className="text-slate-900 font-semibold">{tutor.experience || 3}+ Years</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span>Teaching Mode:</span>
                  </div>
                  <span className="text-[#FF4D00] font-semibold capitalize">{tutor.teachingMode || "Home & Online"}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2 text-slate-500">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>Target Level:</span>
                  </div>
                  <span className="text-slate-900 font-semibold capitalize">{tutor.educationLevel || "All Grades"}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Languages className="w-4 h-4 text-slate-400" />
                    <span>Languages:</span>
                  </div>
                  <span className="text-slate-900 font-semibold">
                    {tutor.languages?.join(", ") || "English, Urdu"}
                  </span>
                </div>

              </div>
            </div>

            {/* 2. Availability Schedule & Time Slots */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-slate-900 font-semibold text-sm">
                  Weekly Availability
                </h3>
                <Clock className="w-4 h-4 text-[#FF4D00]" />
              </div>

              {/* Weekly Days Grid */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  Available Days:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {ALL_WEEK_DAYS.map((day) => {
                    const isAvailable = tutor.availability?.includes(day);
                    return (
                      <div
                        key={day}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between border transition-all ${
                          isAvailable
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-50 text-slate-400 border-slate-200/60 opacity-60"
                        }`}
                      >
                        <span>{day.slice(0, 3)}</span>
                        {isAvailable && <Check className="w-3 h-3 text-[#FF4D00]" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {tutor.timeSlots?.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                    Preferred Time Hours:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.timeSlots.map((ts) => (
                      <span key={ts} className="bg-orange-50 border border-orange-200/80 text-[#FF4D00] text-xs font-medium px-3 py-1 rounded-xl">
                        {ts}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Floating Sticky Bottom Mobile Contact Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-4 shadow-lg flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-slate-400 font-medium uppercase block">Monthly Tuition</span>
          <span className="text-slate-900 font-semibold text-lg">
            {tutor.monthlyRate ? `PKR ${tutor.monthlyRate.toLocaleString()}` : "Contact"}
          </span>
        </div>
        <button
          onClick={() => setShowCallModal(true)}
          className="flex-1 bg-[#FF4D00] text-white font-semibold text-xs py-3 rounded-xl hover:bg-[#e04400] transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <PhoneCall className="w-4 h-4" />
          Contact Tutor
        </button>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showCallModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative space-y-4"
            >
              <button
                onClick={() => setShowCallModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2 pt-2">
                <div className="w-14 h-14 bg-orange-50 text-[#FF4D00] rounded-2xl flex items-center justify-center mx-auto">
                  <PhoneCall className="w-7 h-7" />
                </div>
                <h3 className="text-slate-900 font-semibold text-lg">Contact {tutor.fullName}</h3>
                <p className="text-slate-500 text-xs font-normal">
                  Call directly or send a message on WhatsApp for trial sessions and tutoring inquiries.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-medium tracking-wider">
                  Verified Contact Phone
                </span>
                <p className="text-slate-900 font-semibold text-lg tracking-wide">
                  {tutor.phone || "+92 300 1234567"}
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href={`tel:${tutor.phone || "+923001234567"}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#FF4D00] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#e04400] transition-colors shadow-sm shadow-[#FF4D00]/20"
                >
                  <PhoneCall className="w-4 h-4" />
                  Direct Phone Call
                </a>

                <a
                  href={`https://wa.me/${(tutor.phone || "+923001234567").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hi ${tutor.fullName}, I saw your tutor profile on Ustaad platform and would like to inquire about tutoring.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white font-semibold text-sm py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Message
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
