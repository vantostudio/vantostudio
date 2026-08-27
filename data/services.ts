export const services = [
  {
    number: "01",
    name: "Strategy & web design",
    description:
      "The foundation for a website that is clear, distinctive, and built around the decisions your visitors need to make.",
    includes: ["Discovery & direction", "Content structure", "UX & responsive design", "Interactive prototypes"],
  },
  {
    number: "02",
    name: "Website development",
    description:
      "A carefully engineered website that carries the design through every screen and performs reliably in the real world.",
    includes: ["Frontend development", "CMS & content workflows", "Commerce, booking & integrations", "Accessibility, SEO & performance"],
  },
  {
    number: "03",
    name: "Ongoing support",
    description:
      "Practical support after launch, from essential maintenance to measured improvements as your business evolves.",
    includes: ["Monitoring & maintenance", "Content updates", "Performance reviews", "New pages & improvements"],
  },
] as const;

export const standards = [
  "Responsive across current devices",
  "Accessible interaction and content",
  "Search-ready technical foundations",
  "Performance and quality assurance",
  "Analytics setup",
  "Launch, handover, and ownership guidance",
] as const;

export const projectFit = [
  {
    title: "A good fit",
    description:
      "You need a new website or a considered redesign, and want strategy, design, and development handled as one connected piece of work.",
  },
  {
    title: "What you bring",
    description:
      "Clear access to a decision-maker, honest business context, available brand material, and timely feedback at agreed checkpoints.",
  },
] as const;

export const plans = [
  {
    name: "Focused website",
    scope: "focused",
    price: "Project-based quote",
    who: "For one clear offer, audience, and action.",
    features: ["One considered scrolling page", "Content structure and custom design", "Lead form or WhatsApp handoff", "Responsive build and launch"],
    badge: null,
    dark: false,
    featured: false,
  },
  {
    name: "Business website",
    scope: "business",
    price: "Project-based quote",
    who: "For a business that needs a fuller client journey.",
    features: ["Strategically structured pages", "Responsive design system", "Content guidance and SEO foundations", "Testing, launch, and handover"],
    badge: "CORE OFFER",
    dark: false,
    featured: true,
  },
  {
    name: "Commerce & custom",
    scope: "commerce",
    price: "Custom project quote",
    who: "For selling, booking, membership, or tailored functionality.",
    features: ["Customer and admin journeys", "Payments or third-party integrations", "Scalable content and product structure", "Testing, launch, and handover"],
    badge: "ADVANCED",
    dark: true,
    featured: false,
  },
] as const;

export const quoteFactors = [
  ["Scope", "The number and complexity of distinct pages, journeys, and features."],
  ["Content", "What already exists and where writing, imagery, or production support is needed."],
  ["Functionality", "Commerce, booking, CMS, payments, or third-party integrations."],
  ["Timing", "Content readiness, feedback windows, dependencies, and the intended launch date."],
] as const;
