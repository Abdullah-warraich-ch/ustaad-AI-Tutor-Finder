import { connectDB } from "@/lib/mongodb";
import { TutorProfile } from "@/models/TutorProfile";

/**
 * GET /api/tutors
 * Public endpoint to search and list verified tutors in Lahore.
 */
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const subject = searchParams.get("subject") || "";
    const area = searchParams.get("area") || "";
    const mode = searchParams.get("mode") || "";
    const gender = searchParams.get("gender") || "";

    const query = { isActive: true };

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { subjects: { $regex: search, $options: "i" } },
        { accessibleAreas: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
      ];
    }

    if (subject) {
      query.subjects = { $regex: subject, $options: "i" };
    }

    if (area) {
      query.accessibleAreas = { $regex: area, $options: "i" };
    }

    if (mode && mode !== "all") {
      query.teachingMode = { $in: [mode, "both"] };
    }

    if (gender && gender !== "all") {
      query.gender = gender;
    }

    const tutors = await TutorProfile.find(query)
      .sort({ rating: -1, totalReviews: -1, createdAt: -1 })
      .lean();

    return Response.json({ tutors, count: tutors.length }, { status: 200 });
  } catch (err) {
    console.error("GET /api/tutors error:", err);
    return Response.json({ error: "Failed to fetch tutors" }, { status: 500 });
  }
}
