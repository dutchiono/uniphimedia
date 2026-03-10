# Uni-Phi Media — Site Revamp

> https://www.uniphimedia.com — Full rebuild in Next.js 14 + Tailwind CSS + Sanity CMS

## Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Sanity.io
- **Hosting:** Vercel
- **Auth:** Clerk
- **Payments:** Stripe
- **Email:** Resend

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Project Structure

See `docs/site-analysis.md` for the full site map and revamp brief.

## Pages

| Route | Description |
|-------|-------------|
| / | Homepage |
| /about | Mission & Team |
| /communities | Communities Directory |
| /communities/[slug] | Individual Community |
| /hsh | Hillshire Hollows (flagship property) |
| /hsh/packages | Package tiers |
| /membership | Membership tiers + pricing |
| /workshares | Work-trade opportunities |
| /media | Podcasts, videos, livestreams |
| /forum | Community forum |
| /raffle | Crowdfunding & raffle |
| /tours | Book a tour |
| /contact | Contact form |