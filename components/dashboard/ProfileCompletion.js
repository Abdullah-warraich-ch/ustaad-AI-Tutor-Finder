"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

const SETUP_STEPS = [
  { key: "fullName", label: "Full Name" },
  { key: "phone", label: "Phone Number" },
  { key: "city", label: "City" },
  { key: "bio", label: "Bio" },
  { key: "subjects", label: "Subjects" },
  { key: "monthlyRate", label: "Monthly Rate" },
];

export default function ProfileCompletion({ profile, onGoToBasicInfo }) {
  const completed = SETUP_STEPS.filter((s) => {
    const val = profile?.[s.key];
    if (Array.isArray(val)) return val.length > 0;
    return !!val;
  });

  const percent = Math.round((completed.length / SETUP_STEPS.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5 text-amber-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-900 font-bold text-sm">
              Complete your profile to start getting students
            </h3>
            <p className="text-slate-600 text-xs mt-0.5">
              {percent}% complete — {SETUP_STEPS.length - completed.length} step
              {SETUP_STEPS.length - completed.length !== 1 ? "s" : ""} remaining
            </p>

            {/* Progress bar */}
            <div className="mt-3 h-2 bg-slate-200/80 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-amber-500 to-[#FF4D00] rounded-full"
              />
            </div>

            {/* Steps checklist */}
            <div className="mt-3 flex flex-wrap gap-2">
              {SETUP_STEPS.map((step) => {
                const done = completed.some((c) => c.key === step.key);
                return (
                  <span
                    key={step.key}
                    className={`flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold ${done
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-white/80 text-slate-500 border border-slate-200"
                      }`}
                  >
                    {done && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    {step.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={onGoToBasicInfo}
          className="flex items-center gap-2 bg-[#FF4D00] text-white font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-[#e04400] hover:shadow-md hover:shadow-[#FF4D00]/20 transition-all active:scale-95 flex-shrink-0"
        >
          Complete Profile
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
