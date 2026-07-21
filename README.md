# 🏫 Ustaad — AI Tutor Finder & Educator Network

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini_3.1_Flash_Lite-4285F4?logo=google)](https://ai.google.dev/)

**Ustaad** is a full-stack AI-powered web platform built with **Next.js 16** that connects parents and students with verified home and online tutors across Lahore, Pakistan. Featuring conversational AI search powered by Google Gemini, real-time voice input, dynamic tutor dashboards, and smart location matching.

---

## 🎯 Platform Ecosystem

* **For Tutors (Educator Registration & Dashboard)**:
  * **Seamless Onboarding (`/signup`)**: Dedicated registration workflow for teachers to submit qualifications, subject specialties, accessible locations (e.g. DHA, Gulberg, Model Town, Johar Town), rates, and contact details.
  * **Tutor Dashboard (`/dashboard`)**: A modern Bento Grid interface enabling tutors to update their profile details, teaching preferences, subjects, and availability slots.
  * **Authentication (`/login`)**: Secure tutor login integration.

* **For Parents & Students (AI Finder)**:
  * **AI Finder (`/ai`)**: Search for verified home & online tutors using natural conversational phrasing—no mandatory account required for searchers.
  * **Smart Query Engine**: Contextually filters tutors by subject, geographical area, hourly/monthly budget (e.g., "affordable Math tutor in DHA"), and credentials.

---

## 🚀 Key Features

* **🤖 AI Search Matchmaker (`/ai` & `/api/chat`)**:
  * Driven by Google's **`gemini-3.1-flash-lite`** model integrated directly with a MongoDB database context matcher.
  * Supports multi-turn dialogue context retention (e.g., "Biology tutor" → "near Thokar" → "cheapest option").
  * Performs direct tutor credential lookups and provides polite fallback recommendations when exact matches are unavailable.
* **🎙️ Voice AI Search (`AIInput`)**:
  * Native Web Speech API integration allowing hands-free voice search queries with dynamic visualizer feedback animations.
* **✨ Modern Glassmorphic UI & Bento Grids**:
  * Vibrant gradient accents, responsive glassmorphism navigation, slide-in mobile drawer navigation, and smooth micro-animations.
* **🌱 Database Seeding Tool**:
  * Includes a built-in seeding script (`scripts/seedTutors.mjs`) to pre-populate verified teacher profiles for instant local development and testing.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **UI Library** | React 19, Lucide Icons, Framer Motion |
| **Styling** | Tailwind CSS v4 & Custom CSS Design Tokens |
| **Database** | MongoDB & Mongoose (`TutorProfile` model) |
| **Authentication & Storage** | Firebase & MongoDB |
| **AI Engine** | Google Gemini API (`gemini-3.1-flash-lite`) |
| **Notifications** | React Hot Toast |

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory of your project with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/ustaad?retryWrites=true&w=majority

# Google Gemini API Key
GEMINI_API_KEY=your_google_gemini_api_key

# Firebase Config (Optional / Auth)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have **Node.js 18+** installed on your system.

### 2. Installation
Clone the repository and install the dependencies:

```bash
git clone https://github.com/Abdullah-warraich-ch/ustaad-AI-Tutor-Finder.git
cd ustaad-AI-Tutor-Finder
npm install
```

### 3. Seed the Database
Populate your MongoDB database with sample tutor data:

```bash
node scripts/seedTutors.mjs
```

### 4. Run the Development Server
Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the platform.

---

## 📂 Directory Structure

```text
ustaad/
├── app/
│   ├── about/             # Platform mission & about us page
│   ├── ai/                # AI Tutor Finder interface (voice & text chat)
│   ├── api/
│   │   ├── chat/          # Gemini AI matchmaking & context search endpoint
│   │   ├── tutor/         # Single tutor profile API endpoints
│   │   └── tutors/        # Directory list & search API endpoints
│   ├── dashboard/         # Tutor dashboard & profile management
│   ├── login/             # Tutor authentication login page
│   ├── signup/            # Educator onboarding & registration page
│   ├── tutor/             # Tutor profile overview & detail pages
│   ├── globals.css        # Global CSS variables & design tokens
│   ├── layout.js          # Root application layout
│   └── page.js            # Landing page hero & featured sections
├── components/
│   ├── AIInput.js         # Voice & text search bar component with Web Speech API
│   ├── FloatingAI.js      # Global quick-access floating AI widget
│   ├── Navbar.js          # Glassmorphic navbar with mobile drawer navigation
│   ├── Footer.js          # Main site footer
│   ├── dashboard/         # Tutor dashboard widgets & profile editor
│   └── tutor/             # Interactive tutor cards & badges
├── lib/
│   ├── firebase.js        # Firebase initialize config
│   └── mongodb.js         # MongoDB connection helper (Mongoose)
├── models/
│   └── TutorProfile.js    # Mongoose schema for verified tutor profiles
├── scripts/
│   └── seedTutors.mjs     # Database seeder script
├── LICENSE                # MIT License file
└── README.md              # Project documentation
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.
