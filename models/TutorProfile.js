import mongoose from "mongoose";

const TutorProfileSchema = new mongoose.Schema(
  {
    // Linked to Firebase UID
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // ── Basic Info ──────────────────────────────────────────────────
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true, default: "Pakistan" },
    profilePhoto: { type: String }, // URL / base64
    bio: { type: String, maxlength: 1000 },
    gender: { type: String, enum: ["male", "female", "prefer_not_to_say"] },
    dateOfBirth: { type: Date },

    // ── Teaching Details ─────────────────────────────────────────────
    subjects: [{ type: String, trim: true }],
    educationLevel: {
      type: String,
      enum: ["primary", "secondary", "college", "university", "all"],
    },
    teachingMode: {
      type: String,
      enum: ["online", "in-person", "both"],
      default: "both",
    },
    experience: { type: Number, min: 0 }, // years
    monthlyRate: { type: Number, min: 0 }, // PKR
    availability: {
      type: [String],
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    accessibleAreas: [{ type: String, trim: true }], // e.g. Model Town, Gulberg
    timeSlots: [{ type: String, trim: true }], // e.g. Morning (8 AM - 12 PM), Evening (5 PM - 8 PM)
    languages: [{ type: String }],

    // ── Qualifications ───────────────────────────────────────────────
    qualifications: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: Number },
      },
    ],

    // ── Profile Status ───────────────────────────────────────────────
    isProfileComplete: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    // ── Stats (auto-updated) ─────────────────────────────────────────
    totalStudents: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

// Prevent model recompilation in Next.js HMR
export const TutorProfile =
  mongoose.models.TutorProfile ||
  mongoose.model("TutorProfile", TutorProfileSchema);
