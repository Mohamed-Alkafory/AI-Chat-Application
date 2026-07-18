# FlowChat AI

An AI Chat application with tool calling capabilities, built with Next.js, TypeScript, and the Vercel AI SDK.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | Your OpenAI API key. Required for the AI chat route to function. |

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with Hero, Features, CTA, Footer |
| `/chat` | AI chat interface with lead scoring tool |

The Navbar appears on both pages with links to Home, Features, Chat, and GitHub.

## API Routes

### `POST /api/chat`

Streams AI responses using OpenAI GPT-4o. Accepts a JSON body with a `messages` array.

- Returns a **400** if `messages` is missing or not an array.
- Returns a **500** if `OPENAI_API_KEY` is not configured or the AI call fails.
- Uses a system prompt that instructs the model to call `scoreLead` when the user provides lead information.

## Tool Contract

### `scoreLead`

Scores a sales lead based on provided information and returns a recommendation.

#### Input Schema

| Field | Type | Description |
|---|---|---|
| `name` | `string` | The lead's name |
| `company` | `string` | The lead's company |
| `budget` | `number` | The budget in USD (must be positive) |

#### Return Shape

| Field | Type | Description |
|---|---|---|
| `name` | `string` | The lead's name (echoed from input) |
| `company` | `string` | The lead's company (echoed from input) |
| `score` | `number` | Score from 0–100 based on budget tier |
| `recommendation` | `string` | Actionable recommendation string |

#### How It Works

1. The AI model decides to call `scoreLead` when the user provides lead information.
2. The input is validated using Zod before execution.
3. The tool calculates a score based on budget thresholds:
   - **$50,000+**: 85–100 (High priority)
   - **$20,000–$49,999**: 65–85 (Medium priority)
   - **$10,000–$19,999**: 45–65 (Medium priority)
   - **Under $10,000**: 20–45 (Low priority)
4. A recommendation string is generated based on the score tier.
5. The result is streamed back to the client and rendered as a rich UI card.

#### States

The tool lifecycle is exposed to the frontend as typed tool parts with four states:

- `input-streaming` — Tool arguments are being streamed from the model
- `input-available` — Arguments are complete; shown as a lead info card
- `output-available` — Result is rendered as a score card with progress bar
- `output-error` — Error is displayed with a retry prompt (no raw JSON shown)

## Tech Stack

- [Next.js](https://nextjs.org) — App Router
- [Vercel AI SDK](https://sdk.vercel.ai) — AI streaming and tool calling
- [OpenAI](https://openai.com) — Language model provider
- [Zod](https://zod.dev) — Schema validation
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Framer Motion](https://www.framer.com/motion) — Animations
