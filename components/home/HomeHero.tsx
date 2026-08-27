import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { HeroBackdrop } from "./HeroBackdrop";

const capabilityRail = [
  ["01", "Direction", "Audience, offer, and page structure"],
  ["02", "Design", "Typography, layout, imagery, and interaction"],
  ["03", "Development", "Responsive, accessible, production-ready build"],
  ["04", "Launch", "Quality assurance, handover, and support"],
] as const;

export function HomeHero() {
  return (
    <>
      <section className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden py-[clamp(96px,14vh,160px)]">
        <HeroBackdrop />
        <Container className="relative z-10">
          <div data-hero-fade className="mb-[clamp(28px,5vh,56px)] flex flex-wrap justify-between gap-4 font-mono text-xs tracking-[0.08em] text-paper/50">
            <span>INDEPENDENT DESIGN & DEVELOPMENT STUDIO</span>
            <span>WORKING WORLDWIDE</span>
            <span className="text-accent">STRATEGY · DESIGN · DEVELOPMENT</span>
          </div>
          <h1 className="m-0 font-serif text-[clamp(48px,10.5vw,168px)] leading-[0.92] tracking-[-0.035em]">
            <span data-line><span data-line-inner>A website</span></span>
            <span data-line><span data-line-inner>worth trusting <em className="text-accent">before</em></span></span>
            <span data-line><span data-line-inner>you say a word.</span></span>
          </h1>
          <div data-hero-fade className="mt-[clamp(32px,5vh,60px)] flex flex-wrap items-end justify-between gap-[clamp(24px,4vw,56px)]">
            <p className="m-0 max-w-[42ch] text-[clamp(16px,1.5vw,20px)] leading-[1.6] text-paper/88">
              Vanto helps professional firms, service businesses, and growing brands turn what they do
              into a clear, distinctive website — then builds it from strategy through launch.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <ButtonLink data-magnetic data-cursor="View" href="#work" variant="light" size="lg" className="transition-transform duration-300">
                View selected work
              </ButtonLink>
              <ButtonLink data-cursor="Talk" href="/contact" variant="text" className="text-base">
                Start a project →
              </ButtonLink>
            </div>
          </div>
        </Container>
        <div data-hero-fade className="absolute bottom-[26px] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-paper/50 max-md:hidden">
          <span className="font-mono text-[11px] tracking-[0.14em]">SCROLL</span>
          <span className="h-10 w-px bg-gradient-to-b from-paper/50 to-transparent" />
        </div>
      </section>
      <div className="border-y border-paper/12 bg-paper/12">
        <Container>
          <div className="grid grid-cols-2 gap-px bg-paper/12 lg:grid-cols-4">
            {capabilityRail.map(([number, title, note]) => (
              <div data-fade key={number} className="min-h-[132px] bg-ink px-[clamp(18px,3vw,30px)] py-6">
                <span className="font-mono text-[10px] tracking-[0.12em] text-accent">{number}</span>
                <h2 className="mt-5 font-serif text-[clamp(22px,2.2vw,30px)] leading-none tracking-[-0.02em]">{title}</h2>
                <p className="mt-2 max-w-[28ch] text-[12px] leading-[1.5] text-paper/52">{note}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
