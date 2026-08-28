import { chromium } from "playwright-core";
import { mkdir, rm } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const run = promisify(execFile);

// Framing: 1600px CSS viewport (was 1440) so pages read a little zoomed out.
// Stills upscale x1.5 -> 2400x1350, matching the existing asset dimensions.
const CSS_W = 1600, CSS_H = 900;
const STILL_SCALE = 1.5;
const VIDEO_W = 1280, VIDEO_H = 720, FPS = 12, SECONDS = 6;
const FRAMES = FPS * SECONDS;

const SITES = {
  kairos: {
    base: "https://remix-of-maison-olive.vercel.app",
    settle: 4000,
    stills: { home: "/", products: "/products", product: "/products/bahari-diver-300", collection: { path: "/", scroll: 2.6 } },
  },
  "advocate-dossier": {
    base: "https://advocate-s-dossier.vercel.app",
    settle: 4000,
    stills: { home: "/", journey: "/academic-journey", research: "/research", moot: "/moot-court", resume: "/resume" },
  },
  aperture: {
    base: "https://aperture-gules-one.vercel.app",
    settle: 7000,
    stills: { home: "/", chapters: "/chapters", chapter: "/chapters/weddings", gallery: { path: "/", scroll: 3.2 }, events: "/chapters/corporate" },
  },
  "little-paws": {
    base: "https://littlepawske.vercel.app",
    settle: 3500,
    stills: { home: "/", care: "/care", join: "/join", nursery: "/nursery" },
  },
  "odera-partners": {
    base: "https://odera-seven.vercel.app",
    settle: 3500,
    stills: { home: "/", cases: "/case-studies", practice: "/practice-areas", contact: "/contact" },
  },
  "kinetic-legal": {
    base: "https://kinetic-legal.vercel.app",
    settle: 3500,
    stills: { home: "/", services: "/services", practice: "/practice-areas", consultation: "/book-consultation" },
  },
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const only = process.argv[2];
const VIDEO_ONLY = process.argv.includes("--video-only");
const CRF = (process.argv.find(a => a.startsWith("--crf=")) || "--crf=36").split("=")[1];

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

for (const [name, site] of Object.entries(SITES)) {
  if (only && only !== name) continue;
  const out = `out/${name}`;
  await mkdir(out, { recursive: true });

  // ---- stills ----
  if (!VIDEO_ONLY) {
  const ctx = await browser.newContext({
    viewport: { width: CSS_W, height: CSS_H },
    deviceScaleFactor: STILL_SCALE,
  });
  for (const [label, spec] of Object.entries(site.stills)) {
    const path = typeof spec === "string" ? spec : spec.path;
    const scroll = typeof spec === "string" ? 0 : spec.scroll;
    const page = await ctx.newPage();
    await page.goto(site.base + path, { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
    await wait(site.settle);
    if (scroll) {
      await page.evaluate((n) => window.scrollTo({ top: innerHeight * n, behavior: "instant" }), scroll);
      await wait(2500);
    }
    await page.screenshot({ path: `${out}/${label}.png`, animations: "disabled" });
    console.log(`still  ${name}/${label}`);
    await page.close();
  }
  await ctx.close();
  }

  // ---- scroll video ----
  const vctx = await browser.newContext({
    viewport: { width: CSS_W, height: CSS_H },
    deviceScaleFactor: VIDEO_W / CSS_W,
  });
  const page = await vctx.newPage();
  await page.goto(site.base + "/", { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
  await wait(site.settle);
  const maxScroll = await page.evaluate(() =>
    Math.max(0, document.documentElement.scrollHeight - innerHeight),
  );
  const frameDir = `${out}/frames`;
  await rm(frameDir, { recursive: true, force: true });
  await mkdir(frameDir, { recursive: true });
  for (let i = 0; i < FRAMES; i++) {
    const y = Math.round((maxScroll * i) / (FRAMES - 1));
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await wait(120);
    await page.screenshot({ path: `${frameDir}/${String(i).padStart(3, "0")}.png`, animations: "disabled" });
  }
  console.log(`frames ${name}  (${FRAMES} @ scrollHeight ${maxScroll}px)`);
  await page.close();
  await vctx.close();

  await run("ffmpeg", ["-y", "-framerate", String(FPS), "-i", `${frameDir}/%03d.png`,
    "-vf", `scale=${VIDEO_W}:${VIDEO_H}:flags=lanczos`,
    "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", CRF, "-row-mt", "1", "-an",
    `${out}/preview.webm`]);
  // iOS Safari has no dependable VP9/WebM support — without this MP4 the
  // previews silently never play on iPhone.
  await run("ffmpeg", ["-y", "-framerate", String(FPS), "-i", `${frameDir}/%03d.png`,
    "-vf", `scale=${VIDEO_W}:${VIDEO_H}:flags=lanczos,format=yuv420p`,
    "-c:v", "libx264", "-profile:v", "baseline", "-level", "3.1",
    "-crf", String(Number(CRF) - 8), "-movflags", "+faststart", "-an",
    `${out}/preview.mp4`]);
  await rm(frameDir, { recursive: true, force: true });
  console.log(`video  ${name}/preview.webm`);
}
await browser.close();
