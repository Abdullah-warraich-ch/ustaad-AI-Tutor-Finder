"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
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
  Banknote,
  CheckCircle2,
  Calendar,
  X,
} from "lucide-react";

export default function TutorDetailPage({ params }) {
  const { id } = use(params);
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

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
          <p className="text-slate-500 text-xs font-semibold">Loading tutor profile...</p>
        </div>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 max-w-sm text-center space-y-4">
          <p className="text-slate-700 font-semibold text-sm">Tutor profile not found.</p>
          <Link
            href="/tutor"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Tutors
          </Link>
        </div>
      </div>
    );
  }

  const qual = tutor.qualifications?.[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/tutor"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Tutors
          </Link>

          <Link href="/" className="text-lg font-black tracking-tight text-slate-900">
            Ustaad<span className="text-[#FF4D00]">.</span>
          </Link>
        </div>
      </header>

      {/* Main Profile Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Tutor Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={
                  tutor.profilePhoto ||
                  (tutor.gender === "female"
                    ? "/female-placeholder.png"
                    : "/male-placeholder.png")
                }
                alt={tutor.fullName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-slate-100 bg-slate-50 shadow-xs"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            {/* Main Info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h1 className="text-slate-900 font-extrabold text-xl sm:text-2xl">
                  {tutor.fullName}
                </h1>
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              </div>

              {qual && (
                <p className="text-slate-600 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  {qual.degree} · {qual.institution || "Lahore"}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 pt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-slate-900 font-bold">{tutor.rating || 4.9}</span>
                  <span className="text-slate-400">({tutor.totalReviews || 12} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4D00]" />
                  <span>{tutor.city || "Lahore"}, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rate & Primary Call Action */}
          <div className="w-full md:w-auto bg-slate-50 border border-slate-100 rounded-2xl p-4 flex md:flex-col items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Monthly Tuition Fee
              </span>
              <span className="text-slate-900 font-extrabold text-xl sm:text-2xl">
                {tutor.monthlyRate ? `PKR ${tutor.monthlyRate.toLocaleString()}` : "Contact"}
                <span className="text-slate-400 text-xs font-medium"> / mo</span>
              </span>
            </div>

            <button
              onClick={() => setShowCallModal(true)}
              className="flex items-center justify-center gap-2 bg-[#FF4D00] text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#e04400] transition-all shadow-md shadow-[#FF4D00]/20 active:scale-95 w-full sm:w-auto"
            >
              <PhoneCall className="w-4 h-4" />
              Call Tutor
            </button>
          </div>
        </motion.div>

        {/* Grid of Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            {tutor.bio && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-2">
                <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider">
                  About the Tutor
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {tutor.bio}
                </p>
              </div>
            )}

            {/* Subjects Offered */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-3">
              <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#FF4D00]" />
                Subjects Taught
              </h3>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects?.map((sub) => (
                  <span
                    key={sub}
                    className="bg-slate-100 text-slate-800 border border-slate-200/80 text-xs font-semibold px-3 py-1.5 rounded-xl"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Accessible Lahore Localities */}
            {tutor.accessibleAreas?.length > 0 && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-3">
                <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF4D00]" />
                  Accessible Localities in Lahore
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tutor.accessibleAreas.map((area) => (
                    <span
                      key={area}
                      className="bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                    >
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Qualifications */}
            {tutor.qualifications?.length > 0 && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4">
                <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#FF4D00]" />
                  Education & Qualifications
                </h3>
                <div className="space-y-3">
                  {tutor.qualifications.map((q, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-slate-900 font-bold text-sm">{q.degree}</h4>
                        <p className="text-slate-500 text-xs font-medium mt-0.5">{q.institution}</p>
                      </div>
                      {q.year && (
                        <span className="text-xs font-semibold bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-600">
                          {q.year}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (1 col) */}
          <div className="space-y-6">
            {/* Quick Details Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider">
                Teaching Information
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Experience:</span>
                  <span className="text-slate-900 font-semibold">{tutor.experience || 3}+ Years</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Teaching Mode:</span>
                  <span className="text-slate-900 font-semibold capitalize">{tutor.teachingMode || "Both"}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Education Level:</span>
                  <span className="text-slate-900 font-semibold capitalize">{tutor.educationLevel || "All Levels"}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-500 font-medium">Languages:</span>
                  <span className="text-slate-900 font-semibold">
                    {tutor.languages?.join(", ") || "English, Urdu"}
                  </span>
                </div>
              </div>
            </div>

            {/* Time Slots & Availability */}
            {tutor.availability?.length > 0 && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-3">
                <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF4D00]" />
                  Available Days & Slots
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {tutor.availability.map((day) => (
                    <span
                      key={day}
                      className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-lg"
                    >
                      {day}
                    </span>
                  ))}
                </div>

                {tutor.timeSlots?.length > 0 && (
                  <div className="pt-2 space-y-1">
                    <p className="text-slate-400 text-[11px] font-semibold uppercase">Preferred Hours:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tutor.timeSlots.map((ts) => (
                        <span key={ts} className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg">
                          {ts}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Call / Contact Modal */}
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
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2 pt-2">
                <div className="w-14 h-14 bg-orange-50 text-[#FF4D00] rounded-2xl flex items-center justify-center mx-auto">
                  <PhoneCall className="w-7 h-7" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg">Contact {tutor.fullName}</h3>
                <p className="text-slate-500 text-xs">
                  Call directly or send a message on WhatsApp for trial sessions and tutoring inquiries.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  Verified Phone Number
                </span>
                <p className="text-slate-900 font-extrabold text-lg tracking-wide">
                  {tutor.phone || "+92 300 1234567"}
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href={`tel:${tutor.phone || "+923001234567"}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#FF4D00] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#e04400] transition-colors shadow-sm shadow-[#FF4D00]/20"
                >
                  <PhoneCall className="w-4 h-4" />
                  Direct Phone Call
                </a>

                <a
                  href={`https://wa.me/${(tutor.phone || "+923001234567").replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white font-bold text-sm py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20"
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
