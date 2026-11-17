# Ismail Shaikh — Portfolio

Personal portfolio built with Next.js (static export), TypeScript, Tailwind CSS and Framer Motion.
Live at https://undatedlace.github.io/portfolio/

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into ./out
```

All site content lives in [`data/portfolio.ts`](data/portfolio.ts). The downloadable resume is `public/resume.pdf`.

## Contact form

The form uses [Web3Forms](https://web3forms.com) (free). Copy `.env.example` to `.env.local` and set
`NEXT_PUBLIC_WEB3FORMS_KEY`. For the deployed site, add the same value as a repository secret named
`WEB3FORMS_KEY` (Settings → Secrets and variables → Actions). Without a key the form shows a "please email me" fallback.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages
(Settings → Pages → Source: GitHub Actions).
