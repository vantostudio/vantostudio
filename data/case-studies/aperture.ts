import type { Project } from "./types";

export const aperture: Project = {
  slug: "aperture",
  index: "02",
  category: "PHOTOGRAPHY & CREATIVE PRACTICE",
  sector: "Creative",
  status: "INDEPENDENT CONCEPT",
  kind: "concept",
  name: "Aperture",
  domain: "aperture-gules-one.vercel.app",
  href: "https://aperture-gules-one.vercel.app",
  linkLabel: "View live concept",
  image: "/projects/aperture/home.webp",
  imageAlt: "Aperture photographic exhibition homepage",
  description:
    "A self-initiated site for a photography practice, structured as a walk-through exhibition rather than a conventional portfolio grid.",
  homeDescription:
    "A photography concept built as a digital exhibition—chaptered rooms, cinematic pacing, and a booking journey that reads more like a letter than a form.",
  tags: ["Art direction", "UX/UI", "Development"],
  facts: [["Concept", "SELF-INITIATED"], ["Three chapters", "EXHIBITION STRUCTURE"]],
  tagline: "A portfolio that behaves like an exhibition.",
  intro:
    "Aperture asks what a photographer’s website becomes when the work is given room instead of a grid. The concept treats the site as a sequence of rooms—each chapter with its own light and tempo—so that browsing feels closer to walking an exhibition than scanning thumbnails.",
  whyBuilt:
    "Creative-sector briefs often begin with the assumption that more work on screen means more persuasion. We built Aperture to test the opposite: a photography site paced like an exhibition rather than presented as a dense grid.",
  disclaimer:
    "Independent concept project. The photographer, studio, client stories, and contact details are illustrative and were created to demonstrate Vanto’s approach.",
  meta: [
    ["PROJECT", "Independent concept"],
    ["ROLE", "Art direction, UX/UI & development"],
    ["TYPE", "Photography practice"],
    ["STATUS", "Live concept"],
  ],
  highlights: [
    ["Chaptered", "EXHIBITION ARCHITECTURE"],
    ["Cinematic", "SCROLL AND ENTRY PACING"],
    ["Editorial", "TYPOGRAPHIC SYSTEM"],
    ["Considered", "ENQUIRY JOURNEY"],
  ],
  blocks: [
    {
      label: "THE PREMISE",
      image: "/projects/aperture/home.webp",
      imageAlt: "Aperture homepage with a full-bleed photograph and editorial headline",
      title: "Give the photograph the whole room.",
      body:
        "Most photography sites open with a grid, which asks the visitor to evaluate before they have felt anything. Aperture opens with a single frame at full bleed and a line of type over it, then invites the visitor to walk in. The entry sequence—a deliberate load, a slow reveal—sets a tempo that the rest of the site keeps, so the work is met at the pace it was made.",
    },
    {
      label: "THE STRUCTURE",
      image: "/projects/aperture/chapters.webp",
      imageAlt: "Aperture chapter selection screen showing three exhibition rooms",
      title: "Three chapters, each with its own light.",
      body:
        "Weddings, graduations, and corporate work are treated as separate rooms rather than filter states on one gallery. Each chapter carries its own palette, pacing, and framing language, which lets very different commissions sit in one practice without flattening into a single mood. The chooser is a threshold, not a menu—visitors step in and the exhibition continues from wherever they land.",
    },
    {
      label: "INSIDE A CHAPTER",
      image: "/projects/aperture/chapter.webp",
      imageAlt: "Aperture weddings chapter with an oversized serif title over a photograph",
      title: "Editorial typography holding cinematic imagery.",
      body:
        "Inside each room, oversized serif titles overlap the photography while monospace captions carry the quiet metadata—location, camera, year, aperture and shutter. The tension between the two registers is the identity: the display type gives the work presence, the technical notes give it credibility, and neither competes with the frame itself.",
    },
    {
      label: "THE ENQUIRY",
      image: "/projects/aperture/gallery.webp",
      imageAlt: "Aperture gallery grid mixing wedding, graduation, and event photographs",
      title: "A booking flow written as a letter, not a form.",
      body:
        "The practice takes a small number of commissions a year, so the enquiry is paced to match. Rather than one long form, it moves through short movements—chapter, where and when, vision, you—phrased as questions a photographer would actually ask. A rotating gallery edit sits above it, so the last thing a visitor sees before enquiring is the work, not a field label.",
    },
  ],
  outcome:
    "A six-chapter exhibition site with its own entry sequence, per-chapter art direction, and a paced enquiry flow. It answered a question that keeps coming up in creative-sector briefs: whether sequence and restraint can hold attention better than a dense grid—and on this evidence, they can.",
};
