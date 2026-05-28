# Darkland Saga Website — Deployment Guide

## Prerequisites

- GitHub account
- Vercel account (free tier: vercel.com/signup — sign in with GitHub)
- Access to jlallred.com DNS settings (your domain registrar)

---

## Step 1: Push to GitHub

```bash
# From WSL Ubuntu, in the darkland-saga-website directory:
cd ~/darkland-saga-website

# Initialize git and commit
git add -A
git commit -m "Initial commit — Darkland Saga website with Companion Archive"

# Create a repo on GitHub (github.com/new), then:
git remote add origin https://github.com/YOUR_USERNAME/darkland-saga-website.git
git push -u origin main
```

Replace YOUR_USERNAME with your GitHub username.

---

## Step 2: Deploy on Vercel

1. Go to **vercel.com** and sign in with GitHub
2. Click **Add New → Project**
3. Select the `darkland-saga-website` repo
4. Vercel detects Next.js automatically
5. **Important:** Add these environment variables:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Postgres connection string (from Neon) |
| `AUTH_SECRET` | Run `openssl rand -hex 32` in WSL and paste the output |
| `ADMIN_EMAIL` | `jlallred.author@gmail.com` |
| `ADMIN_PASSWORD` | Choose a strong password for admin access |

6. Click **Deploy**

---

## Step 3: Set Up PostgreSQL (Neon — Free)

1. Go to **neon.tech** and sign up (free tier)
2. Create a new project
3. Copy the connection string — it looks like:
   `postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/darkland-saga?sslmode=require`
4. Paste it as `DATABASE_URL` in your Vercel project settings

---

## Step 4: First Deploy + Seed Data

After first deploy, Vercel will build and run the site. Then seed the database:

```bash
# From your local machine, after the deploy URL is live:
# Install the Neon CLI or use psql to connect
# Then run the seed script to create your admin account and test data
```

Or simpler: after deploy, sign in at `https://jlallred.com/companion/signin` using the ADMIN_EMAIL and ADMIN_PASSWORD you set. Then use the admin panel to add content.

---

## Step 5: Point Domain

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add `jlallred.com`
3. Vercel shows you the DNS records to add
4. Go to your domain registrar and add the records
5. Wait 5-30 minutes for DNS propagation

---

## Updating the Site

After the initial deploy, any push to the `main` branch on GitHub automatically redeploys:

```bash
git add -A
git commit -m "Added new lore entry"
git push
```

Vercel picks it up and deploys in ~2 minutes.

---

## Quick Start (After Deploy)

1. Visit `jlallred.com/companion/signin`
2. Sign in with your admin credentials
3. Go to `jlallred.com/companion/admin` to generate codes and add content
4. 🎉 Done

---

## Cost

- **Vercel**: Free (Hobby tier, 100 GB bandwidth/month)
- **Neon**: Free (0.5 GB storage, 100 compute hours/month)
- **Custom domain**: Free if via Vercel DNS, or registrar cost