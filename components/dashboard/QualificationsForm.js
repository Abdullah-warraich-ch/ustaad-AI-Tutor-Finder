"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  GraduationCap, 
  Building, 
  Calendar, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2, 
  Pencil, 
  X,
  Award 
} from "lucide-react";

const EMPTY_QUAL = { degree: "", institution: "", year: "" };

const INPUT_CLS =
  "w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15 transition-all text-sm font-medium";

function QualCard({ qual, index, onChange, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className="relative bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
          Qualification #{index + 1}
        </span>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-rose-500 hover:text-rose-700 transition-colors p-1 rounded-lg hover:bg-rose-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Degree */}
        <div className="space-y-1">
          <label className="text-xs text-slate-600 font-medium">Degree / Title</label>
          <div className="relative">
            <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={qual.degree ?? ""}
              onChange={(e) => onChange(index, "degree", e.target.value)}
              placeholder="e.g. B.Sc. Mathematics"
              className={INPUT_CLS}
            />
          </div>
        </div>

        {/* Institution */}
        <div className="space-y-1">
          <label className="text-xs text-slate-600 font-medium">Institution</label>
          <div className="relative">
            <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={qual.institution ?? ""}
              onChange={(e) => onChange(index, "institution", e.target.value)}
              placeholder="e.g. University of Punjab"
              className={INPUT_CLS}
            />
          </div>
        </div>

        {/* Graduation Year */}
        <div className="space-y-1">
          <label className="text-xs text-slate-600 font-medium">Year</label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="number"
              min="1950"
              max={new Date().getFullYear()}
              value={qual.year ?? ""}
              onChange={(e) => onChange(index, "year", e.target.value)}
              placeholder="e.g. 2020"
              className={INPUT_CLS}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function QualificationsForm({ profile, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [qualifications, setQualifications] = useState([{ ...EMPTY_QUAL }]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile?.qualifications?.length) {
      setQualifications(
        profile.qualifications.map((q) => ({
          degree: q.degree || "",
          institution: q.institution || "",
          year: q.year || "",
        }))
      );
    }
  }, [profile]);

  const handleChange = (index, field, value) => {
    setQualifications((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
    setSaved(false);
    setError("");
  };

  const addQual = () => {
    setQualifications((prev) => [...prev, { ...EMPTY_QUAL }]);
  };

  const removeQual = (index) => {
    setQualifications((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const cleaned = qualifications
      .filter((q) => q.degree || q.institution)
      .map((q) => ({
        degree: q.degree,
        institution: q.institution,
        year: q.year ? Number(q.year) : undefined,
      }));

    const result = await onSave({ qualifications: cleaned });
    setSaving(false);

    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
    } else {
      setSaved(true);
      toast.success("Qualifications saved successfully!");
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
          <h2 className="text-slate-900 font-bold text-lg">Qualifications</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Add your degrees and certifications to build student trust
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
              <Pencil className="w-3.5 h-3.5" /> Edit Qualifications
            </>
          )}
        </button>
      </div>

      {!isEditing ? (
        /* Read-Only Display Mode */
        <div>
          {profile?.qualifications?.length > 0 ? (
            <div className="space-y-3">
              {profile.qualifications.map((q, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-4 p-4 bg-slate-50/80 border border-slate-100 rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF4D00] flex items-center justify-center flex-shrink-0 border border-orange-200/60">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 font-bold text-sm sm:text-base">
                      {q.degree || "Degree Title"}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
                      {q.institution || "Institution"}
                      {q.year ? ` · Class of ${q.year}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-slate-50/60 border border-slate-100 rounded-2xl space-y-2">
              <GraduationCap className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-slate-500 text-sm font-medium">No qualifications added yet.</p>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-[#FF4D00] text-xs font-bold hover:underline"
              >
                + Add your first qualification
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Editable Form Mode */
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence>
            {qualifications.map((qual, i) => (
              <QualCard
                key={i}
                qual={qual}
                index={i}
                onChange={handleChange}
                onRemove={removeQual}
              />
            ))}
          </AnimatePresence>

          {/* Add Button */}
          <button
            type="button"
            onClick={addQual}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:border-slate-300 transition-all text-sm font-semibold shadow-2xs"
          >
            <Plus className="w-4 h-4 text-[#FF4D00]" />
            Add Another Qualification
          </button>

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
                  {saving ? "Saving…" : "Save Qualifications"}
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
