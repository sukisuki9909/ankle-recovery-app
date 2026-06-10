# Ankle Recovery Coach

Interactive mobile-first PWA for ankle ORIF recovery tracking, videos, checklists, pain/swelling logs, and iPhone Home Screen install.

## Your baked-in timeline

- Surgery: May 23, 2026
- First follow-up: June 3, 2026
- CAM boot transition: June 17, 2026
- Full weight-bearing as tolerated in CAM boot only starting June 17, 2026
- Next follow-up X-ray: July 8, 2026

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publish to GitHub Pages

1. Create a GitHub repository, for example `ankle-orif-recovery`.
2. Upload all files in this folder.
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** if you add a deploy workflow, or upload the `dist` folder to the Pages source branch.
5. Easier manual route: run `npm run build`, then publish the generated `dist` folder using GitHub Pages.

## Install on iPhone

1. Open the GitHub Pages link in Safari.
2. Tap the Share button.
3. Tap **Add to Home Screen**.
4. Name it **Ankle Recovery**.
5. Open it from the Home Screen icon.

## Notes

This app is not medical advice. Follow surgeon and PT restrictions. Do not do barefoot walking or advanced exercises unless cleared.
