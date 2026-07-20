"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Banknote,
  Clock,
  Globe,
  MapPin,
  Save,
  CheckCircle2,
  X,
  Plus,
} from "lucide-react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const EDUCATION_LEVELS = [
  { value: "primary", label: "Primary (Class 1–5)" },
  { value: "secondary", label: "Secondary (Class 6–10)" },
  { value: "college", label: "College (11–12 / FSc)" },
  { value: "university", label: "University" },
  { value: "all", label: "All Levels" },
];
const TEACHING_MODES = [
  { value: "online", label: "Online" },
  { value: "in-person", label: "In-Person" },
  { value: "both", label: "Both" },
];
const TIME_SLOT_PRESETS = [
  "Morning (8 AM - 12 PM)",
  "Afternoon (12 PM - 5 PM)",
  "Evening (5 PM - 9 PM)",
  "Night (9 PM - 12 AM)",
];

const INPUT_CLS =
  "w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15 transition-all text-sm font-medium";

function FormField({ label, icon: Icon, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative group flex items-center">
        {Icon && (
          <Icon className="w-4 h-4 absolute left-3.5 text-slate-400 group-focus-within:text-[#FF4D00] transition-colors pointer-events-none z-10" />
        )}
        {children}
      </div>
    </div>
  );
}

export default function TeachingDetailsForm({ profile, onSave }) {
  const [form, setForm] = useState({
    subjects: [],
    educationLevel: "",
    teachingMode: "both",
    accessibleAreas: [],
    experience: "",
    monthlyRate: "",
    availability: [],
    timeSlots: [],
    languages: [],
  });
  const [subjectInput, setSubjectInput] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const [timeSlotInput, setTimeSlotInput] = useState("");
  const [langInput, setLangInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      setForm({
        subjects: profile.subjects || [],
        educationLevel: profile.educationLevel || "",
        teachingMode: profile.teachingMode || "both",
        accessibleAreas: profile.accessibleAreas || [],
        experience:
          profile.experience !== undefined && profile.experience !== null
            ? profile.experience
            : "",
        monthlyRate:
          profile.monthlyRate !== undefined && profile.monthlyRate !== null
            ? profile.monthlyRate
            : "",
        availability: profile.availability || [],
        timeSlots: profile.timeSlots || [],
        languages: profile.languages || [],
      });
    }
  }, [profile]);

  const addTag = (field, value, setter) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (!form[field].includes(trimmed)) {
      setForm((prev) => ({ ...prev, [field]: [...prev[field], trimmed] }));
      setSaved(false);
    }
    setter("");
  };

  const removeTag = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((v) => v !== value),
    }));
    setSaved(false);
  };

  const toggleDay = (day) => {
    setForm((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }));
    setSaved(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      experience: form.experience !== "" ? Number(form.experience) : undefined,
      monthlyRate:
        form.monthlyRate !== "" ? Number(form.monthlyRate) : undefined,
    };
    const result = await onSave(payload);
    setSaving(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const showAccessibleAreas =
    form.teachingMode === "in-person" || form.teachingMode === "both";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-7 shadow-xs"
    >
      <div className="mb-6">
        <h2 className="text-slate-900 font-bold text-lg">Teaching Details</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Define your expertise, monthly rates, locations, and time slots
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Subjects */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Subjects You Teach
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag("subjects", subjectInput, setSubjectInput);
                  }
                }}
                placeholder="e.g. Mathematics, Physics…"
                className={INPUT_CLS}
              />
            </div>
            <button
              type="button"
              onClick={() => addTag("subjects", subjectInput, setSubjectInput)}
              className="flex items-center gap-1 bg-orange-50 text-[#FF4D00] border border-orange-200 px-4 rounded-xl text-sm font-semibold hover:bg-orange-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          {form.subjects.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.subjects.map((s) => (
                <span
                  key={s}
                  className="flex items-center gap-1.5 bg-orange-50 text-[#FF4D00] border border-orange-200 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeTag("subjects", s)}
                    className="text-[#FF4D00]/60 hover:text-[#FF4D00] transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Row — Education Level & Teaching Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Education Level
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                name="educationLevel"
                value={form.educationLevel ?? ""}
                onChange={handleChange}
                className={`${INPUT_CLS} appearance-none`}
              >
                <option value="">Select level</option>
                {EDUCATION_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Teaching Mode
            </label>
            <div className="flex gap-2">
              {TEACHING_MODES.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, teachingMode: m.value }))
                  }
                  className={`flex-1 py-3 rounded-xl text-xs font-semibold border transition-all ${
                    form.teachingMode === m.value
                      ? "bg-[#FF4D00] text-white border-[#FF4D00] shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conditional Accessible Areas (Only when In-Person or Both selected) */}
        {showAccessibleAreas && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1.5 p-4 bg-emerald-50/40 border border-emerald-200/60 rounded-2xl"
          >
            <label className="block text-xs font-bold text-emerald-900">
              Accessible Areas / Localities (for In-Person Tutoring)
            </label>
            <p className="text-emerald-700/70 text-xs">
              Enter towns, sectors, or neighborhoods where you can physically teach
            </p>
            <div className="flex gap-2 pt-1">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none" />
                <input
                  type="text"
                  value={areaInput}
                  onChange={(e) => setAreaInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag("accessibleAreas", areaInput, setAreaInput);
                    }
                  }}
                  placeholder="e.g. Model Town, Gulberg, Johar Town, DHA Phase 5…"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-emerald-200 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all text-sm font-medium"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  addTag("accessibleAreas", areaInput, setAreaInput)
                }
                className="flex items-center gap-1 bg-emerald-600 text-white px-4 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Add Area
              </button>
            </div>
            {form.accessibleAreas.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.accessibleAreas.map((area) => (
                  <span
                    key={area}
                    className="flex items-center gap-1.5 bg-white text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full shadow-2xs"
                  >
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {area}
                    <button
                      type="button"
                      onClick={() => removeTag("accessibleAreas", area)}
                      className="text-emerald-600 hover:text-emerald-900 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Row — Experience & Monthly Rate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Years of Experience" icon={Clock}>
            <input
              type="number"
              name="experience"
              min="0"
              max="60"
              value={form.experience ?? ""}
              onChange={handleChange}
              placeholder="e.g. 3"
              className={INPUT_CLS}
            />
          </FormField>
          <FormField label="Monthly Rate (PKR)" icon={Banknote}>
            <input
              type="number"
              name="monthlyRate"
              min="0"
              value={form.monthlyRate ?? ""}
              onChange={handleChange}
              placeholder="e.g. 25000"
              className={INPUT_CLS}
            />
          </FormField>
        </div>

        {/* Availability Days */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Available Days
          </label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => {
              const active = form.availability.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    active
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Time Slots */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Preferred Time Slots
          </label>
          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 mb-2">
            {TIME_SLOT_PRESETS.map((slot) => {
              const active = form.timeSlots.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    if (active) removeTag("timeSlots", slot);
                    else
                      setForm((prev) => ({
                        ...prev,
                        timeSlots: [...prev.timeSlots, slot],
                      }));
                  }}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    active
                      ? "bg-indigo-50 text-indigo-700 border-indigo-200 font-bold"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          {/* Custom Time Slot Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={timeSlotInput}
                onChange={(e) => setTimeSlotInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag("timeSlots", timeSlotInput, setTimeSlotInput);
                  }
                }}
                placeholder="Custom time slot e.g. 4:00 PM - 6:30 PM…"
                className={INPUT_CLS}
              />
            </div>
            <button
              type="button"
              onClick={() =>
                addTag("timeSlots", timeSlotInput, setTimeSlotInput)
              }
              className="flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 px-4 rounded-xl text-sm font-semibold hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Slot
            </button>
          </div>
          {form.timeSlots.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.timeSlots.map((ts) => (
                <span
                  key={ts}
                  className="flex items-center gap-1.5 bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  <Clock className="w-3 h-3 text-indigo-600" />
                  {ts}
                  <button
                    type="button"
                    onClick={() => removeTag("timeSlots", ts)}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Languages */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Languages You Teach In
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag("languages", langInput, setLangInput);
                  }
                }}
                placeholder="e.g. Urdu, English…"
                className={INPUT_CLS}
              />
            </div>
            <button
              type="button"
              onClick={() => addTag("languages", langInput, setLangInput)}
              className="flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-4 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          {form.languages.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.languages.map((l) => (
                <span
                  key={l}
                  className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {l}
                  <button
                    type="button"
                    onClick={() => removeTag("languages", l)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-700 text-xs font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
            {error}
          </p>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#FF4D00] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#e04400] hover:shadow-md hover:shadow-[#FF4D00]/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {saving ? "Saving…" : "Save Teaching Details"}
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
