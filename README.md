# Marija's Birthday — Thank You

A personal thank-you page for Marija's birthday celebration on **15 August 2025** in Oslo. Friends can revisit the evening, see how long ago the party was, and listen to the shared playlist.

## Features

- **Multilingual** — English, Norwegian, Serbian, and Dutch
- **Live timer** — counts days, hours, minutes, and seconds since the party (15 Aug 2025, 19:30)
- **Party recap** — highlights from the evening (games, setup, Amsterdam night out)
- **Spotify playlist** — embedded collaborative party playlist
- **Animations** — confetti, Framer Motion transitions, and a responsive layout

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack in dev)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) 4
- [Framer Motion](https://www.framer.com/motion/) — page animations
- [shadcn/ui](https://ui.shadcn.com) — Card, Badge, Button components
- [react-confetti](https://www.npmjs.com/package/react-confetti)

## Getting started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `pnpm dev`    | Start dev server (Turbopack) |
| `pnpm build`  | Production build         |
| `pnpm start`  | Serve production build   |
| `pnpm lint`   | Run ESLint               |

## Project structure

```
app/
  layout.tsx    # Root layout and metadata
  page.tsx      # Main thank-you page (client component)
  globals.css   # Global styles
components/ui/  # shadcn/ui components
public/         # Static assets (party photo)
```

## Customization

- **Copy & translations** — edit the `translations` object in `app/page.tsx`
- **Party date/time** — update `partyDate` in the `useEffect` hook and `partyDetails` in the same file
- **Playlist** — change the Spotify embed URL in the playlist section
- **Photo** — replace `public/image.jpeg`

## Deploy

Deploy to [Vercel](https://vercel.com) or any platform that supports Next.js. Build with `pnpm build` and serve with `pnpm start`.
