# Nikhil's Game Development Portfolio

A cinematic React + Vite portfolio for a solo game developer.

## Local preview

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Use `npm run build` to create the production site in `dist/`.

## Updating projects

Project content, links, features, and gallery labels are kept together in `src/data/projects.js`. The illustrated artwork is CSS-based, so it has no external image dependencies.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys pushes to `main`. In the repository’s **Settings → Pages**, select **GitHub Actions** as the source once. The site is configured for the custom user site domain (`https://nikhilyps.github.io/`).
