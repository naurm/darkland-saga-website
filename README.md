# Darkland Saga — Author Website

A custom author website for **J.L. Allred's** *Darkland Saga* fantasy series, built with Next.js, React, and Tailwind CSS.

## Features

- **Multi-page layout** — Home, Books, World of Eadrom, About, Companion, Why Fantasy, Support
- **Custom dark/amber design system** — Emberglow color palette, parchment tones, immersive fantasy aesthetic
- **Tower of Archives** — Interactive lore browser for in-universe worldbuilding
- **Author companion portal** — Secure reader companion with content gating
- **Responsive** — Mobile-first, adapts across all screen sizes
- **SEO-optimized** — Structured for discoverability
- **Prisma + SQLite backend** — Persistent data layer (future-ready for PostgreSQL)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Prisma + SQLite |
| Auth | NextAuth.js |
| Deployment | Vercel |

## Live Site

**[jlallred.com](https://jlallred.com)** — live and serving content.

## Project Structure

```
app/                  # Next.js App Router pages
├── about/           # Author bio
├── books/           # Book listings
├── companion/       # Reader companion (authenticated)
├── support/         # Support the author
├── why-fantasy/     # Genre exploration
└── world-of-eadrom/  # Lore / Tower of Archives
components/          # Shared React components
css/                 # Global styles
data/                # Static content
lib/                 # Utility functions
prisma/              # Database schema + migrations
public/images/       # Book covers, headshots, assets
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

*Built by [J.L. Allred](https://jlallred.com).*
