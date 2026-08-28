import type { Project } from "./types";

export const advocateDossier: Project = {
  slug: "advocate-dossier",
  index: "05",
  category: "PROFESSIONAL IDENTITY",
  sector: "Legal",
  status: "INDEPENDENT CONCEPT",
  kind: "concept",
  name: "Advocate Dossier",
  domain: "advocate-s-dossier.vercel.app",
  href: "https://advocate-s-dossier.vercel.app",
  linkLabel: "View live concept",
  image: "/projects/advocate-dossier/home.webp",
  video: "/projects/advocate-dossier/preview.webm",
  imageAlt: "Advocate Dossier profile homepage",
  description:
    "A self-initiated professional record for a law student, structured as a living dossier rather than a static CV.",
  homeDescription:
    "A credential-led concept for someone early in a career—academic record, moot advocacy, research, and résumé held in one structured, citable site.",
  tags: ["Content strategy", "UX/UI", "Development"],
  facts: [["Concept", "SELF-INITIATED"], ["Nine sections", "STRUCTURED RECORD"]],
  tagline: "A CV that behaves like a case file.",
  intro:
    "Advocate Dossier explores how someone with credentials but no track record presents themselves credibly. Instead of compressing a career into one scrolling page, it treats each area—academic journey, moot court, research, experience, practice interests, recognition, résumé—as its own filed section that can grow as the career does.",
  whyBuilt:
    "Early-career professionals often get handed the same one-page template as people with twenty years behind them, and it flatters neither. We built Advocate Dossier to explore what a personal site becomes when it is designed to grow for a decade rather than be replaced every two years.",
  disclaimer:
    "Independent concept project. The individual, institutions, awards, publications, and contact details are illustrative and were created to demonstrate Vanto’s approach.",
  meta: [
    ["PROJECT", "Independent concept"],
    ["ROLE", "Content strategy, UX/UI & development"],
    ["TYPE", "Professional profile"],
    ["STATUS", "Live concept"],
  ],
  highlights: [
    ["Sectioned", "RECORD ARCHITECTURE"],
    ["Editorial", "DOCUMENT TYPOGRAPHY"],
    ["Citable", "RESEARCH AND ABSTRACTS"],
    ["Printable", "BROWSER-FIRST RESUME"],
  ],
  blocks: [
    {
      label: "THE PREMISE",
      image: "/projects/advocate-dossier/home.webp",
      imageAlt: "Advocate Dossier homepage with a profile card and identity statement",
      title: "Open with the facts, not the adjectives.",
      body:
        "The site opens on a profile card—name, programme, standing, year, location—before any positioning language appears. For someone whose case is built on credentials rather than a client list, the verifiable details are the strongest opening argument, and burying them under a hero statement wastes them. The identity section follows only once the reader knows who they are looking at.",
    },
    {
      label: "THE STRUCTURE",
      image: "/projects/advocate-dossier/journey.webp",
      imageAlt: "Advocate Dossier academic journey section",
      title: "Nine filed sections instead of one long scroll.",
      body:
        "Academic journey, moot court, research, experience, practice interests, recognition, and résumé each get their own route rather than a heading on a single page. That costs some immediacy and buys something more useful: every section can be linked to directly, cited in an application, and expanded independently as the record grows.",
    },
    {
      label: "THE EVIDENCE",
      image: "/projects/advocate-dossier/research.webp",
      imageAlt: "Advocate Dossier research and publications section",
      title: "Every claim carries its source.",
      body:
        "Research entries lead with an abstract and a source rather than a title alone, and moot court results name the round, the bench, and the memorial. The pattern is deliberate: in a field where assertions are expected to be supported, an unsourced claim on a personal site reads as carelessness. The interface makes citing the default rather than an extra step.",
    },
    {
      label: "THE RECORD",
      image: "/projects/advocate-dossier/resume.webp",
      imageAlt: "Advocate Dossier interactive resume section",
      title: "A résumé built for the browser, printable when it has to be.",
      body:
        "The résumé is a real page rather than a PDF download—readable, linkable, and current—while still printing cleanly when an application demands a file. It removes the usual failure mode where the website and the attached CV drift apart, and it means the version a reader finds is always the version that is true.",
    },
  ],
  outcome:
    "A nine-section professional record with its own routing, citation pattern, and browser-native résumé. It settled how to present someone whose case rests on credentials rather than clients—a structure that holds up at graduation and still holds up ten years later.",
};
