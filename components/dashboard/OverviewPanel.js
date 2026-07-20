"use client";

import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Star,
  TrendingUp,
  MapPin,
  Clock,
  Banknote,
  Award,
  CheckCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

function StatCard({ icon: Icon, label, value, color, index }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={index}
      className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-xs hover:border-slate-300 transition-colors"
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-slate-500 text-xs font-medium">{label}</p>
        <p className="text-slate-900 font-bold text-xl leading-tight">{value}</p>
      </div>
    </motion.div>
  );
}

function InfoChip({ icon: Icon, text }) {
  if (!text) return null;
  return (
    <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
      <Icon className="w-4 h-4 text-white/70 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}

export default function OverviewPanel({ profile, user }) {
  const stats = [
    {
      icon: Users,
      label: "Total Students",
      value: profile?.totalStudents ?? 0,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      icon: BookOpen,
      label: "Total Sessions",
      value: profile?.totalSessions ?? 0,
      color: "bg-gradient-to-br from-indigo-500 to-violet-600",
    },
    {
      icon: Star,
      label: "Rating",
      value: profile?.rating ? `${profile.rating.toFixed(1)} / 5` : "N/A",
      color: "bg-gradient-to-br from-amber-400 to-orange-500",
    },
    {
      icon: TrendingUp,
      label: "Total Reviews",
      value: profile?.totalReviews ?? 0,
      color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
  ];

  const displayName = profile?.fullName || user?.displayName || "Tutor";
  const avatarUrl =
    profile?.profileImage ||
    (profile?.gender?.toLowerCase() === "male"
      ? "/male-placeholder.png"
      : "/female-placeholder.png");

  return (
    <div className="space-y-6">
      {/* Welcome Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF4D00] via-[#FF6B00] to-[#FF8C00] p-6 sm:p-8 shadow-md shadow-[#FF4D00]/15 text-white"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-24 -translate-y-24" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -translate-x-16 translate-y-16" />
        </div>
        <div className="relative z-10 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-white/80 text-sm font-medium">Welcome back!</p>
            <h2 className="text-white font-bold text-2xl sm:text-3xl mt-0.5 truncate">
              {displayName}
            </h2>
            {profile?.bio && (
              <p className="text-white/90 text-sm mt-1.5 max-w-lg line-clamp-2">
                {profile.bio}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              <InfoChip
                icon={MapPin}
                text={
                  [profile?.city, profile?.country].filter(Boolean).join(", ") ||
                  null
                }
              />
              <InfoChip
                icon={Clock}
                text={
                  profile?.teachingMode
                    ? `${profile.teachingMode} teaching`
                    : null
                }
              />
              <InfoChip
                icon={Banknote}
                text={
                  profile?.monthlyRate ? `PKR ${profile.monthlyRate.toLocaleString()}/month` : null
                }
              />
              <InfoChip
                icon={Award}
                text={
                  profile?.experience != null
                    ? `${profile.experience} yr${profile.experience !== 1 ? "s" : ""} experience`
                    : null
                }
              />
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white/30 shadow-lg bg-white/10"
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* Accessible Areas & Time Slots */}
      {(profile?.accessibleAreas?.length > 0 || profile?.timeSlots?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Accessible Areas */}
          {profile?.accessibleAreas?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs"
            >
              <h3 className="text-slate-900 font-bold text-sm mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Accessible Areas (In-Person)
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.accessibleAreas.map((area) => (
                  <span
                    key={area}
                    className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Time Slots */}
          {profile?.timeSlots?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs"
            >
              <h3 className="text-slate-900 font-bold text-sm mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Preferred Time Slots
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.timeSlots.map((ts) => (
                  <span
                    key={ts}
                    className="bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    <Clock className="w-3 h-3 text-indigo-600" />
                    {ts}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Subjects + Availability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Subjects */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs"
        >
          <h3 className="text-slate-900 font-bold text-sm mb-3">Subjects</h3>
          {profile?.subjects?.length ? (
            <div className="flex flex-wrap gap-2">
              {profile.subjects.map((s) => (
                <span
                  key={s}
                  className="bg-orange-50 text-[#FF4D00] border border-orange-200 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-xs">No subjects added yet</p>
          )}
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs"
        >
          <h3 className="text-slate-900 font-bold text-sm mb-3">
            Weekly Availability
          </h3>
          {profile?.availability?.length ? (
            <div className="flex flex-wrap gap-2">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => {
                const active = profile.availability.includes(day);
                return (
                  <span
                    key={day}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${active
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-50 text-slate-400 border border-slate-200/60"
                      }`}
                  >
                    {day.slice(0, 3)}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-400 text-xs">No availability set yet</p>
          )}
        </motion.div>
      </div>

      {/* Qualifications */}
      {profile?.qualifications?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs"
        >
          <h3 className="text-slate-900 font-bold text-sm mb-3">
            Qualifications
          </h3>
          <div className="space-y-3">
            {profile.qualifications.map((q, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#FF4D00] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-900 text-sm font-semibold">{q.degree}</p>
                  <p className="text-slate-500 text-xs">
                    {q.institution}
                    {q.year ? ` · ${q.year}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
