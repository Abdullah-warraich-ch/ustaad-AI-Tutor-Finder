"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Search, User } from "lucide-react";
import TutorSubjectCard from "@/components/tutor/TutorSubjectCard";

export default function TutorsListingPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header & Filter Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-900 flex items-center">
            Ustaad<span className="text-[#FF4D00]">.</span>
          </Link>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto flex-1 max-w-3xl justify-end">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search subject, tutor name, area..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 text-xs font-normal outline-none focus:bg-white focus:border-slate-400 transition-all"
              />
            </div>

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium outline-none focus:bg-white cursor-pointer"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium outline-none focus:bg-white cursor-pointer"
            >
              <option value="all">All Modes</option>
              <option value="in-person">In-Person</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Grid of Subject Cards */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Showing <span className="text-slate-900 font-semibold">{subjectCards.length}</span> subject offerings in Lahore
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
          <div className="text-center py-16 bg-white border border-slate-200/80 rounded-2xl p-8 max-w-sm mx-auto space-y-2">
            <User className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-slate-900 font-medium text-sm">No subject cards found</h3>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedGender("all");
                setSelectedMode("all");
              }}
              className="text-xs font-semibold text-[#FF4D00] hover:underline"
            >
              Clear filters
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
