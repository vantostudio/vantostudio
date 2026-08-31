import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Layout";
import { mailto, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Vanto collects when you send a project brief, why, and how to have it removed.",
};

const sections: { heading: string; body: ReactNode }[] = [
  {
    heading: "What this covers",
    body: (
      <>
        This page explains what happens to information you give {site.name} through this
        website. It is written to be read, not to be survived. If anything here is
        unclear, ask and it will be explained plainly.
      </>
    ),
  },
  {
    heading: "What the project form collects",
    body: (
      <>
        The brief asks for your name, an email address or WhatsApp number, the type of
        business, your timeline, the scope you are considering, and any notes you choose
        to add. Nothing else is collected, and no field is hidden from you — what appears
        in the summary is exactly what is sent.
      </>
    ),
  },
  {
    heading: "How it is used",
    body: (
      <>
        Solely to reply to your enquiry and discuss the work. Your brief is not sold, not
        shared with third parties for their own purposes, not added to a mailing list,
        and not used for advertising. You will not receive marketing because you filled
        in this form.
      </>
    ),
  },
  {
    heading: "Who processes it",
    body: (
      <>
        The site is hosted on Vercel. Form submissions are delivered by email through
        Resend, which processes the message in order to send it. If you choose the
        WhatsApp route instead, the summary is prepared on your device and is not sent
        until you press send there — at which point WhatsApp&rsquo;s own terms apply.
      </>
    ),
  },
  {
    heading: "Analytics",
    body: (
      <>
        This site uses Vercel Web Analytics to count page views and anonymous actions,
        such as opening a project, choosing a contact route, starting the project brief,
        or successfully delivering it. Event labels never include your name, contact
        details, or form answers. The analytics are cookieless and do not follow you
        across other websites.
      </>
    ),
  },
  {
    heading: "How long it is kept",
    body: (
      <>
        Enquiry emails are kept while the conversation is useful — typically no more than
        two years — and deleted after that. If a project goes ahead, the relevant details
        are retained for the engagement and any period required for tax or accounting
        records.
      </>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <>
        You can ask for a copy of what is held about you, ask for it to be corrected, or
        ask for it to be deleted. Email{" "}
        <a href={mailto} className="border-b border-accent pb-0.5 text-paper hover:text-accent">
          {site.email}
        </a>{" "}
        and it will be actioned — deletion within thirty days unless there is a legal
        reason to keep something, in which case you will be told what and why.
      </>
    ),
  },
  {
    heading: "Storage in your browser",
    body: (
      <>
        While you are filling in the project brief, your answers are saved in your own
        browser so a refresh does not lose your progress. That stays on your device, is
        cleared when you submit, and can be cleared any time with the &ldquo;Start over&rdquo;
        button or by closing the tab. It is never transmitted anywhere on its own.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <PageShell footerProps={{ eyebrow: "STILL HERE?", headline: "Let’s talk about the project." }}>
      <PageHero
        eyebrow="PRIVACY"
        note="PLAIN LANGUAGE"
        lines={[<>What happens</>, <>to what you <em className="text-accent">send.</em></>]}
        intro="A short, honest account of what this site collects, why, and how to have it removed."
        width="13ch"
      />
      <section className="pb-[clamp(72px,10vw,140px)]">
        <Container>
          <div className="max-w-[68ch] border-t border-paper/14">
            {sections.map((section) => (
              <article data-fade key={section.heading} className="border-b border-paper/14 py-[clamp(28px,4vw,44px)]">
                <h2 className="m-0 font-serif text-[clamp(24px,3vw,38px)] leading-[1.1] tracking-[-0.02em]">
                  {section.heading}
                </h2>
                <p className="mt-4 mb-0 text-[clamp(15px,1.3vw,18px)] leading-[1.7] text-paper/70">
                  {section.body}
                </p>
              </article>
            ))}
            <p className="mt-8 font-mono text-[11px] tracking-[0.1em] text-paper/45">LAST UPDATED — AUGUST 2026</p>
            <Link
              href="/contact"
              data-cursor="Start"
              data-analytics-event="Contact Clicked"
              data-analytics-location="privacy page"
              data-analytics-label="Discuss your website"
              className="mt-6 inline-flex border-b-[1.5px] border-accent pb-1 text-[15px] font-semibold text-paper"
            >
              Discuss your website →
            </Link>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
