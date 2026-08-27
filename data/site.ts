/**
 * Single source of truth for contact and identity details.
 *
 * These were previously repeated across the header, footer, contact form, and
 * the inquiries API. Changing the studio email — e.g. moving off Gmail to an
 * address on vanto.studio — should be one edit here, not five.
 */
export const site = {
  name: "Vanto",
  url: "https://vanto.studio",
  founder: "Alex Morgan",
  /** Studio contact address. */
  email: "hello@vanto.studio",
  /** Digits only, in international format — used to build wa.me links. */
  whatsapp: "254708184850",
  description:
    "Independent website strategy, design, and development for professional firms, service businesses, and growing brands.",
} as const;

export const mailto = `mailto:${site.email}`;
export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
