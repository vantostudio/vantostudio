export type ProjectSlug = "brieshon" | "little-paws" | "odera-partners" | "amani-kibwana";
export type ProjectSector = "Commerce" | "Lifestyle" | "Legal";

export type Project = {
  slug: ProjectSlug;
  index: string;
  category: string;
  sector: ProjectSector;
  status: string;
  kind: "founder" | "concept";
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
