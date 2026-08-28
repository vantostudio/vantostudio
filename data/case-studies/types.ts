export type ProjectSlug = "advocate-dossier" | "aperture" | "brieshon" | "little-paws" | "odera-partners" | "amani-kibwana";
export type ProjectSector = "Commerce" | "Creative" | "Lifestyle" | "Legal";

export type Project = {
  slug: ProjectSlug;
  index: string;
  category: string;
  sector: ProjectSector;
  status: string;
  kind: "product" | "concept";
  name: string;
  domain: string;
  href: string;
  linkLabel: string;
  image: string;
  video?: string;
  imageAlt: string;
  description: string;
  homeDescription: string;
  tags: string[];
  facts: [string, string][];
  tagline: string;
  intro: string;
  /** Concepts only: why this was self-initiated, so R&D reads as intent rather than filler. */
  whyBuilt?: string;
  disclaimer?: string;
  meta: [string, string][];
  highlights: [string, string][];
  blocks: {
    label: string;
    image: string;
    imageAlt: string;
    title: string;
    body: string;
  }[];
  outcome: string;
};
