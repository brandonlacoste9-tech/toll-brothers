# Toll Brothers preview

Studio rebuild of a luxury home-builder and master-planned community platform, inspired by [TollBrothers.com](https://www.tollbrothers.com/).

**Not live on tollbrothers.com.**

Public facts only: printed communities, floor plans, quick move-in inventory, Designer Appointed Collections, and division phones. Inquiries route to those printed numbers and the live appointment URLs. This preview does not copy the live CRM form.

## Stack

- Next.js 16 App Router, TypeScript, Tailwind CSS 4
- Drizzle schema for communities, plans, homes, collections, inquiries
- Seeded catalog (swap to Supabase/Postgres when `DATABASE_URL` is set)
- Netlify (`@netlify/plugin-nextjs`, Node 22)

## Scripts

```bash
npm run dev
npm run build
```
