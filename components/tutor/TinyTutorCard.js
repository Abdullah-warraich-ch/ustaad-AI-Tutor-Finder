"use client";

import Link from "next/link";
import { Star, ShieldCheck, ArrowRight, MapPin } from "lucide-react";

export default function TinyTutorCard({ tutor }) {
  if (!tutor) return null;

  const tutorId = tutor._id || tutor.firebaseUid;
  const primarySubject = tutor.displaySubject || tutor.subjects?.[0] || "General Tutor";
  const displayLocation = tutor.displayArea || tutor.accessibleAreas?.[0] || "Lahore";
  const qual = tutor.qualifications?.[0];

  return (
    <div className="w-52 flex-shrink-0 bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* DP & Name Row */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="relative flex-shrink-0">
            <img
              src={
                tutor.profilePhoto ||
                (tutor.gender === "female"
                  ? "/female-placeholder.png"
                  : "/male-placeholder.png")
              }
              alt={tutor.fullName}
              className="w-10 h-10 rounded-full object-cover border border-slate-200 bg-slate-50"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <h4 className="text-slate-900 font-semibold text-xs truncate group-hover:text-[#FF4D00] transition-colors">
                {tutor.fullName}
              </h4>
              <ShieldCheck className="w-3 h-3 text-emerald-600 flex-shrink-0" />
            </div>
            <p className="text-slate-400 text-[10px] truncate">
              {qual?.degree ? qual.degree : "Lahore, Pakistan"}
            </p>
          </div>
        </div>

        {/* Subject Pill */}
        <div className="mb-2">
          <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md inline-block truncate max-w-full">
            {primarySubject}
          </span>
        </div>

        {/* Rating & Location */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 mb-3">
          <div className="flex items-center gap-1 font-semibold text-slate-800">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{tutor.rating || 4.9}</span>
          </div>

          <div className="flex items-center gap-0.5 text-slate-400 text-[10px] truncate max-w-[100px]">
            <MapPin className="w-2.5 h-2.5 text-[#FF4D00] flex-shrink-0" />
            <span className="truncate">{displayLocation}</span>
          </div>
        </div>
      </div>

      {/* Footer Rate & Link */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
        <div>
          <span className="text-slate-900 font-bold text-xs">
            {tutor.monthlyRate ? `PKR ${(tutor.monthlyRate / 1000).toFixed(0)}k` : "Rate"}
          </span>
          <span className="text-slate-400 text-[10px]">/mo</span>
        </div>

        <Link
          href={`/tutor/${tutorId}?from=ai`}
          className="flex items-center gap-1 bg-slate-900 text-white font-medium text-[10px] px-2.5 py-1.5 rounded-lg hover:bg-[#FF4D00] transition-colors"
        >
          Profile
          <ArrowRight className="w-2.5 h-2.5" />
        </Link>
      </div>
    </div>
  );
}
