export const businessOptions = [
  "Professional services",
  "Retail or hospitality",
  "Commerce or marketplace",
  "Health or wellness",
  "Personal brand",
  "Something else",
] as const;

export const timeOptions = [
  "Within a month",
  "One to three months",
  "Later or still exploring",
] as const;

export const scopeOptions = [
  "One focused page",
  "A multi-page website",
  "Commerce or custom functionality",
  "Help me decide",
] as const;

export const scopeSelections = {
  focused: {
    option: "One focused page",
    title: "Focused website",
    note: "A strong starting point for one clear offer, audience, and action.",
  },
  business: {
    option: "A multi-page website",
    title: "Business website",
    note: "Likely suited to a fuller story, service structure, and client journey.",
  },
  commerce: {
    option: "Commerce or custom functionality",
    title: "Commerce & custom",
    note: "A tailored scope for transactions, integrations, or specialist functionality.",
  },
  undecided: {
    option: "Help me decide",
    title: "Short scoping conversation",
    note: "We’ll identify the smallest useful scope and what can wait until later.",
  },
} as const;

export type ScopeKey = keyof typeof scopeSelections;

export function getScopeSelection(key?: string) {
  return key && key in scopeSelections
    ? scopeSelections[key as ScopeKey]
    : undefined;
}

export function getRecommendation(option: string) {
  return Object.values(scopeSelections).find((item) => item.option === option)
    ?? scopeSelections.undecided;
}

/**
 * How the client wants to be reached. This drives both the input's keyboard
 * and validation, and which channel the finished brief is handed off to.
 */
export const contactMethods = [
  {
    value: "Email",
    label: "Email",
    field: "Your email address",
    placeholder: "you@example.com",
    autoComplete: "email",
    inputMode: "email",
  },
  {
    value: "WhatsApp",
    label: "WhatsApp",
    field: "Your WhatsApp number",
    placeholder: "+254 7XX XXX XXX",
    autoComplete: "tel",
    inputMode: "tel",
  },
] as const;

export type ContactMethod = (typeof contactMethods)[number]["value"];

export function getContactMethod(value: string) {
  return contactMethods.find((method) => method.value === value) ?? contactMethods[0];
}

/** A single check per channel, so the error can name what is actually wrong. */
export function validateContact(method: string, value: string) {
  const trimmed = value.trim();
  if (!trimmed) return method === "WhatsApp" ? "Add your WhatsApp number." : "Add your email address.";
  if (method === "WhatsApp") {
    return /^\+?[\d\s()-]{9,}$/.test(trimmed) ? "" : "That number looks incomplete — include the country code.";
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed) ? "" : "That email address looks incomplete.";
}
