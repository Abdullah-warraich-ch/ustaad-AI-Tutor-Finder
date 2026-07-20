"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Save, 
  CheckCircle2, 
  Pencil, 
  X 
} from "lucide-react";

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

function DisplayField({ label, icon: Icon, value }) {
  return (
    <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 space-y-1">
      <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
        {Icon && <Icon className="w-3.5 h-3.5 text-[#FF4D00]" />}
        <span>{label}</span>
      </div>
      <p className="text-slate-900 font-semibold text-sm">
        {value || <span className="text-slate-400 italic font-normal">Not provided</span>}
      </p>
    </div>
  );
}

const INPUT_CLS =
  "w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15 transition-all text-sm font-medium";

export default function BasicInfoForm({ profile, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
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
      toast.error(result.error);
    } else {
      setSaved(true);
      toast.success("Basic information saved successfully!");
      setIsEditing(false);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-7 shadow-xs"
    >
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-slate-900 font-bold text-lg">Basic Information</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Your personal details visible to students
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            isEditing
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
              : "bg-[#FF4D00] text-white hover:bg-[#e04400] shadow-sm shadow-[#FF4D00]/20"
          }`}
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" /> Cancel
            </>
          ) : (
            <>
              <Pencil className="w-3.5 h-3.5" /> Edit Info
            </>
          )}
        </button>
      </div>

      {!isEditing ? (
        /* Read-Only Display Mode */
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DisplayField label="Full Name" icon={User} value={profile?.fullName} />
            <DisplayField label="Email Address" icon={Mail} value={profile?.email} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DisplayField label="Phone Number" icon={Phone} value={profile?.phone} />
            <DisplayField 
              label="Gender" 
              icon={User} 
              value={
                profile?.gender === "male"
                  ? "Male"
                  : profile?.gender === "female"
                  ? "Female"
                  : profile?.gender === "prefer_not_to_say"
                  ? "Prefer not to say"
                  : null
              } 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DisplayField label="City" icon={MapPin} value={profile?.city} />
            <DisplayField label="Country" icon={MapPin} value={profile?.country || "Pakistan"} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DisplayField 
              label="Date of Birth" 
              icon={Calendar} 
              value={profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : null} 
            />
          </div>

          <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <FileText className="w-3.5 h-3.5 text-[#FF4D00]" />
              <span>Bio / About You</span>
            </div>
            <p className="text-slate-900 text-sm font-medium leading-relaxed whitespace-pre-line">
              {profile?.bio || <span className="text-slate-400 italic font-normal">No bio written yet. Click edit to add your bio.</span>}
            </p>
          </div>
        </div>
      ) : (
        /* Editable Form Mode */
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

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
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
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-3 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
