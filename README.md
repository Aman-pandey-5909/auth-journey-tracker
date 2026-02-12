# SECURITY_AUTH — Cybersecurity Auth Showcase

A cyberpunk-themed web application demonstrating authentication and security features built with React, TypeScript, and Lovable Cloud.

---

## Overview

This project showcases a complete authentication flow with a terminal/hacker aesthetic, including real-time security auditing and session inspection.

## Auth Flow

```
[ Sign Up ] → [ Email Verification ] → [ Log In ] → [ Security Dashboard ]
```

A visual **Auth Progress Bar** tracks the user's position through the flow on every page.

---

## Features

### 1. User Sign Up (`/signup`)
- Email & password registration with display name
- **Password Strength Meter** — real-time scoring based on:
  - Minimum 8 characters
  - Uppercase & lowercase letters
  - Numbers
  - Special characters
- Automatic profile creation via database trigger

### 2. User Login (`/login`)
- Email/password authentication
- Session persistence with auto-refresh tokens
- Redirects authenticated users away from auth pages

### 3. Security Dashboard (`/dashboard`)
- **User Info Card** — display name, email, session TTL countdown
- **Security Audit Panel** — real-time checks:
  | Check | Description |
  |-------|-------------|
  | Email Verified | Whether the user's email is confirmed |
  | Authenticated Session | Token expiry countdown |
  | Row Level Security | RLS status on database tables |
  | Auth Provider | Authentication method used |
  | Last Sign In | Timestamp of most recent login |
- **JWT Token Preview** — truncated access token display (with security warning)
- **Session Termination** — secure sign-out

### 4. Landing Page (`/`)
- Feature overview cards
- Auto-redirects authenticated users to dashboard

---

## Security Implementation

### Row Level Security (RLS)
All database tables enforce RLS policies:

| Policy | Action | Rule |
|--------|--------|------|
| View own profile | `SELECT` | `auth.uid() = user_id` |
| Insert own profile | `INSERT` | `auth.uid() = user_id` |
| Update own profile | `UPDATE` | `auth.uid() = user_id` |

### Authentication
- Passwords are hashed server-side (never stored in plaintext)
- JWT tokens with automatic refresh
- Session expiry tracking
- Email verification required before login

### Database
- `profiles` table auto-created on signup via `handle_new_user` trigger
- Foreign key relationship to auth users with `ON DELETE CASCADE`

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS + custom cyber theme |
| UI Components | shadcn/ui |
| Routing | React Router v6 |
| Backend | Lovable Cloud (auth, database, RLS) |
| State | TanStack React Query |
| Font | JetBrains Mono / Space Grotesk |

---

## Project Structure

```
src/
├── components/
│   ├── AuthProgressBar.tsx    # 3-step auth flow tracker
│   ├── CyberCard.tsx          # Themed card with neon borders
│   ├── NavLink.tsx            # Navigation link component
│   ├── PasswordStrengthMeter.tsx # Real-time password scoring
│   └── ui/                    # shadcn/ui components
├── hooks/
│   ├── useAuth.tsx            # Auth context & provider
│   └── use-mobile.tsx         # Responsive breakpoint hook
├── integrations/
│   └── supabase/              # Auto-generated client & types
├── pages/
│   ├── Index.tsx              # Landing page
│   ├── SignUp.tsx             # Registration form
│   ├── Login.tsx              # Login form
│   ├── Dashboard.tsx          # Security dashboard
│   └── NotFound.tsx           # 404 page
└── index.css                  # Cyber theme & design tokens
```

---

## Design System

The app uses a custom **cyber/terminal** theme with HSL-based design tokens:

- **Primary**: Neon green (`142 71% 45%`)
- **Background**: Deep black (`160 20% 4%`)
- **Cards**: Dark translucent panels with neon border accents
- **Animations**: `pulse-neon`, `glow`, `scanline` effects
- **Grid**: CSS background `cyber-grid` pattern

---

## Routes

| Path | Component | Auth Required |
|------|-----------|---------------|
| `/` | Landing | No (redirects if logged in) |
| `/signup` | Sign Up | No |
| `/login` | Login | No |
| `/dashboard` | Security Dashboard | Yes |

---

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Navigate to `http://localhost:5173`

Or simply open the project in [Lovable](https://lovable.dev) and start building.
