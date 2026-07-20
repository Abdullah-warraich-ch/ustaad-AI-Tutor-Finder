import { connectDB } from "@/lib/mongodb";
import { TutorProfile } from "@/models/TutorProfile";

/**
 * GET /api/tutors/[id]
 * Public endpoint to fetch details of a specific tutor by Mongo _id or firebaseUid.
 */
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    let tutor = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      tutor = await TutorProfile.findById(id).lean();
    }
    
    if (!tutor) {
      tutor = await TutorProfile.findOne({ firebaseUid: id }).lean();
    }

    if (!tutor) {
      return Response.json({ error: "Tutor profile not found" }, { status: 404 });
    }

    return Response.json({ tutor }, { status: 200 });
  } catch (err) {
    console.error("GET /api/tutors/[id] error:", err);
    return Response.json({ error: "Failed to fetch tutor details" }, { status: 500 });
  }
}
