import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Layout";
import { PricingCards } from "@/components/services/PricingCards";
import { projectFit, quoteFactors, services, standards } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Website strategy, design, development, launch, and ongoing support from an independent studio in Kenya.",
};

export default function ServicesPage() {
  return (
    <PageShell
      footerProps={{
        eyebrow: "NOT SURE WHICH?",
        headline: "Let’s figure it out together.",
        buttonLabel: "Get a quote",
      }}
    >
      <PageHero
        eyebrow="CAPABILITIES"
        note="STRATEGY → DESIGN → BUILD"
        lines={[<>From first idea</>, <>to a considered <em className="text-accent">launch.</em></>]}
        intro="Every engagement is led directly by Alex Morgan, bringing strategy, design, and development together in one focused process."
        width="13ch"
      />
      <section className="pb-[clamp(72px,10vw,140px)]">
        <Container>
          <div className="border-t border-paper/14">
            {services.map((service) => (
              <article
                data-fade
                key={service.number}
                className="grid gap-[clamp(22px,4vw,52px)] border-b border-paper/14 px-1 py-[clamp(32px,5vw,64px)] md:grid-cols-[minmax(0,1.15fr)_minmax(240px,.85fr)]"
              >
                <div className="flex gap-[clamp(16px,3vw,36px)]">
                  <span className="pt-2 font-mono text-[13px] text-accent">{service.number}</span>
                  <div>
                    <h2 className="m-0 font-serif text-[clamp(30px,4vw,54px)] leading-[1.02] tracking-[-0.02em]">{service.name}</h2>
                    <p className="mt-4 max-w-[56ch] text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-paper/65">{service.description}</p>
                  </div>
                </div>
                <ul className="m-0 flex list-none flex-col justify-center gap-3 border-t border-paper/14 pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-[clamp(24px,4vw,48px)]">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] text-paper/75">
                      <span className="text-accent">—</span>{item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-paper/12 bg-ink-soft py-[clamp(64px,9vw,120px)]">
        <Container className="grid gap-[clamp(32px,5vw,72px)] md:grid-cols-[.8fr_1.2fr]">
          <div data-fade>
            <p className="mb-5 font-mono text-xs tracking-[0.14em] text-accent">( BUILT INTO EVERY PROJECT )</p>
            <h2 className="m-0 font-serif text-[clamp(32px,4.5vw,62px)] leading-[1.02] tracking-[-0.025em]">The details are part of the work.</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-paper/12 bg-paper/12 sm:grid-cols-2">
            {standards.map((standard) => (
              <div data-fade key={standard} className="bg-ink-soft p-[clamp(20px,3vw,30px)] text-[15px] leading-[1.5] text-paper/75">
                <span className="mr-3 text-sage">✓</span>{standard}
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-paper/12 bg-ink py-[clamp(64px,9vw,120px)]">
        <Container>
          <div data-fade className="mb-[clamp(36px,5vw,60px)] grid gap-5 md:grid-cols-[1fr_.7fr] md:items-end">
            <div>
              <p className="mb-5 font-mono text-xs tracking-[0.14em] text-sage">( PROJECT FIT )</p>
              <h2 className="m-0 max-w-[14ch] font-serif text-[clamp(34px,4.8vw,66px)] leading-[1.02] tracking-[-0.025em]">
                Good work starts with clear expectations.
              </h2>
            </div>
            <p className="m-0 max-w-[44ch] text-[15px] leading-[1.65] text-paper/62 md:justify-self-end">
              The strongest projects have a clear decision-maker, useful business context, and room for considered decisions rather than rushed decoration.
            </p>
          </div>
          <div className="grid gap-[clamp(24px,4vw,56px)] md:grid-cols-3">
            {projectFit.map((item, index) => (
              <article data-fade key={item.title} className="border-t border-paper/18 pt-5">
                <span className="font-mono text-[11px] tracking-[0.1em] text-accent">0{index + 1}</span>
                <h3 className="mt-8 text-[19px] font-semibold">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-paper/62">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section id="pricing" className="bg-paper py-[clamp(80px,12vw,160px)] text-ink">
        <Container>
          <div data-fade className="mb-[clamp(40px,6vw,64px)] max-w-[60ch]">
            <p className="mb-5 font-mono text-xs tracking-[0.14em] text-accent">( ENGAGEMENTS & QUOTING )</p>
            <h2 className="mb-4 font-serif text-[clamp(34px,5vw,72px)] tracking-[-0.025em]">A clear proposal, shaped around the work.</h2>
            <p className="m-0 text-[clamp(16px,1.4vw,19px)] leading-[1.6] text-[#4a463c]">
              These are useful starting points, not rigid packages. After a short conversation, you receive a written proposal with the agreed scope, timeline, responsibilities, and investment.
            </p>
          </div>
          <PricingCards />
          <div className="mt-[clamp(56px,8vw,96px)] grid gap-[clamp(32px,5vw,72px)] border-t border-paper-line pt-[clamp(36px,5vw,56px)] md:grid-cols-[.72fr_1.28fr]">
            <div data-fade>
              <p className="mb-4 font-mono text-[11px] tracking-[0.13em] text-accent">( WHAT SHAPES THE QUOTE )</p>
              <h3 className="m-0 max-w-[12ch] font-serif text-[clamp(28px,3.5vw,46px)] leading-[1.04] tracking-[-0.02em]">
                Enough clarity to make a good decision.
              </h3>
              <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.65] text-[#5f584d]">
                Where useful, the proposal separates the essential launch scope from optional additions. That gives us room to adjust or phase the work without weakening the core experience.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line sm:grid-cols-2">
              {quoteFactors.map(([title, description]) => (
                <article data-fade key={title} className="bg-paper-card p-[clamp(22px,3vw,30px)]">
                  <h4 className="m-0 text-[16px] font-semibold">{title}</h4>
                  <p className="mt-2 text-sm leading-[1.6] text-[#5f584d]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
