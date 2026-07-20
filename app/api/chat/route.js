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
  "town", "lahore", "city", "from", "option", "options"
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
  "township", "cavalry", "garden", "allama", "iqbal", "valencia", "cantt",
  "thokar", "niaz", "baig", "raiwind", "multan"
];

const CHEAP_KEYWORDS = ["cheapest", "cheap", "lowest", "affordable", "budget", "low price", "low rate"];
const HIGHEST_KEYWORDS = ["highest", "best", "top rated", "expensive"];

function parseTokensAndAreas(text) {
  const clean = text.toLowerCase().replace(/[^\w\s]/gi, "");
  const words = clean.split(/\s+/).filter((w) => w.length >= 2);

  const subjectTokens = [];
  const areaTokens = [];

  words.forEach((w) => {
    if (KNOWN_AREA_KEYWORDS.includes(w)) {
      areaTokens.push(w);
    } else if (!STOPWORDS.has(w) && !CHEAP_KEYWORDS.includes(w) && !HIGHEST_KEYWORDS.includes(w)) {
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
    let specificTutorDetails = "";

    if (!isGreetingOrFiller) {
      await connectDB();

      // Check if user is asking for details about a specific tutor by name
      const nameInquiryMatch = cleanedText.match(
        /(?:qualification|degree|institution|experience|number|phone|contact|whatsapp|fee|charge|rate|details|about)\s+(?:of\s+)?([a-z]+)/i
      ) || cleanedText.match(/([a-z]+)\s+(?:number|phone|contact|whatsapp|qualification|degree|fee|rate)/i);

      if (nameInquiryMatch) {
        const targetName = nameInquiryMatch[1];
        if (targetName && targetName.length > 2 && !STOPWORDS.has(targetName)) {
          const tutor = await TutorProfile.findOne({
            isActive: true,
            fullName: { $regex: targetName, $options: "i" }
          }).lean();

          if (tutor) {
            const quals = tutor.qualifications
              ?.map((q) => `${q.degree} from ${q.institution} (${q.year || "N/A"})`)
              .join(", ") || "Degrees listed on profile";

            specificTutorDetails = `SPECIFIC TUTOR INQUIRY DATA FOR ${tutor.fullName}:
- Name: ${tutor.fullName}
- Phone/Contact: ${tutor.phone || "Available on detail page"}
- Qualifications: ${quals}
- Experience: ${tutor.experience || 3} years
- Subjects: ${tutor.subjects?.join(", ")}
- Areas: ${tutor.accessibleAreas?.join(", ")}
- Monthly Rate: PKR ${tutor.monthlyRate ? tutor.monthlyRate.toLocaleString() : "Negotiable"}
- Rating: ${tutor.rating || 4.8}★`;

            matchedTutors = [tutor];
          }
        }
      }

      // If NOT a specific name detail inquiry, perform progressive subject/area/sort search
      if (!specificTutorDetails) {
        // Extract tokens from current user message
        const { subjectTokens: currentSubjects, areaTokens: currentAreas } = parseTokensAndAreas(cleanedText);

        let finalSubjectTokens = [...currentSubjects];
        let finalAreaTokens = [...currentAreas];

        // Progressive Chat Context: look back at past user messages if subject or area is missing in current turn
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

        // Check for sorting preference (cheapest / highest rated)
        const isCheapSort = CHEAP_KEYWORDS.some((k) => cleanedText.includes(k));
        const isHighestSort = HIGHEST_KEYWORDS.some((k) => cleanedText.includes(k));

        let sortOption = {};
        if (isCheapSort) {
          sortOption = { monthlyRate: 1 };
        } else if (isHighestSort) {
          sortOption = { rating: -1 };
        }

        const allActiveTokens = [...new Set([...finalSubjectTokens, ...finalAreaTokens])];

        if (allActiveTokens.length > 0 || isCheapSort || isHighestSort) {
          try {
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
              .select("_id fullName subjects accessibleAreas monthlyRate rating experience teachingMode profilePhoto educationLevel gender phone qualifications")
              .sort(sortOption)
              .limit(isCheapSort ? 1 : 4)
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
                .select("_id fullName subjects accessibleAreas monthlyRate rating experience teachingMode profilePhoto educationLevel gender phone qualifications")
                .sort(sortOption)
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
    }

    // Context formatting for Gemini
    let tutorContextNote = "";
    if (isAreaFallback) {
      tutorContextNote = `NOTE TO ASSISTANT: Zero tutors were found directly in the requested neighborhood. However, we retrieved fallback tutors in Lahore for the requested subject below. You MUST apologize to the user that no in-person tutors are currently available in their specific area, and introduce these recommended subject tutors in nearby areas or online!`;
    }

    const tutorContext = matchedTutors.length > 0
      ? `AVAILABLE MATCHED TUTORS IN LAHORE:
${tutorContextNote}
${specificTutorDetails}
${matchedTutors
        .map(
          (t) => `Tutor:
Name: ${t.fullName}
ID: ${t._id}
Phone: ${t.phone || "Available on detail page"}
Qualifications: ${t.qualifications?.map((q) => `${q.degree} (${q.institution})`).join(", ") || "Verified"}
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
You are Ustaad AI Finder, an intelligent and helpful assistant dedicated to helping users find, understand, and book private home and online tutors in Lahore, Pakistan.

CAPABILITIES & CONVERSATIONAL FEATURES
1. PROGRESSIVE FILTERING & PRICE SORTING:
- Users can progressively narrow down tutor searches (e.g. asking for "Biology teachers", then "from Thokar", then "cheapest option").
- If the user asks for the "cheapest option" or "lowest price", highlight the tutor with the lowest monthly fee from the matched cards below and state their rate clearly!
2. SPECIFIC TUTOR INQUIRIES:
- If the user asks for specific details about a tutor by name (e.g. "What is the qualification of Ali?", "I want Shahzaib's phone number", "How much does Hamdan charge?"), use the data under SPECIFIC TUTOR INQUIRY DATA / AVAILABLE MATCHED TUTORS to answer their question directly and accurately!
3. AREA FALLBACK RULE:
- If the prompt indicates that zero tutors were found in their requested area (e.g. isAreaFallback), apologize politely for not having home tutors available in that specific neighborhood right now, and suggest the alternative tutors provided below who teach the same subject online or in nearby areas of Lahore.
4. CARD DISPLAY RULE:
- Interactive Teacher Cards will automatically be displayed by the application UI below your text message. Do not write text bullet lists of tutors. Introduce the matched tutor or answer the inquiry directly!
5. CITY COVERAGE:
- Verified home tutors are currently available in **Lahore, Pakistan**. If asked about other cities (e.g. Karachi, Islamabad), explain politely that in-person tutors are in Lahore, but online tutors are available.
6. NO RAW ASTERISKS & CLEAN TEXT:
- Use bold formatting (**like this**) for key details such as **Tutor Names**, **Subjects**, **Rates**, and **Locations**.
- Do NOT use raw asterisks \`*\` for bullet points. Write in smooth, continuous natural sentences organized into clean paragraphs!
7. HALLUCINATION PREVENTION:
- Never invent fake tutor names, phone numbers, or qualifications. Only reference data provided in the context below.

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