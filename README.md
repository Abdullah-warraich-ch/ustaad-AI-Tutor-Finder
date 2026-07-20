# 🏫 Ustaad — AI Tutor Finder & Educator Network

Ustaad is a full-stack web application built on **Next.js 16** that connects parents and students with top-rated, verified home and online tutors in Lahore, Pakistan.

---

## 🎯 Platform Ecosystem

* **For Tutors (Teacher Registration)**:
  * Dedicated signup workflow (`/signup`) designed exclusively for educators to register their academic qualifications, subjects, accessible neighborhoods (e.g. DHA, Gulberg, Model Town), monthly rates, and contact details.
  * Tutors manage their profile and teaching preferences in a customized tutor dashboard.

* **For Parents & Students (AI Finder)**:
  * No student registration required! Parents and students use **AI Finder** (`/ai`) to search for verified tutors in natural language.
  * Filters tutors progressively by subject, area, rate (e.g. "cheapest option"), and qualifications.

---

## 🚀 Key Features

* **🤖 AI Finder (`/ai` & `/api/chat`)**:
  * Powered by Google's **`gemini-3.1-flash-lite`** model with MongoDB database context matching.
  * Multi-turn progressive conversation: contextually narrows queries (e.g., "Biology" → "from Thokar" → "cheapest option").
  * Specific tutor inquiry lookup (e.g. "What is Ali's qualification?").
  * Strict location matching with polite fallback recommendations when zero tutors are in a specific area.
* **🎙️ Smart Voice AI Input (`AIInput`)**:
  * Unified input component with real-time Web Speech API voice-to-text recording animations.
* **📱 Responsive & Modern UI Aesthetics**:
  * Glassmorphic top navigation with slide-in right drawer for mobile devices.
  * High-performance responsive layouts for desktop, tablet, and mobile.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 16 (App Router + Turbopack)
* **Database**: MongoDB with Mongoose (`TutorProfile` schema)
* **AI Engine**: Google Gemini API (`gemini-3.1-flash-lite`)
* **Styling**: Tailwind CSS & Vanilla CSS Variables
* **Animations**: Framer Motion
* **Icons**: Lucide React

---

## ⚙️ Environment Configuration (`.env`)

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

---

## 📂 Project Directory Structure

```text
ustaad/
├── app/
│   ├── ai/                # AI Finder page (Full-height scrollable stream)
│   ├── about/             # Clean About Us page
│   ├── api/chat/          # AI Matchmaker endpoint (Gemini + MongoDB)
│   ├── login/             # Tutor Login screen
│   ├── signup/            # Tutor Registration page
│   ├── globals.css        # Global design tokens
│   ├── layout.js          # Root layout
│   └── page.js            # Home landing page
├── components/
│   ├── AIInput.js         # Voice & text search bar component
│   ├── Navbar.js          # Navbar with mobile right-drawer
│   ├── Footer.js          # Global footer
│   └── tutor/             # Interactive teacher cards (TinyTutorCard, etc.)
└── models/
    └── TutorProfile.js    # MongoDB schema for verified tutor accounts
```
