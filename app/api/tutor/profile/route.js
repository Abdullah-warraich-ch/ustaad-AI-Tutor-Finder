import { connectDB } from "@/lib/mongodb";
import { TutorProfile } from "@/models/TutorProfile";

/**
 * GET  /api/tutor/profile?uid=<firebaseUid>
 * POST /api/tutor/profile  body: { firebaseUid, ...profileFields }
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return Response.json({ error: "uid query param is required" }, { status: 400 });
  }

  try {
    await connectDB();
    const profile = await TutorProfile.findOne({ firebaseUid: uid }).lean();

    if (!profile) {
      return Response.json({ profile: null }, { status: 200 });
    }

    return Response.json({ profile }, { status: 200 });
  } catch (err) {
    console.error("GET /api/tutor/profile error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { firebaseUid, ...fields } = body;

    if (!firebaseUid) {
      return Response.json({ error: "firebaseUid is required" }, { status: 400 });
    }

    await connectDB();

    // Upsert — create if not exists, otherwise merge
    const profile = await TutorProfile.findOneAndUpdate(
      { firebaseUid },
      { $set: { ...fields, firebaseUid } },
      { upsert: true, new: true, runValidators: true }
    );

    // Check if profile is complete enough
    const required = ["fullName", "email", "phone", "city", "subjects", "bio"];
    const isComplete = required.every(
      (k) => profile[k] && (Array.isArray(profile[k]) ? profile[k].length > 0 : true)
    );
    if (isComplete !== profile.isProfileComplete) {
      profile.isProfileComplete = isComplete;
      await profile.save();
    }

    return Response.json({ profile }, { status: 200 });
  } catch (err) {
    console.error("POST /api/tutor/profile error:", err);
    return Response.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
