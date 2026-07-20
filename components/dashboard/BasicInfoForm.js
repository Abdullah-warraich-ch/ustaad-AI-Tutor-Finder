"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, FileText, Save, CheckCircle2 } from "lucide-react";

function FormField({ label, icon: Icon, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-700">{label}</label>
      <div className="relative group flex items-center">
        {Icon && (
          <Icon className="w-4 h-4 absolute left-3.5 text-slate-400 group-focus-within:text-[#FF4D00] transition-colors pointer-events-none z-10" />
        )}
        {children}
      </div>
    </div>
  );
}

const INPUT_CLS =
  "w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15 transition-all text-sm font-medium";

export default function BasicInfoForm({ profile, onSave }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: "Pakistan",
    gender: "",
    dateOfBirth: "",
    bio: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        city: profile.city || "",
        country: profile.country || "Pakistan",
        gender: profile.gender || "",
        dateOfBirth: profile.dateOfBirth
          ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
          : "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

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

    const result = await onSave(form);

    setSaving(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-7 shadow-xs"
    >
      <div className="mb-6">
        <h2 className="text-slate-900 font-bold text-lg">Basic Information</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Your personal details visible to students
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full Name *" icon={User}>
            <input
              type="text"
              name="fullName"
              required
              value={form.fullName ?? ""}
              onChange={handleChange}
              placeholder="Your full name"
              className={INPUT_CLS}
            />
          </FormField>
          <FormField label="Email Address *" icon={Mail}>
            <input
              type="email"
              name="email"
              required
              value={form.email ?? ""}
              onChange={handleChange}
              placeholder="your@email.com"
              className={INPUT_CLS}
            />
          </FormField>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Phone Number" icon={Phone}>
            <input
              type="tel"
              name="phone"
              value={form.phone ?? ""}
              onChange={handleChange}
              placeholder="+92 300 0000000"
              className={INPUT_CLS}
            />
          </FormField>
          <FormField label="Gender" icon={User}>
            <select
              name="gender"
              value={form.gender ?? ""}
              onChange={handleChange}
              className={`${INPUT_CLS} appearance-none`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </FormField>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="City" icon={MapPin}>
            <input
              type="text"
              name="city"
              value={form.city ?? ""}
              onChange={handleChange}
              placeholder="Lahore, Karachi…"
              className={INPUT_CLS}
            />
          </FormField>
          <FormField label="Country" icon={MapPin}>
            <input
              type="text"
              name="country"
              value={form.country ?? ""}
              onChange={handleChange}
              placeholder="Pakistan"
              className={INPUT_CLS}
            />
          </FormField>
        </div>

        {/* Date of Birth */}
        <FormField label="Date of Birth" icon={Calendar}>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth ?? ""}
            onChange={handleChange}
            className={INPUT_CLS}
          />
        </FormField>

        {/* Bio */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Bio / About You
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
            <textarea
              name="bio"
              value={form.bio ?? ""}
              onChange={handleChange}
              rows={4}
              maxLength={1000}
              placeholder="Tell students about your teaching philosophy, experience, and what makes you unique…"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15 transition-all text-sm font-medium resize-none"
            />
            <span className="absolute bottom-2 right-3 text-slate-400 text-xs font-medium">
              {(form.bio ?? "").length}/1000
            </span>
          </div>
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
                {saving ? "Saving…" : "Save Basic Info"}
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
