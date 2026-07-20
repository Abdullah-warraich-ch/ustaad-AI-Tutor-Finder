"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Building, Calendar, Plus, Trash2, Save, CheckCircle2 } from "lucide-react";

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
        <h2 className="text-slate-900 font-bold text-lg">Qualifications</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Add your degrees and certifications to build student trust
        </p>
      </div>

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
                {saving ? "Saving…" : "Save Qualifications"}
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
