# Birthday DJ 🎂🎧

A personal website to track birthdays of friends and family — inspired by the playful, neon-lit DJ deck aesthetic of [YouTube DJ on Figma Community](https://www.figma.com/community/file/1530334989207758899/youtube-dj).

## Features

- **12-channel month mixer** — each month is a fader on your deck
- **Now Playing queue** — upcoming birthdays sorted by days until celebration
- **Club Mode** — extra glow and equalizer vibes for today's birthdays
- **Add, edit, delete** birthdays with relationship tags and optional notes
- **Local persistence** — data saved in your browser via localStorage
- **Spinning vinyl** — visual display for the active month

## Quick start

```bash
cd birthday-dj
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Deploy on GitHub Pages (free)

This repo includes a GitHub Actions workflow that builds and publishes automatically.

### One-time setup

1. **Re-authenticate GitHub CLI** (if needed):
   ```bash
   gh auth login
   ```

2. **Create and push the repo** from the `birthday-dj` folder:
   ```bash
   cd birthday-dj
   git init
   git add .
   git commit -m "Initial commit: Birthday DJ personal site"
   gh repo create birthday-dj --public --source=. --remote=origin --push
   ```

3. **Enable GitHub Pages** in your repo on GitHub:
   - Settings → Pages → Build and deployment → Source: **GitHub Actions**

After the first push, the workflow runs automatically. Your site will be live at:

**https://koushik289.github.io/birthday-dj/**

(Replace `koushik289` with your GitHub username if different.)

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Zustand (state + localStorage)
- date-fns
