import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { capabilities } from "@/data/home";

export function ServicesPreview() {
  return (
    <section className="border-t border-paper-line bg-paper py-[clamp(72px,10vw,140px)] text-ink">
      <Container>
        <div data-fade className="mb-[clamp(40px,6vw,72px)] grid gap-6 md:grid-cols-[1fr_.7fr] md:items-end">
          <div className="max-w-[22ch]">
            <p className="mb-[18px] font-mono text-xs tracking-[0.14em] text-accent">( CAPABILITIES )</p>
            <h2 className="m-0 font-serif text-[clamp(36px,5.5vw,76px)] leading-[0.98] tracking-[-0.03em]">
              One partner, from first question to launch.
            </h2>
          </div>
          <div className="md:justify-self-end">
            <p className="mb-5 max-w-[42ch] text-[15px] leading-[1.65] text-[#5f584d]">
              Direction, design, and development stay connected, so decisions survive the journey from the first conversation to the live website.
            </p>
            <Link data-cursor="View" href="/services" className="border-b-[1.5px] border-accent pb-1 text-[15px] font-semibold text-accent">
              Explore all services →
            </Link>
          </div>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[22px] border border-paper-line bg-paper-line lg:grid-cols-3">
          {capabilities.map((capability) => (
            <Link
              href="/services"
              data-fade
              data-cursor="Explore"
              key={capability.number}
              className="group flex min-h-[330px] flex-col bg-paper-card p-[clamp(26px,3vw,40px)] transition-colors duration-300 hover:bg-[#f0e5d2]"
            >
              <span className="font-mono text-xs tracking-[0.1em] text-accent">{capability.number}</span>
              <h3 className="mt-auto max-w-[12ch] font-serif text-[clamp(28px,3vw,42px)] leading-[1.02] tracking-[-0.02em]">
                {capability.name}
              </h3>
              <p className="mt-4 max-w-[36ch] text-[15px] leading-[1.6] text-[#5f584d]">{capability.note}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {capability.details.map((detail) => (
                  <span key={detail} className="rounded-full border border-paper-line px-3 py-1.5 font-mono text-[10px] tracking-[0.06em] text-[#6f675a]">
                    {detail}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
