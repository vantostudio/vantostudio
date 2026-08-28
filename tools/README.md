# capture.mjs

Captures the project screenshots and scroll videos used on the work pages, so
every project is framed identically instead of shot by hand.

## Output specification

Matches every asset currently in `public/projects/`:

- **Stills** — 2400×1350 webp, captured at a 1920px CSS viewport so the whole
  desktop layout is in frame. The site renders these small on a phone, so
  anything tight or cropped at capture time is lost there.
- **Scroll videos** — 1280×720, 12fps, exactly 6.000s (72 frames), written as
  **both** VP9 webm and H.264 MP4 (Constrained Baseline, yuv420p, +faststart).
  The MP4 is not optional: iOS Safari has no dependable VP9-in-WebM support, so
  without it the previews silently never play on iPhone.

## Requirements

```
npm install playwright-core       # in this directory, or globally
```

Plus a system Chrome at `/usr/bin/google-chrome-stable`, `ffmpeg`, and
ImageMagick (`magick`) for the webp conversion.

## Usage

```
node capture.mjs                      # every configured site
node capture.mjs aperture             # one site
node capture.mjs little-paws --video-only
node capture.mjs little-paws --crf=40 # higher crf = smaller file
```

PNGs and the webm land in `out/<site>/`. Convert and install them with:

```
for f in out/<site>/*.png; do
  magick "$f" -quality 82 -define webp:method=6 \
    "../public/projects/<site>/$(basename "$f" .png).webp"
done
cp out/<site>/preview.webm ../public/projects/<site>/preview.webm
cp out/<site>/preview.mp4  ../public/projects/<site>/preview.mp4
```

## Adding a project

Add an entry to `SITES` with the base URL, a `settle` delay in milliseconds
(raise it for sites with a loading sequence — Aperture needs 7000), and a
`stills` map of `filename: route`. A still can also be `{ path, scroll }` to
capture partway down a page.

## Notes

- Brieshon is not in `SITES` because its hosting is down. Add it back when the
  site is live so its framing matches the rest.
- Aperture deliberately ships without a scroll video.

## Container aspect

`ProjectMotion` uses `object-cover`, so any container that is not 16:9 crops the
screenshot. All media containers are `aspect-[16/9]` to match the source — if
you change one, the sides of every screenshot start disappearing, worst on
mobile where the whole image is already small.
