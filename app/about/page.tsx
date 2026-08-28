import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Layout";
import { ProcessVisual } from "@/components/about/ProcessVisual";
import { buildSteps, values } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: "Vanto is a digital strategy, design, and development studio creating clear, distinctive websites for ambitious businesses.",
};

export default function AboutPage() {
  return (
    <PageShell footerProps={{ headline: "Something you’re proud to share." }}>
      <PageHero
        eyebrow="ABOUT"
        note="STRATEGY · DESIGN · TECHNOLOGY"
        lines={[<>Different disciplines.</>, <>One clear <em className="text-accent">direction.</em></>]}
        width="15ch"
      />
      <section className="pb-[clamp(72px,10vw,140px)]">
        <Container className="grid items-start gap-[clamp(36px,6vw,88px)] lg:grid-cols-[.52fr_1.48fr]">
          <aside data-fade className="border-y border-paper/14 py-6">
            <p className="m-0 font-mono text-[10px] tracking-[0.13em] text-paper/42">STUDIO DETAILS</p>
            <dl className="mt-7 grid gap-5 text-sm sm:grid-cols-3 lg:grid-cols-1">
              <div><dt className="font-mono text-[10px] tracking-[0.1em] text-accent">FOCUS</dt><dd className="mt-1.5 text-paper/72">Business websites and digital products</dd></div>
              <div><dt className="font-mono text-[10px] tracking-[0.1em] text-accent">APPROACH</dt><dd className="mt-1.5 text-paper/72">Strategy through launch</dd></div>
              <div><dt className="font-mono text-[10px] tracking-[0.1em] text-accent">REACH</dt><dd className="mt-1.5 text-paper/72">Nairobi · Working worldwide</dd></div>
            </dl>
          </aside>
          <div data-fade className="max-w-[760px]">
            <p className="mb-5 font-mono text-xs tracking-[0.12em] text-accent">THE STUDIO</p>
            <p className="m-0 max-w-[24ch] font-serif text-[clamp(28px,3.6vw,50px)] leading-[1.18] tracking-[-0.02em]">
              Vanto is a digital studio for businesses that need clarity, distinction, and a website built to perform.
            </p>
            <p className="mt-5 text-[clamp(15px,1.3vw,18px)] leading-[1.7] text-paper/70">
              We work across positioning, content structure, UX/UI design, and development. Keeping those decisions connected creates websites that communicate better, feel more considered, and remain faithful to the business behind them.
            </p>
            <p className="mt-5 text-[clamp(15px,1.3vw,18px)] leading-[1.7] text-paper/70">
              Every engagement has clear ownership and a team shaped around the actual scope. Clients stay close to the people doing the work, while specialist collaborators join when the brief needs deeper expertise.
            </p>
          </div>
        </Container>
      </section>
      <section className="bg-paper py-[clamp(72px,10vw,140px)] text-ink">
        <Container>
          <p data-fade className="mb-[clamp(32px,4vw,52px)] font-mono text-xs tracking-[0.14em] text-accent">( OUR PRINCIPLES )</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[clamp(24px,3vw,44px)]">
            {values.map(([number, title, description]) => (
              <article data-fade key={number} className="flex flex-col gap-3 border-t border-paper-line pt-[22px]">
                <span className="font-mono text-xs text-accent">{number}</span>
                <h3 className="m-0 font-serif text-[clamp(22px,2.2vw,30px)] tracking-[-0.01em]">{title}</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-ink-body">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-paper-line bg-paper py-[clamp(64px,9vw,130px)] text-ink">
        <Container>
          <div data-fade className="mb-[clamp(40px,5vw,64px)] max-w-[56ch]">
            <p className="mb-[18px] font-mono text-xs tracking-[0.14em] text-accent">( BEHIND THE BUILD )</p>
            <h2 className="m-0 font-serif text-[clamp(30px,4.4vw,60px)] tracking-[-0.02em]">Every project moves through four practical stages.</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-[clamp(18px,2.5vw,28px)]">
            {buildSteps.map(([number, slot, title, description]) => (
              <article data-fade key={number} className="flex flex-col gap-3.5">
                <span className="font-mono text-[11px] tracking-[0.08em] text-accent">{number}</span>
                <h3 className="m-0 text-[19px] font-semibold">{title}</h3>
                <p className="m-0 text-sm leading-[1.6] text-ink-body">{description}</p>
                {/* The illustration follows the words: the stage is named and
                    explained first, then shown. */}
                <div className="mt-auto aspect-[4/3] overflow-hidden rounded-2xl border border-paper-line bg-paper-deep">
                  <ProcessVisual step={slot} />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-ink py-[clamp(80px,12vw,170px)] text-center text-paper">
        <div className="mx-auto max-w-[1000px] px-[clamp(20px,5vw,56px)]">
          <p data-fade className="mb-7 font-mono text-xs tracking-[0.14em] text-sage">( AFTER LAUNCH )</p>
          <p data-fade className="m-0 font-serif text-[clamp(26px,4vw,54px)] leading-[1.22] tracking-[-0.015em] text-balance">
            The goal is a website your team understands, owns, and can keep useful—not a black box that becomes somebody else’s problem after launch.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
