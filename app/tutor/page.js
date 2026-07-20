"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Search, User, X, Sparkles, SlidersHorizontal, Check, Globe, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import TutorSubjectCard from "@/components/tutor/TutorSubjectCard";

export default function TutorsListingPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");

  const popularSubjects = ["Mathematics", "Physics", "Biology", "Chemistry", "English"];

  const fetchTutors = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedGender && selectedGender !== "all") params.append("gender", selectedGender);
      if (selectedMode && selectedMode !== "all") params.append("mode", selectedMode);

      const res = await fetch(`/api/tutors?${params.toString()}`);
      const data = await res.json();
      setTutors(data.tutors || []);
    } catch (err) {
      console.error("Failed to fetch tutors:", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedGender, selectedMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTutors();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchTutors]);

  // Expand tutors into individual subject cards
  const subjectCards = useMemo(() => {
    return tutors.flatMap((tutor) => {
      const subjects = tutor.subjects?.length ? tutor.subjects : ["General Tutoring"];
      return subjects.map((subjectName) => ({
        cardId: `${tutor._id || tutor.firebaseUid}-${subjectName}`,
        subjectName,
        tutor,
      }));
    });
  }, [tutors]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedGender("all");
    setSelectedMode("all");
  };

  const hasActiveFilters = searchTerm !== "" || selectedGender !== "all" || selectedMode !== "all";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Global Navbar */}
      <Navbar />

      {/* Page Header Hero with Filter Controls */}
      <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-100/80 via-orange-50/40 to-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Title */}
          <div className="text-left space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              Verified Private Tutors in <span className="text-[#FF4D00]">Lahore</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-2xl leading-relaxed">
              Find qualified educators in Lahore by subject, gender preference, or teaching mode.
            </p>
          </div>

          {/* Premium Filter Controls Container */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-900/5 space-y-4">
            
            {/* Row 1: Search Input */}
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search subject, tutor name, or neighborhood (e.g. DHA, Johar Town)..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-normal outline-none focus:bg-white focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Row 2: Capsule Pill Switches for Mode & Gender */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-slate-100">
              
              {/* Left Group: Mode & Gender Capsule Switchers */}
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Mode Capsule Pills */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/60">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2.5 hidden sm:inline">
                    Mode:
                  </span>
                  {[
                    { id: "all", label: "All" },
                    { id: "in-person", label: "In-Person" },
                    { id: "online", label: "Online" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMode(m.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedMode === m.id
                          ? "bg-[#FF4D00] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* Gender Capsule Pills */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/60">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2.5 hidden sm:inline">
                    Gender:
                  </span>
                  {[
                    { id: "all", label: "All" },
                    { id: "male", label: "Male" },
                    { id: "female", label: "Female" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGender(g.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedGender === g.id
                          ? "bg-slate-900 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>

              </div>

              {/* Right Group: Popular Subject Tags */}
              <div className="hidden lg:flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-400 mr-1">Subjects:</span>
                {popularSubjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSearchTerm(sub)}
                    className={`text-xs px-2.5 py-1 rounded-xl font-medium border transition-all ${
                      searchTerm.toLowerCase() === sub.toLowerCase()
                        ? "bg-orange-50 border-[#FF4D00] text-[#FF4D00]"
                        : "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

            </div>

            {/* Row 3: Active Filter Chips Bar (Only shown when filters active) */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-slate-400">Active Filters:</span>
                  
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-[#FF4D00] font-medium">
                      "{searchTerm}"
                      <button onClick={() => setSearchTerm("")} className="hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedMode !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                      Mode: {selectedMode}
                      <button onClick={() => setSelectedMode("all")} className="hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedGender !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                      Gender: {selectedGender}
                      <button onClick={() => setSelectedGender("all")} className="hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>

                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#FF4D00] hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Main Grid of Subject Cards */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Results Counter Bar */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Showing <span className="text-slate-900 font-semibold">{subjectCards.length}</span> subject offerings across Lahore
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-72 bg-white border border-slate-200/80 rounded-2xl p-5 animate-pulse flex flex-col justify-between"
              >
                <div className="h-24 bg-slate-100 rounded-xl w-full" />
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-slate-200 rounded-md w-2/3" />
                  <div className="h-3 bg-slate-100 rounded-md w-1/2" />
                </div>
                <div className="h-10 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        ) : subjectCards.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200/80 rounded-2xl p-8 max-w-sm mx-auto space-y-3">
            <User className="w-9 h-9 text-slate-300 mx-auto" />
            <h3 className="text-slate-900 font-semibold text-sm">No tutor subject cards match your filter</h3>
            <p className="text-xs text-slate-500 font-normal">
              Try adjusting your search terms or clearing gender & mode filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 text-xs font-semibold text-white bg-[#FF4D00] hover:bg-[#e04400] px-4 py-2 rounded-xl transition-all"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectCards.map(({ cardId, subjectName, tutor }, index) => (
              <TutorSubjectCard
                key={cardId}
                subjectName={subjectName}
                tutor={tutor}
                index={index}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
