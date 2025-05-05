## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Planned Sprints

# Sprint 1: Project Setup & Basic Voice Transcription

Goal: Get a working Next.js app with basic voice-to-text functionality.

Tasks:

Create a new Next.js app.

Implement a voice transcription component using the Web Speech API.

Support Arabic (ar) language transcription.

Display real-time transcription on the UI.

Handle browser compatibility gracefully.

# Sprint 2: Connect to Quran.com API
Goal: Fetch Quranic verses to prepare for comparison.

Tasks:

Explore and understand Quran.com API.

Implement API calls to:

Get surah and ayah lists.

Fetch Arabic text of a specific ayah.

Create a basic UI to display a selected verse.

# Sprint 3: Matching Transcription with Quranic Verses
Goal: Compare user's voice transcription with selected ayah.

Tasks:

Normalize both transcription and verse (e.g., remove diacritics, punctuation).

Use simple string similarity (e.g., Levenshtein distance) to show how closely the transcription matches.

Display comparison results visually (e.g., percentage match, highlights).

# Sprint 4: Verse Selection & Playback Tools
Goal: Let users choose which verse to read and provide tools to assist.

Tasks:

Add dropdown/select for Surah and Ayah.

Optionally embed Quran audio player (Quran.com supports audio links).

Highlight the ayah that is currently selected for practice.

# Sprint 5: User Feedback & Enhancements
Goal: Improve usability and accessibility.

Tasks:

Improve UI/UX (loading states, error handling, responsive layout).

Show feedback like “Good match!” or “Try again.”

Log transcription attempts for analysis (optional).

# Sprint 6: Advanced Features (Optional)
Goal: Add polish and intelligent features.

Tasks:

Use fuzzy matching libraries (like fuse.js or string-similarity) for better comparison.

Track learning progress for each verse (e.g., dashboard).

Integrate authentication (if saving user progress).