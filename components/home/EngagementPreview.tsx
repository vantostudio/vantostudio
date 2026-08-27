import Link from "next/link";
import { Container } from "@/components/ui/Layout";

const engagements = [
  {
    number: "01",
    title: "New website or redesign",
    description:
      "Strategy, content structure, design, development, and launch—scoped around the business, audience, and required functionality.",
    details: ["Strategy and content direction", "Custom design and development", "Commerce and integrations"],
  },
  {
    number: "02",
    title: "Support after launch",
    description:
      "Maintenance, content support, new landing pages, performance reviews, and considered improvements after launch.",
    details: ["Care and monitoring", "Content and campaign pages", "Measured improvements"],
  },
] as const;

export function EngagementPreview() {
  return (
    <section className="border-t border-paper-line bg-paper py-[clamp(80px,12vw,160px)] text-ink">
      <Container>
        <div data-fade className="mb-[clamp(40px,6vw,72px)] grid gap-6 md:grid-cols-[1fr_.7fr] md:items-end">
          <div>
            <p className="mb-5 font-mono text-xs tracking-[0.14em] text-accent">( WAYS TO WORK TOGETHER )</p>
            <h2 className="m-0 max-w-[13ch] font-serif text-[clamp(36px,5vw,72px)] leading-none tracking-[-0.025em]">The right shape for the work.</h2>
          </div>
          <p className="m-0 max-w-[45ch] text-[15px] leading-[1.65] text-[#5f584d] md:justify-self-end">
            Every engagement begins with a conversation and a written proposal covering scope, responsibilities, timeline, and investment.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {engagements.map((engagement, index) => (
            <article data-fade key={engagement.number} className={`flex min-h-[390px] flex-col rounded-[24px] border p-[clamp(28px,4vw,48px)] ${index ? "border-ink bg-ink text-paper" : "border-paper-line bg-paper-card"}`}>
              <span className="font-mono text-xs tracking-[0.1em] text-accent">{engagement.number}</span>
              <h3 className="mt-auto max-w-[12ch] font-serif text-[clamp(30px,3.8vw,52px)] leading-[1.02] tracking-[-0.025em]">{engagement.title}</h3>
              <p className={`mt-5 max-w-[48ch] text-[15px] leading-[1.65] ${index ? "text-paper/65" : "text-[#5f584d]"}`}>{engagement.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {engagement.details.map((detail) => (
                  <span key={detail} className={`rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.06em] ${index ? "border-paper/18 text-paper/65" : "border-paper-line text-[#6f675a]"}`}>{detail}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <Link href="/contact" data-magnetic data-cursor="Start" className="mt-8 inline-flex rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-ink">
          Talk through your project
        </Link>
      </Container>
    </section>
  );
}
