# 🏫 Ustaad — AI-Powered Home Tutor Finder

Ustaad is a premium, full-stack web application built on **Next.js** designed to seamlessly connect parents and students with verified, top-rated in-person home tutors. It features an advanced AI matchmaking search interface supporting English and Urdu voice-to-text queries, beautiful glassmorphic UI components, and fully responsive layouts.

---

## 🚀 Key Features

*   **🎙️ Smart Voice AI Inputs (`AIInput`)**
    *   Unified, layout-aware reusable input component supporting `capsule` (search bars) and `inline` (chatbot footers) layout variants.
    *   Integrates native Web Speech API with real-time recording animations, voice-to-text transcription, manual sending, and cancel fallbacks.
*   **🤖 Unified Matchmaking Backend (`/api/chat`)**
    *   API route running server-side in Next.js, directly connected to Google's latest **`gemini-3.1-flash-lite`** LLM endpoint.
    *   Processes user queries in both English and Urdu, matches profiles, and returns structured tutoring answers.
*   **📱 Responsive & Premium UI Aesthetics**
    *   Modern look featuring custom HSL color tokens, backdrop blurring, micro-interactions, and Framer Motion layout animations.
    *   Fully optimized for mobile, tablet, and desktop viewports.
    *   Adaptive Login page that hides clutter on smaller viewports.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 16 (App Router + Turbopack compiler)
*   **Styling**: Tailwind CSS & Vanilla CSS Variables
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **AI Engine**: Google Gemini API (`gemini-3.1-flash-lite`)

---

## ⚙️ Quick Start & Installation

### 1. Clone & Install Dependencies
Navigate to your project root folder and run:
```bash
npm install
```

### 2. Configure Environment Variables
Create a file named `.env` in the root directory:
```env
# Google Gemini API Credentials
# Get your API key from Google AI Studio: https://aistudio.google.com/
GEMINI_API_KEY_3=your_gemini_api_key_here
```

### 3. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🌐 API Reference

### POST `/api/chat`
Handles AI matchmaking queries.

*   **Headers**: `Content-Type: application/json`
*   **Request Body**:
    ```json
    {
      "message": "Need a math tutor for Grade 8 in Islamabad"
    }
    ```
*   **Success Response (200 OK)**:
    ```json
    {
      "reply": "I've matched you with Kamil Khan. He is a verified math tutor based in Islamabad specializing in concepts for middle schoolers."
    }
    ```
*   **Error Response (400 Bad Request / 500 Internal Server Error)**:
    ```json
    {
      "error": "Error details explaining the failure."
    }
    ```

---

## 📂 Project Directory Structure

```text
ustaad/
├── app/
│   ├── ai/                # AI Matchmaker Dashboard page
│   ├── api/chat/          # Next.js Server-side AI Chat route
│   ├── login/             # Responsive Login Screen
│   ├── globals.css        # Global CSS stylesheet & design tokens
│   ├── layout.js          # Main HTML structure & meta
│   └── page.js            # Landing Page routing wrapper
├── components/
│   ├── AIInput.js         # Unified voice/text input element
│   ├── FloatingAI.js      # Floating chat bubble assistant
│   ├── Navbar.js          # Floating navigation bar with mobile drawer
│   ├── Hero.js            # Main showcase section
│   ├── HowItWorks.js      # 3-step procedural diagram
│   ├── RecommendedTutors.js # Horizontal scrolling tutor cards
│   ├── FAQ.js             # Collapsible accordion FAQ list
│   └── Testimonials.js    # Multi-card review board
├── public/                # Static assets, SVG decorations, icons
├── .env                   # Local secret credentials (Git-ignored)
├── .gitignore             # Git ignore patterns
└── package.json           # Scripts and dependency versions
```

---

## 📄 License

This project is licensed under the terms of the private repository owner. All rights reserved.
