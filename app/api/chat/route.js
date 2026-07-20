import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TutorProfile } from "@/models/TutorProfile";

const STOPWORDS = new Set([
  "need", "want", "find", "looking", "lookingfor", "search", "show", "give", 
  "best", "good", "private", "home", "online", "teacher", "tutor", "teachers", 
  "tutors", "academy", "please", "can", "you", "me", "my", "a", "an", "the", 
  "in", "on", "at", "for", "with", "is", "are", "i", "sir", "madam", "hi", 
  "hello", "hey", "rate", "rates", "cost", "fee", "fees", "average", "price", 
  "prices", "what", "how", "much", "many", "does", "do", "tell", "explain", 
  "about", "monthly", "tuition", "work", "works", "system", "process", 
  "thanks", "thank", "ok", "okay", "cool", "great", "bye", "goodbye", 
  "level", "levels", "phase", "phases", "grade", "grades", "class", "classes",
  "town", "lahore", "city"
]);

const GREETINGS_AND_GENERIC = [
  "hi", "hello", "hey", "salam", "assalam", "aoa", "good morning", 
  "good evening", "good afternoon", "who are you", "what can you do", 
  "help", "test", "demo", "thanks", "thank you", "ok", "okay", "bye"
];

// Helper to check if string is a simple greeting / filler
function isSimpleGreetingOrFiller(text) {
  const clean = text.trim().toLowerCase().replace(/[^\w\s]/gi, "");
  if (!clean) return true;
  return GREETINGS_AND_GENERIC.some(
    (g) => clean === g || clean === `say ${g}` || clean === `${g} there`
  );
}

// Distinctive Lahore Area Keywords
const KNOWN_AREA_KEYWORDS = [
  "wapda", "model", "gulberg", "dha", "johar", "faisal", "askari", 
  "township", "cavalry", "garden", "allama", "iqbal", "valencia", "cantt"
];

function parseTokensAndAreas(text) {
  const clean = text.toLowerCase().replace(/[^\w\s]/gi, "");
  const words = clean.split(/\s+/).filter((w) => w.length >= 2);

  const subjectTokens = [];
  const areaTokens = [];

  words.forEach((w) => {
    if (KNOWN_AREA_KEYWORDS.includes(w)) {
      areaTokens.push(w);
    } else if (!STOPWORDS.has(w)) {
      subjectTokens.push(w);
    }
  });

  return { subjectTokens, areaTokens };
}

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY_3 || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const cleanedText = message.trim().toLowerCase();

    // 1. Strict Greeting Check: If current message is a simple greeting/thanks, NEVER return cards!
    const isGreetingOrFiller = isSimpleGreetingOrFiller(cleanedText);

    let matchedTutors = [];
    let isAreaFallback = false;

    if (!isGreetingOrFiller) {
      // Extract tokens from current user message
      const { subjectTokens: currentSubjects, areaTokens: currentAreas } = parseTokensAndAreas(cleanedText);

      let finalSubjectTokens = [...currentSubjects];
      let finalAreaTokens = [...currentAreas];

      // If current message has NO subject, look back at history for the most recent subject
      if (finalSubjectTokens.length === 0 && Array.isArray(history)) {
        for (let i = history.length - 1; i >= 0; i--) {
          if (history[i].sender === "user" && history[i].text) {
            const { subjectTokens: pastSubs } = parseTokensAndAreas(history[i].text);
            if (pastSubs.length > 0) {
              finalSubjectTokens = pastSubs;
              break;
            }
          }
        }
      }

      // If current message has NO area, look back at history for the most recent area
      if (finalAreaTokens.length === 0 && Array.isArray(history)) {
        for (let i = history.length - 1; i >= 0; i--) {
          if (history[i].sender === "user" && history[i].text) {
            const { areaTokens: pastAreas } = parseTokensAndAreas(history[i].text);
            if (pastAreas.length > 0) {
              finalAreaTokens = pastAreas;
              break;
            }
          }
        }
      }

      const allActiveTokens = [...new Set([...finalSubjectTokens, ...finalAreaTokens])];

      if (allActiveTokens.length > 0) {
        try {
          await connectDB();

          let queryCondition = { isActive: true };

          // Strict AND logic when both Subject and Area are specified
          if (finalSubjectTokens.length > 0 && finalAreaTokens.length > 0) {
            const subjectRegex = finalSubjectTokens.join("|");
            const areaRegex = finalAreaTokens.join("|");

            queryCondition.$and = [
              {
                $or: [
                  { subjects: { $regex: subjectRegex, $options: "i" } },
                  { educationLevel: { $regex: subjectRegex, $options: "i" } },
                ],
              },
              {
                accessibleAreas: { $regex: areaRegex, $options: "i" }
              },
            ];
          } else if (finalSubjectTokens.length > 0) {
            const subjectRegex = finalSubjectTokens.join("|");
            queryCondition.$or = [
              { subjects: { $regex: subjectRegex, $options: "i" } },
              { educationLevel: { $regex: subjectRegex, $options: "i" } },
            ];
          } else if (finalAreaTokens.length > 0) {
            const areaRegex = finalAreaTokens.join("|");
            queryCondition.accessibleAreas = { $regex: areaRegex, $options: "i" };
          }

          let rawMatchedTutors = await TutorProfile.find(queryCondition)
            .select("_id fullName subjects accessibleAreas monthlyRate rating experience teachingMode profilePhoto educationLevel gender phone")
            .limit(4)
            .lean();

          // FALLBACK LOGIC: If an Area was specified but ZERO tutors matched that area
          if (rawMatchedTutors.length === 0 && finalAreaTokens.length > 0 && finalSubjectTokens.length > 0) {
            isAreaFallback = true;

            // Search for tutors matching the SAME SUBJECT in nearby areas / online
            const subjectRegex = finalSubjectTokens.join("|");
            rawMatchedTutors = await TutorProfile.find({
              isActive: true,
              $or: [
                { subjects: { $regex: subjectRegex, $options: "i" } },
                { educationLevel: { $regex: subjectRegex, $options: "i" } },
              ]
            })
              .select("_id fullName subjects accessibleAreas monthlyRate rating experience teachingMode profilePhoto educationLevel gender phone")
              .limit(3)
              .lean();
          }

          // Re-order tutor's subjects & accessibleAreas so the user's searched subject & area appear FIRST on the card badge!
          matchedTutors = rawMatchedTutors.map((t) => {
            let updatedTutor = { ...t };

            // Subject alignment
            if (finalSubjectTokens.length > 0 && Array.isArray(t.subjects)) {
              const matchedSub = t.subjects.find((sub) =>
                finalSubjectTokens.some((st) => sub.toLowerCase().includes(st))
              );
              if (matchedSub) {
                const otherSubs = t.subjects.filter((s) => s !== matchedSub);
                updatedTutor.subjects = [matchedSub, ...otherSubs];
                updatedTutor.displaySubject = matchedSub;
              }
            }

            // Area alignment
            if (finalAreaTokens.length > 0 && Array.isArray(t.accessibleAreas)) {
              const matchedArea = t.accessibleAreas.find((area) =>
                finalAreaTokens.some((at) => area.toLowerCase().includes(at))
              );
              if (matchedArea) {
                const otherAreas = t.accessibleAreas.filter((a) => a !== matchedArea);
                updatedTutor.accessibleAreas = [matchedArea, ...otherAreas];
                updatedTutor.displayArea = matchedArea;
              }
            }

            return updatedTutor;
          });

        } catch (dbErr) {
          console.warn("MongoDB fetch warning in AI chat:", dbErr.message);
        }
      }
    }

    // Context formatting for Gemini
    let tutorContextNote = "";
    if (isAreaFallback) {
      tutorContextNote = `NOTE TO ASSISTANT: Zero tutors were found directly in the requested neighborhood. However, we retrieved fallback tutors in Lahore for the requested subject below. You MUST apologize to the user that no in-person tutors are currently available in their specific area, and introduce these recommended subject tutors in nearby areas or online!`;
    }

    const tutorContext = matchedTutors.length > 0
      ? `AVAILABLE MATCHED TUTORS IN LAHORE:
${tutorContextNote}
${matchedTutors
  .map(
    (t) => `Tutor:
Name: ${t.fullName}
ID: ${t._id}
Subjects: ${t.subjects?.join(", ") || "General"}
Areas: ${t.accessibleAreas?.join(", ") || "Lahore"}
Monthly Rate: ${t.monthlyRate ? `PKR ${t.monthlyRate.toLocaleString()}` : "Negotiable"}
Rating: ${t.rating || 4.8}★
Experience: ${t.experience || 3} years
Mode: ${t.teachingMode || "Both"}`
  )
  .join("\n\n")}`
      : "NO MATCHED TUTORS FOUND IN DATABASE FOR THIS SPECIFIC QUERY.";

    const systemPrompt = `ROLE
You are Ustaad AI Tutor Assistant, an intelligent and helpful assistant dedicated to helping users find, understand, and book private home and online tutors in Lahore, Pakistan.

CAPABILITIES & RESPONDING FREELY
1. INTELLECTUAL FREEDOM: You can answer general questions about private tutoring in Lahore, subject advice (Math, Physics, Chemistry, CS, Biology, O/A Levels, Matric, FSc), home vs online tuition, typical monthly fees, and how Ustaad works. If no specific tutors match in the database, respond conversationally and intelligently in your own voice!
2. AREA FALLBACK RULE: If the prompt indicates that zero tutors were found in their requested area (e.g. isAreaFallback), apologize politely for not having home tutors available in that specific neighborhood right now, and suggest the alternative tutors provided below who teach the same subject online or in nearby areas of Lahore.
3. CARD DISPLAY RULE: When specific tutors ARE provided under AVAILABLE MATCHED TUTORS IN LAHORE, introduce them briefly and mention that their interactive cards are displayed below. If NO tutors are provided under AVAILABLE MATCHED TUTORS IN LAHORE, answer the user's question directly without inventing any tutors or claiming cards are below.
4. CITY COVERAGE: Verified home tutors are currently available in **Lahore, Pakistan**. If asked about other cities (e.g. Karachi, Islamabad), explain politely that in-person tutors are in Lahore, but online tutors are available.
5. REJECT ONLY NON-TUTORING TOPICS: Only decline if the request is completely UNRELATED to tutoring/education (e.g. cooking recipes, writing computer code, sports trivia, politics). For non-tutoring topics, say:
"I am **Ustaad AI Assistant**, dedicated exclusively to helping you with private home and online tutoring in Lahore. Please ask me any questions about finding tutors, subjects, or tutoring rates!"
6. DO NOT WRITE BULLET LISTS OF TUTORS: Interactive Teacher Cards will automatically be displayed by the UI below your text message. Do not write text bullet lists of tutors.
7. HALLUCINATION PREVENTION: Never invent fake tutor names or IDs. Only reference tutor names provided in the context below.

${tutorContext}`;

    // Build multi-turn contents array for Gemini
    const contents = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const msg of history) {
        if (!msg.text) continue;
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [
              {
                text: systemPrompt,
              },
            ],
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.error?.message || "Gemini API request failed.",
        },
        { status: response.status }
      );
    }

    if (!data.candidates?.length) {
      return NextResponse.json(
        { error: "No response candidates returned from Gemini API." },
        { status: 500 }
      );
    }

    const reply =
      data.candidates[0]?.content?.parts?.[0]?.text ||
      "I am **Ustaad AI Assistant**. How can I help you find or select the right tutor for your studies in Lahore?";

    return NextResponse.json({ reply, matchedTutors });
  } catch (error) {
    console.error("AI Chat route error:", error);

    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      { status: 500 }
    );
  }
}