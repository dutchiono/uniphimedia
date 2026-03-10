# Uni-Phi Media — Complete Site Analysis & Revamp Blueprint

> Source: https://www.uniphimedia.com/  
> Platform: Wix  
> Analysis Date: 2026-03-10  
> Status: Compiled from initial crawl (50 URLs discovered). Deep scraping pending FireCrawl credit restore.

---

## 1. BRAND OVERVIEW

**Company:** Uni-Phi Media  
**Tagline:** Midwest News & Community Building  
**Core Mission:** Establish farmsteads and communities that serve as havens of healing, resilience, and relaxation. Reignite the American dream through self-sustaining, profit-sharing communities embracing permaculture, sound financial practices, self-reliance, and cooperation.

**Target Demographics:**
- Families seeking off-grid / sustainable community living
- Retirees looking for intentional community options
- Van lifers / RV nomads
- Veterans (dedicated programs and raffle)
- Permaculture enthusiasts
- Preppers / self-sufficiency-minded individuals

**Platform:** Wix (significant constraint for rebuild — recommend migrating to Next.js or Webflow)

---

## 2. FULL SITEMAP (50 URLs Discovered)

### Primary Navigation
| Page | URL | Notes |
|------|-----|-------|
| Homepage | / | Main landing |
| Communities | /communities | Directory of community types |
| Hillshire Hollows | /hsh | Flagship property |
| Workshares | /workshares | Work-trade opportunities |
| Home Types | /home-types (unverified) | Building options |
| Membership | /membership (unverified) | Tiers and benefits |
| Media | /media | Podcasts, video, livestream |
| Content/Media | /content-media | Farming & permaculture education |
| Forum | /forum | Community discussion board |
| Tours | /tours (unverified) | Virtual/in-person tours |
| Crowdfunding/Raffle | /crowdfundingraffle | Fundraising, hobbit home raffle |
| Contact | /contact-8-2 | Contact form |
| Pricing | /pricing (unverified) | Membership pricing |
| About | /about (unverified) | Mission and team |

### Sub-Pages & Specialty
| Page | URL | Notes |
|------|-----|-------|
| Hillside Packages | /hsh/hillside-packages | Property tiers |
| 5 Lakes Deposits | /5-lakes | Additional property |
| Vacation/SHTF Spots | (unknown URL) | Short-term / bug-out properties |
| Van Life/RV Spots | (unknown URL) | Mobile living options |
| Tornado Bunkers | (unknown URL) | Specialty structures |
| Bitcoin Bundles | (unknown URL) | Crypto payment packages |
| Offsite Home Building | (unknown URL) | Build elsewhere option |
| Hobbit Home Raffle | (within /crowdfundingraffle) | Veterans-focused raffle |
| Monthly Seed Club | (unknown URL) | Subscription |
| Veteran Support Sub | (unknown URL) | Subscription |
| Sticker Club | (unknown URL) | Subscription |
| Forum - General | /forum/general | General discussion |
| Forum - Rules | /forum/rules | Community rules |
| Forum - Introductions | /forum/introductions | New member intros |
| Leader Application | (unknown URL) | Community leader signup |
| Legal/Law Info | (unknown URL) | Educational content |
| Food Growing Resources | (unknown URL) | Educational content |
| Home & Self-Protection | (unknown URL) | Educational content |

---

## 3. BUSINESS VERTICALS (Page-by-Page Breakdown)

### A. Community Real Estate
**Primary offering: Hillshire Hollows (HSH)**
- Hillside packages (multiple tiers)
- Hobbit homes
- Tornado bunkers
- Bitcoin bundles
- Offsite home building options
- 5 Lakes deposits
- Vacation/SHTF spots
- Van life/RV spots

**Key content needed on site:**
- Property maps / lot diagrams
- Pricing per tier
- Photo/video gallery
- What's included in each package
- Build timeline
- Legal/ownership structure explanation

### B. Membership Programs
**Tiers identified:**
1. Workshare Membership — work-trade model
2. Retiree Membership — dedicated senior community
3. Van Life Membership — mobile/RV-friendly spots
4. Lifetime Membership — permanent stake
5. Premium Membership — top-tier access

**Missing from current site (gaps to fill in revamp):**
- Clear pricing comparison table
- Benefits matrix per tier
- Application/signup flow
- FAQ per membership type

### C. Media & Content
- Podcasts
- Livestreams
- DIY videos
- Permaculture education
- Farming guides
- Legal/law education
- Home & self-protection guides

**Missing from current site:**
- Embedded podcast player
- YouTube/video embed grid
- Content calendar / schedule
- Newsletter signup
- Archive/library organization

### D. Crowdfunding & Engagement
- Crowdfunding raffle
- Hobbit home raffle for Veterans
- Monthly giveaways/perks
- Monthly subscription clubs (seeds, stickers, veterans support)

### E. Community Forum
- General discussion
- Community rules
- Member introductions
- Leader application process

---

## 4. DESIGN & TECHNICAL AUDIT

### Current State (Wix)
**Pros:**
- Low maintenance for non-technical owner
- Built-in hosting

**Cons:**
- Severely limited design customization
- Poor performance / SEO (Wix pages rank poorly)
- No real component architecture — hard to scale
- URL structure is messy (e.g., /contact-8-2)
- Cannot version control the site
- Cannot clone/export cleanly
- Limited membership/subscription integrations

### Recommended Tech Stack for Revamp
| Layer | Current | Recommended |
|-------|---------|-------------|
| Framework | Wix | Next.js 14 (App Router) |
| Styling | Wix templates | Tailwind CSS |
| CMS | Wix CMS | Sanity.io or Contentful |
| Hosting | Wix | Vercel |
| Auth/Members | Wix Members | Clerk or NextAuth |
| Payments | Wix Payments | Stripe |
| Forum | Wix Forum | Discourse or custom |
| Media | Wix Video | Mux or YouTube embeds |
| Email | Wix | Resend + React Email |
| Domain | uniphimedia.com | Keep, point to Vercel |

---

## 5. PAGE-BY-PAGE REVAMP PLAN

### Homepage (/)
**Current issues:**
- Generic Wix layout
- Mission unclear above the fold
- No clear primary CTA
- Too many competing directions

**Revamp goals:**
- Hero: Bold mission statement + single CTA ("Find Your Community" or "Explore Hillshire Hollows")
- Section 1: What is Uni-Phi? (60-second explainer)
- Section 2: The 3 paths (Buy Land / Join a Community / Follow the Media)
- Section 3: Featured property (Hillshire Hollows spotlight)
- Section 4: Community proof / testimonials
- Section 5: Latest media (podcast embed + video grid)
- Section 6: Newsletter/raffle CTA
- Footer: Full nav + legal + social

### Communities (/communities)
**Revamp goals:**
- Visual card grid for each community type
- Filter by: type (farm, van life, retiree), location, availability
- Each card: photo, name, key stats, "Learn More" CTA

### Hillshire Hollows (/hsh)
**Revamp goals:**
- Full-bleed hero photo/video
- Interactive lot map
- Package comparison table (all tiers side-by-side)
- Photo gallery
- Virtual tour embed
- "Reserve Your Spot" form with deposit flow

### Workshares (/workshares)
**Revamp goals:**
- Clear explanation of the work-trade model
- Current open workshare positions
- Application form
- Testimonials from current worksharers

### Membership (/membership)
**Revamp goals:**
- Pricing table (all 5 tiers)
- Feature comparison matrix
- FAQ section
- "Join Now" → Stripe checkout flow

### Media (/media)
**Revamp goals:**
- Podcast player (embedded, latest episode auto-loads)
- Video grid (YouTube/Mux)
- Livestream schedule
- Filter by category (farming, legal, DIY, permaculture)

### Forum (/forum)
**Revamp goals:**
- Either: migrate to hosted Discourse instance
- Or: build lightweight community board in Next.js with member auth
- Categories: General, Introductions, Farming Tips, Legal Q&A, Buy/Sell/Trade, Leader Board

### Crowdfunding & Raffle (/crowdfundingraffle)
**Revamp goals:**
- Raffle status widget (tickets sold, prize, draw date)
- Veterans raffle callout section
- Monthly perks/subscription clubs signup
- Progress bar toward funding goals

### Tours (/tours)
**Revamp goals:**
- Calendly or booking embed for in-person tours
- Virtual tour video embed
- Pre-tour FAQ
- "Book a Tour" primary CTA

### Contact (/contact)
**Revamp goals:**
- Clean single-column form (name, email, subject, message)
- Map embed (if physical location)
- Response time expectation set
- Social links

### About (/about)
**Revamp goals:**
- Founder story / mission narrative
- Team bios (if applicable)
- Timeline of community milestones
- Values section (permaculture, self-reliance, cooperation)

---

## 6. GITHUB REPO STRUCTURE (Proposed)

```
uniphimedia/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── .env.example
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, nav, footer
│   │   ├── page.tsx            # Homepage
│   │   ├── about/page.tsx
│   │   ├── communities/
│   │   │   ├── page.tsx        # Communities index
│   │   │   └── [slug]/page.tsx # Individual community
│   │   ├── hsh/
│   │   │   ├── page.tsx        # Hillshire Hollows main
│   │   │   └── packages/page.tsx
│   │   ├── membership/page.tsx
│   │   ├── workshares/page.tsx
│   │   ├── media/page.tsx
│   │   ├── forum/page.tsx
│   │   ├── raffle/page.tsx
│   │   ├── tours/page.tsx
│   │   └── contact/page.tsx
│   ├── components/
│   │   ├── ui/                 # Base components (Button, Card, etc.)
│   │   ├── layout/             # Nav, Footer, Sidebar
│   │   ├── home/               # Homepage sections
│   │   ├── property/           # Property cards, lot map
│   │   ├── membership/         # Pricing table, tier cards
│   │   ├── media/              # Podcast player, video grid
│   │   └── forum/              # Forum components
│   ├── lib/
│   │   ├── sanity.ts           # CMS client
│   │   ├── stripe.ts           # Payment client
│   │   └── utils.ts
│   └── styles/
│       └── globals.css
├── sanity/
│   ├── schemas/
│   │   ├── community.ts
│   │   ├── property.ts
│   │   ├── membership.ts
│   │   ├── post.ts
│   │   └── media.ts
│   └── sanity.config.ts
└── docs/
    ├── site-analysis.md        # This document
    ├── content-inventory.md    # All copy to migrate
    └── design-tokens.md        # Colors, fonts, spacing
```

---

## 7. PRIORITY ORDER FOR BUILD

1. **Phase 1 — Foundation (Week 1-2)**
   - Repo setup, Next.js + Tailwind scaffold
   - Global layout (nav + footer)
   - Homepage redesign
   - Hillshire Hollows page (highest conversion value)

2. **Phase 2 — Conversion Pages (Week 3-4)**
   - Membership pricing page + Stripe integration
   - Workshares application
   - Tours booking
   - Contact

3. **Phase 3 — Community & Media (Week 5-6)**
   - Media hub (podcasts, videos)
   - Forum setup
   - Communities directory

4. **Phase 4 — Content & CMS (Week 7-8)**
   - Sanity CMS setup
   - Migrate all content from Wix
   - SEO optimization
   - Launch

---

## 8. CONTENT GAPS TO FILL BEFORE BUILD

These need to be provided/created before pages can be built:

- [ ] High-res photos of Hillshire Hollows (aerial, ground, structures)
- [ ] Property map / lot diagram
- [ ] Exact pricing for all membership tiers
- [ ] Exact pricing for all property packages
- [ ] Founder bio and story
- [ ] Testimonials from current members
- [ ] Podcast RSS feed URL
- [ ] YouTube channel URL
- [ ] Social media handles (all platforms)
- [ ] Legal structure explanation (how land ownership works)
- [ ] Raffle rules / terms
- [ ] Current workshare openings list
- [ ] All subscription club details

---

## 9. NEXT STEPS

1. Create GitHub repo: `dutchiono/uniphimedia` (or org name)
2. Scaffold Next.js project with Tailwind
3. Set up folder structure per Section 6 above
4. Begin with homepage + HSH page as priority
5. Re-run deep scrape when FireCrawl credits restore to pull remaining raw copy

---

*Analysis compiled by Nebula — 2026-03-10. Deep page scraping blocked by service outage; will resume when FireCrawl credits restore.*