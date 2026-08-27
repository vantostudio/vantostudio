import { Container } from "@/components/ui/Layout";
import { WordReveal } from "@/components/ui/WordReveal";

const principles = [
  ["01", "The message leads", "People should understand who the business helps and why it matters before they admire the interface."],
  ["02", "Craft earns attention", "Typography, imagery, and motion give the message character without making the visitor work harder."],
  ["03", "The next step is obvious", "Every page should help a visitor move forward with confidence, whether that means reading, enquiring, or buying."],
] as const;

export function PointOfView() {
  return (
    <section className="bg-paper py-[clamp(80px,13vw,180px)] text-ink">
      <Container>
        <p data-fade className="mb-[clamp(28px,4vw,44px)] font-mono text-xs tracking-[0.14em] text-accent">( THE POINT OF VIEW )</p>
        <WordReveal className="m-0 max-w-[20ch] font-serif text-[clamp(32px,5.2vw,72px)] leading-[1.08] tracking-[-0.025em] text-balance">
          A strong website makes three things clear: who you help, why your work matters, and what someone should do next.
        </WordReveal>
        <p data-fade className="mt-7 max-w-[66ch] text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-[#5f584d]">
          Strategy gives those answers shape. Design makes them memorable. Development keeps the final experience fast, usable, and faithful to the idea.
        </p>
        <div className="mt-[clamp(48px,7vw,88px)] grid gap-px overflow-hidden rounded-[20px] border border-paper-line bg-paper-line md:grid-cols-3">
          {principles.map(([number, title, description]) => (
            <article data-fade key={number} className="bg-paper-card p-[clamp(24px,3vw,36px)]">
              <span className="font-mono text-xs text-accent">{number}</span>
              <h3 className="mt-14 font-serif text-[clamp(24px,2.5vw,34px)] tracking-[-0.02em]">{title}</h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-[#5f584d]">{description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
