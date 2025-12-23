# Limen — Ethical Reflection Space

<div align="center">
  <img src="src/assets/limen-logo.png" alt="Limen Logo" width="120" />
  <p><em>A threshold between thought and silence. An ethical AI-powered reflection platform.</em></p>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Running Locally](#running-locally)
- [Database Schema](#database-schema)
- [Edge Functions](#edge-functions)
- [Architecture](#architecture)
- [Contributing](#contributing)

---

## Overview

**Limen** (Latin for "threshold") is an ethical reflection platform designed to provide a safe, non-judgmental space for emotional processing. Unlike traditional social networks that optimize for engagement, Limen focuses on:

- **Privacy-first design**: Users can reflect anonymously without creating accounts
- **Ethical AI**: AI-generated questions and responses that validate without advising
- **Decentralized governance**: DAO structure for community-driven decisions
- **No performance metrics**: No likes, followers, or algorithmic feeds

The platform supports three main pillars:
1. **Individual**: Personal reflection journeys with AI-guided questions
2. **Social**: Anonymous community sharing with respectful interactions
3. **Educational**: Resources about mental wellness and emotional literacy

---

## Key Features

### 🔮 Individual Reflection Flow
- Select emotional state (Anxiety, Overwhelm, Confusion, or Open)
- Receive AI-generated contextual guiding question
- Free-form writing space without time pressure
- Empathic AI response that validates without advising (in user's language)
- Reflective question at the end to invite deeper contemplation
- Optional saving of reflections (requires authentication)

### 🌐 Community Space
- Anonymous post sharing with randomly generated names
- Emotional state tagging for posts
- Heart reactions (non-competitive)
- No algorithmic curation

### 📚 Educational Resources
- Curated content about emotional wellness
- Category-based organization
- Reading time estimates

### 🏛️ DAO Governance
- Community proposals and voting
- Transparent decision-making
- Development roadmap visibility

### 🌍 Automatic Language Detection
- AI responses automatically match the user's writing language
- Supports any language the user writes in (Portuguese, English, Spanish, etc.)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui components |
| **State Management** | React Context, TanStack Query |
| **Routing** | React Router DOM v6 |
| **Backend** | Supabase (via Lovable Cloud) |
| **Database** | PostgreSQL (Supabase) |
| **AI** | Lovable AI Gateway (Google Gemini) |
| **Authentication** | Supabase Auth |
| **Edge Functions** | Deno (Supabase Functions) |

---

## Project Structure

```
limen/
├── public/                     # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/                 # Images and media
│   │   └── limen-logo.png
│   ├── components/
│   │   ├── flow/               # Individual flow step components
│   │   │   ├── Closing.tsx
│   │   │   ├── EmotionalSetup.tsx
│   │   │   ├── Landing.tsx
│   │   │   ├── Reflection.tsx
│   │   │   └── WritingSpace.tsx
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── limen-button.tsx  # Custom Limen button variant
│   │   │   └── ... (40+ UI components)
│   │   ├── AboutModal.tsx
│   │   ├── BackgroundShapes.tsx
│   │   ├── BreathingLoader.tsx
│   │   ├── Footer.tsx
│   │   ├── LimenLogo.tsx
│   │   ├── NavLink.tsx
│   │   └── ReflectionsView.tsx
│   ├── context/
│   │   ├── LanguageContext.tsx   # Language context provider
│   │   └── LimenContext.tsx      # Session state management
│   ├── hooks/
│   │   ├── useAuth.tsx           # Authentication hook
│   │   ├── useConsent.tsx        # Consent tracking hook
│   │   ├── use-mobile.tsx        # Mobile detection
│   │   └── use-toast.ts          # Toast notifications
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts         # Supabase client (auto-generated)
│   │       └── types.ts          # Database types (auto-generated)
│   ├── lib/
│   │   ├── storage.ts            # Local storage utilities
│   │   ├── types.ts              # TypeScript type definitions
│   │   └── utils.ts              # Utility functions
│   ├── pages/
│   │   ├── About.tsx             # About page with Limen ethos
│   │   ├── Auth.tsx              # Login/Signup page
│   │   ├── Consent.tsx           # Consent acceptance page
│   │   ├── DAO.tsx               # Ethos/DAO governance page
│   │   ├── Dashboard.tsx         # User dashboard
│   │   ├── Educational.tsx       # Educational resources (Library)
│   │   ├── Home.tsx              # Home hub after consent
│   │   ├── Index.tsx             # Landing page
│   │   ├── Individual.tsx        # Individual reflection flow
│   │   ├── NotFound.tsx          # 404 page
│   │   ├── Reflections.tsx       # Saved reflections page
│   │   └── Social.tsx            # Community posts page
│   ├── App.tsx                   # Main app component with routing
│   ├── App.css                   # Global app styles
│   ├── index.css                 # Tailwind directives & design tokens
│   └── main.tsx                  # React entry point
├── supabase/
│   ├── config.toml               # Supabase configuration
│   ├── functions/
│   │   └── ai-reflection/
│   │       └── index.ts          # AI reflection edge function
│   └── migrations/               # Database migrations (auto-managed)
├── .env                          # Environment variables (auto-generated)
├── index.html                    # HTML entry point
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite configuration
```

---

## Prerequisites

Before running Limen locally, ensure you have:

- **Node.js** v18.0 or higher
- **npm** v9.0 or higher (or yarn/pnpm)
- **Git** for version control

---

## Environment Setup

### Environment Variables

The project uses the following environment variables (auto-configured when using Lovable Cloud):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

> **Note**: When running through Lovable, these are automatically configured. For manual setup, create a `.env` file in the root directory.

### Supabase Secrets (Edge Functions)

The `ai-reflection` edge function requires:

- `LOVABLE_API_KEY`: Automatically provided by Lovable Cloud for AI gateway access

---

## Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/limen.git
cd limen
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

---

## Database Schema

Limen uses PostgreSQL through Supabase with the following main tables:

### Tables

| Table | Description |
|-------|-------------|
| `profiles` | User profiles with display names and consent status |
| `reflections` | Personal reflection entries with AI responses |
| `community_posts` | Anonymous community posts |
| `post_hearts` | Heart reactions on community posts |
| `circles` | Community circles/groups |
| `circle_members` | Circle membership relations |
| `shared_reflections` | Reflections shared to circles |
| `educational_content` | Educational articles and resources |
| `listening_requests` | Peer listening request system |

### Emotional States Enum

```sql
CREATE TYPE emotional_state AS ENUM ('anxiety', 'overwhelm', 'confusion', 'free');
```

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Users can only access their own reflections
- Community posts are viewable by all authenticated users
- Profile updates restricted to profile owners
- Safe views created to prevent user_id exposure

---

## Edge Functions

### `ai-reflection`

Location: `supabase/functions/ai-reflection/index.ts`

This edge function handles AI-powered reflection features:

#### Endpoints

**POST** `/ai-reflection`

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | `'empathic_response' \| 'guiding_question'` | Type of AI generation |
| `mood` | `string` | Current emotional state |
| `text` | `string` (optional) | User's written reflection (for empathic_response) |

#### Response

```json
{
  "result": "Generated AI response or question"
}
```

#### AI Behavior

- **Guiding Questions**: Short, open-ended questions (max 10 words) that invite reflection without suggesting solutions
- **Empathic Responses**: Structured in 4 paragraphs:
  1. Acknowledge the weight and significance of what was shared
  2. Reflect back specific themes or emotional textures (without interpreting)
  3. Honor the presence and courage of putting this into words
  4. Close with a gentle reflective question (max 15 words) inviting contemplation
- **Language Matching**: AI always responds in the same language the user wrote in (Portuguese, English, Spanish, etc.)

---

## Architecture

### State Management

```
┌─────────────────────────────────────────────────────────┐
│                    App Component                         │
├─────────────────────────────────────────────────────────┤
│  QueryClientProvider (TanStack Query)                   │
│  └─ LanguageProvider                                    │
│     └─ TooltipProvider                                  │
│        └─ BrowserRouter                                 │
│           └─ AuthProvider (Supabase Auth)               │
│              └─ AppRoutes                               │
└─────────────────────────────────────────────────────────┘
```

### Individual Flow State Machine

```
Landing → Mood Selection → Writing → Reflection → Closing
   │            │              │           │          │
   │            │              │           │          └─→ Save or Discard
   │            │              │           └─→ AI Response
   │            │              └─→ AI Guiding Question
   │            └─→ Select Emotional State
   └─→ Begin Journey
```

### Data Flow

```
┌──────────────┐     ┌─────────────────┐     ┌────────────────┐
│   Frontend   │ ←→  │  Supabase Edge  │ ←→  │  Lovable AI    │
│   (React)    │     │   Functions     │     │    Gateway     │
└──────────────┘     └─────────────────┘     └────────────────┘
       │                     │
       │                     ▼
       │            ┌─────────────────┐
       └──────────→ │   PostgreSQL    │
                    │   (Supabase)    │
                    └─────────────────┘
```

---

## Design System

Limen uses a custom design system built on Tailwind CSS with semantic tokens:

### Color Tokens

| Token | Usage |
|-------|-------|
| `--background` | Main background color |
| `--foreground` | Primary text color |
| `--primary` | Brand/accent color |
| `--secondary` | Secondary elements |
| `--muted` | Subdued elements |
| `--accent` | Highlight color |
| `--destructive` | Error states |

### Custom Components

- `LimenButton`: Custom button with soft/ghost/default variants
- `BackgroundShapes`: Animated floating shapes for ambiance
- `limen-glass`: Glassmorphism effect class

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit a Pull Request

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Keep components small and focused
- Use semantic token colors (never direct colors)

---

## License

This project is part of the Limen ecosystem, designed for ethical reflection and community well-being.

---

<div align="center">
  <p><strong>Limen</strong> — Where thought meets silence.</p>
</div>
