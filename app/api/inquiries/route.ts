import { businessOptions, scopeOptions, timeOptions } from "@/data/contact";

type Inquiry = {
  business: string;
  timeline: string;
  scope: string;
  name: string;
  contact: string;
  message?: string;
  likelyFit: string;
  website?: string;
};

const limits = {
  business: 80,
  timeline: 80,
  scope: 100,
  name: 100,
  contact: 180,
  message: 3000,
  likelyFit: 100,
} as const;

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function parseInquiry(value: unknown): Inquiry | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const inquiry = {
    business: clean(input.business, limits.business),
    timeline: clean(input.timeline, limits.timeline),
    scope: clean(input.scope, limits.scope),
    name: clean(input.name, limits.name),
    contact: clean(input.contact, limits.contact),
    message: clean(input.message, limits.message),
    likelyFit: clean(input.likelyFit, limits.likelyFit),
    website: clean(input.website, 200),
  };

  const valid =
    businessOptions.some((item) => item === inquiry.business)
    && timeOptions.some((item) => item === inquiry.timeline)
    && scopeOptions.some((item) => item === inquiry.scope)
    && inquiry.name.length >= 2
    && inquiry.contact.length >= 5
    && inquiry.likelyFit.length > 0;

  return valid ? inquiry : null;
}

function formatInquiry(inquiry: Inquiry) {
  return [
    "New website enquiry",
    "",
    `Name: ${inquiry.name}`,
    `Contact: ${inquiry.contact}`,
    `Business type: ${inquiry.business}`,
    `Timeline: ${inquiry.timeline}`,
    `Requested scope: ${inquiry.scope}`,
    `Likely fit: ${inquiry.likelyFit}`,
    inquiry.message ? `\nAdditional notes:\n${inquiry.message}` : "",
  ].join("\n");
}

export async function POST(request: Request) {
  const inquiry = parseInquiry(await request.json().catch(() => null));
  if (!inquiry) {
    return Response.json({ error: "Please check the project details and try again." }, { status: 400 });
  }

  // Quietly accept bot submissions caught by the honeypot.
  if (inquiry.website) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "justmogen@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.contact)
    ? inquiry.contact
    : undefined;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject: `Website enquiry — ${inquiry.name} — ${inquiry.likelyFit}`,
      text: formatInquiry(inquiry),
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "The enquiry could not be delivered." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
