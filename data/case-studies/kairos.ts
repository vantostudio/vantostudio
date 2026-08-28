import type { Project } from "./types";

export const kairos: Project = {
  slug: "kairos",
  index: "01",
  category: "RETAIL & COMMERCE",
  sector: "Commerce",
  status: "INDEPENDENT CONCEPT",
  kind: "concept",
  name: "Kairos",
  domain: "remix-of-maison-olive.vercel.app",
  href: "https://remix-of-maison-olive.vercel.app",
  linkLabel: "View live concept",
  image: "/projects/kairos/home.webp",
  video: "/projects/kairos/preview.webm",
  imageAlt: "Kairos mechanical watch shop homepage",
  description:
    "A self-initiated storefront for a mechanical watch shop, built around considered browsing rather than volume retail.",
  homeDescription:
    "A commerce concept for a specialist retailer—collection-led browsing, product detail that earns a considered purchase, and a checkout built for how people actually pay.",
  tags: ["Commerce strategy", "UX/UI", "Development"],
  facts: [["Concept", "SELF-INITIATED"], ["Storefront", "BROWSE TO CHECKOUT"]],
  tagline: "A shop for things people buy slowly.",
  intro:
    "Kairos is a mechanical watch shop in Mombasa Town. The concept explores how a specialist retailer sells a considered object online—where the customer is not comparing on price, is not in a hurry, and wants to understand what they are buying before they commit.",
  whyBuilt:
    "Most commerce templates are built for volume: grids, urgency banners, and a race to the checkout. That approach actively works against a shop selling four references that people save up for. I wanted to find out what a storefront looks like when it is designed for a slow, deliberate purchase, so I built one end to end.",
  disclaimer:
    "Independent concept project. The shop, references, prices, and contact details are illustrative and were created to demonstrate Vanto’s approach.",
  meta: [
    ["PROJECT", "Independent concept"],
    ["ROLE", "Commerce strategy, UX/UI & development"],
    ["TYPE", "Specialist retail storefront"],
    ["STATUS", "Live concept"],
  ],
  highlights: [
    ["Collection-led", "BROWSING STRUCTURE"],
    ["Editorial", "PRODUCT DETAIL"],
    ["Local", "PAYMENT EXPECTATIONS"],
    ["Complete", "BROWSE TO CART"],
  ],
  blocks: [
    {
      label: "THE PREMISE",
      image: "/projects/kairos/home.webp",
      imageAlt: "Kairos homepage with a full-bleed watch photograph and editorial headline",
      title: "Sell the reason before the product.",
      body:
        "The homepage opens on a single watch and a line about time worn well, not a grid of four references and a discount banner. For an object someone saves for, the first job is establishing why this shop is worth trusting—the movement is checked on a timing machine before it leaves the counter. Product cards come after that case is made, not before it.",
    },
    {
      label: "THE BROWSING",
      image: "/projects/kairos/products.webp",
      imageAlt: "Kairos collection listing showing watch references",
      title: "Collections that match how people actually choose.",
      body:
        "The catalogue is organised by intent rather than by specification: dive, chronograph, dress, field and pilot, skeleton. Someone shopping for a watch rarely arrives knowing the reference they want—they know the life they want it for. Sorting the shelf that way turns a four-product catalogue into a set of answerable questions.",
    },
    {
      label: "THE PRODUCT PAGE",
      image: "/projects/kairos/product.webp",
      imageAlt: "Kairos product detail page for a dive watch",
      title: "Enough detail to commit without a conversation.",
      body:
        "A considered purchase fails at the point where the customer runs out of information and has nobody to ask. Each reference carries its movement, case, water resistance, and the reasoning behind the piece, written as a shopkeeper would explain it across a counter rather than as a specification dump.",
    },
    {
      label: "THE CHECKOUT",
      image: "/projects/kairos/collection.webp",
      imageAlt: "Kairos collection section and payment guidance",
      title: "Built for how the customer actually pays.",
      body:
        "Payment is M-Pesa, card, or on delivery, and the storefront says so plainly rather than burying it at the final step. A shop that only offers what a customer cannot use loses the sale after all the persuasion is done—so the payment reality is stated early, alongside the shop address and opening hours.",
    },
  ],
  outcome:
    "A complete specialist storefront—collection structure, product detail, cart, and stated payment terms—designed for a slow purchase rather than a fast one. It settled how much explanation a considered object needs before someone will buy it without asking a question first.",
};
