export type Testimonial = {
  /** Verbatim quote. Never paraphrase, never write one on a client's behalf. */
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Which project this came out of — links the quote to evidence. */
  projectSlug?: string;
  /** Where it was said, so it can be traced: "Email, Mar 2026", "Google review". */
  source: string;
};

/**
 * Real client quotes only.
 *
 * Add an entry once someone has said it and agreed to be named — an email
 * reply is enough, keep it on file. The section renders nothing while this is
 * empty, so the site never shows an empty testimonial shell.
 *
 * A quick way to collect them: after handover, ask two questions —
 * "What was the situation before?" and "What changed?" — and use the answer
 * verbatim. Specific beats glowing.
 */
export const testimonials: Testimonial[] = [];
