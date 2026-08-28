export const capabilities = [
  {
    number: "01",
    name: "Strategy & direction",
    note: "A sharper position, clearer priorities, and a website plan grounded in how your business needs to grow.",
    details: ["Discovery", "Positioning", "Content strategy"],
  },
  {
    number: "02",
    name: "Experience design",
    note: "A distinctive digital system that makes your offer easier to understand, trust, and act on.",
    details: ["UX/UI design", "Art direction", "Prototyping"],
  },
  {
    number: "03",
    name: "Development & growth",
    note: "A fast, accessible build with the foundations to launch confidently and improve over time.",
    details: ["Development", "Integrations", "Ongoing support"],
  },
] as const;

export const homeSteps = [
  {
    number: "01",
    title: "Define the opportunity",
    description:
      "We align on the audience, offer, business goals, and decisions the website needs to support.",
    client: "You share context, priorities, and existing material.",
    output: "A focused brief, direction, schedule, and scope.",
  },
  {
    number: "02",
    title: "Shape the experience",
    description:
      "Content structure, visual design, interaction, and development move forward as one connected system.",
    client: "You review the work at clear, focused checkpoints.",
    output: "A responsive design system and working website.",
  },
  {
    number: "03",
    title: "Launch with confidence",
    description:
      "The website is tested, refined, launched on your domain, and prepared to evolve with the business.",
    client: "You approve final content and the launch-ready experience.",
    output: "A live site, clear handover, and optional growth support.",
  },
] as const;

export const faqs = [
  [
    "Who will work on my project?",
    "Every project has a clear lead responsible for the work and communication from scope through launch. The core team stays hands-on, and any specialist collaborators are introduced according to the brief—not hidden behind layers of account management.",
  ],
  [
    "How long does a website project take?",
    "A focused website can take two to four weeks; a larger or more integrated website usually takes four to eight. The schedule depends on content readiness, functionality, and feedback—not an arbitrary deadline. Your proposal includes a clear timeline.",
  ],
  [
    "Can you help with the words and images?",
    "Yes. Messaging priorities, page structure, and content direction are part of the process. Copywriting, photography, illustration, or video can be included when needed. If you already have material, we help decide what to keep, improve, or replace.",
  ],
  [
    "Who owns the website and domain?",
    "You do. Your domain, website, content, and project assets remain yours. The launch and handover process is designed to avoid platform lock-in and leave you with a clear operating setup.",
  ],
] as const;
