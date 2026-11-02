# TCF Houston Website

Website for **Telugu Christian Fellowship (TCF) Houston**, a church fellowship that meets every 3rd Saturday at 3:30 PM in Houston, TX.

## What the app does

A single-page React site.

### Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [React Router v6](https://reactrouter.com/) for client-side routing
- [Tailwind CSS 3](https://tailwindcss.com/) for styling
- [Resend](https://resend.com/) for sending email
- [Vercel](https://vercel.com/) for hosting and serverless functions (`/api`)

### Project layout

```
api/            Vercel serverless functions (contact.js, prayer.js)
src/pages/      One component per route
src/components/ Shared UI (Navbar, Footer, HeroBanner, Section, Card)
src/App.jsx     Route definitions
vercel.json     Rewrites so deep links like /prayer work on refresh
```

---

## Getting started

### Option A: Fresh laptop (nothing installed yet)

**1. Install Node.js (v18 or newer, LTS recommended)**

- **macOS** (with [Homebrew](https://brew.sh)):
  ```bash
  brew install node
  ```
- **Windows / Linux / macOS without Homebrew:** download the LTS installer from <https://nodejs.org>.

Check it worked:

```bash
node -v
npm -v
```

**2. Install Git**

- **macOS:** run `git --version`. If Git is missing, macOS offers to install the command line tools.
- **Windows:** <https://git-scm.com/download/win>
- **Linux:** `sudo apt install git`

**3. Get the code**

```bash
git clone <repository-url>
cd tcf
```

**4. Install dependencies**

```bash
npm install
```

**5. Start the dev server**

```bash
npm run dev
```

Open the URL it prints, usually <http://localhost:5173>.

> The plain dev server does **not** run the `/api` functions, so the Contact and Prayer forms will show an error locally. To test email sending, follow [Testing the forms locally](#testing-the-forms-locally).

### Option B: Experienced users (Node and Git already installed)

```bash
git clone <repository-url> && cd tcf
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload (no `/api`) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npx vercel dev` | Run the site **and** `/api` functions together |

---

## Testing the forms locally

The forms need the serverless functions and a Resend API key.

1. Get a Resend API key from <https://resend.com/api-keys>. The `tcfhouston.org` domain must be verified in Resend, because emails are sent from `contact@tcfhouston.org`.
2. Create a file named `.env.local` in the project root:
   ```
   RESEND_API_KEY=re_your_key_here
   ```
3. Run:
   ```bash
   npx vercel dev
   ```
   The first run asks you to log in and link the project. Follow the prompts.
4. Open the URL it prints, submit a form, and check the `tcf@tcfhouston.org` inbox.

Never commit `.env.local` or your API key.

## Deployment (Vercel)

The site deploys to Vercel. Pushing to the connected branch triggers a build (`npm run build`, output `dist/`).

One-time setup in the Vercel dashboard:

1. **Project Settings → Environment Variables:** add `RESEND_API_KEY`.
2. Redeploy after adding or changing the variable.
3. Confirm the `tcfhouston.org` sender domain is verified in Resend (SPF/DKIM). Otherwise emails are rejected.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `command not found: npm` | Node.js isn't installed or the terminal needs restarting. |
| Form shows "Something went wrong" locally | Use `npx vercel dev` with `RESEND_API_KEY` set. Plain `npm run dev` has no `/api`. |
| Form fails in production | Check that `RESEND_API_KEY` is set in Vercel and the domain is verified in Resend. Check the function logs in the Vercel dashboard. |
| Refreshing `/prayer` gives 404 | Make sure `vercel.json` is deployed. |
| Port 5173 already in use | Vite picks the next free port and prints it. |
