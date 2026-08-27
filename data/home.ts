export const capabilities = [
  {
    number: "01",
    name: "Strategy & web design",
    note: "A clear direction for what the site needs to say, show, and help people do.",
    details: ["Discovery", "Content structure", "UX/UI design"],
  },
  {
    number: "02",
    name: "Website development",
    note: "Responsive, accessible builds where performance and interaction receive equal care.",
    details: ["Frontend", "CMS & integrations", "Quality assurance"],
  },
  {
    number: "03",
    name: "Ongoing support",
    note: "Practical help keeping the website accurate, reliable, and useful after launch.",
    details: ["Maintenance", "Content updates", "Improvements"],
  },
] as const;

export const homeSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We align on the audience, business goals, content, and project scope before design begins.",
    client: "You share context, priorities, and existing material.",
    output: "Direction, responsibilities, schedule, and scope.",
  },
  {
    number: "02",
    title: "Design & build",
    description:
      "Structure, visual design, interaction, and development progress as one connected system.",
    client: "You review the work at clear, focused checkpoints.",
    output: "Responsive designs and a working website.",
  },
  {
    number: "03",
    title: "Launch & improve",
    description:
      "The website is tested, refined, launched on your domain, and prepared for what comes next.",
    client: "You approve final content and the launch-ready experience.",
    output: "Live site, handover, and an optional support plan.",
  },
] as const;

export const faqs = [
  [
    "How long does a website project take?",
    "A focused website can take two to four weeks; a larger or more integrated website usually takes four to eight. The schedule depends on content readiness, functionality, and feedback—not an arbitrary deadline. Your proposal includes a clear timeline.",
  ],
  [
    "What do you need from us?",
    "You bring the business context, priorities, and access to the people who can make decisions. Vanto helps shape the structure and content direction, keeps responsibilities clear, and tells you exactly what is needed at each stage.",
  ],
  [
    "Can you help with the words and images?",
    "Yes. Page structure, messaging priorities, and content direction are part of the process. Full copywriting, photography, illustration, or video production can be added to the scope when needed. If you already have material, Vanto helps decide what to keep, improve, or replace.",
  ],
  [
    "Who owns the website and domain?",
    "You do. Your domain, website, content, and project assets remain yours. The launch and handover process is designed to avoid platform lock-in and leave you with a clear operating setup.",
  ],
  [
    "How are projects priced?",
    "Every engagement is quoted around its goals, content, functionality, and timing rather than forced into a rigid package. After an initial conversation, you receive a written proposal covering responsibilities, timeline, deliverables, and investment. Essential work and optional additions can be separated or phased where that makes sense.",
  ],
] as const;
