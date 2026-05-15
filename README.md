# PlainSpeak ⚖️
### Legal contracts in plain language — instantly.


## The Problem

Millions of people sign leases, employment contracts, and freelance agreements they don't understand. Legal jargon is a barrier — and most people can't afford a lawyer to decode it before signing.

## The Solution

PlainSpeak uses AI to instantly analyse any contract and explain every clause in plain English and Urdu — highlighting risks before you sign.

---

## Features

- 📄 **Paste any contract** — lease, employment, freelance, or any legal document
- 🔴 **Inline risk highlighting** — clauses colour-coded green / amber / red directly on the original text
- 🔁 **Side-by-side sync** — hover a highlighted clause to see its explanation; panels stay in sync
- 🌐 **English ↔ Urdu toggle** — all explanations switch live, with proper RTL layout and Noto Nastaliq font
- 📊 **Risk score meter** — overall 0–100 danger score for the full document
- ⚖️ **Lawyer questions** — 3–5 targeted questions generated specific to your contract

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| AI Model | Gemini 2.0 Flash (Google AI Studio / Vertex AI) |
| Deployment | Antigravity |
| Fonts | Noto Nastaliq Urdu, Fraunces, DM Mono |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Google AI Studio API key → [Get one here](https://aistudio.google.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/plainspeak.git
cd plainspeak

# Install dependencies
npm install
```

### Configuration

Open `src/App.jsx` and add your API key at the top:

```js
const API_KEY = "AIza-YOUR-KEY-HERE";
```

> ⚠️ For production, move this to an environment variable and never commit your key.

### Run locally

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Build for deployment

```bash
npm run build
```

Deploy the generated `dist/` folder to Antigravity, Vercel, or Netlify.

---

## How It Works

1. User pastes contract text into the input panel
2. Text is sent to Gemini API with a structured system prompt
3. Gemini returns a strict JSON object with per-clause risk levels, plain-English summaries, Urdu translations, and lawyer questions
4. App uses substring matching to map each clause back to its exact position in the original text
5. Highlights are rendered inline; panels sync on hover

---

## Project Structure

```
plainspeak/
├── src/
│   ├── App.jsx        # Main app — all logic and UI
│   └── main.jsx       # React entry point
├── public/
├── index.html
├── vite.config.js
└── README.md
```

---

## Disclaimer

PlainSpeak provides plain-language explanations of contract text only. It does not constitute legal advice. Always consult a qualified lawyer before signing any legal document.

---
