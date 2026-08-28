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
  /** Studio contact address. */
  email: "hello@vanto.studio",
  /** Digits only, in international format — used to build wa.me links. */
  whatsapp: "254708184850",
  description:
    "A digital strategy, design, and development studio creating clear, distinctive websites for ambitious businesses.",
} as const;

export const mailto = `mailto:${site.email}`;
export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
