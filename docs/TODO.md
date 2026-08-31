# Outstanding work

Everything here came out of a full site audit. The technical items from that
audit are done and shipped — what remains is either a decision, an account
action, or content only you can write.

Last updated: 27 August 2026

---

## 1. Blocked on you — do these first

### Restore Brieshon hosting
`brieshon.co.ke` returns no response. DNS resolves to Cloudflare
(`104.21.0.118`, `172.67.150.238`) but the origin refuses every connection, so
this is a lapsed origin host, not a domain problem.

**Why it matters more than anything else here:** it is the only real,
client-facing, production product in the portfolio. With it offline, every
visible project is a self-initiated concept — a prospect reads that as "nobody
has ever paid this person." Restoring it does more for credibility than any
other item on this list.

**To bring it back once hosting is paid:**
1. In `data/projects.ts`, add `brieshon` back to the `projects` array and drop
   the `eslint-disable` line above the import.
2. Re-shoot its screenshots at the current framing so it matches the others:
   `node capture.mjs brieshon` (see §5).
3. The work page count and sitemap update themselves — both derive from the
   `projects` array.

### Create the hello@vanto.studio mailbox
The site now shows `hello@vanto.studio` everywhere. **Until the mailbox exists,
mail sent to it bounces.** Set it up before the site takes real traffic.

### Verify vanto.studio in Resend
`CONTACT_FROM_EMAIL` currently points at `hello@vanto.studio`, which only works
once `vanto.studio` is a verified sending domain in Resend (SPF + DKIM records).
Until then the contact form's email delivery will fail in production.

The sandbox sender `onboarding@resend.dev` works for testing but **only delivers
to the address that owns the Resend account** — it is not a production fallback.

### Enable Web Analytics in the Vercel dashboard
The code is wired (`@vercel/analytics`, `<Analytics />` in the root layout) and
verified working. The dashboard toggle is not flipped.

Project → Analytics → Enable. Page-view analytics are available on Hobby, but
the custom conversion events wired into the site require a Vercel Pro or
Enterprise plan. Without that plan, page views still work but the conversion
event panel will not populate.

---

## 2. Pricing — DONE, revisit as the work changes

**The custom-quote approach is right.** Scoped work genuinely cannot be listed
at a fixed price, and "Project-based quote" is honest. Keep it.

**The problem is that there is no number anywhere on the site.** All three tiers
read "Project-based quote", which gives a visitor nothing to self-select with.
Two consequences:

- **Wrong enquiries arrive.** Someone with a tiny budget and someone with a
  serious one both see the same page, both feel invited, and both complete the
  4-step form. You then burn a call discovering the mismatch. As a solo studio,
  calls are your scarcest resource.
- **Serious buyers hesitate.** A prospect who cannot tell whether you are
  cheap or expensive often assumes they cannot afford you — or worse, assumes
  you are cheap. Price silence rarely reads as "premium".

**The fix is a floor, not a price list.** A "from" price commits you to nothing;
it states a starting point:

```
Focused website      from KES  ___
Business website     from KES  ___
Commerce & custom    Custom project quote
```

Leaving the top tier as a pure custom quote is correct — that is exactly the
tier where a number would mislead.

The Services page copy already sets this up ("useful starting points, not rigid
packages") and then never gives a starting point. One number per tier and that
section starts working.

**A caution on the number itself.** A very low floor (single-digit thousands
KES) will actively work against the rest of the site. Everything about the
positioning — editorial typography, "considered", senior attention, clear ownership —
signals a studio that charges properly. A floor far below that reads as a
contradiction, and in practice it attracts clients who negotiate hardest and
respect the process least. Build time falling does not mean the *value* fell:
you are selling strategy and judgement, and the site argues that well.

Whatever you choose, set it high enough that the wrong enquiries stop before
they reach your calendar.

**Set on 27 August 2026** in `data/services.ts`:

| Tier | Price shown |
| --- | --- |
| Focused website | From KES 10,000 |
| Business website | Project-based quote |
| Commerce & custom | Custom project quote |

**Only the entry tier carries a number**, deliberately. That is where a figure
does real work — it stops a poor-fit enquiry before it costs a call. The larger
two vary too much for a floor to be honest, so they stay quote-based, which is
also what protects your room to price a big project properly.

Revisit if either happens:
- You are booked out and still not earning what you want → raise the floor.
- Enquiries arrive but nobody converts past the call → the floor is not the
  problem; the scope conversation is.
- Enquiries dry up entirely → too high for the market, or the work shown does
  not yet justify it.

The floor is set low on purpose, to sit under the local template-and-freelancer
tier and win on craft at a price nobody argues with. The thing to watch is
capacity rather than margin: client management does not get faster just because
the build does, so volume is what a solo studio runs out of first. If you find
yourself busy but not better off, the floor is the first thing to move.

At this floor the Focused tier is effectively the cheap product, so give it hard
boundaries in the proposal — fixed scope, fixed turnaround, one revision round.
Without them a 10k project can absorb the same hours as a 100k one.

Consider showing a USD equivalent alongside KES once international enquiries
start arriving; the site says "working worldwide" but prices in KES only.

---

## 3. Content that needs writing

### Real testimonials
The component is built and wired into the home page. It renders nothing while
the array is empty, so the site never shows an empty shell.

Add entries to `data/testimonials.ts`. Each needs a real quote, a real name,
role, company, and a `source` field (`"Email, Mar 2026"`) so every quote stays
traceable.

**How to collect usable ones:** after handover, ask two questions —
*"What was the situation before?"* and *"What changed?"* — and use the answer
verbatim. Specific beats glowing. One real quote is a transformative jump from
zero.

Never write these on a client's behalf. Fabricated endorsements are illegal in
most markets you would sell into, and they are checkable — a prospect who
verifies one invented name stops believing the genuine work too.

### Availability signal
Something like *"Taking on two projects for Q1"*. It does three jobs at once:
creates urgency, implies demand, and sets expectations. The footer eyebrow is
already a prop (`footerProps.eyebrow`), so this is close to a one-line change.

### Social links
There are currently none anywhere on the site. For an independent studio these
are the trust-and-discovery layer, and their absence reads as no footprint. If
LinkedIn / Instagram / Dribbble exist, they belong in the footer.

### A takeaway artifact
A one-page PDF — *"What to prepare before a website project"* — captures email
addresses from people who are interested but not ready to enquire. Right now the
only conversion path on the site is a 4-step commitment.

### Writing / insights
The main organic acquisition channel for an independent studio. You already have
formed opinions sitting in the site copy ("clarity before decoration", "the
message leads") that are going unused as article premises.

---

## 4. Theme — decided, no toggle

**One dark theme.** The site alternates dark and light *sections*, which is a
composition choice, not a colour mode. There is no OS light mode and no toggle,
and adding one would mean redesigning every section and flattening that rhythm.

`color-scheme: dark` and `theme-color` are declared, so native scrollbars, form
controls, autofill, and mobile browser chrome follow the page instead of
rendering light on top of it.

### Why there are two accent values

No single accent can meet WCAG AA on both `#14110d` and `#f4eddf` — this was
checked exhaustively across the colour space, not estimated. Anything light
enough for ink is too light for paper. The previous single value (`#9a6a3c`)
sat at 4.03 on ink and 4.00 on paper, failing on both, and it was what every
small mono label used.

So accent *text* resolves from its surface, via one rule in `globals.css`:

| Context | Value | Contrast |
| --- | --- | --- |
| On ink | `#d39150` | 7.11 |
| On paper | `#8c5f34` | 4.74 |
| Case studies (on ink) | `#c4643a` | 4.69 |
| Button fill (`bg-accent-fill`) | `#9a6a3c` | fixed |

Every `text-accent` in the app resolves correctly without the call site knowing
its background. Fills stay fixed deliberately — a button should not change
colour with the section it sits in.

**If you add a new light-surface class**, add it to the selector in
`globals.css` next to `.bg-paper` or accent text will stay bright on it.

---

## 4. Judgement calls worth revisiting

### Legal is now 3 of 5 projects
Odera & Partners, Amani Kibwana, and Advocate Dossier are all legal-sector.
That reads as **specialisation** if deliberate, or as **narrow range** if not.
Worth weighing when choosing the next build — a second commerce or hospitality
piece would rebalance it.

### Kenya references in case study copy
Positioning copy across the site now says "working worldwide". Three case
studies still mention Kenya in their descriptions (Brieshon "built for Kenya",
Odera as a Kenyan firm, Little Paws as a Kenyan nursery). These were left
deliberately — they are factual descriptions of what those projects are, and
they read as *client markets* rather than a limit on who you serve. Revisit only
if the international positioning needs to be harder.

### metadataBase is hardcoded
`app/layout.tsx` sets `metadataBase: new URL("https://vanto.studio")`. If you
attach a different production domain in Vercel, OG and canonical URLs will point
at the wrong host. Change it there if the domain changes.

---

## 5. The screenshot / scroll-video tool

Project imagery is captured with a Playwright script rather than by hand, so
every project is framed identically.

**Specification** (all existing assets match this):
- Stills: 2400×1350 webp, quality 82, captured at a 1600px CSS viewport
- Scroll videos: VP9 webm, 1280×720, 12fps, exactly 6.000s (72 frames)

**Usage:**
```
node capture.mjs                      # all configured sites
node capture.mjs <site>               # one site
node capture.mjs <site> --video-only  # re-encode the scroll video only
node capture.mjs <site> --crf=40      # tune video size (higher = smaller)
```

Requires `playwright-core` and a system Chrome at `/usr/bin/google-chrome-stable`,
plus `ffmpeg` and ImageMagick for encoding.

Note: Aperture deliberately has **no** scroll video — it shows a static poster
while the others move.

---

## 6. Done — for reference

Nothing below needs action. Recorded so the audit is not repeated.

- Git initialised, remote set to the `github-vanto` SSH host alias
- Kenya → "working worldwide" across all positioning copy and metadata
- Mobile process carousel fixed (was unscrollable below 768px)
- Menu: outside-tap dismiss, scroll lock, 44px close target, Escape, route change
- FAQ closed by default; home trimmed from 8 sections to 6
- Two new projects: Aperture, Advocate Dossier
- Case study outcomes rewritten as results; `whyBuilt` added to every concept
- Browser-chrome frame replaced with a clean figure + caption
- Contact form: real `<form>`, native radios, Enter-to-submit, autofill,
  `aria-live` step announcements, progressbar ARIA, sessionStorage persistence
- Skip-to-content link on every page
- OG image, favicon, apple icon, openGraph + twitter metadata
- sitemap.xml, robots.txt, JSON-LD (ProfessionalService + Person + WebSite)
- Privacy policy at `/privacy`, linked in the footer
- Vercel Web Analytics wired
- Contact details centralised in `data/site.ts`
