# Luxury Tiffins

Production-oriented full-stack tiffin ordering application scaffold based on the supplied specification. The project uses Next.js, TypeScript, Tailwind CSS, Prisma/PostgreSQL, secure authentication, cart/checkout flows, Razorpay integration points, customer accounts, subscriptions, coupons, reviews, wishlist, inventory and an admin area.

## Stack
- Next.js + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Zod validation
- JWT/session-ready authentication architecture
- Razorpay server integration
- REST-style API routes
- Responsive dark luxury UI

## Run locally

1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Set `DATABASE_URL` and `AUTH_SECRET`.
4. Install dependencies:
   `npm install`
5. Create the database:
   `npx prisma migrate dev --name init`
6. Seed sample data:
   `npm run db:seed`
7. Start:
   `npm run dev`

Open http://localhost:3000.

## Razorpay
Set:
- RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- RAZORPAY_WEBHOOK_SECRET

The server creates/verifies payment orders; secrets are never exposed to the browser.

## Admin
Create an admin with:
`npm run create-admin -- --email admin@example.com --password "change-me"`

Never use a production password from source control.

## GitHub
```bash
git init
git add .
git commit -m "Initial Luxury Tiffins full-stack app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/luxury-tiffins.git
git push -u origin main
```

## Important
External providers need real credentials before production payments/email/SMS are live. Never commit `.env`.
