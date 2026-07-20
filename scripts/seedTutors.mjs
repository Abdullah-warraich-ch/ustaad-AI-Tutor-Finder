import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set in environment");
  process.exit(1);
}

// Inline TutorProfile Schema for standalone execution
const TutorProfileSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    city: { type: String, trim: true, default: "Lahore" },
    country: { type: String, trim: true, default: "Pakistan" },
    profilePhoto: { type: String },
    bio: { type: String, maxlength: 1000 },
    gender: { type: String, enum: ["male", "female", "prefer_not_to_say"] },
    dateOfBirth: { type: Date },
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
    experience: { type: Number, min: 0 },
    monthlyRate: { type: Number, min: 0 },
    availability: [{ type: String }],
    accessibleAreas: [{ type: String, trim: true }],
    timeSlots: [{ type: String, trim: true }],
    languages: [{ type: String }],
    qualifications: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: Number },
      },
    ],
    isProfileComplete: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    totalStudents: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TutorProfile =
  mongoose.models.TutorProfile ||
  mongoose.model("TutorProfile", TutorProfileSchema);

// Data Pools
const MALE_FIRST_NAMES = [
  "Muhammad", "Hamza", "Ali", "Bilal", "Usman", "Hassan", "Ahmed", "Usama",
  "Mustafa", "Zain", "Omer", "Tariq", "Fahad", "Saad", "Shahzaib", "Haris",
  "Shahmeer", "Daniyal", "Hamdan", "Rayyan", "Ahsan", "Waqas", "Asad", "Kashif", "Talha"
];

const FEMALE_FIRST_NAMES = [
  "Ayesha", "Fatima", "Zainab", "Sana", "Hira", "Mahnoor", "Zoya", "Mariam",
  "Iqra", "Noor", "Laiba", "Anum", "Khadija", "Eman", "Areeba", "Yumna",
  "Bisma", "Sundas", "Minahil", "Mehak", "Nimra", "Alishba", "Rimsha", "Kinza", "Rida"
];

const LAST_NAMES = [
  "Khan", "Malik", "Chaudhry", "Ahmed", "Sheikh", "Javed", "Shah", "Siddiqui",
  "Raza", "Bhatti", "Qureshi", "Nawaz", "Tariq", "Zafar", "Ibrahim", "Mirza",
  "Farooq", "Mahmood", "Riaz", "Iqbal", "Ashraf", "Akram", "Butt", "Warrich", "Gill"
];

const LAHORE_AREAS = [
  "Model Town", "Gulberg II", "Gulberg III", "DHA Phase 1", "DHA Phase 3",
  "DHA Phase 5", "DHA Phase 6", "Johar Town", "Garden Town", "Faisal Town",
  "Wapda Town", "Allama Iqbal Town", "Cavalry Ground", "Cantt", "Bahria Town",
  "Askari 10", "Askari 11", "Township", "Valencia Town", "Lake City"
];

const SUBJECT_COMBOS = [
  ["Mathematics", "Physics", "Calculus"],
  ["Physics", "Chemistry"],
  ["Biology", "Chemistry"],
  ["Computer Science", "Python", "Web Development"],
  ["English Literature", "English Grammar", "Creative Writing"],
  ["Accounting", "Economics", "Business Studies"],
  ["Mathematics", "Statistics"],
  ["Urdu", "Islamic Studies", "Pakistan Studies"],
  ["Computer Science", "C++", "Data Structures"],
  ["O/A Level Mathematics", "Physics"]
];

const UNIVERSITIES = [
  "LUMS (Lahore University of Management Sciences)",
  "FAST NUCES Lahore",
  "UET Lahore (University of Engineering & Technology)",
  "University of the Punjab (PU)",
  "Forman Christian College (FCCU)",
  "King Edward Medical University (KEMU)",
  "Lahore School of Economics (LSE)",
  "COMSATS University Lahore",
  "Government College University (GCU) Lahore",
  "University of Management and Technology (UMT)"
];

const DEGREES = [
  "B.Sc (Hons) Mathematics",
  "BS Computer Science",
  "B.Sc Electrical Engineering",
  "MBBS",
  "M.Phil Physics",
  "M.Sc Chemistry",
  "B.A. English Literature",
  "B.Sc Accounting & Finance",
  "M.Phil Education",
  "BS Software Engineering"
];

const TIME_SLOT_OPTIONS = [
  ["Morning (8 AM - 12 PM)", "Evening (5 PM - 9 PM)"],
  ["Afternoon (12 PM - 5 PM)", "Evening (5 PM - 9 PM)"],
  ["Evening (5 PM - 9 PM)", "Night (9 PM - 12 AM)"],
  ["Morning (8 AM - 12 PM)", "Afternoon (12 PM - 5 PM)", "Evening (5 PM - 9 PM)"]
];

const DAYS_COMBOS = [
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  ["Monday", "Wednesday", "Friday", "Saturday"],
  ["Tuesday", "Thursday", "Saturday", "Sunday"],
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomElements(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

async function seedDatabase() {
  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected successfully!");

    // Clean existing mock tutors
    console.log("🧹 Clearing old mock tutor profiles...");
    await TutorProfile.deleteMany({ firebaseUid: /^mock_tutor_lahore_/ });

    console.log("🌱 Generating 50 mock Lahore tutor profiles...");

    const mockTutors = [];

    for (let i = 1; i <= 50; i++) {
      const isFemale = i > 25; // 25 male, 25 female
      const gender = isFemale ? "female" : "male";
      const firstName = isFemale
        ? getRandomElement(FEMALE_FIRST_NAMES)
        : getRandomElement(MALE_FIRST_NAMES);
      const lastName = getRandomElement(LAST_NAMES);
      const fullName = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@ustaad-mock.pk`;
      const phone = `+92 3${getRandomInt(0, 4)}${getRandomInt(0, 9)} ${getRandomInt(1000000, 9999999)}`;
      
      const subjects = getRandomElement(SUBJECT_COMBOS);
      const accessibleAreas = getRandomElements(LAHORE_AREAS, getRandomInt(2, 5));
      const university = getRandomElement(UNIVERSITIES);
      const degree = getRandomElement(DEGREES);
      const gradYear = getRandomInt(2015, 2024);
      const expYears = Math.min(2026 - gradYear + getRandomInt(0, 2), 15);
      const teachingMode = getRandomElement(["online", "in-person", "both"]);
      const edLevel = getRandomElement(["secondary", "college", "university", "all"]);
      const monthlyRate = Math.round(getRandomInt(12000, 45000) / 1000) * 1000;
      
      const rating = getRandomFloat(4.3, 5.0);
      const totalStudents = getRandomInt(8, 55);
      const totalSessions = getRandomInt(25, 280);
      const totalReviews = getRandomInt(4, 42);

      const bio = `Dedicated ${subjects[0]} tutor in Lahore with over ${expYears} years of teaching experience. Graduated from ${university} with a degree in ${degree}. Passionate about building strong fundamental concepts, exam preparation (O/A Levels, Matric, FSc, entry tests), and helping students excel academically with personalized lesson plans.`;

      mockTutors.push({
        firebaseUid: `mock_tutor_lahore_${i}`,
        fullName,
        email,
        phone,
        city: "Lahore",
        country: "Pakistan",
        profilePhoto: isFemale ? "/female-placeholder.png" : "/male-placeholder.png",
        bio,
        gender,
        dateOfBirth: new Date(getRandomInt(1993, 2002), getRandomInt(0, 11), getRandomInt(1, 28)),
        subjects,
        educationLevel: edLevel,
        teachingMode,
        experience: expYears,
        monthlyRate,
        availability: getRandomElement(DAYS_COMBOS),
        accessibleAreas: teachingMode === "online" ? [] : accessibleAreas,
        timeSlots: getRandomElement(TIME_SLOT_OPTIONS),
        languages: ["English", "Urdu"],
        qualifications: [
          {
            degree,
            institution: university,
            year: gradYear,
          },
        ],
        isProfileComplete: true,
        isVerified: true,
        isActive: true,
        totalStudents,
        totalSessions,
        rating,
        totalReviews,
      });
    }

    const created = await TutorProfile.insertMany(mockTutors);
    console.log(`\n🎉 Successfully seeded ${created.length} Lahore tutor profiles into MongoDB!`);

    // Log sample
    console.log("\n📋 Sample Seeded Tutor:");
    console.log({
      name: created[0].fullName,
      gender: created[0].gender,
      city: created[0].city,
      subjects: created[0].subjects,
      accessibleAreas: created[0].accessibleAreas,
      monthlyRate: `PKR ${created[0].monthlyRate}`,
      rating: created[0].rating,
    });

  } catch (error) {
    console.error("❌ Seeding Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
}

seedDatabase();
