# FlowChat AI — Audit & Changes

## Overview
Full-stack AI Chat (FlowChat AI) built with Next.js 16.2.10, Tailwind CSS v4, Framer Motion, Groq (llama-3.3-70b-versatile), and the Vercel AI SDK v7.

## Accessibility (A11Y)

### What was fixed
| Issue | Location | Fix |
|-------|----------|-----|
| No skip-to-content link | `app/layout.tsx` | Added `sr-only focus:not-sr-only` skip link targeting `#main-content` |
| Missing `<main>` landmark | `app/chat/page.tsx` | Wrapped chat page content in `<main id="main-content">` |
| `<a href="#">` navigation links | `Hero.tsx`, `CTA.tsx`, `Footer.tsx`, `Navbar.tsx` | Replaced with proper `/chat` or `/` links |
| Missing `aria-live` region | `MessageList.tsx` | Added `role="log" aria-live="polite"` for new message announcements |
| No `role="alert"` on errors | `ErrorCard.tsx`, `ToolError.tsx` | Added `role="alert"` to error containers |
| No `aria-label` on stop/retry | `Chat.tsx`, `ErrorCard.tsx` | Added `aria-label="Stop generating response"`, `"Retry request"` |
| Missing focus indicators | `app/globals.css` | Added global `*:focus-visible` outline rule |
| No `prefers-reduced-motion` | `app/globals.css` | Added media query to disable animations |
| Heading hierarchy | `MessageList.tsx` | Changed `<h3>` → `<h2>` in empty state |
| `aria-hidden` on decorative SVGs | Multiple components | Added `aria-hidden="true"` to icons and decorative elements |
| Form accessibility | `Chat.tsx` | Added `aria-label="Chat message form"` to form, `aria-label="Message input"` to input |
| No landmark labels | `Navbar.tsx`, `Features.tsx`, `ChatPreview.tsx`, `CTA.tsx` | Added `aria-label`/`aria-labelledby` to sections |
| Keyboard Escape handler | `Navbar.tsx` | Added `Escape` key handler for mobile menu |
| Role meter on score bar | `LeadScoreCard.tsx` | Added `role="meter"` with `aria-valuenow/min/max` |
| Loading indicators hidden from a11y tree | `MessageSkeleton.tsx`, `ToolPart.tsx` | Added `aria-hidden="true"` to decorative loading animations |
| Nav focus management | `Navbar.tsx` | Added `aria-expanded`, `aria-modal="true"` to mobile menu dialog |

## Performance

| Optimization | Location | Impact |
|--------------|----------|--------|
| Lazy-load sections | `app/page.tsx` | Features, ChatPreview, CTA loaded via `next/dynamic` — reduces initial JS bundle |
| Font preloading | `app/layout.tsx` | Geist Sans/Mono loaded with `preload: true` |
| Reduced motion preference | `app/globals.css` | Disables all animations for users with `prefers-reduced-motion` |
| Passive scroll listener | `Navbar.tsx` | Added `{ passive: true }` for scroll performance |
| Smooth scrolling | `app/globals.css` | `scroll-behavior: smooth` for in-page navigation |
| `content-visibility` ready | Sections use Tailwind breakpoints | Structure is amenable to `content-visibility` |

## Semantic HTML

| Element | Usage |
|---------|-------|
| `<main id="main-content">` | Both pages (landing + chat) |
| `<section aria-labelledby>` | Hero, Features, ChatPreview, CTA |
| `<nav aria-label="Main navigation">` | Navbar |
| `<footer>` | Footer |
| `<role="log">` | Message list live region |
| `<role="alert">` | Error cards, tool errors |
| `<role="status">` | Tool streaming states |
| `<role="meter">` | Lead score progress bar |
| `<role="group">` | Example prompts |
| `<role="banner">` | Header |

## Test Results

- **Vitest**: 5 files, 21 tests — all passing
- **Playwright E2E**: 1 test — mock AI stream flow
- **Lint**: 0 errors, 0 warnings
- **Build**: Successful (Turbopack)

### Test coverage
| File | Tests |
|------|-------|
| `ErrorCard.test.tsx` | 6 — renders all error types, calls retry, disables while retrying |
| `MessageList.test.tsx` | 5 — empty state, user/assistant messages, loading |
| `ToolPart.test.tsx` | 5 — all 4 states + default error |
| `ToolError.test.tsx` | 2 — renders error text |
| `LeadScoreCard.test.tsx` | 3 — high/medium/low priority |
| E2E `chat.spec.ts` | 1 — full message send + response |

## UI/UX Improvements

### Design System
- **Color tokens**: Added `sidebar`, `sidebar-hover`, `success`, `warning`, `error`, `accent-foreground` to theme
- **Glass utility**: Reusable `.glass` class with `backdrop-filter: blur(16px)` and translucent border
- **Scrollbar**: Custom thin scrollbar styling matching dark theme
- **Code blocks**: Styled `<pre>`/`<code>` with monospace, `tab-size`, overflow handling
- **Inline code**: Styled with primary-tinted background and accent color
- **Skeleton shimmer**: Custom `animate-shimmer` keyframe for smooth pulsing
- **Cursor blink**: `animate-cursor` keyframe for streaming text cursor

### Landing Page
- **Navbar**: Updated to lucide-react icons (`Zap` logo, `Menu`/`X` hamburger, `Sparkles` CTA), better glass, hover states on nav items, mobile menu with rounded corners and backdrop blur
- **Hero**: Added "Powered by Groq AI" badge badge, `ArrowRight` icon on CTA, `Sparkles` icon on badge, subtle floating gradient orbs, hover scale/active press transitions on buttons, enhanced typography with `text-7xl` on xl screens
- **Features**: Replaced inline SVGs with lucide-react icons (`Zap`, `Layers`, `Palette`, `Shield`), gradient icon backgrounds, hover lift with `-translate-y-0.5`, scale animation on icons, per-feature color gradients
- **ChatPreview**: Centered `MessageSquare` icon above heading, glass card with border, "Online" status indicator, cleaner mock conversation spacing
- **CTA**: Added `Sparkles` icon above heading, `ArrowRight` on button, hover scale/active press, larger max-width text

### Chat Page
- **Sidebar**: New collapsible sidebar (56px collapsed / 280px expanded) with animated width transition, "History" section with `History` icon, `Plus` button for new chat, sample chat entries with `MessageSquare` icon, collapse/expand toggle with `PanelLeftClose`/`PanelLeft`
- **Chat input**: Glass-morphism input container with `rounded-2xl`, `shadow-lg`, `backdrop-blur-lg`; lucide-react `Send` icon replacing inline SVG; `Square` icon for stop button; hover scale/active press on send button
- **Error cards**: Updated to lucide-react icons (`WifiOff`, `Ban`, `Terminal`, `Brain`), better spacing with `p-5`, shadow, `RefreshCw` icon with spin animation during retry, "Try again" button text
- **Tool errors**: `AlertTriangle` icon, `RefreshCw` hint text, cleaner layout with `pt-0.5` alignment

### Message Bubbles
- **User messages**: Added `motion.div` enter animation (fade + slide-up), avatar (`User` icon) on right side with gradient background, shadow on bubble
- **Assistant messages**: `Bot` avatar on left with gradient background and border, fade+slide-up enter animation, markdown rendering via custom `MarkdownRenderer` component, code block with language label and copy button
- **Empty state**: Animated `Bot` icon with scale-in, larger `h2` heading, staggered example prompt buttons with individual `motion.div` wraps, `MessageSquare` icon per prompt, glass styling on prompt cards
- **No-results state**: Bot avatar matching assistant message style
- **Loading skeleton**: Bot avatar matching pattern, larger pulse bars with `rounded-lg`

### MarkdownRenderer (New)
- Custom markdown parser supporting `**bold**`, `` `inline code` ``, and fenced code blocks
- Code blocks with language label bar, copy button with `Check`/`Copy` icons and 2s feedback timeout, dark code background (`#0a0a1a`)
- Inline prose styling with relaxed line-height

### Data Flow (unchanged)
- All API, routing, tool calling, streaming logic preserved exactly
- No changes to `app/api/chat/route.ts`, `tools/scoreLead.ts`, `useChat` usage

### Animations Added
- `motion.div` enter animations: fade + y-offset (0.25s) for all messages
- `motion.div` scale-in for score number in `LeadScoreCard`
- `motion.div` width animation for score bar fill
- `motion.div` staggered reveal for example prompts (0.1s delay per item)
- `motion.aside` width animation for sidebar collapse/expand (0.3s)
- Icon hover transitions, button scale press effects

## Dependencies
- Added `lucide-react` for consistent iconography across all components

## Environment
- `GROQ_API_KEY` — required in `.env.local` for AI functionality

## Known Issues
- Lighthouse scores require a live deployment URL
- No E2E tests for error scenarios yet
