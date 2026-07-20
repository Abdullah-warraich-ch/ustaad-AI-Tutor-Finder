"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Calculator,
  Atom,
  Code,
  GraduationCap,
  Award,
} from "lucide-react";

const GRADIENT_PRESETS = [
  "from-slate-800 to-slate-900",
  "from-indigo-900 to-slate-900",
  "from-blue-900 to-slate-900",
  "from-teal-900 to-slate-900",
  "from-purple-900 to-slate-900",
  "from-rose-900 to-slate-900",
];

function getSingleSubjectIcon(subjectName = "") {
  const text = subjectName.toLowerCase();
  if (text.includes("math") || text.includes("calc") || text.includes("stat")) return Calculator;
  if (text.includes("phys") || text.includes("chem") || text.includes("biol") || text.includes("sci")) return Atom;
  if (text.includes("comp") || text.includes("pyth") || text.includes("code") || text.includes("web")) return Code;
  if (text.includes("eng") || text.includes("urdu") || text.includes("lit") || text.includes("isl")) return GraduationCap;
  return BookOpen;
}

export default function TutorSubjectCard({ subjectName, tutor, index }) {
  const qual = tutor.qualifications?.[0];
  const gradient = GRADIENT_PRESETS[index % GRADIENT_PRESETS.length];
  const SubjectIcon = getSingleSubjectIcon(subjectName);
  const tutorId = tutor._id || tutor.firebaseUid;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
    >
      <Link href={`/tutor/${tutorId}`} className="block flex-1">
        {/* Gradient Subject Header */}
        <div className={`bg-gradient-to-r ${gradient} p-4 text-white flex items-center justify-between gap-3`}>
          <div>
            <span className="text-[10px] font-medium tracking-wider text-slate-300 uppercase block">
              Subject Offered
            </span>
            <h4 className="font-semibold text-base leading-snug">
              {subjectName}
            </h4>
          </div>

          {/* Single Clean Subject Icon Badge */}
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center flex-shrink-0">
            <SubjectIcon className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Tutor Profile Details */}
        <div className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={
                  tutor.profilePhoto ||
                  (tutor.gender === "female"
                    ? "/female-placeholder.png"
                    : "/male-placeholder.png")
                }
                alt={tutor.fullName}
                className="w-12 h-12 rounded-full object-cover border border-slate-200 bg-slate-50 shadow-2xs"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <h3 className="text-slate-900 font-semibold text-sm truncate group-hover:text-[#FF4D00] transition-colors">
                  {tutor.fullName}
                </h3>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              </div>

              <p className="text-slate-500 text-xs truncate mt-0.5">
                {qual?.degree ? `${qual.degree} · ${qual.institution || ""}` : "Lahore, Pakistan"}
              </p>
            </div>
          </div>

          {/* Rating & Experience */}
          <div className="flex items-center gap-3 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 font-medium">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-semibold">{tutor.rating || 4.9}</span>
              <span className="text-slate-400">({tutor.totalReviews || 12})</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-slate-600">
              <Award className="w-3.5 h-3.5 text-slate-400" />
              <span>{tutor.experience || 3}+ Yrs Exp</span>
            </div>
          </div>

          {/* Accessible Localities */}
          {tutor.accessibleAreas?.length > 0 && (
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-normal">
              <MapPin className="w-3.5 h-3.5 text-[#FF4D00] flex-shrink-0" />
              <span className="line-clamp-1">
                {tutor.accessibleAreas.join(", ")}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Card Footer with Monthly Fee & View Details Button */}
      <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Monthly Fee
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-slate-900 font-semibold text-base tracking-tight">
              {tutor.monthlyRate ? `PKR ${tutor.monthlyRate.toLocaleString()}` : "Contact"}
            </span>
            {tutor.monthlyRate && (
              <span className="text-slate-500 text-xs font-normal">/ mo</span>
            )}
          </div>
        </div>

        <Link
          href={`/tutor/${tutorId}`}
          className="flex items-center gap-1.5 bg-slate-900 text-white font-medium text-xs px-3.5 py-2.5 rounded-xl hover:bg-[#FF4D00] transition-colors shadow-xs"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
